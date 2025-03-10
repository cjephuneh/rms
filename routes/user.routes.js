const express = require("express");
const { getUserProfile, updateUserProfile, getAllUsers, deleteUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile); // Logged-in users view profile
router.put("/profile", authMiddleware, updateUserProfile); // Users update profile
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers); // Admin gets all users
router.delete("/:userId", authMiddleware, roleMiddleware(["admin"]), deleteUser); // Admin deletes a user

module.exports = router;
