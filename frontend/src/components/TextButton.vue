<script setup lang="ts">
import { computed } from "vue";

interface TextButtonProps {
  color?: "blue" | "red" | "green" | "purple" | "yellow";
}
const props = withDefaults(defineProps<TextButtonProps>(), {
  color: "blue",
});

const className = computed(() => [
  `flex justify-center bg-${props.color} text-white items-center w-fit px-6 hover:cursor-pointer py-2 border-gray-500 rounded-lg`,
]);
</script>
<template>
  <button :class="className">
    <slot></slot>
  </button>
</template>
<style scoped></style>
