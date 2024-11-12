import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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

const NavLinks = ({ handleLogout }) => {
  const user = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {user && (
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
      )}
      
      {user && (
        <>
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
        </>
      )}

      <div className="relative inline-block">
        <FaUserCircle
          className="text-gray-600 hover:text-blue-500 cursor-pointer text-xl"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            {user ? (
              <>
                <NavLink
                  to={`/explore/${user.username}`}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaUserCircle className="inline mr-1" /> {user.name}
                </NavLink>
                <NavLink
                  to={"/updateprofile"}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaEdit className="inline mr-1" /> Edit Profile
                </NavLink>
                <NavLink
                  to="/createpost"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaPlusCircle className="inline mr-1" /> Create Post
                </NavLink>
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
