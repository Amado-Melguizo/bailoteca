<template>
  <section class="py-5">
    <div class="container">

      <div class="row g-4">

        <div
          v-for="dance in dances"
          :key="dance.slug"
          class="col-md-6"
        >
          <div
            class="card card-dance h-100 shadow border-0"
            :style="{ backgroundImage: `url(${dance.image})` }"
          >
            <div class="card-body d-flex flex-column justify-content-end">

              <h3 class="card-title text-white">
                {{ dance.name }}
              </h3>

              <p class="text-white">
                {{ dance.description }}
              </p>

              <RouterLink
                class="btn btn-light mt-2 align-self-start"
                :to="dance.route"
              >
                Explorar
              </RouterLink>

            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { HOME_DANCES } from '@/stores/home.store';
import { RouterLink } from 'vue-router'

const dances = HOME_DANCES
</script>

<style scoped>
.card-dance{
    min-height:420px;
    background-size:cover;
    background-position:center;
    overflow:hidden;
    transition:.35s;
}

.card-dance:hover{
    transform:translateY(-8px);
}

.card-body{
    background:linear-gradient(
        transparent,
        rgba(0,0,0,.75)
    );
}
</style>
