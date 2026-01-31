import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/project/:projectId", authMiddleware, getTasksByProject);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
