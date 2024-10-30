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
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup'  element={<Signup/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/Messages' element={<Messages />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/jobs' element={<Jobs />} />
      
      <Route path='/connections' element={<Connections />} />


      
      </Routes>

  </BrowserRouter>,
)
