import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBriefcase,
  FaUserCircle,
  FaEdit,
  FaSignOutAlt,
  FaSignInAlt,
  FaPlusCircle,
} from "react-icons/fa";
import axiosInstance from "../../config/axios";

const NavLinks = ({ handleLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null); // Set null if no user data is found
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        setUser(null); // Set null in case of error
      } finally {
        setLoading(false); // Stop loading once the request finishes
      }
    };
    fetchUser();
  }, []); 

  if (loading) return null; 

  return (
    <>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-medium"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        <FaHome className="inline mr-1" /> Home
      </NavLink>
      <NavLink
        to="/connections"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-medium"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        <FaUsers className="inline mr-1" /> Connections
      </NavLink>
      <NavLink
        to="/jobs"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-medium"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        <FaBriefcase className="inline mr-1" /> Jobs
      </NavLink>

   
      <div className="relative inline-block">
        <FaUserCircle
          className="text-gray-600 hover:text-blue-500 cursor-pointer text-xl"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            {user ? (
              <>
                {/* Profile Link */}
                <NavLink
                  to={`/explore/${user.username}`}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaUserCircle className="inline mr-1" /> Profile
                </NavLink>
                {/* Edit Profile */}
                <NavLink
                  to={`/updateprofile/${user.username}`}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaEdit className="inline mr-1" /> Edit Profile
                </NavLink>
                {/* Create Post */}
                <NavLink
                  to="/createpost"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaPlusCircle className="inline mr-1" /> Create Post
                </NavLink>
                {/* Logout Button */}
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-blue-500"
                >
                  <FaSignOutAlt className="inline mr-1" /> Logout
                </button>
              </>
            ) : (
              
              <NavLink
                to="/login"
                className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                onClick={() => setDropdownOpen(false)}
              >
                <FaSignInAlt className="inline mr-1" /> Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NavLinks;
