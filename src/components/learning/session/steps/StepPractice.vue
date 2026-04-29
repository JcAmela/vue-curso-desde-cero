<script setup>
import { computed } from 'vue'
import ExerciseCard from '../../ExerciseCard.vue'

const props = defineProps({
  step: { type: Object, required: true },
  indexInCourse: { type: Number, required: true },
  nextStep: { type: Object, default: null },
})

const exercisePayload = computed(() => {
  const s = props.step
  const {
    type: _t,
    unitId: _u,
    order: _o,
    prereqIds: _p,
    xp: _x,
    ...rest
  } = s
  return rest
})

const nextStepTo = computed(() =>
  props.nextStep ? { name: 'learning-session', params: { stepId: props.nextStep.id } } : null
)
</script>

<template>
  <ExerciseCard
    class="session-practice-card"
    :exercise="exercisePayload"
    :index="indexInCourse"
    :next-exercise="null"
    progress-scope="course"
    copy-link-mode="session-path"
    :next-step-to="nextStepTo"
  />
</template>

<style scoped>
.session-practice-card {
  scroll-margin-top: 0.5rem;
}
</style>
