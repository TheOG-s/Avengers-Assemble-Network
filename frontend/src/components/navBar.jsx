import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUser, FaHome, FaUsers, FaBriefcase, FaBell, FaEnvelope, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
// Import the logo image
import logo from "../assests/logo.png";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Avengers-Assemble
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="flex-grow max-w-md mx-4 relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        
        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/home" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}>
            <FaHome className="inline mr-1" /> Home
          </NavLink>
          <NavLink to="/connections" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}>
            <FaUsers className="inline mr-1" /> Connections
          </NavLink>
          <NavLink to="/jobs" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}>
            <FaBriefcase className="inline mr-1" /> Jobs
          </NavLink>
          <NavLink to="/messages" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}>
            <FaEnvelope className="inline mr-1" /> Messages
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}>
            <FaBell className="inline mr-1" /> Notifications
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}>
            <FaUser className="inline mr-1" /> Profile
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes className="text-2xl text-gray-600" /> : <FaBars className="text-2xl text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex-grow max-w-md mx-4 relative mt-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <NavLink to="/home" className="block px-4 py-2 text-gray-600 hover:text-blue-500">
            <FaHome className="inline mr-1" /> Home
          </NavLink>
          <NavLink to="/connections" className="block px-4 py-2 text-gray-600 hover:text-blue-500">
            <FaUsers className="inline mr-1" /> Connections
          </NavLink>
          <NavLink to="/jobs" className="block px-4 py-2 text-gray-600 hover:text-blue-500">
            <FaBriefcase className="inline mr-1" /> Jobs
          </NavLink>
          <NavLink to="/messages" className="block px-4 py-2 text-gray-600 hover:text-blue-500">
            <FaEnvelope className="inline mr-1" /> Messages
          </NavLink>
          <NavLink to="/notifications" className="block px-4 py-2 text-gray-600 hover:text-blue-500">
            <FaBell className="inline mr-1" /> Notifications
          </NavLink>
          <NavLink to="/profile" className="block px-4 py-2 text-gray-600 hover:text-blue-500">
            <FaUser className="inline mr-1" /> Profile
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
