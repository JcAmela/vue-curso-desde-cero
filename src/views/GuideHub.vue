<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { guideStepsMeta } from '../data/guide-steps-meta.js'
import { theoryChapters } from '../data/theory-chapters.js'
import { useGuideStepProgress } from '../composables/useGuideStepProgress'

const guideSteps = guideStepsMeta

const { doneCount, percent, total, isStepDone, toggleStepDone } = useGuideStepProgress()

const continueStep = computed(() => guideSteps.find((s) => !isStepDone(s.id)) ?? null)
const allGuideMarked = computed(() => guideSteps.every((s) => isStepDone(s.id)))

const theoryById = computed(() => Object.fromEntries(theoryChapters.map((c) => [c.id, c])))

function chapterPracticeLabel(theoryId) {
  const title = theoryById.value[theoryId]?.title
  if (!title) return ''
  return title.replace(/^\d+\.\s*/, '').trim()
}

function stepPreview(intro) {
  const max = 96
  const oneLine = intro.replace(/\s+/g, ' ').trim()
  if (oneLine.length <= max) return oneLine
  return oneLine.slice(0, max).trimEnd() + '…'
}
</script>

<template>
  <div class="lesson-page guide-hub">
    <header class="gh-head">
      <p class="tag">🎯 Guía paso a paso</p>
      <h1>Aprende haciendo: 12 micro-talleres</h1>
      <p class="lead">
        Cada paso te dice <strong>qué vas a practicar</strong>, te deja <strong>tocar código en vivo</strong> (editor a la
        izquierda, resultado a la derecha) y cierra con una <strong>pregunta tipo test</strong> para comprobar que la
        idea ha encajado. Puedes seguir el orden o saltar a un tema concreto si ya lo dominas.
        La <RouterLink to="/teoria">teoría en formato libro</RouterLink> explica el «porqué» con más calma.
      </p>
      <div class="prog" role="status">
        Pasos que marcaste como hechos: <strong>{{ doneCount }} / {{ total }}</strong>
        <span class="bar"><i :style="{ width: percent + '%' }" /></span>
      </div>
      <div v-if="continueStep" class="continue-box">
        <RouterLink class="continue-btn" :to="'/guia/paso/' + continueStep.id">
          Continuar: paso {{ continueStep.n }} — {{ continueStep.title }}
        </RouterLink>
        <span class="continue-hint">
          Te lleva al primer paso que aún no marcaste como hecho (así retomas el ritmo sin buscar en la lista).
        </span>
      </div>
      <div v-else-if="allGuideMarked" class="continue-box done-all">
        <p class="done-all-text">Has completado los 12 pasos en la checklist. ¡Buen trabajo!</p>
        <RouterLink class="continue-btn ghost" to="/practica">Pasamos a retos más largos →</RouterLink>
      </div>
    </header>

    <ol class="step-list">
      <li v-for="s in guideSteps" :key="s.id" class="step-row">
        <RouterLink class="step-link" :to="'/guia/paso/' + s.id">
          <span class="num">{{ s.n }}</span>
          <span class="txt">
            <span class="t">{{ s.title }}</span>
            <RouterLink class="theory-line" :to="'/teoria#' + s.theoryId">
              Teoría: {{ chapterPracticeLabel(s.theoryId) }}
            </RouterLink>
            <span class="sub">{{ stepPreview(s.intro) }}</span>
          </span>
        </RouterLink>
        <label class="mark">
          <input type="checkbox" :checked="isStepDone(s.id)" @change="toggleStepDone(s.id)" />
          <span>Hecho</span>
        </label>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.gh-head {
  margin-bottom: 1.25rem;
}

.tag {
  display: inline-block;
  margin: 0 0 0.5rem;
  padding: 0.25rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.12);
  border-radius: 999px;
}

.prog {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: var(--lv-soft);
  border-radius: var(--lv-radius-sm);
  font-size: 0.88rem;
}

.prog strong {
  color: var(--lv-green-dim);
}

.bar {
  display: block;
  margin-top: 0.5rem;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, var(--lv-green));
  border-radius: 999px;
  transition: width 0.3s ease;
}

.continue-box {
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.12), rgba(59, 130, 246, 0.08));
  border: 1px solid rgba(66, 184, 131, 0.22);
  border-radius: var(--lv-radius-sm);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
}

.continue-box.done-all {
  background: var(--lv-soft);
  border-color: var(--lv-border);
}

.done-all-text {
  margin: 0 !important;
  font-size: 0.9rem;
  font-weight: 650;
  color: var(--lv-navy);
}

.continue-btn {
  display: inline-flex;
  padding: 0.55rem 1.1rem;
  font-size: 0.88rem;
  font-weight: 750;
  color: #fff !important;
  text-decoration: none !important;
  background: linear-gradient(145deg, var(--lv-green), var(--lv-green-dim));
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(66, 184, 131, 0.35);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.continue-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(66, 184, 131, 0.4);
}

.continue-btn.ghost {
  color: var(--lv-navy) !important;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  box-shadow: 0 2px 8px rgba(53, 73, 94, 0.06);
}

.continue-btn.ghost:hover {
  border-color: rgba(66, 184, 131, 0.45);
}

.continue-hint {
  font-size: 0.76rem;
  color: var(--lv-muted);
  line-height: 1.35;
  max-width: 52ch;
}

.step-list {
  margin: 0 !important;
  padding: 0 !important;
  list-style: none;
}

.step-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.65rem;
  margin-bottom: 0.65rem;
  padding: 0.65rem 0.75rem;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius-sm);
}

.step-link {
  flex: 1 1 220px;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  text-decoration: none !important;
  color: inherit !important;
}

.num {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(145deg, #3b82f6, #2563eb);
  border-radius: 10px;
  font-size: 0.9rem;
}

.txt {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.t {
  font-weight: 700;
  font-size: 0.95rem;
}

.theory-line {
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 650;
  color: #1d4ed8 !important;
  text-decoration: none !important;
  margin-bottom: 0.1rem;
}

.theory-line:hover {
  text-decoration: underline !important;
}

.sub {
  font-size: 0.82rem;
  color: var(--lv-muted);
  line-height: 1.35;
}

.mark {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: var(--lv-muted);
  margin-left: auto;
}

.mark input {
  accent-color: var(--lv-green);
}
</style>
