const express = require("express");
const { createMenuItem, getMenu, updateMenuItem, deleteMenuItem } = require("../controllers/menu.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", getMenu); // Public - View menu
router.post("/", authMiddleware, roleMiddleware(["admin"]), createMenuItem); // Admin - Add menu item
router.put("/:itemId", authMiddleware, roleMiddleware(["admin"]), updateMenuItem); // Admin - Edit menu item
router.delete("/:itemId", authMiddleware, roleMiddleware(["admin"]), deleteMenuItem); // Admin - Delete menu item

module.exports = router;
