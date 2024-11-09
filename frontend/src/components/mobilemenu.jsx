import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaHome,
  FaUsers,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaUser,
  FaEdit,
  FaSignOutAlt,
  FaPen, // Pencil icon for "Create Post"
} from "react-icons/fa";
import axiosInstance from "../../config/axios";

const MobileMenu = ({ handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data || null);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="md:hidden bg-white border-t border-gray-200 py-2">
      <div className="flex-grow max-w-md mx-4 relative mb-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="space-y-1">
        <NavLink
          to="/home"
          className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500"
        >
          <FaHome className="mr-2" /> Home
        </NavLink>
        <NavLink
          to="/connections"
          className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500"
        >
          <FaUsers className="mr-2" /> Connections
        </NavLink>
        <NavLink
          to="/jobs"
          className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500"
        >
          <FaBriefcase className="mr-2" /> Jobs
        </NavLink>

        {user && (
          <NavLink
            to={`/explore/${user.username}`}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500"
          >
            <FaUser className="mr-2" /> Profile
          </NavLink>
        )}

        {user && (
          <>
            <NavLink
              to="/updateprofile"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </NavLink>
            {/* Create Post Link */}
            <NavLink
              to="/createpost"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500"
            >
              <FaPen className="mr-2" /> Create Post
            </NavLink>
            <div
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500 cursor-pointer"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
