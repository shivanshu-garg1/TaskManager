import express from "express";
import cors from "cors";
import "../Backend/config/env.js";
import connectDB from "../Backend/config/db.js";
import authRoutes from "../Backend/routes/authRoute.js";
import adminRoutes from "../Backend/routes/adminRoute.js";
import projectRoutes from "../Backend/routes/projectRoute.js";
import taskRoutes from "../Backend/routes/taskRoute.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server Started at https:localhost:${port}`);
});
