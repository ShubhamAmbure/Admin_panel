const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");
const Product = require("../models/Product");

exports.createSubcategory = async (req, res) => {
  try {
    const { name, image, status, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ message: "Name and categoryId are required" });
    }

    // Validate categoryId
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid categoryId" });
    }

    const subcategory = new Subcategory({
      name,
      image,
      status: status || "Active",
      categoryId,
    });

    await subcategory.save();

    res.status(201).json({
      message: "Subcategory created successfully",
      subcategory,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("categoryId", "name");
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, status, categoryId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Validate categoryId if provided
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: "Invalid categoryId" });
      }
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, image, status, categoryId },
      { new: true }
    ).populate("categoryId", "name");

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({
      message: "Subcategory updated successfully",
      subcategory,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if subcategory has products
    const products = await Product.find({ subcategoryId: id });
    if (products.length > 0) {
      return res.status(400).json({
        message: "Cannot delete subcategory with existing products",
      });
    }

    const subcategory = await Subcategory.findByIdAndDelete(id);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({ message: "Subcategory deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};