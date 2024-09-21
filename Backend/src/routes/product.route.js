import express from "express";
import { isAdmin, verifyJWT } from "../middleware/auth.middleware.js";
import {
  createProduct,
  fetchAllProduct,
  fetchSingleProduct,
  fetchProductImage,
  deleteProduct,
  updateProduct,
  FilterProduct,
  productCountController,
  productListController,
  searchProduct
} from "../controllers/product.controller.js";
const router = express.Router();
// import formidable from "express-formidable";
import { upload } from "../middleware/fileUpload.js";

// create product
router
  .route("/create-product")
  .post(
    verifyJWT,
    isAdmin,
    upload.fields([{ name: "image", maxCount: 1 }]),
    createProduct
  );
// find all products
router.get("/fetch-product", fetchAllProduct);
// fetch single product
router.get("/fetch-product/:slug", fetchSingleProduct);
// fetch product image
router.get("/fetch-image/:pid", fetchProductImage);
// delete product
router.delete("/delete-product/:pid", verifyJWT, isAdmin, deleteProduct);
// update Product
router.put(
  "/update-product/:pid",
  verifyJWT,
  isAdmin,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProduct
);
router.post("/filter-product", FilterProduct);
// pagination
router.get("/product-count", productCountController);
router.get("/productlist-count/:page", productListController);

// search Product--
router.get('/search/:keyword',searchProduct)
export default router;
