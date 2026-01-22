<script setup lang="ts">
import PageLayout from "../components/PageLayout.vue";
import TextButton from "../components/TextButton.vue";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import { useProjectStore } from "../stores/projectStore";
import type { Project } from "../types/project";

const authenticated = ref(useAuthStore().isAuthenticated);
const projectStore = useProjectStore();

const projects = ref<Project[]>([]);
async function fetchFeaturedProjects() {
  try {
    const allProjects = await projectStore.fetchAll();
    // Assuming featured projects are determined by some criteria, e.g., most recent or highest rated
    projects.value = allProjects.slice(0, 5); // Example: take first 5 projects as featured
  } catch (error) {
    console.error("Erro ao buscar projetos em destaque:", error);
  }
}
fetchFeaturedProjects();
</script>
<template>
  <PageLayout>
    <div class="main-title flex flex-col items-center">
      <div
        class="title-conteiner p-4 mt-10 flex flex-col justify-center items-center w-3/4 rounded-lg"
      >
        <img src="/src/assets/logo-full.svg" alt="Artio Logo" class="w-72" />
        <h2 class="alice-regular text-xl text-center mt-4">
          Bem vindo ao Artio, sua plataforma de gerenciamento de arte digital.
        </h2>
      </div>
      <div class="action-buttons flex gap-4 mt-6">
        <router-link to="/not-found">
          <TextButton>Primeiros Passos</TextButton>
        </router-link>
        <div v-if="authenticated">
          <router-link to="/dashboard">
            <TextButton>Dashboard</TextButton>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/login">
            <TextButton>Login</TextButton>
          </router-link>
        </div>
      </div>
      <div class="projects w-full">
        <div class="project-container w-full flex flex-col gap-4 mt-10">
          <div
            class="title-container flex flex-row justify-between items-center pr-4"
          >
            <h2 class="alice-bold text-2xl">Projetos em Destaque</h2>
          </div>
          <div
            class="projects-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <div
              v-for="project in projects"
              :key="project.id"
              class="project-card border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 class="text-lg font-bold mb-2">{{ project.name }}</h3>
              <p class="text-sm text-gray-600 mb-4">
                {{ project.description }}
              </p>
              <router-link :to="`/project/${project.id}`">
                <TextButton>Ver Projeto</TextButton>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<style scoped></style>
