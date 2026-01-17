import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validate } from "../middlewares/validation";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), AuthController.register);
authRoutes.post("/login", validate(loginSchema), AuthController.login);

export default authRoutes;
