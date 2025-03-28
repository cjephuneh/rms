const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Create a new category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, description, active, displayOrder } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category with this name already exists" });
    }

    const category = new Category({
      name,
      description,
      active,
      displayOrder
    });

    await category.save();

    res.status(201).json({ 
      message: "Category created successfully", 
      category
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Update a category (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, active, displayOrder } = req.body;

    // If updating name, check if it would clash with existing category
    if (name) {
      const existingCategory = await Category.findOne({ 
        name, 
        _id: { $ne: categoryId } 
      });
      
      if (existingCategory) {
        return res.status(400).json({ error: "Category with this name already exists" });
      }
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, description, active, displayOrder },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ 
      message: "Category updated successfully", 
      category
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete a category (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    // Check if any menu items use this category
    const menuItemsCount = await MenuItem.countDocuments({ categoryId });
    if (menuItemsCount > 0) {
      return res.status(400).json({ 
        error: "Cannot delete category that has menu items. Please reassign or delete those items first.",
        itemCount: menuItemsCount
      });
    }
    
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
