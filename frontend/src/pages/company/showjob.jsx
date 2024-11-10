import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get("/company/showAll");
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

  // Function to delete a job
  const deleteJob = async (jobId) => {
    try {
      const response = await axiosInstance.delete(`/company/jobs/${jobId}`);
      if (response.data.success) {
        toast.success("Job deleted successfully.");
        // Remove the deleted job from the state
        setJobs(jobs.filter((job) => job._id !== jobId));
      } else {
        toast.error("Failed to delete job.");
      }
    } catch (error) {
      toast.error("Error deleting job. Please try again later.");
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
            <div key={job._id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                {job.jobTitle}
              </h2>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-gray-500 mt-2">Location: {job.location}</p>
              <p className="text-gray-500 mt-2">Salary: {job.salary}</p>
              <p className="text-gray-500 mt-2">
                Posted on: {new Date(job.datePosted).toLocaleDateString()}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => deleteJob(job._id)}
                className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
