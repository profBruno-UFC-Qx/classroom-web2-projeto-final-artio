<script setup lang="ts">
import { X } from "lucide-vue-next";
import ModalLayout from "./ModalLayout.vue";
import { ref } from "vue";
import { useProjectStore } from "../stores/projectStore";
import { useAuthStore } from "../stores/authStore";

const props = defineProps<{ onClose: () => void }>();

const projectName = ref("");
const projectDescription = ref("");
const isPublic = ref(false);

function togglePublic() {
  isPublic.value = !isPublic.value;
}
async function handleSubmit() {
  const sucess = await useProjectStore().createProject({
    title: projectName.value,
    description: projectDescription.value,
    isPublic: isPublic.value,
    username: useAuthStore().user.username,
  });
  if (sucess) {
    console.log("Projeto criado com sucesso!");
    props.onClose();
  } else {
    console.error("Falha ao criar o projeto. Tente novamente.");
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
        <!-- swiitch de projeto privado -->
        <div class="form-group flex items-center gap-2">
          <input
            type="checkbox"
            id="private-project"
            v-model="isPublic"
            @click="togglePublic"
          />
          <label for="private-project" class="alice-regular" v-if="!isPublic"
            >Projeto Privado</label
          >
          <label for="private-project" class="alice-regular" v-else
            >Projeto Público</label
          >
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
