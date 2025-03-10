const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Appetizers", "Main Course"
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }, // URL to food image
  available: { type: Boolean, default: true }, // Mark as "Out of Stock" if needed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
