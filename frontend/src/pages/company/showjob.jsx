import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../config/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const company = await axiosInstance.get("/company/profile");
      // console.log(company.data);
      const response = await axiosInstance.get(
        `/job/showall/${company.data._id}`
      );
      // console.log(response);
      if (response.data.success) {
        setJobs(response.data.jobs);
      } else {
        toast.error("Failed to load jobs.");
      }
    } catch (error) {
      toast.error("Error loading jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Your Job Posts
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link
              to={`/company/${job._id}`}
              key={job._id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {job.jobTitle}
              </h2>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-gray-500 mt-2">Location: {job.location}</p>
              <p className="text-gray-500 mt-2">Salary: {job.salary}</p>
              <p className="text-gray-500 mt-2">
                Posted on: {new Date(job.datePosted).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
