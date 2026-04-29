<script setup>
import { RouterLink } from 'vue-router'
import { useExerciseProgress } from '../../composables/useExerciseProgress'

defineProps({
  exercise: {
    type: Object,
    required: true,
  },
  index: { type: Number, required: true },
})

const { toggleExercise, isExerciseDone } = useExerciseProgress()
</script>

<template>
  <article class="ex-card">
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

    <details class="block hints">
      <summary>Pistas (solo si te atascas)</summary>
      <ul>
        <li v-for="(h, i) in exercise.hints" :key="i">{{ h }}</li>
      </ul>
    </details>

    <details class="block sol">
      <summary>Ver una solución de referencia</summary>
      <p class="sol-warn">
        Prueba tú primero en tu editor. Es una guía posible; en Vue suele haber varias implementaciones correctas.
      </p>
      <pre class="code-block sol-pre"><code>{{ exercise.solution }}</code></pre>
    </details>

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

.block {
  margin: 0.85rem 0;
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius-sm);
  overflow: hidden;
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

.hints ul {
  margin: 0 !important;
  padding: 0.75rem 1.1rem 0.85rem !important;
  font-size: 0.9rem !important;
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
