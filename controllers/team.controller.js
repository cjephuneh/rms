const User = require("../models/User");
const Order = require("../models/Order");

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const { role } = req.query; // Filter by role if provided
    const filter = role ? { role } : { role: { $ne: "customer" } };

    const staff = await User.find(filter).select("-password");
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff members" });
  }
};

// Add a team member
exports.addTeamMember = async (req, res) => {
  try {
    const { name, email, role, userTitle, permissions } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Generate a random password that will be changed on first login
    const tempPassword = Math.random().toString(36).slice(-8);
    
    const user = new User({ 
      name, 
      email, 
      role, 
      userTitle, 
      permissions,
      password: tempPassword 
    });
    
    await user.save();

    // TODO: Send invitation email with temporary password

    res.status(201).json({ 
      message: "Team member added successfully", 
      tempPassword // Only for development, remove in production
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add team member" });
  }
};

// Get staff member performance stats
exports.getStaffStats = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const staff = await User.findById(userId).select("-password");
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    
    let stats = { orders: 0, avgTime: 0, totalAmount: 0 };
    
    if (staff.role === "waiter") {
      const orders = await Order.find({ assignedWaiter: userId });
      stats.orders = orders.length;
      stats.tablesServed = [...new Set(orders.map(o => o.tableNumber))].length;
      stats.totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    } 
    else if (staff.role === "kitchen") {
      const orders = await Order.find({ 
        status: { $in: ["preparing", "ready", "served", "completed"] }
      });
      stats.orders = orders.length;
      stats.avgPrepTime = orders.reduce((sum, o) => o.preparationTime ? sum + o.preparationTime : sum, 0) / (orders.length || 1);
    } 
    else if (staff.role === "delivery") {
      const orders = await Order.find({ assignedRider: userId });
      stats.orders = orders.length;
      stats.completed = orders.filter(o => o.status === "delivered").length;
      stats.avgDeliveryTime = orders.reduce((sum, o) => o.deliveryTime ? sum + o.deliveryTime : sum, 0) / (orders.length || 1);
    }

    res.json({ staff, stats });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff stats" });
  }
};

// Update team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, userTitle, permissions } = req.body;

    const user = await User.findByIdAndUpdate(
      userId, 
      { role, userTitle, permissions }, 
      { new: true }
    ).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({ message: "Team member updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
};
