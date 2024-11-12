import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../config/axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("name");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();
  const searchRef = useRef(null); // Ref for the search container

  const handleSearch = async (loadMore = false) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { query, field, page, pageSize: 10 },
      });
      setTotalResults(response.data.totalResults);

      if (loadMore) {
        setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
      } else {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    } else {
      setUsers([]); // Clear users if query is empty
    }
  }, [query, field]);

  const handleUserClick = (username) => {
    setUsers([]);
    setQuery("");
    setTotalResults(0); // Clear total results to hide "Load More" button
    setPage(1); // Reset page
    navigate(`/explore/${username}`);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setUsers([]);
        setQuery("");
        setTotalResults(0); // Clear total results to hide "Load More" button
        setPage(1); // Reset page
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="flex-grow max-w-md mx-4 relative hidden md:block"
    >
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter search term..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={field}
          onChange={(e) => setField(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="skills">Skills</option>
          <option value="title">Job Title</option>
          <option value="location">Location</option>
        </select>
        <button
          onClick={() => handleSearch()}
          className="px-4 py-2 bg-blue-900 text-white rounded-md"
        >
          Search
        </button>
      </div>

      {users.length > 0 && (
        <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto z-10">
          {users.map((user) => (
            <div
              key={user.username}
              onClick={() => handleUserClick(user.username)} // Navigate to user profile on click
              className="p-4 hover:bg-gray-100 cursor-pointer"
            >
              <h4 className="font-bold">{user.name}</h4>
              <p className="text-sm">Skills: {user.skills.join(", ")}</p>
              <p className="text-sm">Title: {user.title}</p>
              <p className="text-sm">Location: {user.location}</p>
            </div>
          ))}
        </div>
      )}

      {totalResults > users.length && (
        <button
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
            handleSearch(true);
          }}
          className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-md"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchBar;
