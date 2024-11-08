
import React, { useState, useEffect } from "react";
import { FaHeart, FaBookmark, FaComment } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axios";

const PostCard = ({
  profilePicture,
  name,
  bio,
  description,
  postImage,
  initialLikes,
  initialComments,
  initialSaves,
  postId,
  commentsData,
}) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [comments, setComments] = useState(initialComments || 0);
  const [saves, setSaves] = useState(initialSaves || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(commentsData || []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statusResponse] = await Promise.all([
          axios.get(`/api/posts/${postId}/status`),
        ]);

        setHasLiked(statusResponse.data.hasLiked);
        setHasSaved(statusResponse.data.hasSaved);
      } catch (error) {
        toast.error("Error fetching post data");
      }
    }
    fetchData();
  }, [postId]);

  const handleLike = async () => {
    if (hasLiked) return;
    try {
      setLikes(likes + 1);
      setHasLiked(true);
      await axiosInstance.post(`/posts/${postId}`);
    } catch (error) {
      toast.error("Error updating like");
    }
  };

  const handleSave = async () => {
    if (hasSaved) return;
    try {
      setSaves(saves + 1);
      setHasSaved(true);
      await axios.post(`/api/posts/${postId}/save`);
    } catch (error) {
      setHasSaved(false);
      toast.error("Error saving post");
    }
  };

  const handleCommentClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await axiosInstance.post(`/posts/${postId}/comment`, {
        text: newComment,
      });

      const newCommentObj = response.data.comment;
      setCommentList([...commentList, newCommentObj]);
      setNewComment("");
      setComments(comments + 1);
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 max-w-lg mx-auto hover:shadow-2xl transition-shadow duration-300">
      <ToastContainer />
      <div className="flex items-center mb-4">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover mr-4 shadow-sm border border-gray-300"
        />
        <div>
          <h2 className="font-semibold text-gray-900 text-lg">
            {name || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500">{bio || "No bio provided"}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed">
        {description || "No description provided."}
      </p>
      {postImage && (
        <img
          src={postImage}
          alt="Post Image"
          className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-200 shadow-sm"
        />
      )}
      <div className="flex justify-between items-center text-gray-500 border-t border-gray-200 pt-4">
        <button
          className={`flex items-center space-x-2 ${
            hasLiked ? "text-blue-600" : "text-gray-600"
          } hover:text-blue-600 transition-colors duration-200`}
          onClick={handleLike}
        >
          <FaHeart className="text-xl" />
          <span className="text-sm font-medium">{likes}</span>
        </button>
        <button
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          onClick={handleCommentClick}
        >
          <FaComment className="text-xl" />
          <span className="text-sm font-medium">{comments}</span>
        </button>
        <button
          className={`flex items-center space-x-2 ${
            hasSaved ? "text-blue-600" : "text-gray-600"
          } hover:text-blue-600 transition-colors duration-200`}
          onClick={handleSave}
        >
          <FaBookmark className="text-xl" />
        </button>
      </div>
      {showCommentBox && (
        <div className="mt-4">
          <div className="mb-4">
            {commentList.length > 0 ? (
              commentList.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 mb-2 p-2 rounded-md border border-gray-200 bg-gray-50"
                >
                  <img
                    src={comment.user.profilePicture}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm">
                      {comment.user.name}
                    </span>
                    <span className="text-gray-700 text-sm">
                      {comment.text}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-lg mb-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
