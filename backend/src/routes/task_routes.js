import express from "express";
import {
  createTask,
  getTaskByID,
  getTasks,
  updateTask,
  toggleTask,
  deleteTask,
} from "../controllers/task.controller.js";
import auth from "../middlewares/auth.middleware.js";

const route = express.Router();

// Create Task

route.post("/add-task", auth, createTask);

// Get all Tasks

route.get("/", auth, getTasks);

// Get Task by ID

route.get("/:id", auth, getTaskByID);

// Update Task by ID

route.put("/update/:id", auth, updateTask);

// Toggle isCompleted status by ID

route.patch("/toggle/:id", auth, toggleTask);

// Delete Task by ID

route.delete("/delete/:id", auth, deleteTask);

export default route;
