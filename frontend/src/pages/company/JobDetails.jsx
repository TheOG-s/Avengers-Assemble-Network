import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axiosInstance.get(`/job/show/${jobId}`);
        if (response.data.success) {
          setJob(response.data.job);
        } else {
          toast.error("Failed to load job details.");
        }
      } catch (error) {
        toast.error("Error loading job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  // Fetch applicants
  const fetchApplicants = async () => {
    try {
      const response = await axiosInstance.get(`/job/showapplicant/${jobId}`);

      if (response.data.success) {
        setApplicants(response.data.applicants);
      } else {
        toast.error("Failed to load applicants.");
      }
    } catch (error) {
      toast.error("Error loading applicants.");
    }
  };

  // Delete job
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.post(`/job/remove/${jobId}`);
      if (response.data.success) {
        toast.success("Job deleted successfully.");
        navigate("/company/showjobs");
      } else {
        toast.error("Failed to delete job.");
      }
    } catch (error) {
      toast.error("Error deleting job.");
    }
  };

  // Toggle job status
  const handleStatusToggle = async () => {
    try {
      const response = await axiosInstance.post(`/job/changestatus/${jobId}`);
      if (response.data.success) {
        setJob({ ...job, status: response.data.newStatus });
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update job status.");
      }
    } catch (error) {
      toast.error("Error updating job status.");
    }
  };

  if (loading) return <p>Loading job details...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ToastContainer />
      {job ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {job.jobTitle}
          </h1>
          <p className="text-gray-600 mb-2">Company: {job.company}</p>
          <p className="text-gray-600 mb-2">Location: {job.location}</p>
          <p className="text-gray-600 mb-2">Salary: {job.salary}</p>
          <p className="text-gray-600 mb-2">
            Experience Required: {job.experience}
          </p>
          <p className="text-gray-600 mb-2">
            Date Posted: {new Date(job.datePosted).toLocaleDateString()}
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Job Description:
          </h3>
          <p className="text-gray-600 mb-4">{job.description}</p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Skills Required:
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {job.skills.map((skill, index) => (
              <li key={index} className="text-gray-600">
                {skill}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Qualifications:
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {job.qualifications.map((qualification, index) => (
              <li key={index} className="text-gray-600">
                {qualification}
              </li>
            ))}
          </ul>

          {/* Delete and Status Toggle Buttons */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none mr-2"
          >
            Delete Job
          </button>
          <button
            onClick={handleStatusToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {job.status === "active" ? "Mark as Inactive" : "Mark as Active"}
          </button>

          {/* Show Applicants Button */}
          <button
            onClick={() => {
              setShowApplicants(!showApplicants);
              if (!showApplicants) fetchApplicants();
            }}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          >
            {showApplicants ? "Hide Applicants" : "Show All Applicants"}
          </button>

          {/* Applicants List */}
          {showApplicants && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Applicants:
              </h3>
              {applicants.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1">
                  {applicants.map((applicant) => (
                    <li key={applicant._id}>
                      <button
                        onClick={() =>
                          navigate(`/explore/${applicant.username}`)
                        }
                        className="text-blue-500 hover:underline focus:outline-none"
                      >
                        {applicant.name} - {applicant.email}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No applicants for this job yet.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Job not found.</p>
      )}
    </div>
  );
};

export default JobDetails;
