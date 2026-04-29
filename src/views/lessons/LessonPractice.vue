<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { exercises } from '../../data/exercises.js'
import ExerciseCard from '../../components/learning/ExerciseCard.vue'
import { useExerciseProgress } from '../../composables/useExerciseProgress'

const filterMode = ref('all')

const { exerciseDoneCount, exercisePercent, totalExercises, isExerciseDone } = useExerciseProgress()

const visibleExercises = computed(() =>
  exercises.filter((e) => {
    if (filterMode.value === 'pending') return !isExerciseDone(e.id)
    if (filterMode.value === 'done') return isExerciseDone(e.id)
    return true
  })
)

const firstPendingId = computed(() => exercises.find((e) => !isExerciseDone(e.id))?.id ?? null)

function nextInProgram(currentId) {
  const i = exercises.findIndex((e) => e.id === currentId)
  if (i === -1 || i >= exercises.length - 1) return null
  return exercises[i + 1]
}
</script>

<template>
  <article class="lesson-page practice-page">
    <h1>Ejercicios prácticos</h1>
    <p class="lead">
      Aquí aplicamos <strong>práctica deliberada</strong>: cada enunciado tiene objetivo claro, pasos y criterios para
      saber si lo has entendido. Puedes <strong>filtrar por pendientes o hechos</strong>, <strong>copiar el enlace</strong>
      a un ejercicio concreto (útiles para apuntes) y saltar al <strong>siguiente del programa</strong> sin buscar a mano.
      Código en tu editor (VS Code, Cursor…), <code class="inline">.vue</code> de prueba en
      <code class="inline">src/components/</code> y <code class="inline">npm run dev</code> encendido.
    </p>

    <div class="progress-mini" role="status">
      <span>Ejercicios que marcas como «hechos» en esta página:</span>
      <strong>{{ exerciseDoneCount }} / {{ totalExercises }}</strong>
      <span class="bar"><i :style="{ width: exercisePercent + '%' }" /></span>
    </div>

    <h2>Cómo sacarles partido</h2>
    <ol>
      <li>Lee el bloque verde (objetivo) y los pasos; aún no abras pistas ni solución.</li>
      <li>Escribe código en tu máquina; si te atas cas, abre solo las pistas (cada una en su propio desplegable).</li>
      <li>Comprueba los criterios «Cómo saber que lo llevas bien»; si falla algo, depura y vuelve a leer la lección enlazada.</li>
      <li>Los bloques ámbar son <strong>opcionales</strong>: más reto cuando el enunciado base ya te sale.</li>
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

    <div class="practice-toolbar" role="group" aria-label="Filtrar ejercicios">
      <span class="tool-label">Ver:</span>
      <button type="button" class="tool-btn" :class="{ active: filterMode === 'all' }" @click="filterMode = 'all'">
        Todos
      </button>
      <button
        type="button"
        class="tool-btn"
        :class="{ active: filterMode === 'pending' }"
        @click="filterMode = 'pending'"
      >
        Pendientes
      </button>
      <button type="button" class="tool-btn" :class="{ active: filterMode === 'done' }" @click="filterMode = 'done'">
        Hechos
      </button>
      <RouterLink v-if="firstPendingId" class="tool-jump" :to="{ path: '/practica', hash: '#' + firstPendingId }">
        Ir al primer pendiente
      </RouterLink>
      <span v-else class="tool-all-done">No queda ninguno pendiente por marcar.</span>
    </div>
    <p v-if="filterMode !== 'all'" class="filter-meta">Mostrando {{ visibleExercises.length }} de {{ totalExercises }}.</p>

    <p v-if="!visibleExercises.length" class="empty-filter">
      Nada que encaje con este filtro. Prueba «Todos» o marca otro ejercicio como hecho.
    </p>

    <ExerciseCard
      v-for="ex in visibleExercises"
      :key="ex.id"
      :exercise="ex"
      :index="exercises.findIndex((e) => e.id === ex.id)"
      :next-exercise="nextInProgram(ex.id)"
    />

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

.practice-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin: 1rem 0 0.35rem;
  padding: 0.65rem 0.85rem;
  background: var(--lv-surface);
  border-radius: var(--lv-radius-sm);
  border: 1px solid var(--lv-border);
}

.tool-label {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--lv-muted);
  margin-right: 0.15rem;
}

.tool-btn {
  padding: 0.35rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 650;
  font-family: inherit;
  border-radius: 999px;
  border: 1px solid var(--lv-border);
  background: #fff;
  cursor: pointer;
  color: var(--lv-navy);
}

.tool-btn:hover {
  border-color: rgba(66, 184, 131, 0.45);
}

.tool-btn.active {
  background: rgba(66, 184, 131, 0.18);
  border-color: rgba(66, 184, 131, 0.55);
  font-weight: 800;
}

.tool-jump {
  margin-left: auto;
  font-size: 0.84rem;
  font-weight: 700;
  text-decoration: none !important;
}

.tool-all-done {
  margin-left: auto;
  font-size: 0.84rem;
  font-weight: 650;
  color: var(--lv-green-dim);
}

.filter-meta {
  margin: 0 0 0.75rem !important;
  font-size: 0.82rem !important;
  color: var(--lv-muted) !important;
}

.empty-filter {
  padding: 1rem 1.1rem;
  margin: 0 0 1rem;
  background: #fef3c7;
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: var(--lv-radius-sm);
  font-size: 0.92rem !important;
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
