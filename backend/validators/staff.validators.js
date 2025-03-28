const { body, param } = require("express-validator");

exports.recordHoursValidator = [
  param("userId").isMongoId().withMessage("Invalid staff ID"),
  body("hoursWorked").isFloat({ min: 0.5, max: 24 }).withMessage("Hours worked must be between 0.5 and 24"),
  body("date").optional().isDate().withMessage("Invalid date format")
];

exports.recordTipsValidator = [
  param("userId").isMongoId().withMessage("Invalid staff ID"),
  body("amount").isFloat({ min: 0 }).withMessage("Tips amount must be a positive number"),
  body("orderId").isMongoId().withMessage("Invalid order ID")
];

exports.staffRoleValidator = [
  param("role").isIn(["waiter", "kitchen", "delivery"]).withMessage("Invalid staff role")
];
