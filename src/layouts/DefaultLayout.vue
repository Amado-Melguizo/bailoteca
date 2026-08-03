<template>
  <div class="app-layout d-flex flex-column min-vh-100">
    <Navbar />

    <main class="flex-grow-1">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}
</style>
