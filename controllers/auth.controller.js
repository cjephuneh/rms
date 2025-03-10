const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// 🔐 Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create and save new user
    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// 🔑 Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Validate user
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, role: user.role, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// 👤 Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};
