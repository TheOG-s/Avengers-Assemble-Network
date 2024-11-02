import postModel from "../models/postModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id; // Assuming user ID is available on req.user

    let imageUrl = null;
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      imageUrl = result?.secure_url || null; // Check if result is null in case of error
    }

    const newPost = await postModel.create({
      user: userId,
      content,
      image: imageUrl,
    });
    // console.log("Request body:", req.id);
    // console.log("Uploaded file:", req.file);

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user", "name headline");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;

    let imageUrl;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return res
          .status(500)
          .json({ message: "Error uploading image", error: uploadError });
      }
    }

    const updateData = { content };
    if (imageUrl) updateData.image = imageUrl;

    const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = post.findById(postId);

    // if (!post) return;
    // res.status(404).json({ message: "Post not found" });

    // if (post.author.tostring() !== userid.tostring()) {
    //   return res
    //     .status(403)
    //     .json({ message: "you are not authorized to delete the post" });
    // }
    await postModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

// Like/Unlike a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await postModel.findById(postId);

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }
    console.log("noiseee");
    await post.save();
    res.status(200).json({ message: "Like/Unlike successful", post });
  } catch (error) {
    res.status(500).json({ message: "Error in like/unlike action", error });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { text } = req.body;

    const post = await postModel.findById(postId);
    post.comments.push({ user: userId, text });
    await post.save();

    res.status(201).json({ message: "Comment added successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};
