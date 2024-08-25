import { Category } from "../models/category.model.js";
import slugify from "slugify";

// create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ message: "Category already exist", success: true });
    }

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

// update category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      message: "Category updated successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "category update errro", error, success: false });
  }
};

// get category

export const fetchCategory = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.status(200).send({
      message: "Categories fetched successfully",
      success: true,
      Categories,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Eroor in fetching Categories", error, success: false });
  }
};

// fetch Single category
export const fetchSingleCategory = async(req, res) => {
  try {
  
    const singleCategory = await Category.findOne({slug:req.params.slug});

    if (!singleCategory) {
      return res
        .status(404)
        .send({ message: "Category Not available", success: false });
    }

    res.status(200).send({
      message: "fetched single Category",
      success: true,
      singleCategory
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error when fetch single category",
      success: false,
      error,
    });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error when deleting category",
      success: false,
      error,
    });
  }
};
