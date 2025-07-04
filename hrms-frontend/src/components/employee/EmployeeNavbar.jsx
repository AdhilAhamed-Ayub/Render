import { useEffect, useState } from "react";

const EmployeeNavbar = () => {
  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const [email, setEmail] = useState("");
  const User = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setEmail(User.email);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Employee Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{email}</span>
        <button
          onClick={Logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
