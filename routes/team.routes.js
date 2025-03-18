const express = require("express");
const { 
  getAllStaff, 
  addTeamMember, 
  getStaffStats, 
  updateTeamMember,
  deleteTeamMember 
} = require("../controllers/team.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllStaff);
router.post("/", authMiddleware, roleMiddleware(["admin"]), addTeamMember);
router.get("/:userId/stats", authMiddleware, roleMiddleware(["admin"]), getStaffStats);
router.put("/:userId", authMiddleware, roleMiddleware(["admin"]), updateTeamMember);
router.delete("/:userId", authMiddleware, roleMiddleware(["admin"]), deleteTeamMember);

module.exports = router;
