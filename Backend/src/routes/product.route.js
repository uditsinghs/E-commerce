import express from "express";
import { isAdmin, verifyJWT } from "../middleware/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
const router = express.Router();
import formidable from "express-formidable";

router.post("/create-product", verifyJWT, isAdmin, formidable(), createProduct);

export default router;
