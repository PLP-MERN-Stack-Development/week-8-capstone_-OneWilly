const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "location"],
      default: "text",
    },
    attachments: [
      {
        url: String,
        type: String,
        name: String,
        size: Number,
      },
    ],
    isRead: {
      type: Boolean,
      default: false,
    },
    readBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
messageSchema.index({ chat: 1, createdAt: -1 })
messageSchema.index({ sender: 1 })

module.exports = mongoose.model("Message", messageSchema)
