<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { theoryChapters } from '../data/theory-chapters.js'
import {
  getGuideStepsForTheoryChapter,
  THEORY_CHAPTER_PRACTICE_FALLBACK,
} from '../data/theory-guide-bridge.js'

const practiceStepsByChapterId = computed(() =>
  Object.fromEntries(theoryChapters.map((ch) => [ch.id, getGuideStepsForTheoryChapter(ch.id)]))
)

function practiceSteps(chapterId) {
  return practiceStepsByChapterId.value[chapterId] ?? []
}

function practiceFallback(chapterId) {
  return THEORY_CHAPTER_PRACTICE_FALLBACK[chapterId] ?? null
}
</script>

<template>
  <div class="lesson-page theory-book">
    <header class="book-head">
      <p class="tag">📚 Documentación teórica</p>
      <h1>Libro de conceptos Vue</h1>
      <p class="lead">
        Texto pensado para <strong>leer por bloques</strong>: cada párrafo intenta ir de «para qué sirve» a «cómo se
        escribe». La <RouterLink to="/guia">guía paso a paso</RouterLink> es donde ejecutas código en el navegador y
        compruebas con un test; el menú lateral lleva a <strong>lecciones con demos</strong> por tema concretas.
      </p>
      <p class="lead lead-tight">
        Tras cada capítulo encontrarás <strong>Poner manos al código</strong>: enlaces a los pasos de la guía que llevan
        esa idea a la práctica (teoría + práctica espaciada).
      </p>
    </header>

    <nav class="toc" aria-label="Índice del libro">
      <h2>Índice</h2>
      <ol>
        <li v-for="ch in theoryChapters" :key="ch.id" class="toc-row">
          <a :href="'#' + ch.id">{{ ch.title }}</a>
          <a
            v-if="practiceSteps(ch.id).length || practiceFallback(ch.id)"
            class="toc-practice"
            :href="'#practice-h-' + ch.id"
            :aria-label="'Taller práctico del capítulo: ' + ch.title"
          >
            Taller
          </a>
        </li>
      </ol>
    </nav>

    <article v-for="ch in theoryChapters" :key="ch.id" :id="ch.id" class="chapter">
      <h2>{{ ch.title }}</h2>
      <section v-for="(sec, i) in ch.sections" :key="i" class="section">
        <h3>{{ sec.subtitle }}</h3>
        <p v-for="(para, j) in sec.paragraphs" :key="j">{{ para }}</p>
        <pre v-if="sec.code" class="code-block">{{ sec.code }}</pre>
      </section>

      <aside class="practice-bridge" :aria-labelledby="'practice-h-' + ch.id">
        <h3 :id="'practice-h-' + ch.id" class="practice-bridge-heading">Poner manos al código</h3>

        <template v-if="practiceSteps(ch.id).length">
          <p class="practice-bridge-text">
            {{
              practiceSteps(ch.id).length === 1
                ? 'En la guía hay un taller enlazado con este capítulo:'
                : `En la guía hay ${practiceSteps(ch.id).length} talleres enlazados con este capítulo:`
            }}
          </p>
          <ol class="practice-bridge-steps">
            <li v-for="s in practiceSteps(ch.id)" :key="s.id">
              <RouterLink class="practice-bridge-link" :to="'/guia/paso/' + s.id">
                <span class="pbn">Paso {{ s.n }}</span>
                <span class="pbt">{{ s.title }}</span>
              </RouterLink>
            </li>
          </ol>
          <p class="practice-bridge-actions">
            <RouterLink class="practice-bridge-cta" :to="'/guia/paso/' + practiceSteps(ch.id)[0].id">
              Empezar por el primero →
            </RouterLink>
            <RouterLink class="practice-bridge-secondary" to="/guia">Índice de la guía</RouterLink>
          </p>
        </template>

        <template v-else-if="practiceFallback(ch.id)">
          <p class="practice-bridge-text">{{ practiceFallback(ch.id).blurb }}</p>
          <p class="practice-bridge-actions">
            <RouterLink
              class="practice-bridge-cta"
              :to="'/guia/paso/' + practiceFallback(ch.id).stepId"
            >
              {{ practiceFallback(ch.id).cta }} →
            </RouterLink>
            <RouterLink class="practice-bridge-secondary" to="/guia">Índice de la guía</RouterLink>
          </p>
        </template>

        <template v-else>
          <p class="practice-bridge-text">
            No hay enlace automático a un taller concreto: usa la
            <RouterLink to="/guia">guía</RouterLink>
            o las lecciones del menú.
          </p>
        </template>
      </aside>
    </article>
  </div>
