const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Register user
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("phone").isMobilePhone().withMessage("Please provide a valid phone number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { name, email, password, phone, userType } = req.body

      // Check if user exists
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ message: "User already exists" })
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
        phone,
        userType: userType || "buyer",
        subscriptionStatus: "trial",
        subscriptionExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week trial
      })

      // Hash password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      // Create JWT token
      const payload = {
        user: {
          id: user.id,
          userType: user.userType,
        },
      }

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            subscriptionStatus: user.subscriptionStatus,
          },
        })
      })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server error")
    }
  },
)

// Login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body

      // Check if user exists
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      // Create JWT token
      const payload = {
        user: {
          id: user.id,
          userType: user.userType,
        },
      }

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            subscriptionStatus: user.subscriptionStatus,
          },
        })
      })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server error")
    }
  },
)

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
