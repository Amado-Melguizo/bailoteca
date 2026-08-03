<template>
  <header class="shadow-sm sticky-top bg-white">

    <nav class="navbar navbar-expand-lg">

      <div class="container">

        <NavbarBrand />

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          id="navbarMain"
          class="collapse navbar-collapse"
        >
          <NavbarLinks />

          <NavbarActions />
        </div>

      </div>

    </nav>

  </header>
</template>

<script setup lang="ts">
import NavbarActions from './navbar/NavbarActions.vue'
import NavbarBrand from './navbar/NavbarBrand.vue'
import NavbarLinks from './navbar/NavbarLinks.vue'
</script>
