const express = require("express")
const Chat = require("../models/Chat")
const Message = require("../models/Message")
const auth = require("../middleware/auth")
const { sendNotification } = require("../services/notificationService")

const router = express.Router()

// Initialize or get existing chat
router.post("/initiate", auth, async (req, res) => {
  try {
    const { propertyId, participants } = req.body

    // Check if chat already exists
    let chat = await Chat.findOne({
      property: propertyId,
      participants: { $all: participants },
    }).populate("participants", "name email")

    if (!chat) {
      // Create new chat
      chat = new Chat({
        property: propertyId,
        participants,
        lastMessage: null,
        unreadCount: { [req.user.id]: 0 },
      })
      await chat.save()
      await chat.populate("participants", "name email")
    }

    // Get recent messages
    const messages = await Message.find({ chat: chat._id }).populate("sender", "name").sort({ createdAt: -1 }).limit(50)

    res.json({
      ...chat.toObject(),
      messages: messages.reverse(),
    })
  } catch (error) {
    console.error("Error initiating chat:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Send message
router.post("/message", auth, async (req, res) => {
  try {
    const { chatId, content } = req.body

    const message = new Message({
      chat: chatId,
      sender: req.user.id,
      content,
    })

    await message.save()
    await message.populate("sender", "name")

    // Update chat
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
      lastActivity: new Date(),
      $inc: {
        [`unreadCount.${req.user.id}`]: 0, // Don't increment for sender
      },
    })

    // Get chat participants for notifications
    const chat = await Chat.findById(chatId).populate("participants")

    // Send notifications to other participants
    chat.participants.forEach((participant) => {
      if (participant._id.toString() !== req.user.id.toString()) {
        sendNotification(participant._id, "new_message", `You have a new message from ${req.user.name}`)
      }
    })

    res.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get user's chats
router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user.id,
    })
      .populate("participants", "name email avatar")
      .populate("property", "title images")
      .populate("lastMessage")
      .sort({ lastActivity: -1 })

    res.json(chats)
  } catch (error) {
    console.error("Error fetching chats:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get chat messages
router.get("/:chatId/messages", auth, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query

    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.json(messages.reverse())
  } catch (error) {
    console.error("Error fetching messages:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Mark messages as read
router.put("/:chatId/read", auth, async (req, res) => {
  try {
    await Chat.findByIdAndUpdate(req.params.chatId, {
      [`unreadCount.${req.user.id}`]: 0,
    })

    res.json({ message: "Messages marked as read" })
  } catch (error) {
    console.error("Error marking messages as read:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
