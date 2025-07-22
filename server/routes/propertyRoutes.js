const express = require("express")
const { body, validationResult } = require("express-validator")
const Property = require("../models/Property")
const User = require("../models/User")
const auth = require("../middleware/auth")
const upload = require("../middleware/upload")

const router = express.Router()

// Get all properties with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      type,
      location,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query

    // Build filter object
    const filter = { status: "active" }

    if (type && type !== "all") filter.type = type
    if (location && location !== "all") {
      filter["location.district"] = new RegExp(location, "i")
    }
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) }
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) }
    if (bedrooms) filter["features.bedrooms"] = { $gte: Number(bedrooms) }
    if (bathrooms) filter["features.bathrooms"] = { $gte: Number(bathrooms) }
    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { "location.district": new RegExp(search, "i") },
      ]
    }

    // Execute query with pagination
    const properties = await Property.find(filter)
      .populate("owner", "name email phone")
      .populate("broker", "name email phone")
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const total = await Property.countDocuments(filter)

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email phone avatar bio")
      .populate("broker", "name email phone avatar bio")

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Increment view count
    property.views += 1
    await property.save()

    res.json(property)
  } catch (error) {
    console.error("Error fetching property:", error)
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Property not found" })
    }
    res.status(500).json({ message: "Server error" })
  }
})

// Create new property
router.post(
  "/",
  [
    auth,
    [
      body("title").trim().isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
      body("description").trim().isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),
      body("type").isIn(["land", "house", "commercial", "rental"]).withMessage("Invalid property type"),
      body("price").isNumeric().withMessage("Price must be a number"),
      body("location.district").trim().notEmpty().withMessage("District is required"),
      body("features.size").trim().notEmpty().withMessage("Size is required"),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      // Check user subscription status
      const user = await User.findById(req.user.id)
      if (user.subscriptionStatus === "expired") {
        return res.status(403).json({ message: "Subscription expired. Please renew to list properties." })
      }

      const propertyData = {
        ...req.body,
        owner: req.user.id,
        status: "pending", // Admin approval required
        verificationStatus: "pending",
      }

      const property = new Property(propertyData)
      await property.save()

      // Update user stats
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { "stats.propertiesListed": 1 },
      })

      res.status(201).json(property)
    } catch (error) {
      console.error("Error creating property:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Update property
router.put("/:id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json(updatedProperty)
  } catch (error) {
    console.error("Error updating property:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete property
router.delete("/:id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    await Property.findByIdAndDelete(req.params.id)

    res.json({ message: "Property deleted successfully" })
  } catch (error) {
    console.error("Error deleting property:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get properties by user
router.get("/user/:userId", async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.params.userId })
      .populate("owner", "name email")
      .sort({ createdAt: -1 })

    res.json(properties)
  } catch (error) {
    console.error("Error fetching user properties:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Search properties with advanced filters
router.post("/search", async (req, res) => {
  try {
    const { filters, location, radius = 10 } = req.body

    const query = { status: "active" }

    // Apply filters
    if (filters.type && filters.type !== "all") query.type = filters.type
    if (filters.minPrice) query.price = { ...query.price, $gte: filters.minPrice }
    if (filters.maxPrice) query.price = { ...query.price, $lte: filters.maxPrice }
    if (filters.bedrooms) query["features.bedrooms"] = { $gte: filters.bedrooms }
    if (filters.bathrooms) query["features.bathrooms"] = { $gte: filters.bathrooms }

    // Location-based search
    if (location && location.coordinates) {
      query["location.coordinates"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.coordinates.lng, location.coordinates.lat],
          },
          $maxDistance: radius * 1000, // Convert km to meters
        },
      }
    }

    const properties = await Property.find(query)
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 })
      .limit(50)

    res.json(properties)
  } catch (error) {
    console.error("Error searching properties:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
