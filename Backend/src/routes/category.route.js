import express from "express";
import {
  createCategory,
  updateCategory,
  fetchCategory,
  deleteCategory,
  fetchSingleCategory,
} from "../controllers/category.controller.js";
import { isAdmin, verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/create-category", verifyJWT, isAdmin, createCategory);
router.put("/update-category/:id", verifyJWT, isAdmin, updateCategory);
router.get("/fetch-category", fetchCategory);
router.get("/single-category-fetch/:slug", fetchSingleCategory);
router.delete("/delete-category/:id", verifyJWT, isAdmin, deleteCategory);
export default router;
