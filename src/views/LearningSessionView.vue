<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { courseSteps } from '../data/course-index.js'
import { useCourseStepProgress } from '../composables/useCourseStepProgress.js'
import StepMicroRead from '../components/learning/session/steps/StepMicroRead.vue'
import StepMcq from '../components/learning/session/steps/StepMcq.vue'
import StepPractice from '../components/learning/session/steps/StepPractice.vue'

const route = useRoute()
const router = useRouter()

const { stepDoneCount, totalSteps, stepPercent, earnedXp, totalXp, isStepDone } = useCourseStepProgress()

const stepById = Object.fromEntries(courseSteps.map((s) => [s.id, s]))

const currentId = computed(() => {
  const fromRoute = route.params.stepId
  if (typeof fromRoute === 'string' && stepById[fromRoute]) return fromRoute
  return courseSteps[0]?.id ?? ''
})

const currentStep = computed(() => stepById[currentId.value] || courseSteps[0])

const currentIndex = computed(() => courseSteps.findIndex((s) => s.id === currentId.value))

watch(
  () => [route.name, route.params.stepId],
  () => {
    if (route.name !== 'learning-session') return
    if (!courseSteps.length) return
    const id = route.params.stepId
    if (!id && courseSteps[0]) {
      router.replace({ name: 'learning-session', params: { stepId: courseSteps[0].id } })
      return
    }
    if (typeof id === 'string' && id && !stepById[id]) {
      router.replace({ name: 'learning-session', params: { stepId: courseSteps[0].id } })
    }
  },
  { immediate: true }
)

const nextStep = computed(() => {
  const i = currentIndex.value
  if (i < 0 || i >= courseSteps.length - 1) return null
  return courseSteps[i + 1]
})

const prevStep = computed(() => {
  const i = currentIndex.value
  if (i <= 0) return null
  return courseSteps[i - 1]
})

function stepLabel(s) {
  if (!s) return ''
  if (s.type === 'practice') return s.title || s.id
  if (s.type === 'micro_read') return s.title || s.id
  if (s.type === 'mcq') {
    const q = s.quiz?.question || ''
    return q.length > 42 ? `Test: ${q.slice(0, 42)}…` : `Test: ${q || s.id}`
  }
  return s.id
}
</script>

<template>
  <div class="session-layout">
    <aside class="session-rail" aria-label="Pasos del camino guiado">
      <header class="rail-head">
        <h2 class="rail-title">Camino guiado</h2>
        <p class="rail-meta">
          {{ stepDoneCount }} / {{ totalSteps }} pasos marcados · {{ earnedXp }} / {{ totalXp }} XP
        </p>
        <div class="rail-bar" role="presentation"><i :style="{ width: stepPercent + '%' }" /></div>
      </header>
      <ol class="rail-list">
        <li v-for="(s, i) in courseSteps" :key="s.id">
          <RouterLink
            class="rail-link"
            :class="{
              active: s.id === currentId,
              done: isStepDone(s.id),
            }"
            :to="{ name: 'learning-session', params: { stepId: s.id } }"
          >
            <span class="rail-idx">{{ i + 1 }}</span>
            <span class="rail-label">{{ stepLabel(s) }}</span>
          </RouterLink>
        </li>
      </ol>
      <p class="rail-foot">
        <RouterLink to="/practica">Lista completa de práctica</RouterLink>
      </p>
    </aside>

    <div class="session-main">
      <nav class="session-pager" aria-label="Anterior y siguiente">
        <RouterLink
          v-if="prevStep"
          class="pager-btn"
          :to="{ name: 'learning-session', params: { stepId: prevStep.id } }"
        >
          ← Anterior
        </RouterLink>
        <span v-else class="pager-spacer" />
        <RouterLink
          v-if="nextStep"
          class="pager-btn primary"
          :to="{ name: 'learning-session', params: { stepId: nextStep.id } }"
        >
          Siguiente →
        </RouterLink>
        <span v-else class="pager-end">¡Has llegado al final del camino!</span>
      </nav>

      <div class="session-body lesson-page">
        <StepPractice
          v-if="currentStep && currentStep.type === 'practice'"
          :step="currentStep"
          :index-in-course="currentIndex"
          :next-step="nextStep"
        />
        <StepMicroRead v-else-if="currentStep && currentStep.type === 'micro_read'" :step="currentStep" />
        <StepMcq v-else-if="currentStep && currentStep.type === 'mcq'" :step="currentStep" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.session-layout {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  gap: 1.25rem 1.5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .session-layout {
    grid-template-columns: 1fr;
  }
}

.session-rail {
  position: sticky;
  top: 0.5rem;
  padding: 0.9rem 1rem 1rem;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius);
  box-shadow: var(--lv-shadow);
  max-height: calc(100vh - 2rem);
  overflow: auto;
}

.rail-head {
  margin-bottom: 0.75rem;
}

.rail-title {
  margin: 0 0 0.35rem !important;
  font-size: 1.02rem !important;
}

.rail-meta {
  margin: 0 0 0.5rem !important;
  font-size: 0.78rem !important;
  line-height: 1.4 !important;
  color: var(--lv-muted) !important;
}

.rail-bar {
  height: 6px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}

.rail-bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--lv-green), #5fd4a4);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.rail-list {
  margin: 0 !important;
  padding: 0 !important;
  list-style: none;
}

.rail-list li {
  margin: 0;
}

.rail-link {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.4rem 0.35rem;
  margin-bottom: 0.2rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--lv-text) !important;
  text-decoration: none !important;
  border: 1px solid transparent;
}

.rail-link:hover {
  background: rgba(66, 184, 131, 0.08);
}

.rail-link.active {
  background: rgba(66, 184, 131, 0.14);
  border-color: rgba(66, 184, 131, 0.35);
}

.rail-link.done:not(.active) {
  opacity: 0.88;
}

.rail-idx {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  min-width: 1.35rem;
  height: 1.35rem;
  font-size: 0.68rem;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(145deg, var(--lv-navy), #2a3f52);
  border-radius: 6px;
}

.rail-link.done .rail-idx {
  background: linear-gradient(145deg, var(--lv-green), var(--lv-green-dim));
}

.rail-label {
  min-width: 0;
  line-height: 1.35;
}

.rail-foot {
  margin: 0.75rem 0 0 !important;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--lv-border);
  font-size: 0.82rem !important;
}

.session-main {
  min-width: 0;
}

.session-pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin-bottom: 1rem;
}

.pager-btn {
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: inherit;
  border-radius: 999px;
  border: 1px solid var(--lv-border);
  background: var(--lv-surface);
  color: var(--lv-navy) !important;
  text-decoration: none !important;
  cursor: pointer;
}

.pager-btn:hover {
  border-color: rgba(66, 184, 131, 0.45);
}

.pager-btn.primary {
  background: rgba(66, 184, 131, 0.16);
  border-color: rgba(66, 184, 131, 0.45);
  margin-left: auto;
}

.pager-spacer {
  flex: 0;
}

.pager-end {
  margin-left: auto;
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--lv-green-dim);
}

.session-body {
  min-width: 0;
}
</style>