<script setup lang="ts">
import { DANCE_LEVELS } from "@/constants/dance.levels";
import type { DanceData } from "@/interfaces/dance.interface"
const props = defineProps<{
  data: DanceData
}>()


</script>

<template>

<div class="d-flex flex-column gap-4">

<template v-for="level in DANCE_LEVELS" :key="level">


<DanceLevel
    v-if="data[level]"
    :level="data[level]!"
    :level-key="level"
/>

  </template>

</div>

</template>
