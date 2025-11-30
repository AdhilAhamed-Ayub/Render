import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; // Adjust the base URL as needed
const API_URL = `${BASE_URL}/api/auth`;
const EmployeeStatusList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/users`);
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Categorizing Employees
  const activeEmployees = employees.filter((emp) => emp.status === "active");
  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Total Employees Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Total Employees
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="h-40 overflow-y-auto border-t pt-2">
            {employees.map((emp) => (
              <p key={emp.emp_id} className="py-1 text-gray-700">
                <span className="font-semibold">ID:</span> {emp.emp_id} -
                <span
                  className={`ml-1 ${
                    emp.status === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {emp.status}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Active Employees Card */}
      <div className="bg-green-100 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Active Employees
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="h-40 overflow-y-auto border-t pt-2">
            {activeEmployees.map((emp) => (
              <p key={emp.emp_id} className="py-1 text-green-700">
                <span className="font-semibold">ID:</span> {emp.emp_id}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Inactive Employees Card */}
      <div className="bg-red-100 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-700 mb-4">
          Inactive Employees
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="h-40 overflow-y-auto border-t pt-2">
            {inactiveEmployees.map((emp) => (
              <p key={emp.emp_id} className="py-1 text-red-700">
                <span className="font-semibold">ID:</span> {emp.emp_id}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeStatusList;
