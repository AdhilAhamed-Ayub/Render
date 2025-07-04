import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserFromStorage);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Update user state if localStorage changes
  useEffect(() => {
    const storedUser = getUserFromStorage();
    setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login API Response:", res.data); // Debugging

      if (!res.data.role || !res.data.emp_id) {
        throw new Error("Invalid response from server");
      }

      const { role, emp_id } = res.data;

      // ✅ Store email, role, and emp_id in localStorage
      const userData = { email, role, emp_id };
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      // ✅ Navigate based on role
      if (role === "admin") {
        navigate("/AdminDashboard");
      } else if (role === "employee") {
        navigate("/EmployeeDashboard");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
