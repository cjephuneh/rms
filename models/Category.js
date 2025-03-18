const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  description: { 
    type: String 
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  displayOrder: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Category", CategorySchema);
