import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Car from "../models/Car.js";

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong during registration" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = genToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong during login" });
  }
};

// Get current user data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error("Get User Data Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user data" });
  }
};

// Upgrade user to owner
export const becomeOwner = async (req, res) => {
  try {
    const { pass } = req.body;
    if (pass !== "admin123") {
      return res.status(401).json({ success: false, message: "Invalid owner password" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role = "owner";
    await user.save();

    const token = genToken(user._id);

    res.json({
      success: true,
      message: "Role upgraded to owner",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Become Owner Error:", error);
    res.status(500).json({ success: false, message: "Role upgrade failed" });
  }
};

export const getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id });
    res.json({ success: true, cars });
  } catch (error) {
    console.error("Get User Cars Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user's cars" });
  }
};
