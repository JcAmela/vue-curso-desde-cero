<script setup>
import { ref } from 'vue'
import { Repl, useStore, useVueImportMap, File } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'

const props = defineProps({
  /** Mapa nombre de archivo → código inicial (normalmente solo App.vue) */
  files: { type: Object, required: true },
  /** Archivo principal del REPL */
  mainFile: { type: String, default: 'App.vue' },
})

const { importMap: builtinImportMap, vueVersion, productionMode } = useVueImportMap({})

/** Rutas como las internas del REPL v4 (`src/App.vue`, …). */
function toReplPath(name) {
  if (name.startsWith('src/') || name === 'import-map.json' || name === 'tsconfig.json') return name
  return `src/${name}`
}

function buildFileMap() {
  const out = {}
  for (const [name, code] of Object.entries(props.files)) {
    const path = toReplPath(name)
    out[path] = new File(path, code, false)
  }
  return out
}

const resolvedMain = toReplPath(
  props.mainFile in props.files ? props.mainFile : Object.keys(props.files)[0] || 'App.vue'
)

/**
 * useStore v4: `files`, `mainFile`, `showOutput` y `outputMode` deben ser ref;
 * si no, mainFile.value es undefined y el REPL revienta en addSrcPrefix().
 */
const store = useStore(
  {
    vueVersion,
    builtinImportMap,
    productionMode,
    files: ref(buildFileMap()),
    mainFile: ref(resolvedMain),
    showOutput: ref(true),
    outputMode: ref('preview'),
  },
  undefined
)
</script>

<template>
  <div class="mini-repl" role="region" aria-label="Consola Vue embebida">
    <Repl :store="store" :editor="CodeMirror" :show-compile-output="false" class="repl-inner" />
  </div>
</template>

<style scoped>
.mini-repl {
  margin: 1rem 0;
  border-radius: var(--lv-radius-sm);
  border: 1px solid var(--lv-border);
  overflow: hidden;
  min-height: 420px;
  background: #1e1e1e;
}

.repl-inner {
  height: min(70vh, 560px);
}
</style>

<style>
/* Sin :deep: bloque global; evita aviso de LightningCSS con selectores Vue */
.mini-repl .vue-repl {
  height: 100%;
}
</style>
