import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    return res.status(400).json({ message: "User already exists" });
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashedPassword });

  res.json({ message: "User created successfully" });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey123", { expiresIn: "7d" });

  res.json({ message: "Login successful", token });
});
