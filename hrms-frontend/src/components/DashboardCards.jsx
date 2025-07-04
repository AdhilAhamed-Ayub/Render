import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function DashboardCards() {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    employeeCount: 0,
    adminCount: 0,
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/users/counts",
          {
            headers: {
              "x-auth-token": user?.token,
            },
          }
        );
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    fetchCounts();
  }, [user?.token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Total User</h3>
        <p className="text-3xl font-bold text-indigo-600 mt-2">
          {counts.totalUsers}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Employees Count</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {counts.employeeCount}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Admin Count</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">
          {counts.adminCount}
        </p>
      </div>
    </div>
  );
}
