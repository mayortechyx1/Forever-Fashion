import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Add to Cart
router.post("/add", addToCart);

// Update User Cart
router.put("/update", updateCart);

// Get User Cart
router.post("/get", getUserCart);

export default router;
