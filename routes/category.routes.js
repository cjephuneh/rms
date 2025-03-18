const express = require("express");
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// Public route - anyone can view categories
router.get("/", getAllCategories);

// Admin-only routes for managing categories
router.post("/", authMiddleware, roleMiddleware(["admin"]), createCategory);
router.put("/:categoryId", authMiddleware, roleMiddleware(["admin"]), updateCategory);
router.delete("/:categoryId", authMiddleware, roleMiddleware(["admin"]), deleteCategory);

module.exports = router;
