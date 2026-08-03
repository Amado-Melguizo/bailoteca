<template>
  <header class="hero-dance-section text-white d-flex align-items-center">
    <div class="container text-center hero-content">
      <h1 class="fw-bold mb-3 hero-title">
        Bailoteca
      </h1>

      <p class="lead mb-4 hero-subtitle">
        La plataforma para aprender Salsa y Bachata con claridad.
      </p>

      <p>
        Tu biblioteca de baile moderna —
        <span class="fw-bold text-warning">
          {{ currentWord }}
        </span>
        —
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const words = [
  'Aprende',
  'Practica',
  'Mejora',
  'Disfruta'
]

const index = ref(0)

const currentWord = computed(() => words[index.value])

let interval: number

onMounted(() => {
  interval = window.setInterval(() => {
    index.value = (index.value + 1) % words.length
  }, 2000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.hero-dance-section {
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
      rgba(0,0,0,.55),
      rgba(0,0,0,.55)
    ),
    url("https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=80");

  background-size: cover;
  background-position: center;
}

.hero-title{
  font-size:4rem;
}

.hero-subtitle{
  max-width:700px;
  margin:auto;
}
</style>
