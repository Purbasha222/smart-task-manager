import express from "express";
import { login, signUp } from "../controllers/user.controller.js";
import User from "../models/users.model.js";
import auth from "../middlewares/auth.middleware.js";

const route = express.Router();

// For SIGNUP

route.post("/signup", signUp);

// For LOGIN

route.post("/login", login);

// Protected Route

route.get("/profile", auth, (req, res) => {
  const user = User.findById(req.userId).select("-password");
  res.json({ message: "Profile Loaded", user });
});

export default route;
