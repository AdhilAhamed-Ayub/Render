import React, { useState, useEffect } from "react";
import { checkIn, checkOut } from "../../services/attendanceService";
import { FaSpinner } from "react-icons/fa";
import { FiClock, FiCheck, FiXCircle } from "react-icons/fi";

const CheckInCard = () => {
  const [emp_id, setEmpId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHours, setTotalHours] = useState(null);
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.emp_id) {
      setEmpId(storedUser.emp_id);
    }
  }, []);

  const handleCheckIn = async () => {
    if (!emp_id) {
      setStatus("error");
      setMessage("Employee ID not found in localStorage");
      return;
    }

    setIsLoading(true);
    try {
      const response = await checkIn(emp_id);
      console.log("Check-in successful:", response);
      setStatus("success");
      setMessage("Checked in successfully!");
      setTotalHours(null); // clear previous session time
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Check-in failed!");
    } finally {
      setIsLoading(false);
      // Clear status message after 3 seconds
      setTimeout(() => {
        setStatus(null);
        setMessage("");
      }, 3000);
    }
  };

  const handleCheckOut = async () => {
    if (!emp_id) {
      setStatus("error");
      setMessage("Employee ID not found in localStorage");
      return;
    }

    setIsLoading(true);
    try {
      const response = await checkOut(emp_id);
      console.log("Check-out successful:", response);
      setStatus("success");
      setMessage("Checked out successfully!");

      if (response?.data?.totalHours) {
        setTotalHours(response.data.totalHours);
      }
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Check-out failed!");
    } finally {
      setIsLoading(false);
      // Don't clear status on checkout as we want to keep showing total hours
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          Employee Attendance
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <button
            onClick={handleCheckIn}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition duration-300 ease-in-out flex justify-center items-center"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FiClock className="mr-2" />
            )}
            Check In
          </button>

          <button
            onClick={handleCheckOut}
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition duration-300 ease-in-out flex justify-center items-center"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FiClock className="mr-2" />
            )}
            Check Out
          </button>

          {status && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center ${
                status === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {status === "success" ? (
                <FiCheck className="mr-2" />
              ) : (
                <FiXCircle className="mr-2" />
              )}
              <span>{message}</span>
            </div>
          )}

          {totalHours && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-center">
                <FiClock className="text-blue-800 mr-2" />
                <p className="text-blue-800 font-medium">
                  Total Hours Worked:{" "}
                  <span className="font-bold">{totalHours}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInCard;
