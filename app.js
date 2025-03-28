require("dotenv").config();
const express = require("express");
const security = require("./config/security");
const { connectDB } = require("./config/db");

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
security(app);

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/menu", require("./routes/menu.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/payments", require("./routes/payment.routes"));
app.use("/api/qrcode", require("./routes/qr.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/tables", require("./routes/table.routes"));
app.use("/api/team", require("./routes/team.routes"));
app.use("/api/reservations", require("./routes/reservation.routes"));
app.use("/api/categories", require("./routes/category.routes"));

module.exports = app;
