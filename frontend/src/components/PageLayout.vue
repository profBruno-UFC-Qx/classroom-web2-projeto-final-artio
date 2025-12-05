<script setup lang="ts">
import Header from "./Header.vue";
</script>
<template>
  <Header />
  <div
    class="page-layout flex flex-row justify-center w-screen h-screen bg-repeat p-10"
  >
    <div class="rounded-lg bg-white shadow-lg p-10 w-7xl">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped></style>
