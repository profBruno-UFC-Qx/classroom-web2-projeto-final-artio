import { defineStore } from "pinia";
import api from "../services/api";

export const useProjectStore = defineStore("project", () => {
  async function createProject(projectData: {
    title: string;
    description: string;
    isPublic: boolean;
    username: string;
  }) {
    try {
      const response = await api.post("/projects", projectData);
      console.log("Project creation response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Project creation failed:", error);
      throw error;
    }
  }

  return {
    createProject,
  };
});
