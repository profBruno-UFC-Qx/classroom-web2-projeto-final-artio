<script setup lang="ts">
import { ref } from "vue";
import PageLayout from "../components/PageLayout.vue";
import { useAuthStore } from "../stores/authStore";
import { ArrowLeft, Pencil } from "lucide-vue-next";
import TextButton from "../components/TextButton.vue";

const name = ref(useAuthStore().user?.name || "Usuário");
const description = ref("Descrição do usuário aqui.");
</script>
<template>
  <PageLayout>
    <div class="profile-container items-start p-4 w-full gap-4 flex flex-col">
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
            class="name-container flex flex-row justify-between items-center pr-4"
          >
            <p class="alice-bold text-xl">{{ name }}</p>
            <div>
              <!-- Placeholder for edit profile button -->
              <pencil class="size-5 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
          <p>{{ description }}</p>
        </div>
      </div>
      <br class="m-4" />
      <div class="quick-actions flex flex-row gap-4 justify-between mt-2">
        <router-link to="/">
          <TextButton>
            <arrow-left />
          </TextButton>
        </router-link>
        <TextButton color="purple">Dashboard</TextButton>
      </div>
      <div class="project-container">
        <h2 class="alice-bold text-2xl">Projetos</h2>
        <!-- Placeholder for user projects -->
        <p>Aqui estarão listados os projetos associados ao usuário.</p>
      </div>
    </div>
  </PageLayout>
</template>
<style scoped></style>
