<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLessonNav } from '../../composables/useLessonNav'
import { useLessonProgress } from '../../composables/useLessonProgress'

const route = useRoute()
const { prevLesson, nextLesson } = useLessonNav()
const { isDone, toggleDone } = useLessonProgress()

const slug = computed(() => route.name)

const showLessonTools = computed(() => slug.value !== 'home' && typeof slug.value === 'string')
</script>

<template>
  <footer v-if="showLessonTools" class="lesson-footer">
    <div class="actions">
      <button type="button" class="btn-done" :class="{ on: isDone(slug) }" @click="toggleDone(slug)">
        {{ isDone(slug) ? '✓ Ya la marqué como leída (clic para deshacer)' : 'Marcar esta lección como leída' }}
      </button>
    </div>
    <nav class="pager" aria-label="Lecciones anterior y siguiente">
      <RouterLink v-if="prevLesson" :to="`/${prevLesson.path}`" class="pager-link prev">
        ← {{ prevLesson.title }}
      </RouterLink>
      <span v-else class="pager-spacer" />
      <RouterLink v-if="nextLesson" :to="`/${nextLesson.path}`" class="pager-link next">
        {{ nextLesson.title }} →
      </RouterLink>
    </nav>
  </footer>
</template>

<style scoped>
.lesson-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lv-border);
}

.actions {
  margin-bottom: 1rem;
}

.btn-done {
  padding: 0.55rem 1rem;
  font-size: 0.88rem;
  font-weight: 650;
  font-family: inherit;
  color: var(--lv-navy);
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius-sm);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.btn-done:hover {
  border-color: rgba(66, 184, 131, 0.45);
  background: rgba(66, 184, 131, 0.06);
}

.btn-done:focus-visible {
  outline: 2px solid var(--lv-green);
  outline-offset: 2px;
}

.btn-done.on {
  color: var(--lv-green-dim);
  background: rgba(66, 184, 131, 0.12);
  border-color: rgba(66, 184, 131, 0.35);
}

.pager {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.pager-link {
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
  font-weight: 650;
  color: var(--lv-navy);
  background: var(--lv-soft);
  border-radius: 999px;
  border: 1px solid var(--lv-border);
  text-decoration: none !important;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease;
}

.pager-link:hover {
  background: #fff;
  box-shadow: var(--lv-shadow);
}

.pager-link.next {
  margin-left: auto;
}

.pager-spacer {
  flex: 1;
  min-width: 0;
}

@media (max-width: 520px) {
  .pager .prev,
  .pager .next {
    flex: 1 1 100%;
    text-align: center;
  }

  .pager-link.next {
    margin-left: 0;
  }
}
</style>
