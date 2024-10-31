import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
//   res.json({ msg: "login API Working" });

    try {
        const {email, password} = req.body
        
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({ success: false, message: "User doesnot exist." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({ success: false, message: "Incorrect Password" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        
    }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

const signupUser = async (req, res) => {
  //   res.json({ msg: "signup API Working" });

  try {
    const { name, dob, email, password } = req.body;
    // console.log(req.body);

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists." });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    const newUser = new userModel({
      name,
      dob,
      email,
      password: hashedPassword,
    });
    // console.log("he he");

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginCompany = async (req, res) => {};

// export { loginUser, signupUser, loginCompany };
export { loginUser, signupUser };
