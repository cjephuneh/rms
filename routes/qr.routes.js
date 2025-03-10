const express = require("express");
const { getQRCode } = require("../controllers/qr.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/:tableNumber", authMiddleware, roleMiddleware(["admin"]), getQRCode); // Only admins can generate QR codes

module.exports = router;
