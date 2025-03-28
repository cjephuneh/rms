const express = require("express");
const { createTable, getAllTables, updateTable, deleteTable } = require("../controllers/table.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["admin"]), createTable);
router.get("/", authMiddleware, roleMiddleware(["admin", "waiter"]), getAllTables);
router.put("/:tableId", authMiddleware, roleMiddleware(["admin"]), updateTable);
router.delete("/:tableId", authMiddleware, roleMiddleware(["admin"]), deleteTable);

module.exports = router;
