import express from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  likePost,
  addComment,
} from "../controllers/postController.js";
import { upload } from "../middlewares/multer.js";
import protectUserRoute from "../middlewares/authUser.js";
const router = express.Router();

// Middleware for authentication would go here

router.post("/", protectUserRoute, upload.single("image"), createPost); // Create a post with image upload
router.get("/", getAllPosts); // Get all posts
router.put("/:id", upload.single("image"), updatePost); // Update a post with image upload
router.delete("/:id", deletePost); // Delete a post
router.put("/:id/like", likePost); // Like/unlike a post
router.post("/:id/comment", addComment); // Add a comment to a post

export default router;
