import { Router } from "express";
import AuthController from "../controllers/AuthController";

const profileRoutes = Router();

profileRoutes.get("/:id", AuthController.getUserById);

export default profileRoutes;
