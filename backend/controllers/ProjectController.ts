import { Request, Response } from "express";
import prisma from "../models/PrismaClient";
import ProjectService from "../services/ProjectService";

class ProjectController {
  public static async getAllProjects(req: Request, res: Response) {
    const { page, pageSize } = req.query;
    try {
      const projects = await prisma.project.findMany({
        skip:
          page && pageSize ? (Number(page) - 1) * Number(pageSize) : undefined,
        take: pageSize ? Number(pageSize) : undefined,
      });
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  public static async createProject(req: Request, res: Response) {
    let { name, description, username, isPublic } = req.body;
    if (!name) {
      const totalProjects = await ProjectService.getProjectsByAuthor(username);
      name = "Untitled " + (totalProjects.length + 1);
    }

    try {
      const data = {
        name,
        description,
        isPublic: isPublic || false,
        author: { connect: { username: username } },
      };
      const newProject = await prisma.project.create({
        data: data,
      });
      console.log("New project created:", newProject);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  public static async getProjectsByAuthor(req: Request, res: Response) {
    let authorId = req.params.authorId.toString();
    const page = req.query.page
      ? parseInt(req.query.page as string)
      : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : undefined;
    try {
      let projects;
      if (page !== undefined && pageSize !== undefined) {
        projects = await ProjectService.getProjectsByAuthor(
          authorId,
          page,
          pageSize,
        );
      } else {
        projects = await ProjectService.getProjectsByAuthor(authorId);
      }
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  public static async getProjectById(req: Request, res: Response) {
    let projectId = req.params.projectId;
    if (Array.isArray(projectId)) {
      projectId = projectId[0];
    }
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  public static async createProjectRequest(req: Request, res: Response) {
    const artistId = req.params.artistId;
    const { clientId, title, description, startOffer } = req.body;
    try {
      const newRequest = await prisma.request.create({
        data: {
          title,
          description,
          startOffer,
          artist: { connect: { username: artistId.toString() } },
          client: { connect: { username: clientId } },
        },
      });
      console.log("New project request created:", newRequest);
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  public static async getProjectRequestsByArtist(req: Request, res: Response) {
    const artistId = req.params.artistId;
    try {
      const requests = await prisma.request.findMany({
        where: { artistId: artistId.toString() },
      });
      res.status(200).json(requests);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  public static async acceptProjectRequest(req: Request, res: Response) {
    const requestId = req.params.requestId;
    console.log("Accepting request with ID:", requestId);
    try {
      const request = await prisma.request.findUnique({
        where: { id: requestId.toString() },
      });
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      const newProject = await prisma.project.create({
        data: {
          name: request.title,
          description: request.description,
          isPublic: false,
          author: { connect: { username: request.artistId } },
        },
      });
      await prisma.request.delete({
        where: { id: requestId.toString() },
      });
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default ProjectController;
