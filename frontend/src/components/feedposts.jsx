import React, { useState, useEffect } from "react";
import PostCard from "./postcard.jsx";
import axiosInstance from "../../config/axios";

const Feedposts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFeedPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/posts");
      setPosts(response.data); // Set the posts array
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedPosts();
  }, []);

  return (
    <div className="feed-container max-w-2xl mx-auto p-4">
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            profilePicture={post.user.profilepicture}
            name={post.user.name}
            bio={post.user.bio}
            description={post.content}
            postImage={post.image}
            initialLikes={post.likes.length}
            initialComments={post.comments.length}
            initialSaves={post.saves}
            postId={post._id}
            commentsData={post.comments}
          />
        ))
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default Feedposts;
