import { customError } from "../middlewares/error.js";
import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

// COD method
export const placeOrder = asyncHandler(async (req, res, next) => {
  const { userId, items, amount, address } = req.body;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };

  const newOrder = Order.create({ orderData });
  if (!newOrder) customError(res, "Order not created", 400);
  res.status(201).json({ success: true, message: newOrder });
});

// Stripe method
export const placeOrderStripe = asyncHandler(async (req, res, next) => {});

// Razorpay method
export const placeOrderRazorpay = asyncHandler(async (req, res, next) => {});

// All orders data for Admin panel
export const allOrders = asyncHandler(async (req, res, next) => {});

// User order data for Frontend
export const userOrders = asyncHandler(async (req, res, next) => {});

// update order status
export const updateStatus = asyncHandler(async (req, res, next) => {});
