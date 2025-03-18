const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  tableNumber: { 
    type: String, 
    required: true,
    unique: true
  },
  waiterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  sittingCapacity: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["available", "occupied", "reserved"], 
    default: "available" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Table", TableSchema);
