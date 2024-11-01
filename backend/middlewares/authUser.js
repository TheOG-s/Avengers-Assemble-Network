import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protectUserRoute = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.json({ message: "Unauthorized Access: No token." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return res.json({ message: "Unauthorized Access: Invalid token." });
    }

    // return res.json({decodedToken});

    const user = await userModel
      .findById(decodedToken.id)
      .select("-password");
    if (!user) {
      return res.json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default protectUserRoute;
