require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const socketIo = require("socket.io")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const morgan = require("morgan")

const app = express()
const server = http.createServer(app)

// Security middleware
app.use(helmet())
app.use(morgan("combined"))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use("/api/", limiter)

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions))
app.use(cors({
  origin: 'https://broka256.onrender.com',
  credentials: true
}));

// Socket.io configuration
const io = socketIo(server, {
  cors: corsOptions,
})

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err)
    process.exit(1)
  })

// Socket.io for real-time features
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id)

  // Join chat room
  socket.on("join_chat", (chatId) => {
    socket.join(chatId)
    console.log(`👥 User ${socket.id} joined chat: ${chatId}`)
  })

  // Handle messages
  socket.on("send_message", (data) => {
    io.to(data.chatId).emit("receive_message", data)
    console.log("💬 Message sent to chat:", data.chatId)
  })

  // Handle typing indicators
  socket.on("typing", (data) => {
    socket.to(data.chatId).emit("user_typing", data)
  })

  socket.on("stop_typing", (data) => {
    socket.to(data.chatId).emit("user_stop_typing", data)
  })

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id)
  })
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API Routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/properties", require("./routes/propertyRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/chat", require("./routes/chatRoutes"))
app.use("/api/notifications", require("./routes/notificationRoutes"))
app.use("/api/upload", require("./routes/uploadRoutes"))
app.use("/api/payments", require("./routes/paymentRoutes"))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received, shutting down gracefully")
  server.close(() => {
    console.log("💤 Process terminated")
  })
})
