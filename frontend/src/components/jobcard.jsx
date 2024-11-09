import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobCard = ({ image, title, company, location, salary }) => {
  return (
    <Link to="/showjob" className="block hover:bg-gray-100 transition">
      <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 w-64 h-56 flex items-start space-x-4 overflow-hidden">
        {/* Company Logo */}
        <img
          src={image}
          alt="Company Logo"
          className="w-14 h-14 object-contain"
        />

        {/* Job Details */}
        <div className="flex-1 overflow-hidden">
          <h2 className="text-blue-600 font-semibold truncate">{title}</h2>
          <p className="text-gray-700 truncate">{company}</p>
          <p className="text-gray-500 truncate">{location}</p>
          <p className="text-gray-700 font-medium truncate">{salary}</p>
        </div>
      </div>
    </Link>
  );
};

const JobCardGrid = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the backend
    axios
      .get("user/showAll")
      .then((response) => {
        setJobs(response.data); // assuming response.data is an array of jobs
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id} // assuming each job has a unique id
          image={job.image || "https://via.placeholder.com/50"} // Fallback to placeholder if image is not provided
          title={job.title}
          company={job.company}
          location={job.location}
          salary={job.salary}
        />
      ))}
    </div>
  );
};

export default JobCardGrid;
