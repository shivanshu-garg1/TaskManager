import express from "express";
import {
  getAllUsers,
  addUsers,
  deleteUser,
} from "../controller/adminController.js";

import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.post("/add-user", protect, isAdmin, addUsers);
router.delete("/delete-user/:id", protect, isAdmin, deleteUser);

export default router;
