import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { customError } from "./error.js";

const userProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) customError(res, "Not Authorized, No Token", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById({ id: decoded.id });
    next();
  } catch (error) {
    customError(res, "Not Authorized", 401);
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) customError(res, "Not Authorized, no token", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
      customError(res, "Not authorized", 401);
    next();
  } catch (error) {
    customError(res, "Not authorized", 401);
  }
});

export { userProtect, adminProtect };
