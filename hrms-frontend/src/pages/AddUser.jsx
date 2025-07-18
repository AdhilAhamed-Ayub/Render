import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; // Adjust the base URL as needed
const API_URL = `${BASE_URL}/api/auth`;
const AddUser = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    phone: "",
    userImage: "",
    address: { street: "", city: "", state: "", zip: "" },
    status: "active",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setUserData({
        ...userData,
        address: { ...userData.address, [field]: value },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure only admins can add users
    if (!user || user.role !== "admin") {
      setError("Unauthorized: Only admins can add users.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/users`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      // Show success message
      setError("");
      alert("User added successfully!");
      navigate("/AdminDashboard");
    } catch (error) {
      setLoading(false);
      console.error("Error adding user:", error);
      setError(
        error.response?.data?.message || "Failed to add user. Please try again."
      );
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 py-6 px-8">
          <h2 className="text-2xl font-bold text-white">Add New User</h2>
          <p className="text-blue-100 mt-1">
            Fill in the details to create a new user account
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1">
          <div
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mt-4 mb-6">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`w-16 h-1 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-8 mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={userData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="userImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Image URL
                </label>
                <input
                  id="userImage"
                  type="text"
                  name="userImage"
                  placeholder="Enter profile image URL"
                  value={userData.userImage}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    User Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={userData.status}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
                >
                  Next: Address Information
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Address Information
              </h3>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address
                  </label>
                  <input
                    id="street"
                    type="text"
                    name="address.street"
                    placeholder="Enter street address"
                    value={userData.address.street}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="address.city"
                    placeholder="Enter city"
                    value={userData.address.city}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="address.state"
                    placeholder="Enter state"
                    value={userData.address.state}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ZIP Code
                </label>
                <input
                  id="zip"
                  type="text"
                  name="address.zip"
                  placeholder="Enter ZIP code"
                  value={userData.address.zip}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex items-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Create User"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
