import express from "express";
import {
  createTask,
  getTaskByID,
  getTasks,
  updateTask,
  toggleTask,
  deleteTask,
} from "../controllers/task.controller.js";

const route = express.Router();

// Create Task

route.post("/add-task", createTask);

// Get all Tasks

route.get("/", getTasks);

// Get Task by ID

route.get("/:id", getTaskByID);

// Update Task by ID

route.put("/update/:id", updateTask);

// Toggle isCompleted status by ID

route.patch("/toggle/:id", toggleTask);

// Delete Task by ID

route.delete("/delete/:id", deleteTask);

export default route;
