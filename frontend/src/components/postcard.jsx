import React from 'react';
import { FaHeart, FaShare, FaRetweet, FaComment } from 'react-icons/fa';

const PostCard = ({ profileImage, name, position, time, description, postImage, likes, comments, reposts }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 max-w-lg mx-auto">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <img 
          src={profileImage} 
          alt="Profile" 
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h2 className="font-bold text-gray-800">{name || "Unknown User"}</h2> {/* Display name or fallback */}
          <p className="text-sm text-gray-500">{position || "No position provided"} • {time || "N/A"}</p>
        </div>
      </div>

      {/* Description Section */}
      <p className="text-gray-800 mb-4">
        {description || "No description provided."}
      </p>

      {/* Post Image - Only shows if postImage is provided */}
      {postImage && (
        <img 
          src={postImage} 
          alt="Post Image" 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center text-gray-600 border-t border-gray-200 pt-4">
        <div className="flex items-center flex-grow justify-between">
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <FaHeart />
            <span>{likes || "0"}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <FaComment />
            <span>{comments || "0"}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <FaRetweet />
            <span>{reposts || "0"}</span>
          </button>
        </div>
        {/* Uncomment if you want the share button */}
        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaShare />
          <span>Share</span>
        </button> */}
      </div>
    </div>
  );
};

// Sample or demo images
const CardExample = () => {
  return (
    <div className="p-4">
      {/* Example with an image post */}
      <PostCard
        profileImage="https://via.placeholder.com/100"
        name="Sagar Patidar"
        position="Founder & CEO Primathon | Investor | IITD"
        description="with image"
        postImage="https://via.placeholder.com/400"
        likes="10"
        comments="5"
        reposts="2"
      />
      
      {/* Example with a text-only post */}
      <PostCard
        profileImage="https://via.placeholder.com/100"
        name="Sagar Patidar"
        position="Founder & CEO Primathon | Investor | IITD"
        description="without image"
        likes="20"
        comments="10"
        reposts="3"
      />
    </div>
  );
};

export default CardExample;


//when we will get data from backend
// const CardGrid = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Fetch posts from backend
//     fetch('/api/posts') 
//       .then((response) => response.json())
//       .then((data) => setPosts(data))
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       {posts.length > 0 ? (
//         posts.map((post, index) => (
//           <PostCard
//             key={index}
//             image={post.image}  // Handle optional image field
//             title={post.title}
//             description={post.description}
//             user={post.user}   // 
//           />
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No posts available</p>
//       )}
//     </div>
//   );
// };

// export default CardGrid;