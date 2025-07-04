import { useEffect, useState } from "react";

const Navbar = () => {
  const [email, setEmail] = useState("");

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setEmail(User.email);
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-3 flex justify-between items-center">
      {/* Left Side */}
      <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-gray-700 text-sm sm:text-base hidden sm:block">
          {email}
        </span>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium sm:hidden">
          {email.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={Logout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