</template>

<style scoped>
.book-head {
  margin-bottom: 1.5rem;
}

.tag {
  display: inline-block;
  margin: 0 0 0.5rem;
  padding: 0.25rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--lv-green-dim);
  background: rgba(66, 184, 131, 0.12);
  border-radius: 999px;
}

.toc {
  margin-bottom: 2rem;
  padding: 1rem 1.25rem;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius-sm);
}

.toc h2 {
  margin-top: 0 !important;
  font-size: 1rem !important;
}

.toc ol {
  margin: 0.5rem 0 0 !important;
}

.toc-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
  margin-bottom: 0.35rem;
}

.toc-practice {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--lv-green-dim) !important;
  text-decoration: none !important;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  border: 1px solid rgba(66, 184, 131, 0.35);
  background: rgba(66, 184, 131, 0.08);
}

.toc-practice:hover {
  background: rgba(66, 184, 131, 0.14);
  text-decoration: none !important;
}

.chapter {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--lv-border);
}

.chapter:last-of-type {
  border-bottom: none;
}

.section h3 {
  font-size: 1.05rem;
  margin-top: 1rem;
}

.lead-tight {
  margin-top: 0.5rem !important;
  font-size: 0.98rem !important;
}

.practice-bridge {
  margin-top: 1.35rem;
  padding: 1rem 1.15rem 1.1rem;
  background: linear-gradient(145deg, rgba(66, 184, 131, 0.09), rgba(59, 130, 246, 0.06));
  border: 1px solid rgba(66, 184, 131, 0.22);
  border-radius: var(--lv-radius-sm);
}

.chapter:last-of-type .practice-bridge {
  margin-bottom: 0;
}

.practice-bridge-heading {
  margin: 0 0 0.6rem !important;
  font-size: 0.95rem !important;
  font-weight: 800 !important;
  color: var(--lv-navy) !important;
  letter-spacing: -0.02em;
}

.practice-bridge-text {
  margin: 0 0 0.85rem !important;
  font-size: 0.88rem !important;
  line-height: 1.5 !important;
  color: var(--lv-text) !important;
  max-width: 62ch;
}

.practice-bridge-steps {
  margin: 0 0 0.9rem !important;
  padding-left: 1.1rem !important;
  max-width: none !important;
}

.practice-bridge-steps li {
  margin-bottom: 0.35rem;
}

.practice-bridge-link {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.55rem;
  font-weight: 650;
  text-decoration: none !important;
}

.practice-bridge-link:hover .pbt {
  text-decoration: underline;
}

.pbn {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--lv-green-dim);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.pbt {
  font-size: 0.9rem;
  color: #1d4ed8;
}

.practice-bridge-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 1rem;
  margin: 0 !important;
}

.practice-bridge-cta {
  display: inline-flex;
  padding: 0.45rem 0.95rem;
  font-size: 0.86rem;
  font-weight: 750;
  color: #fff !important;
  text-decoration: none !important;
  background: linear-gradient(145deg, var(--lv-green), var(--lv-green-dim));
  border-radius: 999px;
  box-shadow: 0 3px 12px rgba(66, 184, 131, 0.28);
}

.practice-bridge-cta:hover {
  filter: brightness(1.05);
}

.practice-bridge-secondary {
  font-size: 0.84rem;
  font-weight: 650;
  text-decoration: none !important;
  color: var(--lv-muted) !important;
}

.practice-bridge-secondary:hover {
  color: #1d4ed8 !important;
  text-decoration: underline !important;
}
</style>
