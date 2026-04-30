<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { steps, TOTAL } from '../steps'
import { useProgress } from '../composables/useProgress'
import StepRunner from '../components/StepRunner.vue'

const route = useRoute()
const router = useRouter()

const progress = useProgress(TOTAL)

const currentN = computed(() => {
  const n = Number(route.params.n)
  if (!Number.isFinite(n) || n < 1) return 1
  if (n > TOTAL) return TOTAL
  return n
})

const step = computed(() => steps[currentN.value - 1])

const runner = ref(null)
const passed = ref(false)
const showHint = ref(false)

watch(currentN, () => {
  passed.value = progress.isDone(currentN.value)
  showHint.value = false
}, { immediate: true })

function onPass() {
  passed.value = true
  progress.markDone(currentN.value)
}

function onChange(files) {
  progress.saveCode(currentN.value, files)
}

function next() {
  if (currentN.value >= TOTAL) {
    router.push('/fin')
    return
  }
  router.push(`/paso/${currentN.value + 1}`)
}

function prev() {
  if (currentN.value <= 1) return
  router.push(`/paso/${currentN.value - 1}`)
}

function skip() {
  runner.value?.loadSolution()
  progress.markDone(currentN.value)
  passed.value = true
}

function reset() {
  progress.clearCode(currentN.value)
  runner.value?.reset()
}

function onKey(e) {
  if (e.target instanceof HTMLElement) {
    const tag = e.target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return
    if (e.target.isContentEditable) return
  }
  if (e.key === 'Enter' && passed.value) {
    e.preventDefault()
    next()
  } else if (e.key === 'ArrowLeft' && currentN.value > 1) {
    prev()
  } else if (e.key === 'ArrowRight' && passed.value) {
    next()
  }
}

const LAB_SCROLL_LOCK = 'lab-scroll-lock'

onMounted(() => {
  document.documentElement.classList.add(LAB_SCROLL_LOCK)
  document.body.classList.add(LAB_SCROLL_LOCK)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.documentElement.classList.remove(LAB_SCROLL_LOCK)
  document.body.classList.remove(LAB_SCROLL_LOCK)
  window.removeEventListener('keydown', onKey)
})

const initialFiles = computed(() => progress.loadCode(currentN.value))
</script>

<template>
  <div class="lab">
    <header class="lab-top">
      <div class="lab-progress" :style="{ '--p': progress.percent.value + '%' }"><i /></div>
      <div class="lab-bar">
        <span class="lab-step">{{ currentN }} / {{ TOTAL }}</span>
        <RouterLink class="lab-exit" to="/">Salir</RouterLink>
      </div>
    </header>

    <div class="lab-copy">
      <h1 class="lab-title">{{ step.title }}</h1>
      <p class="lab-concept">{{ step.concept }}</p>
      <p class="lab-task">{{ step.task }}</p>
      <details v-if="step.hint" class="lab-hint" :open="showHint" @toggle="showHint = $event.target.open">
        <summary>¿Atascado?</summary>
        <p>{{ step.hint }}</p>
      </details>
    </div>

    <div class="lab-stage">
      <StepRunner
        ref="runner"
        :key="currentN"
        :step="step"
        :initial-files="initialFiles"
        centered
        @pass="onPass"
        @change="onChange"
      />
    </div>

    <footer class="lab-foot">
      <div class="lab-actions">
        <button v-if="currentN > 1" class="ghost" type="button" @click="prev">← Atrás</button>
        <button class="ghost" type="button" @click="reset">Reinicio</button>
        <button v-if="!passed" class="ghost" type="button" @click="skip">Saltar</button>
        <button class="primary" type="button" :disabled="!passed" @click="next">
          {{ currentN >= TOTAL ? 'Terminar' : 'Siguiente' }}
        </button>
      </div>
      <p class="lab-status" :data-state="passed ? 'pass' : 'wait'">
        <span v-if="passed">Listo · Enter para continuar</span>
        <span v-else>Edita hasta que pase la comprobación</span>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.lab {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
}

.lab-top {
  flex-shrink: 0;
}

.lab-progress {
  height: 3px;
  background: var(--surface);
  position: relative;
  overflow: hidden;
}

.lab-progress i {
  display: block;
  height: 100%;
  width: var(--p, 0%);
  background: var(--accent);
  transition: width 0.35s ease;
}

.lab-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--dim);
}

.lab-step {
  font-variant-numeric: tabular-nums;
}

.lab-exit {
  color: var(--dim);
  font-size: inherit;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.lab-exit:hover {
  color: var(--text);
}

.lab-copy {
  flex-shrink: 1;
  min-height: 0;
  padding: 0.45rem 1.25rem 0;
  max-width: 56rem;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-wrap: pretty;
}

.lab-title {
  margin: 0;
  font-size: clamp(1.05rem, 2.2vw, 1.28rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: var(--text);
}

.lab-concept {
  margin: 0.4rem 0 0;
  font-size: clamp(0.875rem, 1.75vw, 0.97rem);
  color: #b8b8c2;
  line-height: 1.62;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}

.lab-task {
  margin: 0.55rem 0 0;
  font-size: clamp(0.9rem, 1.85vw, 1.03rem);
  color: #e8e8ed;
  font-weight: 500;
  line-height: 1.65;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.lab-hint {
  margin-top: 0.55rem;
  text-align: left;
}
.lab-hint summary {
  cursor: pointer;
  list-style: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #93c5fd;
  user-select: none;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 0.22em;
}
.lab-hint summary:hover {
  color: #bfdbfe;
}
.lab-hint summary::-webkit-details-marker {
  display: none;
}
.lab-hint p {
  margin: 0.45rem auto 0;
  padding: 0.6rem 0.75rem;
  max-width: 36rem;
  font-size: 0.875rem;
  line-height: 1.55;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  background: var(--surface);
  border-radius: 8px;
  border: 1px solid var(--border);
  color: #d4d4d8;
}

.lab-stage {
  flex: 1 1 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  min-height: 0;
  padding: 0.35rem 1rem 0.2rem;
  width: 100%;
}

.lab-foot {
  flex-shrink: 0;
  padding: 0.35rem 1rem 0.75rem;
}

.lab-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  justify-content: center;
  align-items: center;
}

.lab-status {
  margin: 0.4rem 0 0;
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.45;
  color: #a1a1aa;
  min-height: 1.15em;
}
.lab-status[data-state='pass'] {
  color: var(--accent);
  font-weight: 600;
}

button {
  font: inherit;
  padding: 0.45rem 0.95rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: #d4d4d8;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    background 0.15s,
    border-color 0.15s;
}
button:hover:not(:disabled) {
  background: var(--surface);
  color: var(--text);
}
button.primary {
  background: var(--accent);
  color: #052e14;
  border-color: var(--accent);
  font-weight: 600;
}
button.primary:hover:not(:disabled) {
  background: var(--accent-dark);
  border-color: var(--accent-dark);
  color: #fff;
}
button.primary:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
