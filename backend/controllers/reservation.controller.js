const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const { clientName, phoneNumber, tableNumber, guestCount, date, time, notes } = req.body;
    
    // Check if table exists
    const table = await Table.findById(tableNumber);
    if (!table) {
      return res.status(400).json({ error: "Table not found" });
    }
    
    // Check if table capacity is sufficient
    if (table.sittingCapacity < guestCount) {
      return res.status(400).json({ error: "Table capacity is not sufficient for this reservation" });
    }
    
    // Check if table is already reserved at this time
    const existingReservation = await Reservation.findOne({
      tableNumber,
      date: new Date(date),
      time,
      status: { $ne: "released" }
    });
    
    if (existingReservation) {
      return res.status(400).json({ error: "Table is already reserved at this time" });
    }
    
    const reservation = new Reservation({
      clientName,
      phoneNumber,
      tableNumber,
      guestCount,
      date,
      time,
      notes
    });
    
    await reservation.save();
    
    res.status(201).json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const { date, status } = req.query;
    
    // Build filter based on query params
    const filter = {};
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }
    if (status) {
      filter.status = status;
    }
    
    const reservations = await Reservation.find(filter)
      .populate("tableNumber", "tableNumber sittingCapacity")
      .sort({ date: 1, time: 1 });
    
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

// Update reservation status
exports.updateReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status, clientName, phoneNumber, guestCount, date, time, notes } = req.body;
    
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status, clientName, phoneNumber, guestCount, date, time, notes },
      { new: true }
    ).populate("tableNumber", "tableNumber sittingCapacity");
    
    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    
    res.json({ message: "Reservation updated successfully", reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({ error: "Failed to update reservation" });
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
    
    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
};
