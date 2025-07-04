require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);
// Routes
// Check-in routes
app.use("/api/auth", authRoutes); // Register check-in routes

app.get("/", (req, res) => {
  res.send("HRMS Backend Running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
