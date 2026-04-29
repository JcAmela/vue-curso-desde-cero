<script setup>
import { Repl, useStore, useVueImportMap, File } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'

const props = defineProps({
  /** Mapa nombre de archivo → código inicial (normalmente solo App.vue) */
  files: { type: Object, required: true },
  /** Archivo principal del REPL */
  mainFile: { type: String, default: 'App.vue' },
})

const { importMap: builtinImportMap, vueVersion, productionMode } = useVueImportMap({})

function buildFileMap() {
  const out = {}
  for (const [name, code] of Object.entries(props.files)) {
    out[name] = new File(name, code, false)
  }
  return out
}

const main =
  props.mainFile in props.files ? props.mainFile : Object.keys(props.files)[0] || 'App.vue'

const store = useStore(
  {
    vueVersion,
    builtinImportMap,
    productionMode,
    files: buildFileMap(),
    mainFile: main,
    showOutput: true,
    outputMode: 'preview',
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
