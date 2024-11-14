import express from "express";
import {
  loginAdmin,
  loginUser,
  logoutUser,
  RegisterUser,
} from "../controllers/authController.js";

const router = express.Router();

// Login User
router.post("/login", loginUser);

// Register User
router.post("/register", RegisterUser);

// Logout User
router.post("/logout", logoutUser);

// Login Admin
router.post("/login-admin", loginAdmin);

export default router;
