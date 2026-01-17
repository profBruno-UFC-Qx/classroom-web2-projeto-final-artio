import { computed, ref } from "vue";
import type { User } from "../types/user";
import { defineStore } from "pinia";
import api from "../services/api";

const initialUser = JSON.parse(localStorage.getItem("user") || "{}") as User;

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>(initialUser);

  const token = computed(() => user.value.jwt);
  const isAuthenticated = computed(() => !!user.value.jwt);

  async function login(credentials: { email: string; password: string }) {
    try {
      const response = await api.post("/auth/login", credentials);
      const { jwt, user: userData } = response.data;
      user.value = { ...userData, jwt };
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user.value));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  async function register(credentials: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await api.post("/auth/register", credentials);
      console.log("Registration response:", response);
      const { jwt, user: userData } = response.data;
      user.value = { ...userData, jwt };
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user.value));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }
  function logout() {
    user.value = {} as User;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
  };
});
