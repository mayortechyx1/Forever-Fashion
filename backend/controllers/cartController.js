import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import { customError } from "../middlewares/error.js";
import User from "../models/User.js";

// Add to Cart Data
export const addToCart = asyncHandler(async (req, res, next) => {
  const { userId, itemId, size } = req.body;

  const user = await User.findById(userId);

  let cartData = user.cartData;

  if (cartData[itemId]) {
    if (cartData[itemId]["sizes"][size]) {
      cartData[itemId]["sizes"][size] += 1;
      cartData[itemId]["price"] = price;
    } else {
      cartData[itemId]["sizes"][size] = 1;
      cartData[itemId]["price"] = price;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId]["sizes"] = {};
    cartData[itemId]["sizes"][size] = 1;
    cartData[itemId]["price"] = price;
  }

  await user.save();
  res.status(201).json({ status: success, message: "Added to Cart" });
});

// Update Cart Data
export const updateCart = asyncHandler(async (req, res, next) => {
  const { userId, itemId, size } = req.body;

  const user = await User.findById(userId);

  let cartData = user.cartData;

  cartData[itemId]["sizes"][size] = quantity;

  await user.save();
  res.status(201).json({ status: success, message: "Updated Cart" });
});

// get Cart Data
export const getUserCart = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  res.status(200).json({ status: true, load: user.cartData });
});

export const delCartItem = asyncHandler(async (req, res, next) => {
  const { userId, itemId, size } = req.body;

  const user = await User.findById(userId);

  let cartData = user.cartData;

  delete cartData[itemId]["sizes"][size];

  await user.save();
  res.status(201).json({ status: success, message: "Deleted Cart Item" });
});
