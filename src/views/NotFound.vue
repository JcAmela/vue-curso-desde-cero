<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="lesson-page not-found">
    <h1>Página no encontrada</h1>
    <p class="lead">
      No hemos encontrado una ruta de este curso con esa dirección. Revisa el enlace (a veces falta una letra o un guion)
      o vuelve al inicio desde los botones de abajo.
    </p>
    <nav class="nf-nav" aria-label="Enlaces útiles">
      <RouterLink class="nf-btn" to="/">Inicio del curso</RouterLink>
      <RouterLink class="nf-btn" to="/teoria">Teoría (libro)</RouterLink>
      <RouterLink class="nf-btn" to="/guia">Guía paso a paso</RouterLink>
      <RouterLink class="nf-btn" to="/practica">Práctica</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.not-found h1 {
  margin-top: 0;
}

.lead {
  max-width: 50ch;
  color: var(--lv-muted);
}

.nf-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

.nf-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.88rem;
  font-weight: 650;
  color: var(--lv-navy) !important;
  text-decoration: none !important;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(53, 73, 94, 0.06);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.nf-btn:hover {
  border-color: rgba(66, 184, 131, 0.45);
  box-shadow: var(--lv-shadow);
}
</style>
