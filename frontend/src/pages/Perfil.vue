<script setup lang="ts">
import { computed, ref } from "vue";
import PageLayout from "../components/PageLayout.vue";
import { useAuthStore } from "../stores/authStore";
import { ArrowLeft, Pencil, Plus } from "lucide-vue-next";
import TextButton from "../components/TextButton.vue";
import router from "../router";
import NewProjectModal from "../components/NewProjectModal.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../services/api";
import ProjectMini from "../components/ProjectMini.vue";
import type { Project } from "../types/project";
import NewRequest from "../components/NewRequest.vue";
import { useProjectStore } from "../stores/projectStore";
import { watch } from "vue";

const route = useRoute();
const name = ref("");
const username = ref("");
const description = ref("");
const createModal = ref(false);
const projects = ref<Project[] | null>(null);

const authStore = useAuthStore();
const isOwnProfile = computed(() => {
  return authStore.user && authStore.user.username === route.params.username;
});

async function fetchProfileData() {
  const userId = route.params.username as string;
  try {
    const response = await api.get(`/profile/${userId}`);
    const userData = response.data;
    console.log("Projects response data:", userData);
    name.value = userData.name;
    username.value = userData.username;
    description.value = userData.description || "Sem descrição disponível.";

    const projectsResponse = await useProjectStore().fetchProjects({
      authorId: userId,
    });
    projects.value = projectsResponse;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    router.push({ name: "not-found" });
  }
}

onMounted(fetchProfileData);

watch(() => route.params.username, fetchProfileData);

function handleLogout() {
  const authStore = useAuthStore();
  authStore.logout();
  router.push({ name: "home" });
}

function onProjectCreated() {
  // Re-fetch projects after a new project is created
  fetchProfileData();
}
function openCloseModal() {
  createModal.value = !createModal.value;
}
</script>
<template>
  <PageLayout>
    <div class="profile-container items-start p-4 w-full gap-4 flex flex-col">
      <router-link to="/">
        <TextButton>
          <arrow-left />
        </TextButton>
      </router-link>
      <h1 class="ade-display text-2xl">Perfil de Usuário</h1>
      <div
        class="icon-container grid grid-cols-6 gap-4 items-center mt-4 w-full"
      >
        <!-- Placeholder for user icon -->
        <div
          class="bg-gray-800 rounded-full size-20 lg:size-30 align-center mx-auto"
        ></div>
        <div class="col-span-5 justify-end">
          <div
            class="title-container flex flex-row justify-between items-center pr-4"
          >
            <p class="alice-bold text-xl">{{ name }}</p>
            <p>{{ username }}</p>
            <div>
              <!-- Placeholder for edit profile button -->
              <pencil class="size-5 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
          <p>{{ description }}</p>
        </div>
      </div>
      <br class="m-4" />
      <div
        class="quick-actions flex flex-row gap-4 justify-between mt-2"
        v-if="isOwnProfile"
      >
        <router-link to="/dashboard">
          <TextButton color="purple">Dashboard</TextButton>
        </router-link>
        <TextButton color="red" @click="handleLogout">Logout</TextButton>
      </div>
      <div v-else>
        <TextButton color="purple" @click="openCloseModal"
          >Requisitar projeto</TextButton
        >
      </div>
      <div v-if="createModal && !isOwnProfile">
        <NewRequest :onClose="openCloseModal" :artistId="username" />
      </div>
      <div class="project-container w-full flex flex-col gap-4 mt-4">
        <div
          class="title-container flex flex-row justify-between items-center pr-4"
        >
          <h2 class="alice-bold text-2xl">Projetos</h2>
          <div v-if="isOwnProfile">
            <plus
              class="size-5 cursor-pointer hover:text-gray-600"
              @click="openCloseModal"
            />
            <NewProjectModal
              v-if="createModal && isOwnProfile"
              :onClose="openCloseModal"
              :onProjectCreated="onProjectCreated"
            />
          </div>
        </div>
        <div
          class="project-list w-full flex flex-row gap-4 overflow-x-auto pb-4"
          v-if="projects && projects.length > 0"
        >
          <router-link
            :to="`/project/${p.id}`"
            v-for="p in projects"
            :key="p.id"
          >
            <ProjectMini :project="p" />
          </router-link>
        </div>
        <p v-else>Nenhum projeto encontrado.</p>
      </div>
    </div>
  </PageLayout>
</template>
<style scoped></style>
