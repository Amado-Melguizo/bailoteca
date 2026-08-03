<script setup lang="ts">
defineProps<{
  title: string

  subtitle: string

  heroClass: string
}>()
</script>

<template>
  <header class="text-white d-flex align-items-center" :class="heroClass">
    <div class="container text-center py-5">
      <h1 class="display-4 fw-bold">
        {{ title }}
      </h1>

      <p class="lead">
        {{ subtitle }}
      </p>
    </div>
  </header>
</template>
