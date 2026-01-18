import { Router } from "express";
import authRoutes from "./authRoutes";
import projectRoutes from "./projectRoutes";
import profileRoutes from "./profileRoutes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/profile", profileRoutes);

export default router;
