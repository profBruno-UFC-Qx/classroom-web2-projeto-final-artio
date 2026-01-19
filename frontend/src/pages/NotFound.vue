<script setup lang="ts">
import PageLayout from "../components/PageLayout.vue";
import TextButton from "../components/TextButton.vue";
</script>
<template>
  <PageLayout>
    <div class="flex flex-col items-center justify-center h-full">
      <img src="../assets/logo-full.svg" alt="Not Found" class="w-64 mb-8" />
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-xl mb-8">Página não encontrada.</p>
      <router-link to="/">
        <TextButton>Voltar para a página inicial</TextButton>
      </router-link>
    </div>
  </PageLayout>
</template>
