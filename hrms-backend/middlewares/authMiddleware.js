const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body; // Get the email from the request body
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password"); // Exclude password from user object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user object to request
    next(); // Proceed to next middleware/route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authMiddleware;
