import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Messages from "./pages/messages.jsx";
import Profile from "./pages/profile.jsx";
import Jobs from "./pages/jobs.jsx";
import Connections from "./pages/connections.jsx";
import Notifications from "./pages/notifications.jsx";
import Updateprofile from "./pages/updateprofile.jsx";
import JobDetailsPage from "./pages/showjob.jsx";
import CreatePostPage from "./pages/createpost.jsx";
import LoginPage from "./pages/company/login.jsx";
import PostJob from "./pages/company/postjob.jsx";
import CompanyRegistration from "./pages/company/registercompany.jsx";
import CompanyJobs from "./pages/company/showjob.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/explore/:username" element={<Profile />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/home" element={<Home />} />
      <Route path="/updateprofile" element={<Updateprofile />} />

      <Route path="/connections" element={<Connections />} />
      <Route path="/showjob" element={<JobDetailsPage />} />
      <Route path="/createpost" element={<CreatePostPage />} />
      <Route path="/companylogin" element={<LoginPage />} />
      <Route path="/postjob" element={<PostJob />} />
      <Route path="/registercompany" element={<CompanyRegistration />} />
      <Route path="/companyjob" element={<CompanyJobs />} />
    </Routes>
  </BrowserRouter>
);
