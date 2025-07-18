import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FiUser, FiMail, FiBriefcase } from "react-icons/fi";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; // Adjust the base URL as needed
const API_URL = `${BASE_URL}/api/auth`;
const ProfileCard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.email) {
        setError("User email is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/profile/${user.email}`, {
          headers: { "Content-Type": "application/json" },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Profile</h2>
      </div>

      {error && (
        <div className="px-6 py-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="px-6 py-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      ) : profile ? (
        <div className="p-6 space-y-4">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FiUser className="text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-800">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FiMail className="text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FiBriefcase className="text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800">{profile.role}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 py-4">
          <p className="text-gray-500">No profile information available.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
