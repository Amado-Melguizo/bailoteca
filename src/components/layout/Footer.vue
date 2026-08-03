<template>
  <footer class="bg-dark text-white py-4 mt-auto">
    <div class="container text-center">
      © {{ year }} Bailoteca
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
