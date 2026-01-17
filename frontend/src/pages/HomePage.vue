<script setup lang="ts">
import PageLayout from "../components/PageLayout.vue";
import TextButton from "../components/TextButton.vue";
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
        <TextButton>Primeiros Passos</TextButton>
        <router-link to="/login">
          <TextButton>Login</TextButton>
        </router-link>
      </div>
    </div>
  </PageLayout>
</template>
<style scoped></style>
