const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  email: { type: String, required: true },
  emp_id: { type: String, required: true },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date, default: null },
  totalHours: { type: String, default: "0:00" },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
