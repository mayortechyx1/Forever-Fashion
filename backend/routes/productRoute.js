import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  listProducts,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Get Product
router.get("/single", getProduct);

// Add Product
router.post(
  "/add",
  upload.fields(
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ),
  addProduct
);

// List All Products
router.get("/list", listProducts);

// Delete Product
router.delete("/delete", deleteProduct);

export default router;
