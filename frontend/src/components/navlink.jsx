import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBriefcase,
  FaUser,
  FaEdit,
  FaSignOutAlt,
  FaSignInAlt, // Importing the Login icon
} from "react-icons/fa";

const NavLinks = ({ isOwner , isLoggedIn, handleLogout }) => (
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
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        isActive
          ? "text-blue-600 font-medium"
          : "text-gray-600 hover:text-blue-500"
      }
    >
      <FaUser className="inline mr-1" /> Profile
    </NavLink>

    {/* Show Edit Profile and Logout if the user is an owner and logged in */}
    {isOwner  && (
      <>
        <NavLink
          to="/updateprofile"
          className="flex items-center text-gray-600 hover:text-blue-500 font-medium ml-4"
        >
          <FaEdit className="mr-1" /> Edit Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-blue-500 font-medium ml-4"
        >
          <FaSignOutAlt className="mr-1" /> Logout
        </button>
      </>
    )}

    {/* Show only the Logout button if the user is logged in but not the owner
    { isLoggedIn && (
      <button
        onClick={handleLogout}
        className="flex items-center text-gray-600 hover:text-blue-500 font-medium ml-4"
      >
        <FaSignOutAlt className="mr-1" /> Logout
      </button>
    )} */}

    {/* Show Login only if the user is not logged in */}
    {!isLoggedIn && (
      <NavLink
        to="/login"
        className="flex items-center text-gray-600 hover:text-blue-500 font-medium ml-4"
      >
        <FaSignInAlt className="mr-1" /> Login
      </NavLink>
    )}
  </>
);

export default NavLinks;
