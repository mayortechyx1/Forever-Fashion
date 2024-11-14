import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const loginUser = asyncHandler(async (req, res, next) => {
  res.send("hello forever");
});

export const RegisterUser = asyncHandler(async (req, res, next) => {
  res.send("hello forever");
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.send("hello forever");
});

export const loginAdmin = asyncHandler(async (req, res, next) => {
  res.send("hello forever");
});
