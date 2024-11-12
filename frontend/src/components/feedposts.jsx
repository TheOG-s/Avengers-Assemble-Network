import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import PostCard from "./postcard";

const buttonStyle = {
  display: "block",
  margin: "20px auto",
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const feedContainerStyle = {
  marginTop: "20px", // Space from the navbar
  padding: "0 20px", // Padding on the sides
};

const postSpacingStyle = {
  marginBottom: "20px", // Space between posts
};

const Feedposts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (loading || page > totalPages) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/posts`, {
        params: { page, limit: 10 },
      });

      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setTotalPages(response.data.totalPages);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={feedContainerStyle}>
      {posts.map((post, index) => (
        <div style={postSpacingStyle} key={post._id || index}>
          <PostCard
            profilePicture={post.user?.profilePicture}
            name={post.user?.name}
            bio={post.user?.bio}
            description={post.content}
            postImage={post.image}
            initialLikes={post.likes.length}
            initialComments={post.comments.length}
            initialSaves={post.saves?.length || 0}
            postId={post._id}
            commentsData={post.comments}
            username={post.user?.username}
          />
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {page <= totalPages && !loading && (
        <button onClick={fetchPosts} style={buttonStyle}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Feedposts;
