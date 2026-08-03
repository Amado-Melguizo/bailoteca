<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import DanceTree from '@/components/dance/DanceTree.vue'
import { useDance } from '@/composables/useDance'
import { DANCES } from '@/constants/dances'
import DanceHero from "@/components/dance/DanceHero.vue";
const route = useRoute()

const { dance, loading, load } = useDance()

const danceInfo = computed(() => {
  return DANCES[route.params.id as string]
})

async function loadDance() {
  if (!danceInfo.value) return

  await load(danceInfo.value.data)
}

onMounted(loadDance)

watch(() => route.params.id, loadDance)
</script>

<template>
  <DanceHero
    v-if="danceInfo"
    :title="danceInfo.title"
    :subtitle="danceInfo.subtitle"
    :hero-class="danceInfo.heroClass"
  />

  <section class="container py-5">
    <DanceTree v-if="dance" :data="dance" />
  </section>
</template>
