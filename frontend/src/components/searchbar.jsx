// SearchBar.js
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => (
  <div className="flex-grow max-w-md mx-4 relative hidden md:block">
    <input
      type="text"
      placeholder="Search"
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    />
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
  </div>
);

export default SearchBar;
