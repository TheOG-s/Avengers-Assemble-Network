import companyModel from "../models/companyModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await companyModel.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Company does not exist." });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(company._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const signupCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists =
      (await companyModel.findOne({ email })) ||
      (await companyModel.findOne({ name }));

    if (exists) {
      return res.json({ success: false, message: "Company already exists." });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCompany = new companyModel({
      name,
      email,
      password: hashedPassword,
      role: "company",
    });

    const company = await newCompany.save();

    const token = createToken(company._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginCompany, signupCompany };
