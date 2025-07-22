const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["buyer", "seller", "broker", "admin"],
      default: "buyer",
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      district: String,
      parish: String,
      village: String,
    },
    subscriptionStatus: {
      type: String,
      enum: ["trial", "active", "expired", "cancelled"],
      default: "trial",
    },
    subscriptionExpiry: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationDocuments: [
      {
        type: String,
        url: String,
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      smsNotifications: {
        type: Boolean,
        default: true,
      },
      whatsappNotifications: {
        type: Boolean,
        default: false,
      },
    },
    stats: {
      propertiesListed: {
        type: Number,
        default: 0,
      },
      propertiesSold: {
        type: Number,
        default: 0,
      },
      totalViews: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Index for search
userSchema.index({ email: 1 })
userSchema.index({ userType: 1 })
userSchema.index({ subscriptionStatus: 1 })

module.exports = mongoose.model("User", userSchema)
