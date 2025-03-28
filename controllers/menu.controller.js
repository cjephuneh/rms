const MenuItem = require("../models/MenuItem");
const Category = require("../models/Category");

// Get all menu items
exports.getMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("categoryId", "name");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

// Get menu items by category
exports.getMenuByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    const menuItems = await MenuItem.find({ categoryId });
    res.json({
      category,
      items: menuItems
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// Create a new menu item (Admin only)
exports.createMenuItem = async (req, res) => {
  try {
    const { name, categoryId, price, description, imageUrl, available, discount } = req.body;

    // Verify that the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const newItem = new MenuItem({ 
      name, 
      categoryId, 
      price, 
      description, 
      imageUrl,
      available,
      discount
    });
    
    await newItem.save();

    res.status(201).json({ 
      message: "Menu item added successfully", 
      menuItem: newItem 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

// 📝 Update a menu item (Admin only)
exports.updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const updatedData = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });

    res.json({ message: "Menu item updated successfully", menuItem: updatedItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

// ❌ Delete a menu item (Admin only)
exports.deleteMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedItem = await MenuItem.findByIdAndDelete(itemId);
    if (!deletedItem) return res.status(404).json({ error: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};
