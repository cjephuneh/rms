const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["customer", "waiter", "kitchen", "delivery", "admin"], 
    default: "customer" 
  },
  userTitle: { type: String },
  permissions: {
    takeOrders: { type: Boolean, default: false },
    viewMenu: { type: Boolean, default: true },
    manageMenu: { type: Boolean, default: false },
    manageTables: { type: Boolean, default: false },
  },
  startDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
