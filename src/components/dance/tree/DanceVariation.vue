<script setup lang="ts">
import type { DanceVariation } from '@/interfaces/dance.interface'
import VideoPreview from '@/components/common/VideoPreview.vue'

defineProps<{
  variation: DanceVariation
}>()
</script>

<template>
  <div class="card mt-3 ms-md-4 border-start border-3 border-primary">
    <div class="card-body">
      <h6 class="fw-bold">
        {{ variation.name }}
      </h6>

      <p>
        {{ variation.desc }}
      </p>

      <VideoPreview :video-id="variation.video" />

      <div class="mt-3">
        <strong>Técnica</strong>

        <p class="mb-2">
          {{ variation.tech }}
        </p>

        <strong>Errores comunes</strong>

        <p class="mb-2">
          {{ variation.err }}
        </p>

        <div class="alert alert-info mb-0">
          {{ variation.tip }}
        </div>
      </div>
    </div>
  </div>
</template>
