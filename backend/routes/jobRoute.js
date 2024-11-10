import express from "express";
import {
  addJob,
  showJob,
  showAllJob,
  removeJob,
  showCompanyJob,
  showAllActiveJob,
  showCompanyActiveJob,
  changeStatus,
} from "../controllers/jobController.js";
import protectCompanyRoute from "../middlewares/authCompany.js";

const jobRouter = express.Router();

jobRouter.post("/add", protectCompanyRoute, addJob);
jobRouter.get("/show/:jobId", showJob);
jobRouter.get("/showall", showAllJob);
jobRouter.get("/showactive", showAllActiveJob);
jobRouter.get("/showall/:companyId", showCompanyJob);
jobRouter.get("/showactive/:companyId", showCompanyActiveJob);
jobRouter.post("/changestatus/:jobId", protectCompanyRoute, changeStatus);
jobRouter.post("/remove/:jobId", protectCompanyRoute, removeJob);

export default jobRouter;
