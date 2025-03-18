const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const User = require("../models/User");

// Get Admin Dashboard Overview
exports.getDashboardStats = async (req, res) => {
  try {
    // Overall stats
    const totalRevenue = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    
    const totalMenus = await MenuItem.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalOrders = await Order.countDocuments();
    
    // Order stats
    const completedOrders = await Order.countDocuments({ status: "completed" });
    const completedOrdersAmount = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });
    const cancelledOrdersAmount = await Order.aggregate([
      { $match: { status: "cancelled" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    
    // Staff stats
    const waiterStats = await User.aggregate([
      { $match: { role: "waiter" } },
      { $count: "total" }
    ]);
    
    const kitchenStats = await User.aggregate([
      { $match: { role: "kitchen" } },
      { $count: "total" }
    ]);
    
    const deliveryStats = await User.aggregate([
      { $match: { role: "delivery" } },
      { $count: "total" }
    ]);

    res.json({
      overview: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalMenus,
        totalCustomers,
        totalOrders
      },
      orders: {
        completedOrders,
        completedOrdersAmount: completedOrdersAmount[0]?.total || 0,
        cancelledOrders,
        cancelledOrdersAmount: cancelledOrdersAmount[0]?.total || 0
      },
      staff: {
        waiters: waiterStats[0]?.total || 0,
        kitchen: kitchenStats[0]?.total || 0,
        delivery: deliveryStats[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

// Get Customer Statistics
exports.getCustomerStats = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" }).select("-password");
    
    const customerStats = [];
    
    for (const customer of customers) {
      const orders = await Order.find({ customerId: customer._id });
      const deliveries = await Order.find({ customerId: customer._id, type: "delivery" });
      const cancelled = await Order.find({ customerId: customer._id, status: "cancelled" });
      
      customerStats.push({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        joinedOn: customer.createdAt,
        orderedItems: orders.reduce((sum, order) => sum + order.items.length, 0),
        orderCount: orders.length,
        deliveryCount: deliveries.length,
        cancelledCount: cancelled.length,
        repeatCustomer: orders.length > 1
      });
    }
    
    res.json(customerStats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer statistics" });
  }
};
