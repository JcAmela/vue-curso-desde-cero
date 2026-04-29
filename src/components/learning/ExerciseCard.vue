<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useExerciseProgress } from '../../composables/useExerciseProgress'

const props = defineProps({
  exercise: {
    type: Object,
    required: true,
  },
  index: { type: Number, required: true },
  /** Siguiente ejercicio del programa (mismo orden que en `exercises.js`). */
  nextExercise: { type: Object, default: null },
})

const { toggleExercise, isExerciseDone } = useExerciseProgress()

const copyFeedback = ref('')

function anchorUrl() {
  const base = import.meta.env.BASE_URL || '/'
  const normalized = base.endsWith('/') ? base : `${base}/`
  return `${window.location.origin}${normalized}practica#${props.exercise.id}`
}

async function copyExerciseLink() {
  try {
    await navigator.clipboard.writeText(anchorUrl())
    copyFeedback.value = 'Enlace copiado'
    window.setTimeout(() => {
      copyFeedback.value = ''
    }, 2000)
  } catch {
    copyFeedback.value = 'No se ha podido copiar'
    window.setTimeout(() => {
      copyFeedback.value = ''
    }, 2500)
  }
}
</script>

<template>
  <article :id="exercise.id" class="ex-card">
    <header class="ex-head">
      <span class="ex-num">{{ index + 1 }}</span>
      <div class="ex-titles">
        <h2>{{ exercise.title }}</h2>
        <p class="ex-meta">
          <span class="pill">{{ exercise.difficulty }}</span>
          <span v-if="exercise.minutes">~{{ exercise.minutes }} min</span>
          <RouterLink v-if="exercise.lessonPath" class="lesson-link" :to="'/' + exercise.lessonPath">
            Repasar lección relacionada
          </RouterLink>
        </p>
      </div>
    </header>

    <p v-if="exercise.goal" class="ex-goal">{{ exercise.goal }}</p>

    <div class="ex-body">
      <p v-for="(line, i) in exercise.problem" :key="i">{{ line }}</p>
    </div>

    <div v-if="exercise.successCheck?.length" class="ex-success">
      <p class="ex-success-title">Cómo saber que lo llevas bien</p>
      <ul>
        <li v-for="(c, i) in exercise.successCheck" :key="i">{{ c }}</li>
      </ul>
    </div>

    <div v-if="exercise.stretch?.length" class="ex-stretch">
      <p class="ex-stretch-title">Si quieres más reto (opcional)</p>
      <ul>
        <li v-for="(s, i) in exercise.stretch" :key="i">{{ s }}</li>
      </ul>
    </div>

    <div v-if="exercise.hints?.length" class="hints-wrap">
      <p class="hints-lead">Pistas, de una en una (abre solo la que necesites):</p>
      <details v-for="(h, i) in exercise.hints" :key="i" class="block hint-one">
        <summary>Pista {{ i + 1 }} de {{ exercise.hints.length }}</summary>
        <p class="hint-body">{{ h }}</p>
      </details>
    </div>

    <details class="block sol">
      <summary>Ver una solución de referencia</summary>
      <p class="sol-warn">
        Prueba tú primero en tu editor. Es una guía posible; en Vue suele haber varias implementaciones correctas.
      </p>
      <pre class="code-block sol-pre"><code>{{ exercise.solution }}</code></pre>
    </details>

    <div class="ex-footer">
      <button type="button" class="copy-link" @click="copyExerciseLink">
        {{ copyFeedback || 'Copiar enlace a este ejercicio' }}
      </button>
      <RouterLink
        v-if="nextExercise"
        class="next-ex"
        :to="{ path: '/practica', hash: '#' + nextExercise.id }"
      >
        Siguiente: {{ nextExercise.title }} →
      </RouterLink>
    </div>

    <label class="done-label">
      <input type="checkbox" :checked="isExerciseDone(exercise.id)" @change="toggleExercise(exercise.id)" />
      Lo he intentado en mi proyecto (solo para tu seguimiento; se guarda en este navegador)
    </label>
  </article>
</template>

<style scoped>
.ex-card {
  margin-bottom: 2rem;
  padding: 1.25rem 1.35rem;
  background: var(--lv-surface);
  border-radius: var(--lv-radius);
  border: 1px solid var(--lv-border);
  box-shadow: var(--lv-shadow);
  scroll-margin-top: 1rem;
}

