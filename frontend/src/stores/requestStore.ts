import { defineStore } from "pinia";
import api from "../services/api";

export const useRequestStore = defineStore("request", () => {
  async function createRequest(requestData: {
    artistId: string;
    clientId: string;
    title: string;
    description: string;
    startOffer?: number;
  }) {
    try {
      const response = await api.post(
        `projects/request/${requestData.artistId}`,
        requestData,
      );
      console.log("Project creation response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Project creation failed:", error);
      throw error;
    }
  }

  async function acceptRequest(requestId: string) {
    try {
      const response = await api.post(`projects/request/accept/${requestId}`);
      console.log("Request acceptance response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Request acceptance failed:", error);
      throw error;
    }
  }

  return {
    createRequest,
    acceptRequest,
  };
});
