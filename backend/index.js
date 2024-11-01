import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import jobRouter from "./routes/jobRoute.js";
import companyRouter from "./routes/companyRoute.js";
import cookieParser from "cookie-parser";

// App config
const app = express();
const port = process.env.PORT || 8000;
connectdb();
connectCloudinary();

// Middlewares
app.use(express.json()); // Parse JSON request body
app.use(cors());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/company", companyRouter);

app.get("/", (req, res) => {
  res.send("Backend Running.");
});

app.listen(port, () => {
  console.log("Listening to port : " + port);
});
