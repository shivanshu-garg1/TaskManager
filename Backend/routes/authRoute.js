import express from "express";
import auth from "../controller/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", auth.signUp);
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/me", protect, auth.getMe);

export default router;
