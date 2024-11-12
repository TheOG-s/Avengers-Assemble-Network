import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import jobRouter from "./routes/jobRoute.js";
import postRouter from "./routes/postRoute.js";
import companyRouter from "./routes/companyRoute.js";
import cookieParser from "cookie-parser";
import exploreRouter from "./routes/exploreRoute.js";
import connectionRouter from "./routes/connectionRoute.js";
import { populateTries } from "./config/populateTrie.js";
import searchRouter from "./routes/searchRoute.js";
// App config
const app = express();
const port = process.env.PORT || 8000;
connectdb();
populateTries();
// connectCloudinary();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Middlewares
app.use(express.json()); // Parse JSON request body
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/explore", exploreRouter);
app.use("/api/job", jobRouter);
app.use("/api/company", companyRouter);
app.use("/api/posts", postRouter);
app.use("/api/connections", connectionRouter);
app.use("/api", searchRouter);
app.get("/", (req, res) => {
  res.send("Backend Running.");
});

app.listen(port, () => {
  console.log("Listening to port : " + port);
});
