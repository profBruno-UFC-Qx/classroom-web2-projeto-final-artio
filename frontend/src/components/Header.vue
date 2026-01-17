<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";
import TextButton from "./TextButton.vue";
import { ref } from "vue";

const authenticated = ref(useAuthStore().isAuthenticated);
</script>
<template>
  <header
    class="navbar w-full h-20 bg-gradient-to-b from-white to-transparent flex flex-row justify-between p-4 items-center px-10"
  >
    <div class="flex flex-row items-center gap-4">
      <div class="bg-gray-800 rounded-full h-4 w-4">
        <!-- placeholder for the hamburger menu icon -->
      </div>
      <router-link to="/">
        <img
          src="/src/assets/logo-transparent.svg"
          alt="Artio Logo"
          class="size-12"
        />
      </router-link>
    </div>
    <div v-if="authenticated">
      <router-link to="/profile" class="mr-4">
        <div class="bg-gray-800 rounded-full h-4 w-4">
          <!-- placeholder for the profile menu icon -->
        </div>
      </router-link>
    </div>
    <div v-else>
      <text-button to="/register" class="mr-4">Registrar-se</text-button>
    </div>
  </header>
</template>
<style scoped></style>
