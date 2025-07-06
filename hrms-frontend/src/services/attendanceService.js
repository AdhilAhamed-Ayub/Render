// services/attendanceService.js
import axios from "axios";

// ✅ Define the base URL first
const BASE_URL = "http://localhost:5000"; // Or your actual backend URL
const API_URL = `${BASE_URL}/api/attendance`;

// ✅ Check-in Function
export const checkIn = async (emp_id) => {
  try {
    const response = await axios.post(`${API_URL}/checkin`, { emp_id });
    return response.data;
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

// ✅ Get All Attendance
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

// ✅ Get Employee Attendance
export const getEmployeeAttendance = async (emp_id) => {
  try {
    const response = await axios.get(`${API_URL}/${emp_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee attendance:",
      error.response?.data || error.message
    );
    return [];
  }
};
