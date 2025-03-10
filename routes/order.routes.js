const express = require("express");
const { createOrder, getCustomerOrders, getAllOrders, updateOrderStatus } = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, createOrder); // Customers place orders
router.get("/", authMiddleware, getCustomerOrders); // Customers get their orders
router.get("/all", authMiddleware, roleMiddleware(["admin"]), getAllOrders); // Admin gets all orders
router.put("/:orderId", authMiddleware, roleMiddleware(["waitstaff", "admin"]), updateOrderStatus); // Staff updates order

module.exports = router;
