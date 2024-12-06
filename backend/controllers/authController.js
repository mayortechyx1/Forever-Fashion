import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { customError } from "../middlewares/error.js";
import validator from "validator";
import generateToken from "../utils/generateToken.js";

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    customError(res, "enter the required fields", 400);
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      success: true,
      message: { _id: user._id, name: user.name, email: user.email },
    });
  } else {
    customError(res, "Invalid email or password", 404);
  }
});

export const RegisterUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    customError(res, "enter the required fields", 400);
  }

  // validating email and strong password
  if (!validator.isEmail(email))
    customError(res, "Please enter a valid email", 400);

  if (password.length < 8)
    customError(res, "Please enter a strong password", 400);

  // Checking if the user exists
  const userExists = await User.findOne({ email });

  if (userExists) customError(res, "User with this email exists already", 400);

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      success: true,
      message: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } else {
    customError(res, "invalid user details", 400);
  }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "User logged out" });
});

export const loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    customError(res, "enter the required fields", 400);
  }

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    generateToken(res, email + password);
    res.status(200).json({ success: true, message: "Admin logged in" });
  } else {
    customError(res, "invalid credentials", 400);
  }
});
