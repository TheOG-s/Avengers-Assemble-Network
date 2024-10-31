import express from "express";
import {
  addJob,
  showJob,
  showAllJob,
  removeJob,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/add", addJob);
jobRouter.get("/show", showJob);
jobRouter.get("/showAll", showAllJob);
jobRouter.post("/remove", removeJob);

export default jobRouter;
