import { ref, computed, watch } from 'vue'
import { exercises } from '../data/exercises'

const STORAGE_KEY = 'vue-desde-cero-ejercicios-v1'

const ids = () => exercises.map((e) => e.id)

function loadDone() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id) => ids().includes(id)) : []
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

export function useExerciseProgress() {
  const totalExercises = exercises.length

  const exerciseDoneCount = computed(() => doneIds.value.length)

  const exercisePercent = computed(() =>
    totalExercises === 0 ? 0 : Math.round((exerciseDoneCount.value / totalExercises) * 100)
  )

  function isExerciseDone(id) {
    return doneIds.value.includes(id)
  }

  function toggleExercise(id) {
    if (isExerciseDone(id)) {
      doneIds.value = doneIds.value.filter((x) => x !== id)
    } else {
      doneIds.value = [...doneIds.value, id]
    }
  }

  return {
    doneIds,
    totalExercises,
    exerciseDoneCount,
    exercisePercent,
    isExerciseDone,
    toggleExercise,
  }
}
