const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createSubcategory,
  getAllSubcategories,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategoryController");

router.post("/", authMiddleware, createSubcategory);
router.get("/", authMiddleware, getAllSubcategories);
router.put("/:id", authMiddleware, updateSubcategory);
router.delete("/:id", authMiddleware, deleteSubcategory);

module.exports = router;