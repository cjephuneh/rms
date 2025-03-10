require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const security = require("./config/security");
const { connectDB } = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
security(app);

// Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/menu", require("./routes/menu.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/payments", require("./routes/payment.routes"));
app.use("/api/qrcode", require("./routes/qr.routes"));



module.exports = app;
