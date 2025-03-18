const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// 🛒 Place a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, type, tableNumber, deliveryAddress } = req.body;
    const customerId = req.user.id;

    // Validate items
    let totalAmount = 0;
    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) return res.status(404).json({ error: "Menu item not found" });
      totalAmount += menuItem.price * item.quantity;
    }

    const order = new Order({ customerId, items, totalAmount, type, tableNumber, deliveryAddress });
    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

// 📦 Get orders (Customer)
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id }).populate("items.menuItem");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// 📊 Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customerId", "name email").populate("items.menuItem");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// // 🔄 Update order status (Kitchen/Delivery Staff)
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     if (!["pending", "preparing", "ready", "delivered"].includes(status)) {
//       return res.status(400).json({ error: "Invalid status" });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ error: "Order not found" });

//     order.status = status;
//     await order.save();

//     res.json({ message: "Order status updated", order });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update order status" });
//   }
// };


// 🔄 Update order status (Admin, Waiter, Rider)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["waiting", "preparing", "ready", "delivered", "canceled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};
