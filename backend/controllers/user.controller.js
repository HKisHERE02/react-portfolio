import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    const saved = await user.save();
    res.status(201).json({ ...saved._doc, password: undefined });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users", error });
  }
};
