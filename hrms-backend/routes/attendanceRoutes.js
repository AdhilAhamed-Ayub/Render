const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");

router.post("/checkin", async (req, res) => {
  try {
    const { emp_id } = req.body;

    if (!emp_id) {
      return res.status(400).json({ message: "emp_id is required" });
    }

    const user = await User.findOne({ emp_id });
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const email = user.email;

    const checkInTime = new Date();
    const attendance = new Attendance({ email, emp_id, checkInTime });
    await attendance.save();

    res.status(200).json({ message: "Checked in successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Error checking in", error });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const { emp_id } = req.body;

    if (!emp_id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // Find the latest active check-in (no checkOutTime yet)
    const checkInRecord = await Attendance.findOne({
      emp_id,
      checkOutTime: null,
    });

    if (!checkInRecord) {
      return res.status(400).json({ message: "No active check-in found" });
    }

    const checkOutTime = new Date();
    const checkInTime = new Date(checkInRecord.checkInTime);

    // Calculate the difference in milliseconds
    const diffMs = checkOutTime - checkInTime;

    // Convert to hours and minutes
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const totalHours = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    // Update record
    checkInRecord.checkOutTime = checkOutTime;
    checkInRecord.totalHours = totalHours;

    await checkInRecord.save();

    res.json({
      message: "Check-out successful",
      checkOutTime,
      totalHours,
    });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/checkin", async (req, res) => {
  try {
    const { emp_id } = req.body;

    if (!emp_id) {
      console.log("Error: emp_id is required");
      return res.status(400).json({ message: "emp_id is required" });
    }

    const user = await User.findOne({ emp_id });
    if (!user) {
      console.log(`Error: Employee not found with emp_id ${emp_id}`);
      return res.status(404).json({ message: "Employee not found" });
    }

    const email = user.email;

    const checkInTime = new Date();
    const attendance = new Attendance({ email, emp_id, checkInTime });
    await attendance.save();

    console.log(`Check-in successful for emp_id ${emp_id}`);
    res.status(200).json({ message: "Checked in successfully", attendance });
  } catch (error) {
    console.error("Error checking in:", error);
    res.status(500).json({ message: "Error checking in", error });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const { emp_id } = req.body;

    if (!emp_id) {
      console.log("Error: Employee ID is required");
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // Find the latest active check-in (no checkOutTime yet)
    const checkInRecord = await Attendance.findOne({
      emp_id,
      checkOutTime: null,
    });

    if (!checkInRecord) {
      console.log(`Error: No active check-in found for emp_id ${emp_id}`);
      return res.status(400).json({ message: "No active check-in found" });
    }

    const checkOutTime = new Date();
    const checkInTime = new Date(checkInRecord.checkInTime);

    // Calculate the difference in milliseconds
    const diffMs = checkOutTime - checkInTime;

    // Convert to hours and minutes
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const totalHours = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    // Update record
    checkInRecord.checkOutTime = checkOutTime;
    checkInRecord.totalHours = totalHours;

    await checkInRecord.save();

    console.log(`Check-out successful for emp_id ${emp_id}`);
    res.json({
      message: "Check-out successful",
      checkOutTime,
      totalHours,
    });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    console.log("Attendance records fetched successfully");
    res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Error fetching attendance records" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records" });
  }
});

module.exports = router;
