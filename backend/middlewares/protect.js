import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { customError } from "./error.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) customError(res, "Not Authorized, No Token", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById({ id: decoded.id });
  } catch (error) {
    customError(res, "Not Authorized", 401);
  }
});

export { protect };
