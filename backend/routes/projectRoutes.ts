import { Router } from "express";
import ProjectController from "../controllers/ProjectController";

const projectRoutes = Router();

projectRoutes.post("/", ProjectController.createProject);
projectRoutes.get("/author/:authorId", ProjectController.getProjectsByAuthor);
projectRoutes.get("/:projectId", ProjectController.getProjectById);

export default projectRoutes;
