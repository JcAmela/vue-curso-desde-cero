import { ref, computed } from 'vue'

const KEY_DONE = 'vp:done'
const KEY_CODE = 'vp:code:'

function readDone() {
  try {
    const raw = localStorage.getItem(KEY_DONE)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

const done = ref(readDone())

function persist() {
  try {
    localStorage.setItem(KEY_DONE, JSON.stringify([...done.value]))
  } catch {}
}

export function useProgress(totalSteps) {
  function markDone(n) {
    if (done.value.has(n)) return
    done.value = new Set([...done.value, n])
    persist()
  }

  function isDone(n) {
    return done.value.has(n)
  }

  function firstPending() {
    for (let i = 1; i <= totalSteps; i++) if (!done.value.has(i)) return i
    return totalSteps
  }

  function reset() {
    done.value = new Set()
    persist()
    for (let i = 1; i <= totalSteps; i++) {
      try {
        localStorage.removeItem(KEY_CODE + i)
      } catch {}
    }
  }

  function loadCode(n) {
    try {
      const raw = localStorage.getItem(KEY_CODE + n)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  function saveCode(n, files) {
    try {
      localStorage.setItem(KEY_CODE + n, JSON.stringify(files))
    } catch {}
  }

  function clearCode(n) {
    try {
      localStorage.removeItem(KEY_CODE + n)
    } catch {}
  }

  const doneCount = computed(
    () => [...done.value].filter((n) => n >= 1 && n <= totalSteps).length
  )
  const percent = computed(() => Math.round((doneCount.value / totalSteps) * 100))

  return {
    markDone,
    isDone,
    firstPending,
    reset,
    loadCode,
    saveCode,
    clearCode,
    doneCount,
    percent,
  }
}
