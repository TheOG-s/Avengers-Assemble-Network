import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// Navigation components
import NavBar from "./components/navBar";
import CompanyNavbar from "./components/company/companyNavBar";

// User pages
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Messages from "./pages/messages";
import Profile from "./pages/profile";
import Jobs from "./pages/jobs";
import Connections from "./pages/connections";
import Notifications from "./pages/notifications";
import UpdateProfile from "./pages/updateprofile";
import JobDetailsPage from "./pages/showjob";
import CreatePostPage from "./pages/createpost";

// Company pages
import CompanyHome from "./pages/company/home";
import CompanyJobs from "./pages/company/showjob";
import CompanyPostJob from "./pages/company/postjob";
import CompanyLogin from "./pages/company/login";
import CompanyRegistration from "./pages/company/registercompany";
import UpdateCompanyDetails from "./pages/company/updateprofile";

const App = () => {
  const location = useLocation();

  const companyRoutes = [
    "/company/home",
    "/company/showjobs",
    "/company/postjob",
    "/company/updateprofile",
    "/company/login",
    "/company/signup",
  ];

  return (
    <>
      {companyRoutes.includes(location.pathname) ? (
        <CompanyNavbar />
      ) : (
        <NavBar />
      )}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/explore/:username" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/updateprofile/:username" element={<UpdateProfile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/showjob" element={<JobDetailsPage />} />
        <Route path="/createpost" element={<CreatePostPage />} />

        {/* Company Routes */}
        <Route path="/company/home" element={<CompanyHome />} />
        <Route path="/company/showjobs" element={<CompanyJobs />} />
        <Route path="/company/postjob" element={<CompanyPostJob />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/signup" element={<CompanyRegistration />} />
        <Route
          path="/company/updateprofile"
          element={<UpdateCompanyDetails />}
        />
      </Routes>
    </>
  );
};

export default App;
