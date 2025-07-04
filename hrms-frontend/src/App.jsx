import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/Employeepage/EmployeeDashboard";
import Attendance from "./pages/Employeepage/Attendance";
import Reports from "./pages/Employeepage/Reports";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeList from "./pages/EmployeeList";
import AddUser from "./pages/AddUser";
import CalendarPage from "./pages/CalendarPage";
import "./App.css";
import ManageUsers from "./pages/ManageUser";
import EditUser from "./pages/EditUser";
import AdminAttendance from "./pages/Attendance";
import EmployeeAttendanceCalendar from "./components/EmployeeAttendanceCalendar";
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Login Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes (Under Admin Layout) */}
        <Route path="/AdminDashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="EmployeeList" element={<EmployeeList />} />
          <Route path="AddUser" element={<AddUser />} />{" "}
          <Route path="ManageUsers" element={<ManageUsers />} />
          <Route path="EditUser/:email" element={<EditUser />} />
          <Route path="Attendance" element={<AdminAttendance />} />
          {/* New Add User Page */}
        </Route>
        {/* Employee Routes (Under Employee Layout) */}
        <Route path="/EmployeeDashboard" element={<EmployeeLayout />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="Attendance" element={<Attendance />} />
          <Route path="Reports" element={<Reports />} />{" "}
          <Route path="CalendarPage" element={<CalendarPage />} />
          <Route
            path="EmployeeAttendanceCalendar"
            element={<EmployeeAttendanceCalendar />}
          />
          {/* New Add User Page */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
