const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  clientName: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  tableNumber: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  guestCount: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  notes: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ["waiting", "arrived", "released"], 
    default: "waiting" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
