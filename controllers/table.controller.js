const Table = require("../models/Table");
const User = require("../models/User");

// Create a new table
exports.createTable = async (req, res) => {
  try {
    const { tableNumber, waiterId, sittingCapacity } = req.body;

    // Check if table number already exists
    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(400).json({ error: "Table number already exists" });
    }

    // Validate waiter if provided
    if (waiterId) {
      const waiter = await User.findOne({ _id: waiterId, role: "waiter" });
      if (!waiter) {
        return res.status(400).json({ error: "Invalid waiter ID" });
      }
    }

    const table = new Table({
      tableNumber,
      waiterId,
      sittingCapacity
    });

    await table.save();

    res.status(201).json({ message: "Table created successfully", table });
  } catch (error) {
    res.status(500).json({ error: "Failed to create table" });
  }
};

// Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().populate("waiterId", "name email");
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tables" });
  }
};

// Update table
exports.updateTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    const { tableNumber, waiterId, sittingCapacity, status } = req.body;

    // Validate waiter if provided
    if (waiterId) {
      const waiter = await User.findOne({ _id: waiterId, role: "waiter" });
      if (!waiter) {
        return res.status(400).json({ error: "Invalid waiter ID" });
      }
    }

    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      { tableNumber, waiterId, sittingCapacity, status },
      { new: true }
    ).populate("waiterId", "name email");

    if (!updatedTable) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.json({ message: "Table updated successfully", table: updatedTable });
  } catch (error) {
    res.status(500).json({ error: "Failed to update table" });
  }
};

// Delete table
exports.deleteTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    
    const deletedTable = await Table.findByIdAndDelete(tableId);
    
    if (!deletedTable) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete table" });
  }
};
