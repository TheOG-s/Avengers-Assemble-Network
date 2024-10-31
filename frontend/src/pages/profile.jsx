// import React from 'react'

import React, { useState } from 'react';

const Profile = () => {
  const [skills, setSkills] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [company, setCompany] = useState('');

  const handleAddSkill = (newSkill) => {
    setSkills([...skills, newSkill]);
  };

  const handleAddQualification = (newQualification) => {
    setQualifications([...qualifications, newQualification]);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg max-w-2xl">
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src="https://via.placeholder.com/100" 
          alt="User Photo" 
          className="w-24 h-24 rounded-full border-2 border-blue-600"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">User Name</h1>
          <p className="text-gray-600">College Name</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600">Skills</h2>
        <div className="mt-2">
          {skills.length > 0 ? (
            <ul className="list-disc ml-4">
              {skills.map((skill, index) => (
                <li key={index} className="text-gray-700">{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No skills added yet.</p>
          )}
          <input 
            type="text" 
            placeholder="Add a skill" 
            className="mt-2 p-2 border border-gray-300 rounded w-full" 
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e.target.value)}
          />
        </div>
      </div>

      {/* Qualifications Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600">Qualifications</h2>
        <div className="mt-2">
          {qualifications.length > 0 ? (
            <ul className="list-disc ml-4">
              {qualifications.map((qual, index) => (
                <li key={index} className="text-gray-700">{qual}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No qualifications added yet.</p>
          )}
          <input 
            type="text" 
            placeholder="Add a qualification" 
            className="mt-2 p-2 border border-gray-300 rounded w-full" 
            onKeyDown={(e) => e.key === 'Enter' && handleAddQualification(e.target.value)}
          />
        </div>
      </div>

      {/* Company Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600">Current Company</h2>
        {company ? (
          <p className="text-gray-700">{company}</p>
        ) : (
          <p className="text-gray-500">Not employed yet.</p>
        )}
        <input 
          type="text" 
          placeholder="Enter company name" 
          className="mt-2 p-2 border border-gray-300 rounded w-full" 
          onKeyDown={(e) => e.key === 'Enter' && setCompany(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Profile;

