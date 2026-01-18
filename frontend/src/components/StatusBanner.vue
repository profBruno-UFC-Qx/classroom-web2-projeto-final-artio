<script setup lang="ts">
const props = defineProps<{
  status: string;
}>();
const statusColors: Record<string, string> = {
  PENDING: "bg-yellow",
  IN_PROGRESS: "bg-blue",
  COMPLETED: "bg-green",
  REVIEWING: "bg-gray-500",
  REJECTED: "bg-red",
  PUBLIC: "bg-green",
  PRIVATE: "bg-gray-700",
};
</script>
<template>
  <div
    :class="[
      'status-banner',
      'text-sm',
      'text-white',
      'p-2',
      'rounded-full',
      'w-fit',
      'px-4',
      statusColors[props.status],
      'cursor-default',
    ]"
  >
    {{ props.status }}
  </div>
</template>
