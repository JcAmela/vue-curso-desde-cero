import { ref, computed, watch } from 'vue'
import { guideStepsMeta } from '../data/guide-steps-meta.js'

const STORAGE_KEY = 'vue-desde-cero-guia-pasos-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const done = ref(load())

watch(
  done,
  (v) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    } catch {
      /* ignore */
    }
  },
  { deep: true }
)

export function useGuideStepProgress() {
  const total = guideStepsMeta.length

  const doneCount = computed(() => done.value.filter((id) => guideStepsMeta.some((s) => s.id === id)).length)

  const percent = computed(() => (total === 0 ? 0 : Math.round((doneCount.value / total) * 100)))

  function isStepDone(id) {
    return done.value.includes(id)
  }

  function toggleStepDone(id) {
    if (isStepDone(id)) {
      done.value = done.value.filter((x) => x !== id)
    } else {
      done.value = [...done.value, id]
    }
  }

  return { done, doneCount, percent, total, isStepDone, toggleStepDone }
}
