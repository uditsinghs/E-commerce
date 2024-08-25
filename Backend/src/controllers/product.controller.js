import { Product } from "../models/product.model.js";
import slugify from "slugify";
import fs from "fs";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity ,shipping } = req.fields;
    const { photo } = req.files;

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
      case !photo || photo.size > 1000000:
        return res.status(400).send({
          message: "Photo is required and should be less than 1MB",
        });
    }

    // Create product
    const products = new Product({
      ...req.fields,
      slug: slugify(name),
    });

    // Handle photo
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    // Save product
    await products.save();


    res.status(201).send({
      message: "Product is created successfully",
      success: true,
      product: products, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in CreateProduct",
      error,
      success: false,
    });
  }
};

// 5.12