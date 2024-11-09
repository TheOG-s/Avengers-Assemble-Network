
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.js";
import UsersPost from "../components/userposts.jsx";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get(`/explore/${username}`);
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user profile.");
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);



  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && <p className="text-red-600">{error}</p>}

      {/* Cover and Profile Image */}
      <div className="relative">
        <img
          src={user.coverPhoto || "https://via.placeholder.com/640x256"}
          alt="Cover"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute left-4 -bottom-12 w-24 h-24 sm:w-20 sm:h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
          <img
            src={user.profilePicture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600 mt-2">{user.bio || "No bio available"}</p>
      </div>

      {/* Skills */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <li
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-gray-700"
              >
                {skill}
              </li>
            ))
          ) : (
            <li className="text-gray-600 px-3 py-1 rounded-full bg-gray-200">
              No skills listed.
            </li>
          )}
        </ul>
      </div>

      {/* Experience */}
      <hr className="my-8 border-gray-300" />
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
        {user.experience && user.experience.length > 0 ? (
          user.experience.map((exp, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-semibold">
                {exp.title} at {exp.company}
              </h4>
              <p className="text-gray-500">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
              <p className="text-gray-600 mt-1">{exp.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No experience listed.</p>
        )}
      </div>

      {/* Projects */}
      <hr className="my-8 border-gray-300" />
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
        {user.projects && user.projects.length > 0 ? (
          user.projects.map((project, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="text-gray-500">
                {project.startDate} - {project.endDate || "Ongoing"}
              </p>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No projects listed.</p>
        )}
      </div>

      {/* Education */}
      <hr className="my-8 border-gray-300" />
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800">Education</h3>
        {user.education && user.education.length > 0 ? (
          user.education.map((edu, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-semibold">{edu.instituteName}</h4>
              <p className="text-gray-500">
                {edu.fieldOfStudy} ({edu.startYear} - {edu.endYear || "Present"}
                )
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No education listed.</p>
        )}
      </div>

      {/* User's Posts Section */}
      <hr className="my-8 border-gray-300" />
      <UsersPost username={username} />
    </div>
  );
};

export default ProfilePage;
