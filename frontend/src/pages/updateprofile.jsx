import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

//const { username } = useParams();

import axiosInstance from "../../config/axios.js";


const UpdateProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
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
    project: [{ title: "", startDate: "", endDate: "", description: "" }],
    education: [
      { instituteName: "", fieldOfStudy: "", startYear: "", endYear: "" },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFormData({
          name: user.name || "",
          bio: user.bio || "",
          profilePicture: user.profilePicture || "",
          coverPhoto: user.coverPhoto || "",
          skills: user.skills ? user.skills.join(", ") : "",
          experience: user.experience || [
            {
              title: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
          project: user.project || [
            { title: "", startDate: "", endDate: "", description: "" },
          ],
          education: user.education || [
            { instituteName: "", fieldOfStudy: "", startYear: "", endYear: "" },
          ],
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchData();
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
          [field]: reader.result, // Set as Base64 string
        }));
      };
      reader.readAsDataURL(file); // Convert file to Base64
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: "", // Clear field if no file is selected
      }));
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
    const currentEntries = formData[arrayName] || [];
    const lastEntry = currentEntries[currentEntries.length - 1] || {};

    // Check if the last entry is complete before adding a new one
    const isComplete =
      (arrayName === "experience" &&
        lastEntry.title &&
        lastEntry.company &&
        lastEntry.startDate &&
        lastEntry.description) ||
      (arrayName === "project" &&
        lastEntry.title &&
        lastEntry.startDate &&
        lastEntry.description) ||
      (arrayName === "education" &&
        lastEntry.instituteName &&
        lastEntry.fieldOfStudy &&
        lastEntry.startYear &&
        lastEntry.endYear);

    if (isComplete || currentEntries.length === 0) {
      const newEntryTemplate =
        arrayName === "experience"
          ? {
              title: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            }
          : arrayName === "project"
          ? { title: "", startDate: "", endDate: "", description: "" }
          : { instituteName: "", fieldOfStudy: "", startYear: "", endYear: "" };

      setFormData((prevData) => ({
        ...prevData,
        [arrayName]: [...prevData[arrayName], newEntryTemplate],
      }));
    } else {
      toast.error(
        "Please complete the previous entry before adding a new one."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated profile data to backend
      const transformedData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      };
      await axiosInstance.put("/user/updateprofile", transformedData);
      console.log(transformedData);
      toast.success("Profile updated successfully!");
      navigate(`/explore/${user.username}`);
    } catch (error) {
      console.error("Error updating profile", error.message);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
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
          />
        </div>

        {/* Skills Field */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Skills</label>
          <input
            placeholder="comma-separated"
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Experience Section */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">Experience</label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <input
                type="String"
                name="title"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="String"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="Date"
                name="startDate"
                placeholder="Start Date"
                value={exp.startDate.split("T")[0]}
                onChange={(e) => handleArrayChange(e, "experience", index)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="Date"
                name="endDate"
                placeholder="End Date"
                value={exp.endDate.split("T")[0]}
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
              <button
                type="button"
                onClick={() => removeEntry("experience", index)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewEntry("experience")}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add Experience
          </button>
        </div>

        {/* project Section */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow">
          <label className="block text-gray-700">project</label>
          {formData.project.length > 0 &&
            formData.project.map((project, index) => (
              <div key={index} className="mb-4">
                <input
                  type="String"
                  name="title"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => handleArrayChange(e, "project", index)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="Date"
                  name="startDate"
                  placeholder="Start Date"
                  value={project.startDate.split("T")[0]}
                  onChange={(e) => handleArrayChange(e, "project", index)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="Date"
                  name="endDate"
                  placeholder="End Date"
                  value={project.endDate.split("T")[0]}
                  onChange={(e) => handleArrayChange(e, "project", index)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) => handleArrayChange(e, "project", index)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeEntry("project", index)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            type="button"
            onClick={() => addNewEntry("project")}
            className="bg-blue-500 text-white p-2 rounded mt-2"
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
              <button
                type="button"
                onClick={() => removeEntry("education", index)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewEntry("education")}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add Education
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
