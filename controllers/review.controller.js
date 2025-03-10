const Review = require("../models/Review");
const Order = require("../models/Order");

// ⭐ Submit a review (Only if user has completed an order)
exports.createReview = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;
    const customerId = req.user.id;

    // Check if the order exists & belongs to the customer
    const order = await Order.findOne({ _id: orderId, customerId });
    if (!order) return res.status(403).json({ error: "You can only review completed orders" });

    // Save review
    const review = new Review({ customerId, orderId, rating, comment });
    await review.save();

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit review" });
  }
};

// 📜 Get all reviews (Public)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("customerId", "name").populate("orderId");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// ❌ Delete a review (Admin only)
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
