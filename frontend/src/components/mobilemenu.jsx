// MobileMenu.js
import React from "react";
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
} from "react-icons/fa";

const MobileMenu = ({ isOwner, handleLogout }) => (
  <div className="md:hidden bg-white border-t border-gray-200">
    <div className="flex-grow max-w-md mx-4 relative mt-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
    <NavLink
      to="/home"
      className="block px-4 py-2 text-gray-600 hover:text-blue-500"
    >
      <FaHome className="inline mr-1" /> Home
    </NavLink>
    <NavLink
      to="/connections"
      className="block px-4 py-2 text-gray-600 hover:text-blue-500"
    >
      <FaUsers className="inline mr-1" /> Connections
    </NavLink>
    <NavLink
      to="/jobs"
      className="block px-4 py-2 text-gray-600 hover:text-blue-500"
    >
      <FaBriefcase className="inline mr-1" /> Jobs
    </NavLink>
    <NavLink
      to="/messages"
      className="block px-4 py-2 text-gray-600 hover:text-blue-500"
    >
      <FaEnvelope className="inline mr-1" /> Messages
    </NavLink>
    <NavLink
      to="/notifications"
      className="block px-4 py-2 text-gray-600 hover:text-blue-500"
    >
      <FaBell className="inline mr-1" /> Notifications
    </NavLink>
    <NavLink
      to="/profile"
      className="block px-4 py-2 text-gray-600 hover:text-blue-500"
    >
      <FaUser className="inline mr-1" /> Profile
    </NavLink>

    {isOwner && (
      <>
        <NavLink
          to="/updateprofile"
          className="flex items-center block px-4 py-2 text-gray-600 hover:text-blue-500"
        >
          <FaEdit className="mr-1" /> Edit Profile
        </NavLink>
        <div
          onClick={handleLogout}
          className="flex items-center block px-4 py-2 text-gray-600 hover:text-blue-500 cursor-pointer"
        >
          <FaSignOutAlt className="mr-1" /> Logout
        </div>
      </>
    )}
  </div>
);

export default MobileMenu;
