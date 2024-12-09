import express from "express";
import {
  loginAdmin,
  loginUser,
  logoutUser,
  RegisterUser,
} from "../controllers/authController.js";
import { adminProtect } from "../middlewares/protect.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// Login User
router.post("/login", loginUser);

// Register User
router.post("/register", RegisterUser);

// Logout User
router.post("/logout", logoutUser);

// Login Admin
router.post("/admin", loginAdmin);

// verify admin status
router.post(
  "/admin-status",
  adminProtect,
  asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true });
  })
);

export default router;
