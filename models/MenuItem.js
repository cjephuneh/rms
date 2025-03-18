const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }, // URL to food image
  available: { type: Boolean, default: true },
  discount: { type: Number, default: 0 }, // Discount percentage
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
