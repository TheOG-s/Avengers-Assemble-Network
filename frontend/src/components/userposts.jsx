import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersPost = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get(`/posts/${username}`);
        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          toast.error("Failed to load posts.");
        }
      } catch (error) {
        toast.error("Error fetching posts. Please try again.");
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  const handleDeletePost = async (postId) => {
    try {
      console.log(postId);
      const response = await axiosInstance.delete(`/posts/${postId}`);
      if (response.data.success) {
        toast.success("Post deleted successfully");
        setPosts(posts.filter((post) => post._id !== postId)); // Update the state to remove deleted post
      } else {
        toast.error("Error deleting post");
      }
    } catch (error) {
      toast.error("Error deleting post. Please try again.");
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading posts...</div>;
  }

  return (
    <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
      <ToastContainer />
      <h3 className="text-xl font-semibold text-gray-800">User's Posts</h3>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <p className="text-gray-600 mt-2">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post visual"
                className="mt-4 max-w-full h-auto rounded-lg shadow-md"
              />
            )}
            <p className="text-gray-500 text-sm mt-2">
              Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>

            {/* Display Likes */}
            <div className="mt-2 text-gray-500">
              <strong>Likes:</strong> {post.likes.length}
            </div>

            {/* Display Comments */}
            <div className="mt-2">
              <strong>Comments:</strong>
              {post.comments.length > 0 ? (
                post.comments.map((comment, idx) => (
                  <div key={idx} className="mt-2">
                    <p className="text-gray-600">{comment.text}</p>
                    <p className="text-gray-400 text-sm">
                      By: {comment.user || "Anonymous"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No comments yet.</p>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDeletePost(post._id)}
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
            >
              Delete Post
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}
    </div>
  );
};

export default UsersPost;
