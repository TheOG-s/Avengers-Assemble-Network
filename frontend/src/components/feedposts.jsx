import React, { useState, useEffect } from "react";
import PostCard from "./postcard.jsx";
import axiosInstance from "../../config/axios";
import { Link } from "react-router-dom";
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
          <div key={post._id} className="mb-8">
            {" "}
            <Link to={`/explore/${post.user.username}`}>
              <PostCard
                profileImage={post.user.profilepicture} // Assuming the backend response includes user profileImage
                name={post.user.name} // Backend response includes user name
                bio={post.user.bio} // Backend response includes user headline
                description={post.content} // Assuming this is the post content/description
                postImage={post.image} // Assuming post has an image field
                initialLikes={post.likes.length}
                initialComments={post.comments.length} // Count of comments from the populated comments array
                postId={post._id} // Unique post ID for interactions
                commentsData={post.comments}
              />
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default Feedposts;
