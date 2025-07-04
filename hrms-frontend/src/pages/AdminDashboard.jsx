import React from "react";
import DashboardCards from "../components/DashboardCards";
import EmployeeStatusGraph from "../components/EmployeeStatusGraph";
import EmployeeStatusList from "../components/EmployeeStatusList";

export default function AdminDashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* First Row: Dashboard Cards */}
      <div className="mb-6">
        <DashboardCards />
      </div>

      {/* Second Row: Status Graph & Status List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <EmployeeStatusGraph />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Employee Status
            </h3>
            <EmployeeStatusList />
          </div>
        </div>
      </div>
    </div>
  );
}
