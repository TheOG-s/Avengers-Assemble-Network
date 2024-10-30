import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUser, FaHome, FaUsers, FaBriefcase, FaBell, FaEnvelope } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Avengers-Assemble
        </Link>
        
        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"} 
          >
            <FaHome className="inline mr-1" /> Home
          </NavLink>
          
          <NavLink 
            to="/connections" 
            className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"} 
          >
            <FaUsers className="inline mr-1" /> Connections
          </NavLink>
          
          <NavLink 
            to="/jobs" 
            className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"} 
          >
            <FaBriefcase className="inline mr-1" /> Jobs
          </NavLink>
          
          <NavLink 
            to="/messages" 
            className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"} 
          >
            <FaEnvelope className="inline mr-1" /> Messages
          </NavLink>
          
          <NavLink 
            to="/notifications" 
            className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"} 
          >
            <FaBell className="inline mr-1" /> Notifications
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"} 
          >
            <FaUser className="inline mr-1" /> Profile
          </NavLink>
        </div>
        
        {/* Post Button
        <button className="hidden md:inline-block px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Post
        </button> */}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {/* Toggle button code (for a mobile menu) */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
