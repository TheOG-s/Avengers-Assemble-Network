import React from 'react'
import Signup from './pages/signup'
import Login from './pages/login'
import NavBar from './components/navBar'
import JobCard from './components/postcard'

const App = () => {
  return (
    <div>
          <NavBar />
          <JobCard/>
    </div>
  )
}

export default App
