<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Project } from "../types/project";
import api from "../services/api";
import PageLayout from "../components/PageLayout.vue";
import StatusBanner from "../components/StatusBanner.vue";
import TextButton from "../components/TextButton.vue";
import { ArrowLeft } from "lucide-vue-next";

const route = useRoute();
const projectId = route.params.projectId as string;
const backLink = (route.query.back as string) || "/projects";

const project = ref<Project | null>(null);
onMounted(async () => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    project.value = response.data;
    console.log("Project data:", project.value);
  } catch (error) {
    console.error("Erro ao buscar dados do projeto:", error);
  }
});

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("pt-BR");
}
</script>
<template>
  <PageLayout>
    <div v-if="project" class="project-details w-full p-4 flex flex-col gap-4">
      <router-link :to="backLink">
        <TextButton>
          <ArrowLeft />
        </TextButton>
      </router-link>
      <div
        class="w-full sketch-blue h-40 rounded-lg flex justify-center items-center"
      >
        <!-- Banner ou imagem do projeto -->
        placeholder
      </div>
      <h1 class="text-2xl font-bold ade-display">{{ project.name }}</h1>
      <p><strong>Autor:</strong> {{ project.authorId }}</p>
      <div class="status-div flex flex-row gap-4">
        <StatusBanner :status="project.status" />
        <StatusBanner :status="project.isPublic ? 'PUBLIC' : 'PRIVATE'" />
      </div>
      <div
        class="description alice-regular min-w-full bg-gray-100 p-4 rounded-lg text-gray-800"
      >
        {{ project.description }}
        <div class="w-full justify-end">
          <p class="text-sm text-gray-600 mt-2">
            Criado em: {{ formatDate(project.createdAt) }}
          </p>
          <p class="text-sm text-gray-600 mt-2">
            Última atualização: {{ formatDate(project.updatedAt) }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Carregando projeto...</p>
    </div>
  </PageLayout>
</template>
