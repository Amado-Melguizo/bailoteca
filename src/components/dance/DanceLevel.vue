<script setup lang="ts">
import type { DanceLevel } from '@/interfaces/dance.interface'
import DanceMove from "./DanceMove.vue";
const props = defineProps<{
  level: DanceLevel
  levelKey: string
}>()
</script>

<template>
  <div class="tree-node card border-0 shadow-sm">
    <div class="card-body">
      <h5 class="card-title">
        {{ level.title }}
      </h5>

      <p class="text-muted">
        {{ level.description }}
      </p>

      <div class="d-flex flex-column gap-3">
        <DanceMove v-for="item in level.items" :key="item.id" :move="item" />
      </div>
    </div>
  </div>
</template>
