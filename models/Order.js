const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  type: { type: String, enum: ["dining", "delivery"], required: true },
  tableNumber: { type: String },  // Only for dining orders
  deliveryAddress: { type: String },  // Only for delivery orders
  status: { type: String, enum: ["pending", "preparing", "ready", "delivered"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
