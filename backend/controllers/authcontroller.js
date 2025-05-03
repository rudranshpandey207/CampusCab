const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();
    res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Signup failed" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a token (optional)
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login successful!", userId: user._id, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = {
  signup,
  login,
};
