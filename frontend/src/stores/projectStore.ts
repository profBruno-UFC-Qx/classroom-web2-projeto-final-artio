import { defineStore } from "pinia";
import api from "../services/api";
import type { Project } from "../types/project";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<Project[]>([]);

  async function fetchProjects(requestData?: {
    authorId: string;
    page?: number;
    pageSize?: number;
  }) {
    console.log("Fetching projects with requestData:", requestData);
    try {
      const response = await api.get("/projects", { params: requestData });
      projects.value.splice(0, projects.value.length, ...response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }
  async function createProject(projectData: {
    name: string;
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
    fetchProjects,
    projects,
  };
});
