import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import React from "react";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar remains fixed */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        {/* Dynamic Page Content with scrollable area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet /> {/* Loads AdminDashboard or EmployeeList dynamically */}
        </div>
      </div>
    </div>
  );
}
