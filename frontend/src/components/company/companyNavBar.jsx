import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaClipboardList,
  FaPlusSquare,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import axiosInstance from "../../../config/axios.js";
import logo from "../../assests/logo.png"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/company/logout");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center text-white">
          <Link>
            <img src={logo} alt="Company Logo" className="h-8 w-auto mr-2" />{" "}
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

          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-gray-300">
              <FaSignOutAlt className="inline mr-1" /> Logout
            </button>
          ) : (
            <Link to="/company/login" className="hover:text-gray-300">
              <FaSignInAlt className="inline mr-1" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
