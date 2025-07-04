import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiUser,
  FiUserPlus,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Check if viewport is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      {/* Sidebar container with proper z-index */}
      <div
        className={`fixed h-screen bg-blue-600 text-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } shadow-xl flex flex-col z-20`}
      >
        {/* Sidebar Header - Removed the toggle button from here */}
        <div className="p-5 flex items-center justify-center border-b border-blue-500/30">
          <div className="flex items-center">
            {isOpen ? (
              <h2 className="text-xl font-bold transition-all duration-300">
                HRMS
              </h2>
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
                <span className="font-bold text-lg">HR</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-6 px-2 flex-grow">
          <ul className="space-y-2">
            <SidebarItem
              to="/AdminDashboard"
              icon={<FiHome size={20} />}
              text="Dashboard"
              isOpen={isOpen}
            />
            <SidebarItem
              to="EmployeeList"
              icon={<FiUsers size={20} />}
              text="Employees"
              isOpen={isOpen}
            />
            <SidebarItem
              to="AddUser"
              icon={<FiUserPlus size={20} />}
              text="Add User"
              isOpen={isOpen}
            />
            <SidebarItem
              to="ManageUsers"
              icon={<FiUser size={20} />}
              text="Manage Users"
              isOpen={isOpen}
            />
            <SidebarItem
              to="Attendance"
              icon={<FiCalendar size={20} />}
              text="Attendance"
              isOpen={isOpen}
            />
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto border-t border-blue-500/30">
          <Link
            to="/logout"
            className={`flex items-center p-4 w-full hover:bg-blue-500/20 transition-colors ${
              isOpen ? "" : "justify-center"
            }`}
          >
            <FiLogOut size={20} className="text-blue-200" />
            {isOpen && <span className="ml-3 font-medium">Logout</span>}
          </Link>
        </div>
      </div>

      {/* Toggle button positioned at the edge of the sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-30 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none ${
          isOpen
            ? "left-64 top-1/2 -translate-y-1/2 -translate-x-1/2"
            : "left-16 top-1/2 -translate-y-1/2 -translate-x-1/2"
        }`}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Add a spacer div to prevent content from being hidden behind the sidebar */}
      <div
        className={`${isOpen ? "ml-64" : "ml-16"} transition-all duration-300`}
      >
        {/* Main content will go here */}
      </div>
    </>
  );
}

function SidebarItem({ to, icon, text, isOpen }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-3 rounded-lg hover:bg-blue-500/30 group transition-all duration-200 relative ${
          !isOpen ? "justify-center" : ""
        }`}
      >
        <div className="text-blue-100 group-hover:text-white transition-colors">
          {icon}
        </div>
        {isOpen && (
          <span className="ml-3 text-blue-50 group-hover:text-white font-medium transition-all">
            {text}
          </span>
        )}
        {!isOpen && (
          <div className="absolute left-14 bg-blue-700 text-white px-3 py-2 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-sm shadow-lg whitespace-nowrap">
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}
