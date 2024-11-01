import express from "express";
import {
  loginUser,
  signupUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/userController.js";
import  protectUserRoute from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/profile", protectUserRoute, getCurrentUser);

export default userRouter;
