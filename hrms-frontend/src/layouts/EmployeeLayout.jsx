import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeNavbar from "../components/employee/EmployeeNavbar";
import React from "react";
export default function EmployeeLayout() {
  return (
    <div className="flex">
      {/* Sidebar remains fixed */}
      <EmployeeSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <EmployeeNavbar />

        {/* Dynamic Page Content */}
        <div className="p-6">
          <Outlet />
          {/* Loads EmployeeDashboard or Reports dynamically */}
        </div>
      </div>
    </div>
  );
}
