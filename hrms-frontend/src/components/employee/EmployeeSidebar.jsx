import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiBell,
  FiMenu,
  FiChevronLeft,
  FiUserPlus,
  FiUserX,
  FiCalendar,
} from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
export default function EmployeeSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-gray-900 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center">
        <h2
          className={`text-xl font-bold transition-all ${
            isOpen ? "block" : "hidden"
          }`}
        >
          HRMS Employee{" "}
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          {isOpen ? <FiChevronLeft size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-6">
        <ul className="space-y-4">
          <SidebarItem
            to="/EmployeeDashboard"
            icon={<FiHome size={24} />}
            text="Dashboard"
            isOpen={isOpen}
          />
          {/* <SidebarItem
            to="Attendance"
            icon={<FiUser size={24} />}
            text="Attendance"
            isOpen={isOpen}
          />
          <SidebarItem
            to="Reports"
            icon={<FiUserPlus size={24} />}
            text="Reports"
            isOpen={isOpen}
          /> */}
          <SidebarItem
            to="CalendarPage"
            icon={<FiCalendar size={24} />}
            text="Calendar"
            isOpen={isOpen}
          />
          <SidebarItem
            to="EmployeeAttendanceCalendar"
            icon={<FiBell size={24} />}
            text="Check Logs"
            isOpen={isOpen}
          />
        </ul>
      </nav>
    </div>
  );
}

function SidebarItem({ to, icon, text, isOpen }) {
  return (
    <li className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-all">
      <Link to={to} className="flex items-center w-full">
        {icon}
        <span
          className={`ml-3 transition-all duration-200 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}
