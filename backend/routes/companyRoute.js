import express from "express";
import {
  loginCompany,
  signupCompany,
} from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.post("/signup", signupCompany);
companyRouter.post("/login", loginCompany);

export default companyRouter;
