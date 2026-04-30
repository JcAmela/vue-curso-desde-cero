<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount, watch } from 'vue'
import { Repl, useStore, useVueImportMap, File } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'

const props = defineProps({
  step: { type: Object, required: true },
  initialFiles: { type: Object, default: null },
  /** Bloque alto centrado tipo terminal (paso guiado). */
  centered: { type: Boolean, default: false },
})

const emit = defineEmits(['pass', 'change'])

const { importMap: builtinImportMap, vueVersion, productionMode } = useVueImportMap({})

function withSrc(name) {
  return name.startsWith('src/') ? name : `src/${name}`
}

function makeStore(map) {
  const mainCode = map['App.vue'] ?? Object.values(map)[0] ?? ''
  const store = useStore(
    {
      vueVersion,
      builtinImportMap,
      productionMode,
      mainFile: ref('src/App.vue'),
      template: ref({
        welcomeSFC: mainCode,
        newSFC: mainCode,
      }),
      showOutput: ref(true),
      outputMode: ref('preview'),
    },
    undefined
  )
  for (const [name, code] of Object.entries(map)) {
    if (name === 'App.vue') continue
    const path = withSrc(name)
    store.addFile(new File(path, code, false))
  }
  return store
}

function pickInitial() {
  const saved = props.initialFiles
  if (saved && Object.keys(saved).length) return saved
  return props.step.files
}

const store = shallowRef(makeStore(pickInitial()))
const replKey = ref(0)
const host = ref(null)
const status = ref('idle')
const passed = ref(false)

function snapshotFiles() {
  const map = {}
  try {
    const files = store.value.files
    for (const path of Object.keys(files)) {
      if (path === 'import-map.json' || path === 'tsconfig.json') continue
      const f = files[path]
      const short = path.startsWith('src/') ? path.slice(4) : path
      map[short] = f.code
    }
  } catch {}
  return map
}

function getIframeDoc() {
  const iframe = host.value?.querySelector('iframe')
  if (!iframe) return null
  try {
    const doc = iframe.contentDocument
    if (!doc || !doc.body) return null
    if (doc.body.children.length === 0) return null
    return doc
  } catch {
    return null
  }
}

let pollTimer = null
let checking = false

async function tick() {
  if (passed.value || checking) return
  const doc = getIframeDoc()
  if (!doc) return
  checking = true
  let ok = false
  try {
    const r = props.step.check(doc)
    ok = r instanceof Promise ? await r : r
  } catch {
    ok = false
  }
  checking = false
  if (passed.value) return
  if (ok) {
    status.value = 'pass'
    passed.value = true
    emit('pass')
  }
}

function startPolling() {
  stopPolling()
  pollTimer = setInterval(tick, 1200)
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function rebuild(map) {
  stopPolling()
  passed.value = false
  status.value = 'idle'
  store.value = makeStore(map)
  replKey.value++
  emit('change', { ...map })
  startPolling()
}

function reset() {
  rebuild(props.step.files)
}

function loadSolution() {
  rebuild(props.step.solution)
}

defineExpose({ reset, loadSolution })

watch(
  () => props.step.n,
  () => {
    rebuild(pickInitial())
  }
)

onMounted(() => {
  startPolling()
})

onBeforeUnmount(() => {
  stopPolling()
  emit('change', snapshotFiles())
})
</script>

<template>
  <div ref="host" class="repl-host" :class="{ 'repl-host--centered': centered }" :data-status="status">
    <Repl :key="replKey" :store="store" :editor="CodeMirror" :show-compile-output="false" class="repl-inner" />
  </div>
</template>

<style scoped>
.repl-host {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  min-height: 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--terminal-bg, #0d0d0f);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 24px 48px rgba(0, 0, 0, 0.45);
}

.repl-host--centered {
  height: 100%;
  max-height: 100%;
  align-self: stretch;
}

.repl-inner {
  height: 100%;
}
</style>

<style>
.repl-host .vue-repl {
  height: 100%;
}

/* Vue REPL: encajar en modo oscuro */
.repl-host {
  --vue-repl-brand: #22c55e;
}
</style>
