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
      Aquí aplicamos <strong>práctica deliberada</strong>: cada enunciado tiene objetivo claro, pasos y criterios para
      saber si lo has entendido. Abre el proyecto en tu editor (VS Code, Cursor…), crea
      <code class="inline">.vue</code> de prueba o amplía componentes en
      <code class="inline">src/components/</code> y mantén <code class="inline">npm run dev</code> en marcha para ver
      cambios al instante.
    </p>

    <div class="progress-mini" role="status">
      <span>Ejercicios que marcas como «hechos» en esta página:</span>
      <strong>{{ exerciseDoneCount }} / {{ totalExercises }}</strong>
      <span class="bar"><i :style="{ width: exercisePercent + '%' }" /></span>
    </div>

    <h2>Cómo sacarles partido</h2>
    <ol>
      <li>Lee el bloque verde (objetivo) y los pasos; aún no abras pistas ni solución.</li>
      <li>Escribe código en tu máquina; si te atas cas, abre solo las pistas («solo si te atascas»).</li>
      <li>Comprueba los criterios «Cómo saber que lo llevas bien»; si falla algo, depura y vuelve a leer la lección enlazada.</li>
      <li>Al final, mira la solución de referencia: vale que sea distinta si el comportamiento es el mismo.</li>
      <li>Marca la casilla cuando lo hayas intentado en serio (solo se guarda en este navegador).</li>
    </ol>

    <p class="note">
      Hay ocho ejercicios en orden creciente de soltura: si no sabes por dónde empezar, respeta el número de cada
      tarjeta. Los que suelen llevar más tiempo son
      <RouterLink to="/listas">listas</RouterLink>, el de
      <RouterLink to="/datos-remotos">fetch</RouterLink>, <RouterLink to="/pinia">Pinia</RouterLink> y el
      <RouterLink to="/formularios">formulario final</RouterLink>.
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
