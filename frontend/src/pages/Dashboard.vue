<script setup lang="ts">
import { Dot } from "lucide-vue-next";
import PageLayout from "../components/PageLayout.vue";
</script>
<template>
  <PageLayout>
    <h1 class="text-2xl ade-display">
      Bem-vindo, <span class="alice-regular">user</span>
    </h1>
    <div class="group my-2" id="quick-actions">
      <p class="text-lg alice-regular">Ações rápidas</p>
      <div class="quick-actions flex flex-row gap-4 justify-between mt-2">
        <router-link to="/">
          <button
            class="flex justify-center itens-center w-fit bg-gray-200 px-6 hover:bg-gray-300 hover:cursor-pointer py-2 border-gray-500 border- rounded-lg"
          >
            Voltar
          </button>
        </router-link>
        <button
          class="flex justify-center itens-center w-fit bg-gray-200 px-6 hover:bg-gray-300 hover:cursor-pointer py-2 border-gray-500 border- rounded-lg"
        >
          Projetos
        </button>
        <button
          class="flex justify-center itens-center w-fit bg-gray-200 px-6 hover:bg-gray-300 hover:cursor-pointer py-2 border-gray-500 rounded-lg"
        >
          Mensagens
        </button>
        <button
          class="flex justify-center itens-center w-fit bg-gray-200 px-6 hover:bg-gray-300 hover:cursor-pointer py-2 border-gray-500 rounded-lg"
        >
          Notificações
        </button>
        <button
          class="flex justify-center itens-center w-fit bg-gray-200 px-6 hover:bg-gray-300 hover:cursor-pointer py-2 border-gray-500 rounded-lg"
        >
          Configurações
        </button>
      </div>
    </div>
    <div class="group my-2" id="deliveries">
      <p class="text-lg alice-regular">Entregas para a semana</p>
      <div
        class="deliveries flex flex-col gap-4 mt-2 bg-gray-200 p-4 rounded-lg"
      >
        <p>Você não tem entregas para essa semana!</p>
        <!-- lista de itens -->
      </div>
    </div>
    <div class="group my-2" id="tasks">
      <p class="text-lg alice-regular">Tarefas pendentes</p>
      <div class="kanban-conteiner grid grid-cols-3 gap-4 mt-2">
        <div class="kanban-section bg-gray-200 p-4 rounded-lg">
          <h2>To Do</h2>
          <ul class="kanban-list">
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
          </ul>
        </div>
        <div class="kanban-section bg-gray-200 p-4 rounded-lg">
          <h2>To Do</h2>
          <ul class="kanban-list">
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
          </ul>
        </div>
        <div class="kanban-section bg-gray-200 p-4 rounded-lg">
          <h2>To Do</h2>
          <ul class="kanban-list">
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
            <li class="kanban-item">Tarefa pendente</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="group my-2" id="active-projects">
      <p class="text-lg alice-regular">Projetos ativos</p>
      <div class="carousel">
        <div class="carousel-itens flex gap-4 mt-4">
          <div
            class="carousel-item size-48 bg-gray-200 border-2 border-gray-400 rounded-lg p-4"
          >
            placeholder
          </div>
          <div
            class="carousel-item size-48 bg-gray-200 border-2 border-gray-400 rounded-lg p-4"
          >
            placeholder
          </div>
          <div
            class="carousel-item size-48 bg-gray-200 border-2 border-gray-400 rounded-lg p-4"
          >
            placeholder
          </div>
          <div
            class="carousel-item size-48 bg-gray-200 border-2 border-gray-400 rounded-lg p-4"
          >
            placeholder
          </div>
          <div
            class="carousel-item size-48 bg-gray-200 border-2 border-gray-400 rounded-lg p-4"
          >
            placeholder
          </div>
        </div>
        <div class="caroussel-ruler flex justify-center mt-2">
          <Dot class="carousel-dot" />
          <Dot class="carousel-dot" />
          <Dot class="carousel-dot" />
        </div>
      </div>
    </div>
    <div class="group my-2" id="recent-actions">
      <p class="text-lg alice-regular">Ações recentes</p>
      <div
        class="recent-actions flex flex-col gap-4 mt-2 bg-gray-200 p-4 rounded-lg"
      >
        <ul class="recent-actions-list">
          <li class="flex"><Dot /> Mensagem recente</li>
          <li class="flex"><Dot /> Projeto atualizado</li>
          <li class="flex"><Dot /> Nova notificação</li>
        </ul>
      </div>
    </div>
    <!-- conteiner -->
  </PageLayout>
</template>
<style scoped></style>
