<script setup lang="ts">
import { X } from "lucide-vue-next";
import ModalLayout from "./ModalLayout.vue";
import { ref } from "vue";
import { useRequestStore } from "../stores/requestStore";
import { useAuthStore } from "../stores/authStore";

const props = defineProps<{
  onClose: () => void;
  artistId: string;
}>();

const projectName = ref("");
const projectDescription = ref("");
const startOffer = ref<number | null>(null);
const clientId = ref<string | null>(null);

async function handleSubmit() {
  // Lógica para criar um novo projeto
  const authStore = useAuthStore();
  clientId.value = authStore.user?.username || null;
  if (!clientId.value) {
    console.error("Usuário não autenticado.");
    return;
  }
  try {
    await useRequestStore().createRequest({
      artistId: props.artistId,
      clientId: clientId.value,
      title: projectName.value,
      description: projectDescription.value,
      startOffer: startOffer.value || undefined,
    });
    props.onClose();
  } catch (error) {
    console.error("Erro ao criar o projeto:", error);
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
            v-model="projectName"
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
            v-model="projectDescription"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="start-offer" class="alice-regular">Oferta inicial</label>
          <input
            type="number"
            id="start-offer"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira a oferta inicial."
            v-model="startOffer"
          />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Criar Projeto
        </button>
      </form>
    </div>
  </ModalLayout>
</template>
