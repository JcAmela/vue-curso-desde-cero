<script setup>
import { useCourseStepProgress } from '../../../composables/useCourseStepProgress'

defineProps({
  stepId: { type: String, required: true },
})

const { isStepDone, toggleStep } = useCourseStepProgress()
</script>

<template>
  <label class="session-done">
    <input type="checkbox" :checked="isStepDone(stepId)" @change="toggleStep(stepId)" />
    Paso trabajado (solo en este navegador)
  </label>
</template>

<style scoped>
.session-done {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--lv-border);
  font-size: 0.88rem;
  cursor: pointer;
  color: var(--lv-muted);
}

.session-done input {
  margin-top: 0.2rem;
  accent-color: var(--lv-green);
}
</style>
