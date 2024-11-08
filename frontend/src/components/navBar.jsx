
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./logo.jsx";
import SearchBar from "./searchbar.jsx";
import NavLinks from "./navlink.jsx";
import MobileMenu from "./mobilemenu.jsx";

const NavBar = ({ isOwner }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Logo />
        <SearchBar />

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLinks isOwner={isOwner} handleLogout={handleLogout} />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl text-gray-600" />
            ) : (
              <FaBars className="text-2xl text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <MobileMenu isOwner={isOwner} handleLogout={handleLogout} />
      )}
    </nav>
  );
};

export default NavBar;
