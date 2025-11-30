import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Trying to login with:", email, password);
    login(email, password);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center bg-gray-100 p-10">
        <h1 className="text-4xl font-bold text-blue-800">HRMS</h1>
        <p className="mt-2 text-lg text-gray-600">
          Build digital products with ease
        </p>
        <p className="mt-1 text-gray-500">
          Manage your tasks, projects, and employees effortlessly.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign in
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Free access to our dashboard.
          </p>

          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between text-sm text-blue-600">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
