// src/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) return "Password must be at least 8 characters long";
    if (!hasUppercase.test(password)) return "Password must contain at least one uppercase letter";
    if (!hasLowercase.test(password)) return "Password must contain at least one lowercase letter";
    if (!hasNumber.test(password)) return "Password must contain at least one number";
    if (!hasSpecialChar.test(password)) return "Password must contain at least one special character";
    return null;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (calculateAge(formData.dob) < 16) {
      newErrors.dob = "You must be at least 16 years old to create an account";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
     
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter a username"
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
