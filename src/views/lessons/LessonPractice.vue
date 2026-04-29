<script setup>
import { RouterLink } from 'vue-router'
import { exercises } from '../../data/exercises.js'
import ExerciseCard from '../../components/learning/ExerciseCard.vue'
import { useExerciseProgress } from '../../composables/useExerciseProgress'

const { exerciseDoneCount, exercisePercent, totalExercises } = useExerciseProgress()
</script>

<template>
  <article class="lesson-page practice-page">
    <h1>Ejercicios prácticos</h1>
    <p class="lead">
      Lo que realmente fija conceptos es <strong>escribir código tú misma o tú mismo</strong>. Abre esta carpeta del
      proyecto en tu editor (VS Code, Cursor, etc.), crea archivos
      <code class="inline">.vue</code> de prueba o modifica componentes en
      <code class="inline">src/components/</code> y ve compilando con <code class="inline">npm run dev</code>.
    </p>

    <div class="progress-mini" role="status">
      <span>Ejercicios marcados como «intentados» en esta página:</span>
      <strong>{{ exerciseDoneCount }} / {{ totalExercises }}</strong>
      <span class="bar"><i :style="{ width: exercisePercent + '%' }" /></span>
    </div>

    <h2>Cómo usar esta sección</h2>
    <ol>
      <li>Lee el enunciado sin abrir pistas ni solución.</li>
      <li>Implementa en tu máquina; si te bloqueas, abre solo las pistas.</li>
      <li>Compara con la solución de referencia (no tiene por qué ser idéntica letra a letra).</li>
      <li>Marca la casilla al final cuando lo hayas intentado de verdad (es opcional y es solo local).</li>
    </ol>

    <p class="note">
      Si no sabes por dónde empezar, sigue el orden 1 → 8. Los tres últimos encajan con
      <RouterLink to="/computed-watch">computed</RouterLink>,
      <RouterLink to="/datos-remotos">fetch</RouterLink> y
      <RouterLink to="/pinia">Pinia</RouterLink>.
    </p>

    <ExerciseCard v-for="(ex, i) in exercises" :key="ex.id" :exercise="ex" :index="i" />

    <section class="cierre">
      <h2>¿Y ahora?</h2>
      <p>
        Con las lecciones + estos ejercicios tienes una base sólida. El siguiente salto es un proyecto pequeño propio
        (lista de tareas, gastos, agenda) y publicarlo con
        <code class="inline">npm run build</code> + un hosting estático.
      </p>
      <p>
        <RouterLink to="/">Volver al inicio del curso</RouterLink>
      </p>
    </section>
  </article>
</template>

<style scoped>
.practice-page .progress-mini {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  margin: 0 0 1.25rem;
  padding: 0.75rem 1rem;
  background: var(--lv-soft);
  border-radius: var(--lv-radius-sm);
  border: 1px solid var(--lv-border);
  font-size: 0.88rem;
}

.progress-mini strong {
  color: var(--lv-green-dim);
}

.bar {
  flex: 1 1 140px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--lv-green), #5fd4a4);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.note {
  padding: 0.85rem 1rem;
  background: rgba(59, 130, 246, 0.08);
  border-radius: var(--lv-radius-sm);
  border: 1px solid rgba(59, 130, 246, 0.22);
  font-size: 0.92rem !important;
}

.cierre {
  margin-top: 2rem;
  padding: 1.25rem 1.35rem;
  background: var(--lv-surface);
  border: 1px dashed var(--lv-border);
  border-radius: var(--lv-radius);
}

.cierre h2 {
  margin-top: 0 !important;
}
</style>
