require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

// Serve frontend build (React - Vite)
app.use(express.static(path.join(__dirname, "client", "dist"))); // Adjust if your client is in a different folder

// For all non-API routes, serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
