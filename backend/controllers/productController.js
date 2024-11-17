import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import { customError } from "../middlewares/error.js";

export const getProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);

  res.status(200).json({ success: true, message: product });
});

export const addProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;

  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter(
    (item) => item != undefined
  );

  let imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  const productData = {
    name,
    description,
    price: Number(price),
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    image: imagesUrl,
    bestSeller: bestSeller === "true" ? true : false,
    date: Date.now(),
  };

  const product = await Product.create(product);

  if (product) {
    res.status(201).json({ success: true, message: product });
  } else {
    customError(res, "Invalid product details", 400);
  }
});

export const listProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({ success: true, message: products });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  await Product.findByIdAndDelete(productId);

  res.status(200).json({ success: true, message: "Product deleted" });
});
