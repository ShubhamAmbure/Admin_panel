const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

exports.createProduct = async (req, res) => {
  try {
    const { name, image, status, categoryId, subcategoryId } = req.body;

    if (!name || !categoryId || !subcategoryId) {
      return res.status(400).json({ message: "Name, categoryId, and subcategoryId are required" });
    }

    // Validate categoryId
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid categoryId" });
    }

    // Validate subcategoryId
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(400).json({ message: "Invalid subcategoryId" });
    }

    // Ensure subcategory belongs to category
    if (subcategory.categoryId.toString() !== categoryId) {
      return res.status(400).json({ message: "Subcategory does not belong to the provided category" });
    }

    const product = new Product({
      name,
      image,
      status: status || "Active",
      categoryId,
      subcategoryId,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .populate("subcategoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, status, categoryId, subcategoryId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Validate categoryId and subcategoryId if provided
    if (categoryId || subcategoryId) {
      const category = categoryId ? await Category.findById(categoryId) : null;
      if (categoryId && !category) {
        return res.status(400).json({ message: "Invalid categoryId" });
      }

      const subcategory = subcategoryId ? await Subcategory.findById(subcategoryId) : null;
      if (subcategoryId && !subcategory) {
        return res.status(400).json({ message: "Invalid subcategoryId" });
      }

      // If both provided, ensure subcategory belongs to category
      if (categoryId && subcategoryId && subcategory.categoryId.toString() !== categoryId) {
        return res.status(400).json({ message: "Subcategory does not belong to the provided category" });
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, image, status, categoryId, subcategoryId },
      { new: true }
    )
      .populate("categoryId", "name")
      .populate("subcategoryId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};