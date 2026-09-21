const express = require("express");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


router.get("/", authMiddleware, getCategories);


router.post("/", ...adminMiddleware, createCategory);


router.put("/:id", ...adminMiddleware, updateCategory);


router.delete("/:id", ...adminMiddleware, deleteCategory);

module.exports = router;