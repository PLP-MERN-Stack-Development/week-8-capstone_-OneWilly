const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    type: {
      type: String,
      enum: ["land", "house", "commercial", "rental"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "UGX",
    },
    location: {
      district: {
        type: String,
        required: true,
        trim: true,
      },
      parish: {
        type: String,
        trim: true,
      },
      village: {
        type: String,
        trim: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          default: [0, 0],
        },
      },
      address: {
        type: String,
        trim: true,
      },
    },
    features: {
      bedrooms: {
        type: Number,
        min: 0,
      },
      bathrooms: {
        type: Number,
        min: 0,
      },
      size: {
        type: String,
        required: true,
        trim: true,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      garden: {
        type: Boolean,
        default: false,
      },
      security: {
        type: Boolean,
        default: false,
      },
      furnished: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
        caption: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    broker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["draft", "pending", "active", "sold", "rented", "inactive"],
      default: "draft",
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    verificationDocuments: [
      {
        type: String,
        url: String,
        documentType: {
          type: String,
          enum: ["title_deed", "survey_plan", "building_permit", "other"],
        },
      },
    ],
    amenities: [
      {
        type: String,
        enum: [
          "electricity",
          "water",
          "internet",
          "security",
          "parking",
          "garden",
          "pool",
          "gym",
          "playground",
          "shopping_center",
          "school",
          "hospital",
          "transport",
        ],
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    inquiries: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Number,
      default: 0,
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
    promotionExpiry: Date,
    tags: [String],
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
propertySchema.index({ "location.coordinates": "2dsphere" })
propertySchema.index({ type: 1, status: 1 })
propertySchema.index({ price: 1 })
propertySchema.index({ "location.district": 1 })
propertySchema.index({ owner: 1 })
propertySchema.index({ createdAt: -1 })
propertySchema.index({ views: -1 })

// Virtual for formatted price
propertySchema.virtual("formattedPrice").get(function () {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: this.currency || "UGX",
  }).format(this.price)
})

// Virtual for property age
propertySchema.virtual("age").get(function () {
  const now = new Date()
  const created = new Date(this.createdAt)
  const diffTime = Math.abs(now - created)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})

// Pre-save middleware
propertySchema.pre("save", function (next) {
  // Generate SEO fields if not provided
  if (!this.seoTitle) {
    this.seoTitle = `${this.title} - ${this.location.district} | Broka256`
  }
  if (!this.seoDescription) {
    this.seoDescription = `${this.description.substring(0, 150)}...`
  }
  next()
})

// Static methods
propertySchema.statics.findByLocation = function (district, parish) {
  const query = { "location.district": new RegExp(district, "i") }
  if (parish) {
    query["location.parish"] = new RegExp(parish, "i")
  }
  return this.find(query)
}

propertySchema.statics.findByPriceRange = function (minPrice, maxPrice) {
  return this.find({
    price: { $gte: minPrice, $lte: maxPrice },
  })
}

// Instance methods
propertySchema.methods.incrementViews = function () {
  this.views += 1
  return this.save()
}

propertySchema.methods.incrementInquiries = function () {
  this.inquiries += 1
  return this.save()
}

module.exports = mongoose.model("Property", propertySchema)
