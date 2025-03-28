const express = require("express");
const { 
  getAllStaff, 
  addTeamMember, 
  getStaffStats, 
  updateTeamMember,
  deleteTeamMember,
  getStaffByRole,
  recordWorkingHours,
  recordTips 
} = require("../controllers/team.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllStaff);
router.post("/", authMiddleware, roleMiddleware(["admin"]), addTeamMember);
router.get("/:userId/stats", authMiddleware, roleMiddleware(["admin"]), getStaffStats);
router.put("/:userId", authMiddleware, roleMiddleware(["admin"]), updateTeamMember);
router.delete("/:userId", authMiddleware, roleMiddleware(["admin"]), deleteTeamMember);

// New staff-specific routes
router.get("/role/:role", authMiddleware, roleMiddleware(["admin"]), getStaffByRole);
router.post("/:userId/hours", authMiddleware, roleMiddleware(["admin"]), recordWorkingHours);
router.post("/:userId/tips", authMiddleware, roleMiddleware(["admin", "waiter"]), recordTips);

module.exports = router;
