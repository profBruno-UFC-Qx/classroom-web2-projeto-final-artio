<script setup lang="ts">
import { X } from "lucide-vue-next";
import ModalLayout from "./ModalLayout.vue";
import { ref } from "vue";
import { useRequestStore } from "../stores/requestStore";
import { useAuthStore } from "../stores/authStore";
import type { RequestProject } from "../types/request";

const props = defineProps<{
  request: RequestProject;
  onClose: () => void;
}>();

const projectName = ref(props.request.title);
const projectDescription = ref(props.request.description);
const startOffer = ref<number | null>(props.request.startOffer || null);
const clientId = ref<string | null>(props.request.clientId || null);

async function handleSubmit() {
  // Lógica para aceitar o projeto
  const authStore = useAuthStore();
  const userId = authStore.user?.username || null;
  if (!userId) {
    console.error("Usuário não autenticado.");
    return;
  }
  try {
    await useRequestStore().acceptRequest(props.request.id);
    props.onClose();
  } catch (error) {
    console.error("Erro ao aceitar o projeto:", error);
  }
}
</script>
<template>
  <ModalLayout>
    <div class="w-full flex flex-col justify-end items-end">
      <X class="hover:text-gray-600 cursor-pointer" @click="props.onClose" />
    </div>
    <div class="w-full flex flex-col gap-4">
      <h2 class="ade-display text-2xl">Criar Novo Projeto</h2>
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="project-name" class="alice-regular"
            >Nome do Projeto</label
          >
          <input
            type="text"
            id="project-name"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira o nome do projeto."
            :value="projectName"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="project-description" class="alice-regular"
            >Descrição do Projeto</label
          >
          <textarea
            id="project-description"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira a descrição do projeto."
            :value="projectDescription"
            disabled
          ></textarea>
        </div>
        <div class="form-group">
          <label for="start-offer" class="alice-regular">Oferta inicial</label>
          <input
            type="number"
            id="start-offer"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira a oferta inicial."
            :value="startOffer"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="client-id" class="alice-regular">ID do Cliente</label>
          <input
            type="text"
            id="client-id"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira o ID do cliente."
            :value="clientId"
            disabled
          />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Aceitar Projeto
        </button>
      </form>
    </div>
  </ModalLayout>
</template>
