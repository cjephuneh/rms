const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  customerName: { type: String }, // For non-logged in customers
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  type: { type: String, enum: ["dine-in", "takeaway", "delivery"], required: true },
  tableNumber: { type: String },  // Only for dining orders
  assignedWaiter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Waiter assigned
  assignedRider: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Delivery assigned
  deliveryAddress: { type: String },  // Only for delivery orders
  status: { 
    type: String, 
    enum: ["waiting", "preparing", "ready", "served", "delivered", "completed", "cancelled"], 
    default: "waiting" 
  },
  orderNumber: { type: String, unique: true },
  preparationTime: { type: Number }, // Time taken in minutes
  deliveryTime: { type: Number },    // Time taken in minutes
  createdAt: { type: Date, default: Date.now }
});

// Generate unique order number before saving
OrderSchema.pre("save", function(next) {
  if (!this.orderNumber) {
    const timestamp = new Date().getTime();
    this.orderNumber = `ORD-${Math.floor(Math.random() * 1000)}-${timestamp % 10000}`;
  }
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
