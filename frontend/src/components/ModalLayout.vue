<script setup lang="ts"></script>
<template>
  <div
    class="modal-layout fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      class="modal-content bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4"
    >
      <slot></slot>
    </div>
  </div>
</template>