.ex-head {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.ex-num {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  font-weight: 900;
  font-size: 0.95rem;
  color: #fff;
  background: linear-gradient(145deg, var(--lv-green), var(--lv-green-dim));
  border-radius: 10px;
}

.ex-titles h2 {
  margin: 0 0 0.35rem !important;
  font-size: 1.15rem !important;
}

.ex-meta {
  margin: 0 !important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.85rem;
  font-size: 0.82rem !important;
  color: var(--lv-muted) !important;
}

.pill {
  padding: 0.12rem 0.45rem;
  font-weight: 700;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
  border-radius: 6px;
}

.lesson-link {
  font-weight: 700;
  text-decoration: none !important;
}

.ex-goal {
  margin: 0 0 0.85rem !important;
  padding: 0.65rem 0.8rem;
  max-width: 68ch !important;
  font-size: 0.92rem !important;
  line-height: 1.5 !important;
  background: rgba(66, 184, 131, 0.08);
  border-radius: var(--lv-radius-sm);
  border-left: 3px solid var(--lv-green);
}

.ex-body p {
  margin: 0 0 0.55rem !important;
  max-width: 65ch !important;
  font-size: 0.95rem !important;
}

.ex-success {
  margin: 0.75rem 0 0;
  padding: 0.55rem 0.75rem 0.65rem;
  background: rgba(59, 130, 246, 0.06);
  border-radius: var(--lv-radius-sm);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.ex-success-title {
  margin: 0 0 0.35rem !important;
  font-size: 0.78rem !important;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1d4ed8;
}

.ex-success ul {
  margin: 0 !important;
  padding-left: 1.15rem !important;
  font-size: 0.88rem !important;
  line-height: 1.45 !important;
}

.ex-stretch {
  margin: 0.85rem 0 0;
  padding: 0.55rem 0.75rem 0.65rem;
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.1), transparent 90%);
  border-radius: var(--lv-radius-sm);
  border: 1px dashed rgba(245, 158, 11, 0.45);
}

.ex-stretch-title {
  margin: 0 0 0.35rem !important;
  font-size: 0.78rem !important;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #b45309;
}

.ex-stretch ul {
  margin: 0 !important;
  padding-left: 1.15rem !important;
  font-size: 0.88rem !important;
  line-height: 1.45 !important;
}

.hints-wrap {
  margin: 0.85rem 0 0;
}

.hints-lead {
  margin: 0 0 0.45rem !important;
  font-size: 0.8rem !important;
  font-weight: 700;
  color: var(--lv-muted) !important;
}

.hint-one summary {
  font-size: 0.88rem;
}

.hint-body {
  margin: 0 !important;
  padding: 0.65rem 0.85rem 0.75rem !important;
  font-size: 0.88rem !important;
  line-height: 1.45 !important;
  border-top: 1px solid var(--lv-border);
  background: #fff;
}

.block {
  margin: 0.45rem 0 0;
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius-sm);
  overflow: hidden;
}

.hints-wrap .hint-one:first-child {
  margin-top: 0;
}

.block.sol {
  margin-top: 0.85rem;
}

.block summary {
  padding: 0.6rem 0.85rem;
  font-weight: 700;
  cursor: pointer;
  background: var(--lv-soft);
  list-style: none;
}

.block summary::-webkit-details-marker {
  display: none;
}

.block[open] summary {
  border-bottom: 1px solid var(--lv-border);
}

.sol-warn {
  margin: 0 !important;
  padding: 0.65rem 0.85rem !important;
  font-size: 0.82rem !important;
  background: #fffbeb;
  color: #92400e !important;
  border-bottom: 1px solid var(--lv-border);
}

.sol-pre {
  margin: 0 !important;
  border-radius: 0 !important;
  max-height: 22rem;
}

.ex-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 1rem;
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--lv-border);
}

.copy-link {
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 650;
  font-family: inherit;
  color: var(--lv-navy);
  background: #fff;
  border: 1px solid var(--lv-border);
  border-radius: 8px;
  cursor: pointer;
}

.copy-link:hover {
  border-color: rgba(66, 184, 131, 0.45);
  background: rgba(66, 184, 131, 0.06);
}

.next-ex {
  margin-left: auto;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none !important;
}

.done-label {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  margin-top: 1rem;
  font-size: 0.88rem;
  cursor: pointer;
  color: var(--lv-muted);
}

.done-label input {
  margin-top: 0.2rem;
  accent-color: var(--lv-green);
}
</style>
