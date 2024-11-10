import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaClipboardList,
  FaPlusSquare,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center text-white">
          <Link to="/company/home" className="text-2xl font-bold">
            MyCompany
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full p-2 rounded-l-md border-none focus:outline-none"
          />
          <button className="p-2 bg-blue-500 rounded-r-md text-white hover:bg-blue-700">
            <FaSearch />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-white">
          <Link
            to="/company/showjobs"
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <FaClipboardList />
            <span>Show All Jobs</span>
          </Link>
          <Link
            to="/company/postjob"
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <FaPlusSquare />
            <span>Post Job</span>
          </Link>
          <Link
            to="/company/updateprofile"
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <FaUserCircle />
            <span>Update Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
