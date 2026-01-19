<script setup lang="ts">
import { type RequestProject } from "../types/request";

const props = defineProps<{
  request: RequestProject;
}>();
</script>
<template>
  <div
    class="rounded-md border-gray-300 border-1 size-40 flex flex-col hover:shadow-lg duration-200 ease-in-out cursor-pointer"
  >
    <div
      class="w-full sketch-blue h-24 rounded-t-md flex justify-center items-center"
    >
      <!-- Banner ou imagem do projeto -->
      placeholder
    </div>
    <div class="p-4 flex flex-col gap-2 h-full">
      <h3 class="text-lg font-bold ade-display">{{ request.title }}</h3>
      <p class="alice-regular text-sm text-gray-700 truncate">
        {{ request.description }}
      </p>
    </div>
  </div>
</template>
