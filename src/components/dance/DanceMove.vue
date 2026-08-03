<script setup lang="ts">
import { ref } from 'vue'
import type { DanceMove } from '@/interfaces/dance.interface'
import VideoPreview from '@/components/common/VideoPreview.vue'
const props = defineProps<{
  move: DanceMove
}>()

const open = ref(false)
</script>

<template>
  <div class="mt-3">
    <button class="btn btn-outline-primary btn-sm" @click="open = !open">
      {{ move.name }}
    </button>

    <div v-if="open" class="card mt-3 border-0 shadow-sm">
      <div class="card-body">
        <h5>
          {{ move.name }}
        </h5>

        <p>
          {{ move.desc }}
        </p>
        <VideoPreview :video-id="move.video" />
        <hr />
        <div v-if="move.variations?.length" class="mt-4">
          <h5>Variaciones</h5>

          <DanceVariation
            v-for="variation in move.variations"
            :key="variation.id"
            :variation="variation"
          />
        </div>
        <h6>Técnica</h6>

        <ul>
          <li>
            {{ move.tech }}
          </li>
        </ul>

        <h6>Errores comunes</h6>

        <ul>
          <li>
            {{ move.err }}
          </li>
        </ul>

        <div class="alert alert-primary">
          {{ move.tip }}
        </div>
      </div>
    </div>
  </div>
</template>
