const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");

exports.processPayment = async (orderId, customerId, amount, paymentMethod) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      payment_method_types: ["card"]
    });

    const payment = new Payment({
      orderId,
      customerId,
      amount,
      status: "pending",
      paymentMethod,
      transactionId: paymentIntent.id
    });

    await payment.save();
    return { clientSecret: paymentIntent.client_secret, payment };
  } catch (error) {
    console.error("Payment processing failed:", error);
    throw new Error("Payment failed");
  }
};
