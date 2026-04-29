<script setup>
import { RouterLink } from 'vue-router'
import SessionStepFooter from '../SessionStepFooter.vue'

defineProps({
  step: { type: Object, required: true },
})
</script>

<template>
  <article class="session-step micro-read">
    <p class="unit-pill">Unidad · {{ step.unitId }}</p>
    <h1>{{ step.title }}</h1>
    <p v-for="(p, i) in step.paragraphs" :key="i" class="para">{{ p }}</p>
    <p v-if="step.asideLink" class="aside">
      <RouterLink :to="step.asideLink.path">{{ step.asideLink.label }}</RouterLink>
    </p>
    <SessionStepFooter :step-id="step.id" />
  </article>
</template>

<style scoped>
.micro-read {
  max-width: 70ch;
}

.unit-pill {
  margin: 0 0 0.5rem !important;
  font-size: 0.72rem !important;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--lv-muted) !important;
}

.micro-read h1 {
  margin: 0 0 1rem !important;
  font-size: 1.35rem !important;
  line-height: 1.25 !important;
}

.para {
  margin: 0 0 0.85rem !important;
  font-size: 0.98rem !important;
  line-height: 1.55 !important;
  color: var(--lv-text) !important;
}

.aside {
  margin: 1rem 0 0 !important;
}

.aside :deep(a) {
  font-weight: 700;
}
</style>
