<script setup lang="ts">
import { ref } from "vue";
import PageLayout from "../components/PageLayout.vue";
import { useAuthStore } from "../stores/authStore";
import router from "../router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

async function handleLogin() {
  const sucess = await useAuthStore().login({
    email: email.value,
    password: password.value,
  });
  if (sucess) {
    // Redirecionar para a página principal ou dashboard após o login bem-sucedido
    console.log("Login realizado com sucesso!");
    errorMessage.value = "";
    router.push({ name: "home" });
  } else {
    // Exibir mensagem de erro
    errorMessage.value =
      "Falha no login. Verifique suas credenciais e tente novamente.";
    console.error(
      "Falha no login. Verifique suas credenciais e tente novamente.",
    );
  }
}
</script>
<template>
  <PageLayout>
    <h1 class="text-2xl ade-display">Login</h1>
    <div class="login-form mt-4 bg-gray-200 p-6 rounded-lg w-96">
      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username" class="alice-regular">Email</label>
          <input
            type="text"
            id="username"
            v-model="email"
            class="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>
        <div class="form-group">
          <label for="password" class="alice-regular">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>
        <div class="form-group" v-if="errorMessage">
          <p class="text-red-500">{{ errorMessage }}</p>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  </PageLayout>
</template>
