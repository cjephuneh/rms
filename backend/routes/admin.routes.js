const express = require("express");
const { getDashboardStats } = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, roleMiddleware(["admin"]), getDashboardStats);

module.exports = router;
