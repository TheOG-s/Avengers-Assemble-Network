import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePicture: "",
    coverPhoto: "",
    skills: "",
    experience: [
      { title: "", company: "", startDate: "", endDate: "", description: "" },
    ],
    projects: [{ title: "", startDate: "", endDate: "", description: "" }],
    education: [
      { instituteName: "", fieldOfStudy: "", startYear: "", endYear: "" },
    ],
  });

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
          description:
            "Developing and maintaining the front end of the main product.",
        },
      ],
      projects: [
        {
          title: "Portfolio Website",
          startDate: "Apr 2021",
          endDate: "May 2021",
          description: "Personal website showcasing my projects and blogs.",
        },
      ],
      education: [
        {
          instituteName: "ABC University",
          fieldOfStudy: "Computer Science",
          startYear: 2017,
          endYear: 2021,
        },
      ],
    };

    setFormData({
      name: mockUserData.name,
      bio: mockUserData.bio,
      profilePicture: mockUserData.profilePicture,
      coverPhoto: mockUserData.coverPhoto,
      skills: mockUserData.skills.join(", "),
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

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [field]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (e, arrayName, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedArray = [...prevData[arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value,
      };
      return { ...prevData, [arrayName]: updatedArray };
    });
  };

  const removeEntry = (arrayName, index) => {
    setFormData((prevData) => {
      const updatedArray = prevData[arrayName].filter((_, i) => i !== index);
      return { ...prevData, [arrayName]: updatedArray };
    });
  };

  const addNewEntry = (arrayName) => {
    const currentEntries = formData[arrayName];
    const lastEntry = currentEntries[currentEntries.length - 1];

    const isComplete =
      (arrayName === "experience" &&
        lastEntry.title &&
        lastEntry.company &&
        lastEntry.startDate &&
        lastEntry.description) ||
      (arrayName === "projects" &&
        lastEntry.title &&
        lastEntry.startDate &&
        lastEntry.description) ||
      (arrayName === "education" &&
        lastEntry.instituteName &&
        lastEntry.fieldOfStudy &&
        lastEntry.startYear &&
        lastEntry.endYear);

    if (isComplete) {
      const newEntryTemplate =
        arrayName === "experience"
          ? {
              title: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            }
          : arrayName === "projects"
          ? { title: "", startDate: "", endDate: "", description: "" }
          : { instituteName: "", fieldOfStudy: "", startYear: "", endYear: "" };

      setFormData((prevData) => ({
        ...prevData,
        [arrayName]: [...prevData[arrayName], newEntryTemplate],
      }));
    } else {
      alert("Please complete the previous entry before adding a new one.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    navigate("/profile");
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

        {/* Profile Picture Upload */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "profilePicture")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formData.profilePicture && (
            <img
              src={formData.profilePicture}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>

        {/* Cover Photo Upload */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Cover Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "coverPhoto")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formData.coverPhoto && (
            <img
              src={formData.coverPhoto}
              alt="Cover Preview"
              className="mt-2 w-full h-48 object-cover rounded"
            />
          )}
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

        {/* Skills Field */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">
            Skills (comma separated)
          </label>
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
          <label className="block text-gray-700">Experience</label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="endDate"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeEntry("experience", index)}
                  className="text-red-500"
                >
                  Remove Experience
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewEntry("experience")}
            className="mt-2 text-blue-500"
          >
            Add Experience
          </button>
        </div>

        {/* Projects Section */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Projects</label>
          {formData.projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => handleArrayChange(e, "projects", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={proj.startDate}
                onChange={(e) => handleArrayChange(e, "projects", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="endDate"
                placeholder="End Date"
                value={proj.endDate}
                onChange={(e) => handleArrayChange(e, "projects", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={proj.description}
                onChange={(e) => handleArrayChange(e, "projects", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeEntry("projects", index)}
                  className="text-red-500"
                >
                  Remove Project
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewEntry("projects")}
            className="mt-2 text-blue-500"
          >
            Add Project
          </button>
        </div>

        {/* Education Section */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Education</label>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="instituteName"
                placeholder="Institute Name"
                value={edu.instituteName}
                onChange={(e) => handleArrayChange(e, "education", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="fieldOfStudy"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) => handleArrayChange(e, "education", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="startYear"
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) => handleArrayChange(e, "education", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="endYear"
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) => handleArrayChange(e, "education", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeEntry("education", index)}
                  className="text-red-500"
                >
                  Remove Education
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewEntry("education")}
            className="mt-2 text-blue-500"
          >
            Add Education
          </button>
        </div>

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
