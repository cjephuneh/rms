const express = require("express");
const { 
  createReservation, 
  getAllReservations, 
  updateReservation, 
  deleteReservation 
} = require("../controllers/reservation.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["admin", "waiter"]), createReservation);
router.get("/", authMiddleware, roleMiddleware(["admin", "waiter"]), getAllReservations);
router.put("/:reservationId", authMiddleware, roleMiddleware(["admin", "waiter"]), updateReservation);
router.delete("/:reservationId", authMiddleware, roleMiddleware(["admin"]), deleteReservation);

module.exports = router;
