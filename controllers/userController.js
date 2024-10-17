import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      res.status(500).json({ message: "User already exists", success: false });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email", success: false });
    }
    if (password.length < 8) {
      return res.status(500).json({
        message: "Password length must more than 8 characters ",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
  } catch (error) {}
};

export { loginUser, registerUser };
