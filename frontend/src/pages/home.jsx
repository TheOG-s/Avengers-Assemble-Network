import React from 'react'

import JobCard from '../components/postcard';

const Home = () => {
  return (
    <div className="p-4">
      <JobCard 
        image="path_to_image.jpg" 
        title="Sample Post Title" 
        description="A brief description of the content shown here. This can include any message or caption relevant to the post."
      />
    </div>
  );
};

export default Home;
