<template>
  <RouterLink
    class="navbar-brand d-flex align-items-center gap-2 fw-bold"
    to="/"
  >
    <i class="bi bi-music-note-beamed fs-3 text-danger"></i>

    <span class="fs-4">
      Bailoteca
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar-brand{
    text-decoration:none;
    transition:.3s;
}

.navbar-brand:hover{
    transform:scale(1.03);
}
</style>
