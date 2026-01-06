<script setup lang="ts">
import Header from "./Header.vue";
import Body from "./Body.vue";
</script>
<template>
  <Header />
  <Body>
    <slot></slot>
  </Body>
</template>
<style scoped></style>
