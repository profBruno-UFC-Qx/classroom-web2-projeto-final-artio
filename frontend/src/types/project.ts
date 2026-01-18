export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: "ongoing" | "completed" | "on-hold";
  isPublic: boolean;
  authorId: string;
}
