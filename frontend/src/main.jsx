import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'


import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Home from './pages/home.jsx'
import Messages from './pages/messages.jsx'
import Profile from './pages/profile.jsx'
import Jobs from './pages/jobs.jsx'
import Connections from './pages/connections.jsx'
import Notifications from './pages/notifications.jsx'
import Updateprofile from './pages/updateprofile.jsx'
import JobDetailsPage from './pages/showjob.jsx'
import CreatePostPage from './pages/createpost.jsx'
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/home" element={<Home />} />
      <Route path="/updateprofile" element={<Updateprofile />} />

      <Route path="/connections" element={<Connections />} />
      <Route path="/showjob" element={<JobDetailsPage />} />
      <Route path="/createpost" element={<CreatePostPage />} />
    </Routes>
  </BrowserRouter>
);
