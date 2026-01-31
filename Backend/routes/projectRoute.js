// routes/project.routes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
