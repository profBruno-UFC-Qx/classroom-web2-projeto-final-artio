import { Router } from "express";
import ProjectController from "../controllers/ProjectController";

const projectRoutes = Router();

projectRoutes.post("/", ProjectController.createProject);
projectRoutes.get("/user/:authorId", ProjectController.getProjectsByAuthor);
projectRoutes.get("/:projectId", ProjectController.getProjectById);
projectRoutes.post(
  "/request/:artistId",
  ProjectController.createProjectRequest,
);
projectRoutes.get(
  "/request/:artistId",
  ProjectController.getProjectRequestsByArtist,
);
projectRoutes.post(
  "/request/accept/:requestId",
  ProjectController.acceptProjectRequest,
);

export default projectRoutes;
