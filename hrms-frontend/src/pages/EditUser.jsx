import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ManageUsers from "./ManageUser";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; // Adjust the base URL as needed
const API_URL = `${BASE_URL}/api/auth`;
const EditUser = () => {
  const { user } = useContext(AuthContext);
  const { email } = useParams(); // Get email from URL params
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    role: "employee",
    userImage: "",
    address: { street: "", city: "", state: "", zip: "" },
    status: "active",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchUserDetails();
  }, [user, email]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/email/${email}`);
      setUserData(res.data);
    } catch (error) {
      setError("Failed to fetch user details");
    }
  };

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
    try {
      await axios.put(`${API_URL}/users/email/${email}`, userData);
      alert("User updated successfully!");
      navigate("/AdminDashboard/ManageUsers");
    } catch (error) {
      setError("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Edit User
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <input
            type="text"
            name="userImage"
            placeholder="Profile Image URL"
            value={userData.userImage}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>

            <select
              name="status"
              value={userData.status}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mt-4">Address</h3>
          <input
            type="text"
            name="address.street"
            placeholder="Street"
            value={userData.address.street}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="text"
            name="address.city"
            placeholder="City"
            value={userData.address.city}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="text"
            name="address.state"
            placeholder="State"
            value={userData.address.state}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="text"
            name="address.zip"
            placeholder="ZIP Code"
            value={userData.address.zip}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
