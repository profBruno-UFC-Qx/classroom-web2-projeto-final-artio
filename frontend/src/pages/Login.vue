<script setup lang="ts">
import Body from "../components/Body.vue";
import TextButton from "../components/TextButton.vue";
</script>
<template>
  <Body>
    <div class="logo-container m-10">
      <img src="../assets/logo-full.svg" />
    </div>

    <div class="login-container w-full p-8">
      <h2 class="alice-regular text-2xl mb-6">Login</h2>
      <form class="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          class="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          class="border border-gray-300 rounded-md p-2"
        />
        <router-link to="/dashboard">
          <TextButton color="purple" class="mt-4 w-full">Entrar</TextButton>
        </router-link>
      </form>
      <p class="flex w-full justify-center mt-4">
        Não possui uma conta?
        <a href="/register" class="text-blue hover:underline"> Cadastre-se</a>
      </p>
    </div>
  </Body>
</template>
<style scoped></style>
