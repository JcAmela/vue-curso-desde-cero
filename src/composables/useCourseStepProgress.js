import { ref, computed, watch } from 'vue'
import { courseSteps } from '../data/course-index'

const STORAGE_KEY = 'vue-desde-cero-course-steps-v1'

const ids = () => courseSteps.map((s) => s.id)

function loadDone() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    const allowed = new Set(ids())
    return Array.isArray(parsed) ? parsed.filter((id) => allowed.has(id)) : []
  } catch {
    return []
  }
}

const doneIds = ref(loadDone())

watch(
  doneIds,
  (v) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    } catch {
      /* ignore */
    }
  },
  { deep: true }
)

export function useCourseStepProgress() {
  const totalSteps = courseSteps.length

  const stepDoneCount = computed(() => doneIds.value.length)

  const stepPercent = computed(() =>
    totalSteps === 0 ? 0 : Math.round((stepDoneCount.value / totalSteps) * 100)
  )

  const totalXp = computed(() => courseSteps.reduce((acc, s) => acc + (s.xp || 0), 0))

  const earnedXp = computed(() =>
    courseSteps.filter((s) => doneIds.value.includes(s.id)).reduce((acc, s) => acc + (s.xp || 0), 0)
  )

  function isStepDone(id) {
    return doneIds.value.includes(id)
  }

  function toggleStep(id) {
    if (!ids().includes(id)) return
    if (isStepDone(id)) {
      doneIds.value = doneIds.value.filter((x) => x !== id)
    } else {
      doneIds.value = [...doneIds.value, id]
    }
  }

  return {
    doneIds,
    totalSteps,
    stepDoneCount,
    stepPercent,
    totalXp,
    earnedXp,
    isStepDone,
    toggleStep,
  }
}
