import React from "react";
import { FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const JobDetailsPage = () => {
  // Demo job data
  const job = {
    title: "Senior Frontend Developer",
    location: "Remote, India",
    company: "Tech Innovations Inc.",
    description: `We are looking for a skilled Frontend Developer to join our team. You will be working closely with our engineering team to develop and enhance user-facing features.
    Your role will involve implementing design, ensuring UI consistency, and collaborating with backend developers for a seamless experience.
    If you are passionate about coding, design, and collaboration, apply now!`,
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Job Title */}
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          {job.title}
        </h1>

        {/* Location and Company */}
        <div className="flex items-center text-gray-600 mb-8">
          <div className="flex items-center mr-6">
            <FaMapMarkerAlt className="mr-2 text-blue-600" />
            <p className="text-lg">{job.location}</p>
          </div>
          <div className="flex items-center">
            <FaBuilding className="mr-2 text-blue-600" />
            <p>{job.company}</p>
          </div>
        </div>

        {/* About the Job */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About the Job
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Apply Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105 focus:outline-none">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
