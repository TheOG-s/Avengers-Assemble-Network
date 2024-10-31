import express from "express";
import {
  loginUser,
  signupUser,
//   loginCompany,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
// userRouter.post("/loginCompany", loginCompany);

export default userRouter;
