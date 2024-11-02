import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Demo data for the user
  const user = {
    name: "John Doe",
    bio: "Software Engineer with a passion for building impactful projects.",
    profilePicture: "https://via.placeholder.com/150", // Use a placeholder image for now
    coverPhoto: "https://via.placeholder.com/800x200", // Use a placeholder image for now
    isOwner: true, // Toggle this to false to hide the Edit Profile button
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    experience: [
      {
        title: "Frontend Developer",
        company: "Tech Corp",
        startDate: "Jan 2021",
        endDate: "Present",
        description: "Developing and maintaining the front end of the main product."
      },
      {
        title: "Software Intern",
        company: "Startup Inc",
        startDate: "Jun 2020",
        endDate: "Dec 2020",
        description: "Assisted in developing a cross-platform mobile app."
      }
    ],
    projects: [
      {
        title: "Portfolio Website",
        startDate: "Apr 2021",
        endDate: "May 2021",
        description: "Personal website showcasing my projects and blogs."
      },
      {
        title: "Task Manager App",
        startDate: "Jan 2020",
        endDate: "Mar 2020",
        description: "Built a task management app for tracking daily activities."
      }
    ],
    education: [
      {
        instituteName: "ABC University",
        fieldOfStudy: "Computer Science",
        startYear: 2017,
        endYear: 2021
      }
    ]
  };

  const handleEditProfile = () => {
    navigate('/updateprofile');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Cover Photo */}
      <div className="relative">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Profile Picture */}
        <div className="absolute left-4 bottom-[-48px] w-24 h-24 rounded-full border-4 border-white overflow-hidden">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Edit Button for Profile Owner */}
        {user.isOwner && (
          <button
            onClick={handleEditProfile}
            className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600 mt-2">{user.bio}</p>
      </div>

      {/* Skills */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {user.skills.map((skill, index) => (
            <li key={index} className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Experience */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
        {user.experience.map((exp, index) => (
          <div key={index} className="mt-4">
            <h4 className="text-lg font-semibold">{exp.title} at {exp.company}</h4>
            <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-600 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Projects */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
        {user.projects.map((project, index) => (
          <div key={index} className="mt-4">
            <h4 className="text-lg font-semibold">{project.title}</h4>
            <p className="text-gray-500">{project.startDate} - {project.endDate}</p>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
        ))}
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Education */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Education</h3>
        {user.education.map((edu, index) => (
          <div key={index} className="mt-4">
            <h4 className="text-lg font-semibold">{edu.instituteName}</h4>
            <p className="text-gray-500">{edu.fieldOfStudy} ({edu.startYear} - {edu.endYear})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
