//todo
const { processPayment } = require("../services/payment.service");
const Payment = require("../models/Payment");

// 💳 Initiate a Payment (Customer Only)
exports.initiatePayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod } = req.body;
    const customerId = req.user.id;

    const { clientSecret, payment } = await processPayment(orderId, customerId, amount, paymentMethod);

    res.status(201).json({ message: "Payment initiated", clientSecret, payment });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

// 📜 Get Payment History (Admin Only)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("customerId", "name email").populate("orderId");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

// 🔄 Update Payment Status (Admin Only)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "failed"].includes(status)) {
      return res.status(400).json({ error: "Invalid payment status" });
    }

    const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    res.json({ message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update payment status" });
  }
};
