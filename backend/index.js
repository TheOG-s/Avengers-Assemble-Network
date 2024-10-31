import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// App config
const app = express();
const port = process.env.PORT || 8000;
connectdb();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());


app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("Backend Running.");
});

app.listen(port, () => {
  console.log("Listening to port : " + port);
});
