<script setup>
import QuizBlock from '../../QuizBlock.vue'
import SessionStepFooter from '../SessionStepFooter.vue'

defineProps({
  step: { type: Object, required: true },
})
</script>

<template>
  <article class="session-step mcq-step">
    <p class="unit-pill">Test rápido · {{ step.unitId }}</p>
    <h1>Comprueba la idea</h1>
    <p class="lead-in">
      Elige una opción. Tras responder verás una explicación corta; puedes reintentar cuantas veces quieras.
    </p>
    <QuizBlock :quiz="step.quiz" />
    <SessionStepFooter :step-id="step.id" />
  </article>
</template>

<style scoped>
.mcq-step {
  max-width: 72ch;
}

.unit-pill {
  margin: 0 0 0.5rem !important;
  font-size: 0.72rem !important;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--lv-muted) !important;
}

.mcq-step h1 {
  margin: 0 0 0.65rem !important;
  font-size: 1.28rem !important;
}

.lead-in {
  margin: 0 0 1rem !important;
  font-size: 0.92rem !important;
  color: var(--lv-muted) !important;
  line-height: 1.5 !important;
}
</style>
