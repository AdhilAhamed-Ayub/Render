import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles
import { getEmployeeAttendance } from "../services/attendanceService";

const EmployeeAttendanceCalendar = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [workHours, setWorkHours] = useState("");

  const emp_id = JSON.parse(localStorage.getItem("user"))?.emp_id; // Get employee ID

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!emp_id) return;
      const data = await getEmployeeAttendance(emp_id);
      setAttendance(data);
    };
    fetchAttendance();
  }, [emp_id]);

  const onDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];

    const record = attendance.find((item) => item.date === formattedDate);

    if (record) {
      setWorkHours(
        `Check-in: ${record.checkInTime} | Check-out: ${record.checkOutTime} | Hours: ${record.totalHours}`
      );
    } else {
      setWorkHours("No attendance record for this day.");
    }
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return attendance.some((item) => item.date === formattedDate)
      ? "bg-green-500 text-white rounded-md" // Highlight if there’s an attendance record
      : "";
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Attendance</h2>
      <div className="flex flex-col items-center">
        <Calendar
          onChange={onDateChange}
          tileClassName={tileClassName}
          className="shadow-lg border border-gray-300 rounded-lg p-4"
        />
        {selectedDate && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
            <p className="font-bold">Date: {selectedDate.toDateString()}</p>
            <p>{workHours}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendanceCalendar;
