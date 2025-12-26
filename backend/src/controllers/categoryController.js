const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

exports.createCategory = async (req, res) => {
  try {
    const { name, image, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = new Category({
      name,
      image,
      status: status || "Active",
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, image, status },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has subcategories
    const subcategories = await Subcategory.find({ categoryId: id });
    if (subcategories.length > 0) {
      return res.status(400).json({
        message: "Cannot delete category with existing subcategories",
      });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};