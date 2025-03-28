const express = require("express");
const { createReview, getAllReviews, deleteReview } = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, createReview); // Customers submit reviews
router.get("/", getAllReviews); // Public - View reviews
router.delete("/:reviewId", authMiddleware, roleMiddleware(["admin"]), deleteReview); // Admin - Delete inappropriate reviews

module.exports = router;
