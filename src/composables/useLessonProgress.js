import { ref, computed, watch } from 'vue'
import { lessons } from '../data/curriculum'

const STORAGE_KEY = 'vue-desde-cero-progreso-v1'

function loadSlugs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const completedSlugs = ref(loadSlugs())

watch(
  completedSlugs,
  (v) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    } catch {
      /* ignore quota */
    }
  },
  { deep: true }
)

export function useLessonProgress() {
  const total = lessons.length

  const completedCount = computed(() => {
    const set = new Set(completedSlugs.value)
    return lessons.filter((l) => set.has(l.name)).length
  })

  const percent = computed(() => (total === 0 ? 0 : Math.round((completedCount.value / total) * 100)))

  function isDone(slug) {
    return completedSlugs.value.includes(slug)
  }

  function toggleDone(slug) {
    if (isDone(slug)) {
      completedSlugs.value = completedSlugs.value.filter((s) => s !== slug)
    } else {
      completedSlugs.value = [...completedSlugs.value, slug]
    }
  }

  function markDone(slug) {
    if (!isDone(slug)) {
      completedSlugs.value = [...completedSlugs.value, slug]
    }
  }

  return { completedSlugs, completedCount, percent, isDone, toggleDone, markDone, total }
}
