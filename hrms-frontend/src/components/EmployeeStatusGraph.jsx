import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const UserStatusGraph = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/auth/users");
        setUserData(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate active and inactive users
  const activeUsers = userData.filter(
    (user) => user.status === "active"
  ).length;
  const inactiveUsers = userData.filter(
    (user) => user.status === "inactive"
  ).length;

  const statusData = [
    { name: "Active", value: activeUsers, color: "#4ADE80" },
    { name: "Inactive", value: inactiveUsers, color: "#F87171" },
  ];

  // Function to calculate percentage
  const getPercentage = (value) => {
    const total = activeUsers + inactiveUsers;
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
          <p className="text-sm font-medium">{payload[0].name} Users</p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{payload[0].value}</span> users (
            {getPercentage(payload[0].value)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Legend
  const renderCustomLegend = () => {
    return (
      <div className="grid grid-cols-2 gap-4 mt-6">
        {statusData.map((status) => (
          <div
            key={status.name}
            className={`p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
              status.name === "Active" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center mb-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: status.color }}
              ></div>
              <span
                className={`font-medium ${
                  status.name === "Active" ? "text-green-700" : "text-red-700"
                }`}
              >
                {status.name}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{status.value}</span>
              <span className="text-gray-500 ml-2 text-sm">
                ({getPercentage(status.value)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-full">
      <h2 className="text-lg font-bold mb-4">User Status Distribution</h2>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-500">Loading user data...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center py-8 text-red-500">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      ) : userData.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center py-8 text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="mt-2">No user data available</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {renderCustomLegend()}
        </div>
      )}
    </div>
  );
};

export default UserStatusGraph;
