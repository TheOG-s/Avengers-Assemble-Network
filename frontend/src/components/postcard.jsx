import React from 'react';
import { FaHeart, FaShare, FaRetweet, FaComment } from 'react-icons/fa';

const PostCard = ({ image, title, description }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden w-full md:w-1/3 h-96"> {/* Adjusted height */}
      <div className="flex flex-col h-full">
        {/* Image portion */}
        <img 
          src={image} 
          alt="Card Image" 
          className="w-full h-1/2 object-cover" // Adjusted to take half the card height
        />
        
        {/* Text portion */}
        <div className="p-4 flex-grow">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-t border-gray-200 p-4 flex justify-around text-gray-600">
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaHeart />
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaComment />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaRetweet />
          <span>Repost</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

const CardGrid = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-center md:justify-between space-y-4 md:space-y-0">
        <PostCard 
          image="https://via.placeholder.com/150" 
          title="Card Title 1" 
          description="This is a description for the first card."
        />
        <PostCard 
          image="https://via.placeholder.com/150" 
          title="Card Title 2" 
          description="This is a description for the second card."
        />
        <PostCard 
          image="https://via.placeholder.com/150" 
          title="Card Title 3" 
          description="This is a description for the third card."
        />
      </div>
    </div>
  );
};

export default CardGrid;
