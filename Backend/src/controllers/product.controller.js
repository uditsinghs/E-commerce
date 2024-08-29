import { populate } from "dotenv";
import { Product } from "../models/product.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import slugify from "slugify";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const imageFile = req.files?.image?.[0];

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: "Name is required" });
      case !description:
        return res.status(400).send({ message: "Description is required" });
      case !price:
        return res.status(400).send({ message: "Price is required" });
      case !category:
        return res.status(400).send({ message: "Category is required" });
      case !quantity:
        return res.status(400).send({ message: "Quantity is required" });
      case !imageFile:
        return res.status(400).send({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const imageLocalPath = imageFile.path;
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);

    if (!uploadedImage || !uploadedImage.url) {
      return res
        .status(400)
        .send({ message: "Image upload to Cloudinary failed" });
    }

    // Create product
    const product = await Product.create({
      name,
      slug: slugify(name, { lower: true }),
      description,
      price,
      category,
      quantity,

      image: uploadedImage.url || "",
    });

    if (!product) {
      return res.status(500).send({ message: "Server error" });
    }

    res.status(201).send({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error creating product",
      error,
      success: false,
    });
  }
};

export const fetchAllProduct = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "fetched all poducts",
      success: true,
      totalCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in fetch all products", success: false, error });
  }
};

// get single product
export const fetchSingleProduct = async (req, res) => {
  try {
    const singleProduct = await Product.findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");

    if (!singleProduct) {
      return res.status(404).send({ message: "Product not available" });
    }
    res.status(200).send({
      message: "fetched single product",
      success: true,
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in fetching single product",
      success: false,
      error: error.message,
    });
  }
};

// fetch product image
export const fetchProductImage = async (req, res) => {
  try {
    const productImage = await Product.findById(req.params.pid).select("image");
    if (!productImage) {
      return res
        .status(404)
        .send({ message: "Image not found", success: false });
    }
    res
      .status(200)
      .send({ message: "product image fetched", success: true, productImage });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching product image",
      success: false,
      error: error.message,
    });
  }
};

// delete product

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-image");
    res
      .status(200)
      .send({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(500).send({
      message: "Error while delete product ",
      success: false,
      error: error.message,
    });
  }
};

// update single-Product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping ,slug} = req.body;
    const imageFile = req.files?.image?.[0];

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: "Name is required" });
      case !description:
        return res.status(400).send({ message: "Description is required" });
      case !price:
        return res.status(400).send({ message: "Price is required" });
      case !category:
        return res.status(400).send({ message: "Category is required" });
      case !quantity:
        return res.status(400).send({ message: "Quantity is required" });
      case !imageFile:
        return res.status(400).send({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const imageLocalPath = imageFile.path;
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);

    if (!uploadedImage || !uploadedImage.url) {
      return res
        .status(400)
        .send({ message: "Image upload to Cloudinary failed" });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        price,
        category,
        quantity,
        image: uploadedImage.url,
        slug: slugify(name),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).send({ message: "Server error" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      success: true,
     updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating product",
      success: false,
      error: error.message,
    });
  }
};

