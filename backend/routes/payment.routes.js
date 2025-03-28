//todo
const express = require("express");
const { initiatePayment, getAllPayments, updatePaymentStatus } = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, initiatePayment); // Customers pay for orders
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllPayments); // Admin views all payments
router.put("/:paymentId", authMiddleware, roleMiddleware(["admin"]), updatePaymentStatus); // Admin updates payment status

module.exports = router;
