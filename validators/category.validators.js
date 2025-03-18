const { body, param } = require("express-validator");

exports.createCategoryValidator = [
  body("name").notEmpty().withMessage("Category name is required").trim(),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("active").optional().isBoolean().withMessage("Active must be a boolean"),
  body("displayOrder").optional().isInt({ min: 0 }).withMessage("Display order must be a positive integer")
];

exports.updateCategoryValidator = [
  param("categoryId").isMongoId().withMessage("Invalid category ID"),
  body("name").optional().notEmpty().withMessage("Category name cannot be empty").trim(),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("active").optional().isBoolean().withMessage("Active must be a boolean"),
  body("displayOrder").optional().isInt({ min: 0 }).withMessage("Display order must be a positive integer")
];
