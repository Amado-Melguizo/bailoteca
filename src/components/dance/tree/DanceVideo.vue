<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  videoId?: string;
}>();

const playing = ref(false);

const thumbnail = computed(() =>
  `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
);

const iframe = computed(() =>
  `https://www.youtube.com/embed/${props.videoId}?autoplay=1&rel=0&modestbranding=1`
);
</script>

<template>
  <div
    v-if="videoId"
    class="ratio ratio-16x9 video-preview"
  >
    <iframe
      v-if="playing"
      :src="iframe"
      title="Video"
      allowfullscreen
      loading="lazy"
    />

    <template v-else>
      <img
        :src="thumbnail"
        class="video-thumb"
        alt=""
      />

      <button
        class="video-play"
        @click="playing = true"
      >
        ▶
      </button>
    </template>
  </div>
</template>
