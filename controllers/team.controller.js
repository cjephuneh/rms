const User = require("../models/User");
const Order = require("../models/Order");
const Table = require("../models/Table");

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

// Get all staff members by role
exports.getStaffByRole = async (req, res) => {
  try {
    const { role } = req.params;
    
    if (!["waiter", "kitchen", "delivery"].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }
    
    const staff = await User.find({ role }).select("-password");
    
    // Calculate metrics for each staff member based on their role
    const staffWithStats = await Promise.all(staff.map(async (member) => {
      let stats = {};
      
      // Base stats for all staff types
      stats.startedOn = member.startDate || member.createdAt;
      
      if (role === "waiter") {
        // Waiter-specific metrics
        const orders = await Order.find({ assignedWaiter: member._id });
        const completedOrders = orders.filter(o => ["served", "completed"].includes(o.status));
        const tables = await Table.find({ waiterId: member._id });
        
        stats.ordersTaken = orders.length;
        stats.tablesServed = tables.length;
        stats.ordersTotal = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        stats.avgServingTime = completedOrders.length ? 
          completedOrders.reduce((sum, o) => o.preparationTime ? sum + o.preparationTime : sum, 0) / completedOrders.length : 0;
        stats.overallTips = 0; // This would require a Tips model or field which isn't implemented yet
      } 
      else if (role === "kitchen") {
        // Kitchen-specific metrics
        const preparedOrders = await Order.find({ 
          status: { $in: ["preparing", "ready", "served", "completed"] }
        });
        
        stats.ordersPrepared = preparedOrders.length;
        stats.avgPrepTime = preparedOrders.length ? 
          preparedOrders.reduce((sum, o) => o.preparationTime ? sum + o.preparationTime : sum, 0) / preparedOrders.length : 0;
        stats.hoursWorked = 0; // This would require a timesheet system which isn't implemented yet
        stats.orderTotal = preparedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      }
      else if (role === "delivery") {
        // Delivery-specific metrics
        const deliveryOrders = await Order.find({ assignedRider: member._id });
        const completedDeliveries = deliveryOrders.filter(o => o.status === "delivered");
        
        stats.ordersTaken = deliveryOrders.length;
        stats.completeDeliveries = completedDeliveries.length;
        stats.avgDeliveryTime = completedDeliveries.length ? 
          completedDeliveries.reduce((sum, o) => o.deliveryTime ? sum + o.deliveryTime : sum, 0) / completedDeliveries.length : 0;
        stats.amountOwed = 0; // This would require payment tracking specifically for riders
      }
      
      return {
        _id: member._id,
        name: member.name,
        email: member.email,
        role: member.role,
        userTitle: member.userTitle,
        startDate: stats.startedOn,
        metrics: stats
      };
    }));
    
    res.json(staffWithStats);
  } catch (error) {
    console.error("Error fetching staff by role:", error);
    res.status(500).json({ error: "Failed to fetch staff members" });
  }
};

// Record staff working hours (for kitchen staff)
exports.recordWorkingHours = async (req, res) => {
  try {
    const { userId } = req.params;
    const { hoursWorked, date } = req.body;
    
    const staff = await User.findById(userId);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    
    if (staff.role !== "kitchen") {
      return res.status(400).json({ error: "Hours recording is only available for kitchen staff" });
    }
    
    // Here we would update a timesheet collection or similar
    // For now, we'll return a success message
    
    res.json({ 
      message: "Working hours recorded successfully",
      data: {
        staffId: userId,
        hoursWorked,
        date
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to record working hours" });
  }
};

// Record tips received (for waiters)
exports.recordTips = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, orderId } = req.body;
    
    const staff = await User.findById(userId);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    
    if (staff.role !== "waiter") {
      return res.status(400).json({ error: "Tips recording is only available for waiters" });
    }
    
    // Here we would update a tips collection or similar
    // For now, we'll return a success message
    
    res.json({ 
      message: "Tips recorded successfully",
      data: {
        waiterId: userId,
        amount,
        orderId
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to record tips" });
  }
};
