<script setup lang="ts"></script>
<template>
  <div
    class="page-layout flex flex-row justify-center w-screen h-fit min-h-screen bg-repeat p-10"
  >
    <div
      class="rounded-lg flex flex-col w-3/4 items-center bg-white shadow-lg p-10 w-7xl"
    >
      <slot></slot>
    </div>
  </div>
</template>
<style scoped></style>
