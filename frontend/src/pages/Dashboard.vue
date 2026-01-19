<script setup lang="ts">
import { ArrowLeft, Dot, Plus } from "lucide-vue-next";
import PageLayout from "../components/PageLayout.vue";
import TextButton from "../components/TextButton.vue";
import { useAuthStore } from "../stores/authStore";
import { useProjectStore } from "../stores/projectStore";
import router from "../router";
import { onMounted, ref } from "vue";
import ProjectMini from "../components/ProjectMini.vue";
import { type Project } from "../types/project";
import api from "../services/api";
import { type RequestProject } from "../types/request";
import RequestMini from "../components/RequestMini.vue";
import ViewRequest from "../components/ViewRequest.vue";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const user = authStore.user;
const projects = ref<Project[]>([]);
const requests = ref<RequestProject[]>([]);
const createModal = ref(false);
const selectedRequest = ref<RequestProject | null>(null);

function openCloseModal() {
  createModal.value = !createModal.value;
}

onMounted(async () => {
  if (user) {
    try {
      const fetchedProjects = await projectStore.fetchProjects({
        authorId: user.username,
      });
      projects.value = fetchedProjects;
      const response = await api.get(`/projects/request/${user.username}`);
      requests.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar projetos do usuário:", error);
    }
  }
});

function handleLogout() {
  const authStore = useAuthStore();
  authStore.logout();
  router.push({ name: "home" });
}
function onProjectCreated() {
  // Re-fetch projects after a new project is created
  api.get(`/projects/user/${user.username}`).then((response) => {
    projects.value = response.data;
  });
}
async function handleAcceptRequest() {
  projects.value = await projectStore.fetchProjects({
    authorId: user?.username,
  });
  requests.value = requests.value.filter(
    (r) => r.id !== selectedRequest.value?.id,
  );
  selectedRequest.value = null;
  openCloseModal();
}
</script>
<template>
  <PageLayout>
    <h1 class="text-2xl ade-display">
      Bem-vindo, <span class="alice-regular">{{ user.name }}</span>
    </h1>
    <div class="group my-2" id="quick-actions">
      <p class="text-lg alice-regular">Ações rápidas</p>
      <div class="quick-actions flex flex-row gap-4 justify-between mt-2">
        <router-link to="/">
          <TextButton>
            <ArrowLeft />
          </TextButton>
        </router-link>
        <TextButton color="purple">Projetos</TextButton>
        <TextButton color="green">Mensagens</TextButton>
        <TextButton color="yellow">Notificações</TextButton>
        <TextButton color="red" @click="handleLogout">Sair</TextButton>
        <button
          class="flex justify-center itens-center w-fit bg-gray-200 px-6 hover:bg-gray-300 hover:cursor-pointer py-2 border-gray-500 rounded-lg"
        >
          Configurações
        </button>
      </div>
    </div>
    <div class="group my-2" id="deliveries">
      <p class="text-lg alice-regular">Entregas para a semana</p>
      <div
        class="deliveries flex flex-col gap-4 mt-2 bg-gray-200 p-4 rounded-lg"
      >
        <p>Você não tem entregas para essa semana!</p>
        <!-- lista de itens -->
      </div>
    </div>
    <div class="group my-2" id="tasks">
      <p class="text-lg alice-regular">Tarefas pendentes</p>
      <div class="kanban-conteiner grid grid-cols-3 gap-4 mt-2">
        <div class="kanban-section bg-gray-200 p-4 rounded-lg">
          <h2>To Do</h2>
          <ul class="kanban-list">
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
          </ul>
        </div>
        <div class="kanban-section bg-gray-200 p-4 rounded-lg">
          <h2>To Do</h2>
          <ul class="kanban-list">
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
          </ul>
        </div>
        <div class="kanban-section bg-gray-200 p-4 rounded-lg">
          <h2>To Do</h2>
          <ul class="kanban-list">
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="project-container w-full flex flex-col gap-4 mt-4">
      <div
        class="title-container flex flex-row justify-between items-center pr-4"
      >
        <h2 class="alice-bold text-2xl">Projetos</h2>
        <div>
          <Plus
            class="size-5 cursor-pointer hover:text-gray-600"
            @click="openCloseModal"
          />
          <NewProjectModal
            v-if="createModal"
            :onClose="openCloseModal"
            :onProjectCreated="onProjectCreated"
          />
        </div>
      </div>
      <div
        class="project-list w-full flex flex-row gap-4 overflow-x-auto pb-4"
        v-if="projects && projects.length > 0"
      >
        <router-link :to="`/project/${p.id}`" v-for="p in projects" :key="p.id">
          <ProjectMini :project="p" />
        </router-link>
      </div>
      <p v-else>Nenhum projeto encontrado.</p>
    </div>

    <div class="request-container w-full flex flex-col gap-4 mt-4">
      <div
        class="title-container flex flex-row justify-between items-center pr-4"
      >
        <h2 class="alice-bold text-2xl">Requisições de Projeto</h2>
      </div>
      <div
        class="request-list w-full flex flex-row gap-4 overflow-x-auto pb-4"
        v-if="requests && requests.length > 0"
      >
        <RequestMini
          v-for="r in requests"
          :key="r.id"
          :request="r"
          @click="
            selectedRequest = r;
            openCloseModal();
          "
        />
      </div>
      <ViewRequest
        v-if="createModal && selectedRequest"
        :request="selectedRequest"
        :onClose="openCloseModal"
        @accept="handleAcceptRequest"
      />
      <p v-else>Nenhuma requisição encontrada.</p>
    </div>

    <div class="group my-2" id="recent-actions">
      <p class="text-lg alice-regular">Ações recentes</p>
      <div
        class="recent-actions flex flex-col gap-4 mt-2 bg-gray-200 p-4 rounded-lg"
      >
        <ul class="recent-actions-list">
          <li class="flex"><Dot /> Mensagem recente</li>
          <li class="flex"><Dot /> Projeto atualizado</li>
          <li class="flex"><Dot /> Nova notificação</li>
        </ul>
      </div>
    </div>
    <!-- conteiner -->
  </PageLayout>
</template>
<style scoped></style>
