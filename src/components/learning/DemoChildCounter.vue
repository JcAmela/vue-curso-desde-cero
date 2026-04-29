<script setup>
defineProps({
  titulo: { type: String, default: 'Contador hijo' },
  valor: { type: Number, required: true },
})

const emit = defineEmits(['sumar', 'reiniciar'])
</script>

<template>
  <div class="demo-child">
    <p class="child-title">{{ titulo }}</p>
    <p class="child-valor">
      Número que le llega desde el padre (<span class="code">props</span>): <strong>{{ valor }}</strong>
    </p>
    <div class="btns">
      <button type="button" class="cbtn" @click="emit('sumar')">Pedir +1 al padre</button>
      <button type="button" class="cbtn ghost" @click="emit('reiniciar')">Pedir reinicio</button>
    </div>
    <p class="hint">
      El hijo no puede cambiar ese número a pelo: solo avisa al padre con un <span class="code">emit</span> y el padre es
      quien actualiza el dato.
    </p>
  </div>
</template>

<style scoped>
.demo-child {
  padding: 1rem;
  background: #fff;
  border-radius: var(--lv-radius-sm);
  border: 1px solid var(--lv-border);
}

.child-title {
  margin: 0 0 0.35rem !important;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--lv-muted);
}

.child-valor {
  margin: 0 0 0.75rem !important;
  font-size: 1rem;
}

.child-valor strong {
  font-size: 1.35rem;
  color: var(--lv-green-dim);
}

.code {
  font-family: var(--lv-mono);
  font-size: 0.85em;
  color: #b45309;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cbtn {
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 650;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid var(--lv-border);
  background: var(--lv-soft);
  cursor: pointer;
}

.cbtn.ghost {
  background: #fff;
}

.cbtn:hover {
  border-color: rgba(66, 184, 131, 0.45);
}

.hint {
  margin: 0.75rem 0 0 !important;
  font-size: 0.82rem !important;
  color: var(--lv-muted) !important;
}
</style>
