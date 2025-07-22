const auth = require("./auth")

module.exports = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Admin access required" })
    }
    next()
  })
}
