<template>
  <section class="container py-5 text-center">

    <h1 class="display-1">404</h1>

    <p>Página no encontrada.</p>

    <RouterLink
      class="btn btn-primary"
      to="/"
    >
      Volver al inicio
    </RouterLink>

  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
