import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
  getTasks,
} from "../controllers/taskController.js";

const route = express.Router();

route.post("/tasks", verifyToken, createTask);
route.get("/tasks", verifyToken, getTasks);
route.get("/tasks/:id", verifyToken, getTaskById);
route.put("/tasks/:id", verifyToken, editTask);
route.delete("/tasks/:id", verifyToken, deleteTask);

export default route;
