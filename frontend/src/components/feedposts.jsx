import React, { useState, useEffect } from "react";

import PostCard from "./postcard"; // Import your PostCard component
import axiosInstance from "../../config/axios";

const Feedposts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts using getfeedposts
  const getFeedPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts"); // Adjust the endpoint if needed
      //console.log(response.data);
      setPosts(response.data); // Assuming response returns an arrays of posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getFeedPosts();
  }, []);

  return (
    <div className="feed-container max-w-2xl mx-auto p-4 ">
      {/* If there are posts, map through them and render PostCard */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            profileImage={post.user.profilepicture} // Assuming the backend response includes user profileImage
            name={post.user.name} // Backend response includes user name
            bio={post.user.bio} // Backend response includes user headline
            description={post.content} // Assuming this is the post content/description
            postImage={post.image} // Assuming post has an image field
            initialLikes={post.likesCount}
            initialComments={post.comments.length} // Count of comments from the populated comments array
            postId={post._id} // Unique post ID for interactions
          />
        ))
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default Feedposts;
