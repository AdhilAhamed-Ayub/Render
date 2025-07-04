// services/attendanceService.js
import axios from "axios";

// API Base URL
const API_URL = "http://localhost:5000/api/attendance"; // Adjust this as needed

// ✅ Check-in Function
export const checkIn = async (emp_id) => {
  try {
    const response = await axios.post(`${API_URL}/checkin`, { emp_id });
    return response.data; // Returns the response data (success message, timestamp, etc.)
  } catch (error) {
    console.error("Check-in error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Check-out Function
export const checkOut = async (emp_id) => {
  try {
    const response = await axios.post(`${API_URL}/checkout`, { emp_id });
    return response.data;
  } catch (error) {
    console.error("Check-out error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllAttendance = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching attendance:",
      error.response?.data?.message || error.message
    );
    return [];
  }
};

export const getEmployeeAttendance = async (emp_id) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/attendance/${emp_id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching employee attendance:", error);
    return [];
  }
};
