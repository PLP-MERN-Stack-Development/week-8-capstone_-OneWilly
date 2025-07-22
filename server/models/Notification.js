const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "new_message",
        "property_approved",
        "property_rejected",
        "subscription_expiring",
        "subscription_expired",
        "new_inquiry",
        "price_alert",
        "new_match",
        "system_update",
      ],
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
notificationSchema.index({ user: 1, createdAt: -1 })
notificationSchema.index({ user: 1, isRead: 1 })

module.exports = mongoose.model("Notification", notificationSchema)
