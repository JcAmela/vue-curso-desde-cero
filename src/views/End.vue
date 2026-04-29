<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { TOTAL } from '../steps'
import { useProgress } from '../composables/useProgress'

const router = useRouter()
const progress = useProgress(TOTAL)

function restart() {
  if (confirm('¿Borrar el progreso y empezar otra vez desde el paso 1?')) {
    progress.reset()
    router.push('/paso/1')
  }
}
</script>

<template>
  <main class="end">
    <div class="card">
      <h1>Hecho.</h1>
      <p class="lead">
        Has visto las piezas que sostienen casi cualquier app de Vue: reactividad, plantilla, eventos, listas, computed,
        componentes con props y emit, y peticiones con tres estados. Eso es la base.
      </p>
      <p class="lead">
        El siguiente paso natural: un proyecto pequeño tuyo. Una lista de tareas con persistencia, una libreta de
        gastos, una pantalla de estadísticas… algo que te apetezca usar de verdad.
      </p>
      <div class="actions">
        <RouterLink class="primary" to="/paso/1">Repasar desde el principio</RouterLink>
        <button class="ghost" type="button" @click="restart">Borrar progreso y volver a empezar</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.end {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  background: var(--bg);
}
.card {
  max-width: 36rem;
  width: 100%;
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
  margin: 0 0 1rem;
  color: var(--muted);
  line-height: 1.6;
  font-size: 1.02rem;
}
.actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}
.primary,
.ghost {
  font: inherit;
  padding: 0.6rem 1.05rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-block;
}
.primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  font-weight: 600;
}
.primary:hover {
  background: var(--accent-dark);
}
.ghost {
  background: transparent;
  color: var(--muted);
}
.ghost:hover {
  color: var(--text);
  background: var(--surface);
}
</style>
