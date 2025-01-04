import express from "express";
import { adminProtect } from "../middlewares/protect.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";

const router = express.Router();

// admin features
router.post("/list", adminProtect, allOrders);
router.post("/status", adminProtect, updateStatus);

// Payment features
router.post("/place", adminProtect, placeOrder);
router.post("/stripe", adminProtect, placeOrderStripe);
router.post("/razorpay", adminProtect, placeOrderRazorpay);

// User features
router.post("/userorders", adminProtect, userOrders);

export default router;
