<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { guideStepsMeta } from '../data/guide-steps-meta.js'
import { getGuideStepById } from '../data/guide-steps-resolve.js'
import { theoryChapters } from '../data/theory-chapters.js'
import { getGuideStepsForTheoryChapter } from '../data/theory-guide-bridge.js'
import MiniWorkshopRepl from '../components/learning/MiniWorkshopRepl.vue'
import QuizBlock from '../components/learning/QuizBlock.vue'
import { useGuideStepProgress } from '../composables/useGuideStepProgress'
const { isStepDone, toggleStepDone } = useGuideStepProgress()

const route = useRoute()

const step = computed(() => getGuideStepById(route.params.stepId))

const theoryTitle = computed(() => {
  const id = step.value?.theoryId
  return theoryChapters.find((c) => c.id === id)?.title ?? 'Teoría'
})

const idx = computed(() => guideStepsMeta.findIndex((s) => s.id === route.params.stepId))

const prev = computed(() => (idx.value > 0 ? guideStepsMeta[idx.value - 1] : null))
const next = computed(() =>
  idx.value >= 0 && idx.value < guideStepsMeta.length - 1 ? guideStepsMeta[idx.value + 1] : null
)

const mainFile = computed(() => step.value?.mainFile ?? 'App.vue')

/** Otros talleres de la guía con el mismo `theoryId` (excluye el paso actual). */
const relatedGuideSteps = computed(() => {
  const tid = step.value?.theoryId
  if (!tid) return []
  return getGuideStepsForTheoryChapter(tid).filter((s) => s.id !== step.value?.id)
})
</script>

<template>
  <div v-if="!step" class="lesson-page not-step">
    <h1>Paso no encontrado</h1>
    <p class="lead">
      No hay ningún paso de la guía con el identificador <code class="inline">{{ route.params.stepId }}</code>.
    </p>
    <nav class="not-step-nav" aria-label="Enlaces">
      <RouterLink class="ns-btn" to="/guia">Ver lista de pasos</RouterLink>
      <RouterLink class="ns-btn" to="/">Inicio del curso</RouterLink>
    </nav>
  </div>

  <div v-else class="lesson-page guide-step">
    <header class="gs-head">
      <p class="crumb">
        <RouterLink to="/guia">Guía</RouterLink>
        · Paso {{ step.n }} de {{ guideStepsMeta.length }}
      </p>
      <h1>{{ step.title }}</h1>
      <p class="lead">{{ step.intro }}</p>
      <p class="theory-link">
        <RouterLink :to="'/teoria#' + step.theoryId">Leer capítulo: {{ theoryTitle }}</RouterLink>
      </p>
    </header>

    <section class="panel">
      <h2>Objetivos</h2>
      <ul>
        <li v-for="(o, i) in step.objectives" :key="i">{{ o }}</li>
      </ul>
    </section>

    <section v-if="relatedGuideSteps.length" class="panel panel-related" aria-labelledby="related-guide-h">
      <h2 id="related-guide-h">Mismo tema en la guía</h2>
      <p class="related-lead">
        Otros pasos que practican
        <RouterLink :to="'/teoria#' + step.theoryId">{{ theoryTitle }}</RouterLink>:
      </p>
      <ul class="related-list">
        <li v-for="s in relatedGuideSteps" :key="s.id">
          <RouterLink :to="'/guia/paso/' + s.id">Paso {{ s.n }}: {{ s.title }}</RouterLink>
        </li>
      </ul>
    </section>

    <section class="panel repl-panel">
      <h2>Consola Vue (edita y mira la vista previa)</h2>
      <p class="hint">
        Editor a la izquierda, vista previa a la derecha. Tras editar, guarda con <kbd>Ctrl</kbd>+<kbd>S</kbd> en el
        editor del REPL; si no refresca, usa el botón de recargar de herramientas del playground.
      </p>
      <MiniWorkshopRepl :key="step.id" :files="step.files" :main-file="mainFile" />
    </section>

    <section class="panel">
      <h2>Checklist (tú en tu editor)</h2>
      <ul class="check">
        <li v-for="(c, i) in step.checklist" :key="i">{{ c }}</li>
      </ul>
      <details class="hints">
        <summary>Pistas extra</summary>
        <ul>
          <li v-for="(h, i) in step.hints" :key="i">{{ h }}</li>
        </ul>
      </details>
    </section>

    <QuizBlock :quiz="step.quiz" />

    <label class="done-row">
      <input type="checkbox" :checked="isStepDone(step.id)" @change="toggleStepDone(step.id)" />
      Marcar paso como completado en esta guía (se guarda en el navegador)
    </label>

    <nav class="gs-pager" aria-label="Pasos anterior y siguiente">
      <RouterLink v-if="prev" :to="'/guia/paso/' + prev.id" class="pg">← {{ prev.title }}</RouterLink>
      <span v-else class="pg muted">Inicio de la guía</span>
      <RouterLink v-if="next" :to="'/guia/paso/' + next.id" class="pg next">{{ next.title }} →</RouterLink>
      <RouterLink v-else to="/practica" class="pg next">Ir a ejercicios largos →</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.not-step h1 {
  margin-top: 0;
}

.not-step .lead {
  color: var(--lv-muted);
}

.not-step-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.25rem;
}

.ns-btn {
  display: inline-flex;
  padding: 0.5rem 1rem;
  font-size: 0.88rem;
  font-weight: 650;
  color: var(--lv-navy) !important;
  text-decoration: none !important;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: 999px;
}

.ns-btn:hover {
  border-color: rgba(66, 184, 131, 0.45);
}

.gs-head {
  margin-bottom: 1rem;
}

.crumb {
  margin: 0 0 0.35rem !important;
  font-size: 0.85rem !important;
  color: var(--lv-muted) !important;
}

.theory-link {
  margin: 0.5rem 0 0 !important;
}

.panel {
  margin: 1rem 0;
  padding: 1rem 1.15rem;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius-sm);
}

.panel h2 {
  margin-top: 0 !important;
  font-size: 1.05rem !important;
}

.panel-related {
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.06), transparent 55%);
  border-color: rgba(59, 130, 246, 0.18);
}

.related-lead {
  margin: 0 0 0.65rem !important;
  font-size: 0.88rem !important;
  color: var(--lv-muted) !important;
  line-height: 1.45;
}

.related-list {
  margin: 0 !important;
  padding-left: 1.15rem !important;
}

.related-list li {
  margin-bottom: 0.35rem;
}

.related-list a {
  font-weight: 650;
}

.hint {
  margin: 0 0 0.75rem !important;
  font-size: 0.88rem !important;
  color: var(--lv-muted) !important;
}

.repl-panel {
  background: #252526;
  color: #e2e8f0;
  border-color: #3f3f46;
}

.repl-panel h2,
.repl-panel .hint {
  color: #e2e8f0 !important;
}

.check li {
  margin-bottom: 0.35rem;
}

.hints {
  margin-top: 0.75rem;
}

.hints summary {
  cursor: pointer;
  font-weight: 700;
}

.done-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.25rem 0;
  font-size: 0.88rem;
  cursor: pointer;
}

.done-row input {
  accent-color: var(--lv-green);
}

.gs-pager {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--lv-border);
}

.pg {
  font-weight: 700;
  text-decoration: none !important;
}

.pg.next {
  margin-left: auto;
}

.pg.muted {
  color: var(--lv-muted);
  font-weight: 500;
}
</style>
