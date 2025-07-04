import React from "react";
import { Outlet } from "react-router-dom";
const Attendance = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Attendance</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600">
          Attendance details will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default Attendance;
