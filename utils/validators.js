const { body } = require("express-validator");

exports.registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.menuValidator = [
  body("name").notEmpty().withMessage("Menu item name is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
];

exports.reviewValidator = [
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment").optional().isString().withMessage("Comment must be a string"),
];
