const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token") || req.header("Authorization")?.replace("Bearer ", "")

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from database
    const user = await User.findById(decoded.user.id).select("-password")

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" })
    }

    // Check if user account is active
    if (user.status === "suspended") {
      return res.status(403).json({ message: "Account suspended" })
    }

    req.user = user
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(401).json({ message: "Token is not valid" })
  }
}
