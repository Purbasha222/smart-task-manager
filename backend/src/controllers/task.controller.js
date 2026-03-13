import Task from "../models/task.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// Create Task

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body, "Running");

  // validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  const task = await Task.create({
    title,
    description,
    userId: req.userId,
  });

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
});

// Get all Tasks

export const getTasks = asyncHandler(async (req, res) => {
  const { search, sort } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  let sortOption = {};
  if (sort === "asc") sortOption.createdAt = 1;
  else sortOption.createdAt = -1;

  const tasks = await Task.find({ userId: req.userId }).sort(sortOption);

  return res.status(201).json({
    success: true,
    message: "Tasks fetched successfully",
    data: tasks,
  });
});

// Get Task by ID

export const getTaskByID = asyncHandler(async (req, res) => {
  // finding task by id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID",
    });
  }

  const task = await Task.findOne({ _id: id, userId: req.userId });

  // if task not found
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    sucess: true,
    message: "Task fetched successfully",
    data: task,
  });
});

// Update Task by ID

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID",
    });
  }

  // Valid Input
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  // Find and update task
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { title, description },
    { new: true, runValidators: true },
  );

  // if task not found
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // if task updated
  return res.status(200).json({
    sucess: true,
    message: "Task updated successfully",
    data: task,
  });
});

// Toggle Task by ID

export const toggleTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID",
    });
  }

  const task = await Task.findOne({ _id: id, userId: req.userId });

  // if task not found
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // Toggle isCompleted status
  task.isCompleted = !task.isCompleted;
  await task.save();

  // If toggled successfully
  return res.status(200).json({
    sucess: true,
    message: "Task toggled successfully",
    data: task,
  });
});

// Delete Task by ID

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID",
    });
  }

  // Delete Task
  const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

  // if task not found
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // If task found and deleted
  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: task,
  });
});
