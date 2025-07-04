const CheckLog = require("../models/CheckLog");
const User = require("../models/User");

// ✅ Check-in Controller
exports.checkIn = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const newLog = new CheckLog({
      userId: user._id,
      emp_id: user.emp_id,
      checkInTime: new Date(),
    });

    await newLog.save();
    res.status(200).json({ message: "Check-in successful", log: newLog });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Check-out Controller
exports.checkOut = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const log = await CheckLog.findOne({
      userId: user._id,
      checkOutTime: null,
    });
    if (!log)
      return res.status(400).json({ message: "No active check-in found" });

    log.checkOutTime = new Date();
    await log.save();

    res.status(200).json({ message: "Check-out successful", log });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Fetch Check-in Logs
exports.getCheckLogs = async (req, res) => {
  try {
    const logs = await CheckLog.find().populate("userId", "name email emp_id");
    res.status(200).json({ logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
