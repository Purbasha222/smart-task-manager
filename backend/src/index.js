import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task_routes.js";
import userRoutes from "./routes/user_routes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import auth from "./middlewares/auth.middleware.js";

dotenv.config();

// Middlewares

const app = express();
app.use(cors());

// {
// origin: "*",
// methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// credentials: true,
// }
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, "Request");
  next();
});

// Connect to Database
connectDB();

// Routes

app.use("/api/tasks", auth, taskRoutes);
app.use("/api/auth", userRoutes);

// Error Handler

app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`),
);
