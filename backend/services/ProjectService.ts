import prisma from "../models/PrismaClient";

class ProjectService {
  // Overload signatures
  public static async getProjectsByAuthor(authorId: string): Promise<any[]>;
  public static async getProjectsByAuthor(
    authorId: string,
    page: number,
    pageSize: number,
  ): Promise<any[]>;

  // Implementation
  public static async getProjectsByAuthor(
    authorId: string,
    page?: number,
    pageSize?: number,
  ): Promise<any[]> {
    if (typeof page === "number" && typeof pageSize === "number") {
      // Paginated
      return await prisma.project.findMany({
        where: { authorId },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    } else {
      // Non-paginated
      return await prisma.project.findMany({
        where: { authorId },
      });
    }
  }
}

export default ProjectService;
