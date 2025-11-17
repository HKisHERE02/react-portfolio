import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email exists" });
  user = new User({ name, email, password, role });
  await user.save();
  res.status(201).json({ message: "Signup success" });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  const match = await user.matchPassword(password);
  if (!match) return res.status(400).json({ message: "Invalid password" });
  const token = createToken(user);
  res.json({ token, user: { name: user.name, role: user.role, id: user._id } });
};
