import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";

const Logo = () => (
  <Link to="/home" className="flex items-center space-x-2">
    <img src={logo} alt="Logo" className="w-15 h-12" />
  
  </Link>
);

export default Logo;
