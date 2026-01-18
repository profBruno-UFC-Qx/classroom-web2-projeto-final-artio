<script setup lang="ts">
import { ref } from "vue";
import PageLayout from "../components/PageLayout.vue";
import { useAuthStore } from "../stores/authStore";
import router from "../router";

const email = ref("");
const password = ref("");
const nome = ref("");
const username = ref("");
const errorMessage = ref("");

async function handleRegister() {
  const sucess = await useAuthStore().register({
    name: nome.value,
    email: email.value,
    password: password.value,
    username: username.value,
  });
  if (sucess) {
    // Redirecionar para a página principal ou dashboard após o login bem-sucedido
    console.log("Cadastro realizado com sucesso!");
    errorMessage.value = "";
    router.push({ name: "home" });
  } else {
    // Exibir mensagem de erro
    errorMessage.value =
      "Falha no cadastro. Verifique suas credenciais e tente novamente.";
    console.error(
      "Falha no cadastro. Verifique suas credenciais e tente novamente.",
    );
  }
}
</script>
<template>
  <PageLayout>
    <div
      class="login-form mt-4 p-6 rounded-lg items-center justify-center mx-auto"
    >
      <h1 class="text-4xl ade-display text-center w-full">Cadastro</h1>
      <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username" class="alice-regular">Nome</label>
          <input
            type="text"
            id="name"
            v-model="nome"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira seu nome."
          />
        </div>
        <div class="form-group">
          <label for="username" class="alice-regular">Nome de usuário</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira seu nome."
          />
        </div>
        <div class="form-group">
          <label for="username" class="alice-regular">Email</label>
          <input
            type="text"
            id="username"
            v-model="email"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira seu email."
          />
        </div>
        <div class="form-group">
          <label for="password" class="alice-regular">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Insira sua senha."
          />
        </div>
        <div class="form-group" v-if="errorMessage">
          <p class="text-red-500">{{ errorMessage }}</p>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Cadastrar-se
        </button>
      </form>
      <p class="mt-4 alice-regular text-center">
        Já possui uma conta?
        <router-link to="/login" class="text-blue-500"
          >Faça login aqui</router-link
        >
      </p>
    </div>
  </PageLayout>
</template>
