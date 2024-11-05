// Logo.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png"
const Logo = () => (
  <div className="flex items-center space-x-2">
    <img src={logo} alt="Logo" className="w-15 h-12" />
    <Link to="/" className="text-2xl font-bold text-blue-600"></Link>
  </div>
);

export default Logo;
