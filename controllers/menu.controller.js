const MenuItem = require("../models/MenuItem");

// 🍽 Create a new menu item (Admin only)
exports.createMenuItem = async (req, res) => {
  try {
    const { name, category, price, description, imageUrl } = req.body;

    const newItem = new MenuItem({ name, category, price, description, imageUrl });
    await newItem.save();

    res.status(201).json({ message: "Menu item added successfully", menuItem: newItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

// 📜 Get all menu items (Public)
exports.getMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
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
