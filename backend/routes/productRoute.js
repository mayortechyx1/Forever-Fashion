import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  listProducts,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
import { adminProtect } from "../middlewares/protect.js";

const router = express.Router();

// Get Product
router.get("/single", adminProtect, getProduct);

// Add Product
router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminProtect,
  addProduct
);

// List All Products
router.get("/list", adminProtect, listProducts);

// Delete Product
router.delete("/delete", adminProtect, deleteProduct);

export default router;
