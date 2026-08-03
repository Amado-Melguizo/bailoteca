<template>
  <ul class="navbar-nav ms-auto">

    <li class="nav-item">
      <RouterLink
        class="nav-link"
        to="/"
      >
        Inicio
      </RouterLink>
    </li>

    <li class="nav-item dropdown">

      <a
        class="nav-link dropdown-toggle"
        href="#"
        data-bs-toggle="dropdown"
      >
        Bailes
      </a>

      <ul class="dropdown-menu">

        <li>
          <RouterLink
            class="dropdown-item"
            to="/dance/bachata"
          >
            Bachata
          </RouterLink>
        </li>

        <li>
          <RouterLink
            class="dropdown-item"
            to="/dance/salsa-cubana"
          >
            Salsa Cubana
          </RouterLink>
        </li>

        <li>
          <RouterLink
            class="dropdown-item"
            to="/dance/salsa-linea"
          >
            Salsa en Línea
          </RouterLink>
        </li>

      </ul>

    </li>

  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
