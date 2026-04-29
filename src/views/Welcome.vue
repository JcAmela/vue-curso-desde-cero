<script setup>
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { TOTAL } from '../steps'
import { useProgress } from '../composables/useProgress'

const router = useRouter()
const progress = useProgress(TOTAL)

const startingStep = computed(() => progress.firstPending())
const hasProgress = computed(() => progress.doneCount.value > 0)

function start() {
  router.push(`/paso/${startingStep.value}`)
}

function restart() {
  if (!hasProgress.value) return start()
  if (confirm('¿Borrar el progreso y empezar desde el paso 1?')) {
    progress.reset()
    router.push('/paso/1')
  }
}
</script>

<template>
  <main class="welcome">
    <div class="card">
      <h1>Vue, paso a paso</h1>
      <p class="lead">
        Quince cambios pequeños. Cada uno cabe en una pantalla. Editas el código, ves el resultado al lado, y cuando
        funciona pasas al siguiente. Sabiendo HTML y JavaScript básico te llega.
      </p>

      <div v-if="hasProgress" class="progress">
        <div class="bar"><i :style="{ width: progress.percent.value + '%' }" /></div>
        <p>{{ progress.doneCount.value }} de {{ TOTAL }} pasos hechos.</p>
      </div>

      <div class="actions">
        <button class="primary" type="button" @click="start">
          <span v-if="hasProgress">Continuar (paso {{ startingStep }})</span>
          <span v-else>Empezar</span>
        </button>
        <button v-if="hasProgress" class="ghost" type="button" @click="restart">Volver al principio</button>
      </div>

      <p class="foot">
        Tu progreso y el código se guardan en este navegador. No hay cuenta, no hay servidor.
      </p>
    </div>
  </main>
</template>

<style scoped>
.welcome {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  background: var(--bg);
}
.card {
  max-width: 36rem;
  width: 100%;
  text-align: left;
  padding: 1.75rem 1.5rem;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
}
h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.lead {
  margin: 0 0 2rem;
  color: var(--muted);
  line-height: 1.6;
  font-size: 1.05rem;
}
.progress {
  margin: 0 0 1.5rem;
}
.bar {
  height: 4px;
  background: var(--surface);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.4rem;
}
.bar i {
  display: block;
  height: 100%;
  background: var(--accent);
  transition: width 0.3s ease;
}
.progress p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}
.actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
button {
  font: inherit;
  padding: 0.65rem 1.1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  font-size: 0.95rem;
}
button.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 600;
}
button.primary:hover {
  background: var(--accent-dark);
  border-color: var(--accent-dark);
}
button.ghost {
  background: transparent;
  color: var(--muted);
}
button.ghost:hover {
  color: var(--text);
  background: var(--surface);
}
.foot {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
}
</style>
