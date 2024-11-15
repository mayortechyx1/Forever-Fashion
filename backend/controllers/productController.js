import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const getProduct = asyncHandler(async (req, res, next) => {
  res.send("Sngle Product");
});

export const addProduct = asyncHandler(async (req, res, next) => {});

export const listProducts = asyncHandler(async (req, res, next) => {});

export const deleteProduct = asyncHandler(async (req, res, next) => {});
