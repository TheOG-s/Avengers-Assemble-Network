import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePicture: '',
    coverPhoto: '',
    skills: '',
    experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
    projects: [{ title: '', startDate: '', endDate: '', description: '' }],
    education: [{ instituteName: '', fieldOfStudy: '', startYear: '', endYear: '' }],
  });

  // Simulate fetching user data
  useEffect(() => {
    const mockUserData = {
      name: "John Doe",
      bio: "Software Engineer with a passion for building impactful projects.",
      profilePicture: "https://via.placeholder.com/150",
      coverPhoto: "https://via.placeholder.com/800x200",
      skills: ["JavaScript", "React", "Node.js"],
      experience: [
        {
          title: "Frontend Developer",
          company: "Tech Corp",
          startDate: "Jan 2021",
          endDate: "Present",
          description: "Developing and maintaining the front end of the main product."
        }
      ],
      projects: [
        {
          title: "Portfolio Website",
          startDate: "Apr 2021",
          endDate: "May 2021",
          description: "Personal website showcasing my projects and blogs."
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

    setFormData({
      name: mockUserData.name,
      bio: mockUserData.bio,
      profilePicture: mockUserData.profilePicture,
      coverPhoto: mockUserData.coverPhoto,
      skills: mockUserData.skills.join(', '),
      experience: mockUserData.experience,
      projects: mockUserData.projects,
      education: mockUserData.education,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, section, index) => {
    const { name, value } = e.target;
    const updatedArray = formData[section].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      [section]: updatedArray,
    }));
  };

  const addNewEntry = (section) => {
    const newEntry = section === 'experience'
      ? { title: '', company: '', startDate: '', endDate: '', description: '' }
      : section === 'projects'
      ? { title: '', startDate: '', endDate: '', description: '' }
      : { instituteName: '', fieldOfStudy: '', startYear: '', endYear: '' };

    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newEntry],
    }));
  };

  const removeEntry = (section, index) => {
    const updatedArray = formData[section].filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      [section]: updatedArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', formData);
    navigate('/profile'); // Redirect to profile page after updating
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-8">

        {/* Name Field */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Bio Field */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Profile Picture URL Field */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Profile Picture URL</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Cover Photo URL Field */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Cover Photo URL</label>
          <input
            type="text"
            name="coverPhoto"
            value={formData.coverPhoto}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Skills Field */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Experience Section */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-gray-100">
              <input
                type="text"
                name="title"
                value={exp.title}
                onChange={(e) => handleArrayChange(e, 'experience', index)}
                placeholder="Job Title"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleArrayChange(e, 'experience', index)}
                placeholder="Company"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleArrayChange(e, 'experience', index)}
                placeholder="Start Date (e.g., Jan 2021)"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleArrayChange(e, 'experience', index)}
                placeholder="End Date (e.g., Present)"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
              />
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleArrayChange(e, 'experience', index)}
                placeholder="Description"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => removeEntry('experience', index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove Experience
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addNewEntry('experience')}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Add Experience
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-gray-100">
              <input
                type="text"
                name="title"
                value={proj.title}
                onChange={(e) => handleArrayChange(e, 'projects', index)}
                placeholder="Project Title"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="startDate"
                value={proj.startDate}
                onChange={(e) => handleArrayChange(e, 'projects', index)}
                placeholder="Start Date (e.g., Apr 2021)"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="endDate"
                value={proj.endDate}
                onChange={(e) => handleArrayChange(e, 'projects', index)}
                placeholder="End Date (e.g., Present)"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
              />
              <textarea
                name="description"
                value={proj.description}
                onChange={(e) => handleArrayChange(e, 'projects', index)}
                placeholder="Description"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => removeEntry('projects', index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove Project
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addNewEntry('projects')}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* Education Section */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <h3 className="text-xl font-semibold text-gray-800">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-gray-100">
              <input
                type="text"
                name="instituteName"
                value={edu.instituteName}
                onChange={(e) => handleArrayChange(e, 'education', index)}
                placeholder="Institute Name"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="fieldOfStudy"
                value={edu.fieldOfStudy}
                onChange={(e) => handleArrayChange(e, 'education', index)}
                placeholder="Field of Study"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="startYear"
                value={edu.startYear}
                onChange={(e) => handleArrayChange(e, 'education', index)}
                placeholder="Start Year"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="endYear"
                value={edu.endYear}
                onChange={(e) => handleArrayChange(e, 'education', index)}
                placeholder="End Year"
                className="block w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => removeEntry('education', index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove Education
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addNewEntry('education')}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Add Education
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
