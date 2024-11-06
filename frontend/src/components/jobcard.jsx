import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ image, title, company, location, salary, jobId }) => {
  return (
    <Link to="/showjob" className="block hover:bg-gray-100 transition">
      <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex items-center space-x-4">
        
        {/* Company Logo */}
        <img 
          src={image} 
          alt="Company Logo" 
          className="w-12 h-12 object-contain"
        />
        
        {/* Job Details */}
        <div>
          <h2 className="text-blue-600 font-semibold">{title}</h2>
          <p className="text-gray-700">{company}</p>
          <p className="text-gray-500">{location}</p>
          <p className="text-gray-700 font-medium">{salary}</p>
        </div>
        
      </div>
    </Link>
  );
};

const JobCardGrid = () => {
  return (
    <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <JobCard 
        image="https://via.placeholder.com/50" 
        title="SQL Developer" 
        company="Sureminds Solutions Private Limited"
        location="India (Remote)"
        salary="₹1.8M/yr - ₹2M/yr"
        jobId="sql-developer"
      />
      <JobCard 
        image="https://via.placeholder.com/50" 
        title="Frontend Developer" 
        company="Tech Solutions Ltd."
        location="Bangalore, India"
        salary="₹1.2M/yr - ₹1.5M/yr"
        jobId="frontend-developer"
      />
      <JobCard 
        image="https://via.placeholder.com/50" 
        title="Backend Developer" 
        company="Innovatech Global"
        location="Mumbai, India"
        salary="₹1.5M/yr - ₹1.8M/yr"
        jobId="backend-developer"
      />
    </div>
  );
};

export default JobCardGrid;
