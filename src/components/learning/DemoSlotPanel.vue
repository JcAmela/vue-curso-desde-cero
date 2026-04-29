<script setup>
defineProps({
  nombre: { type: String, default: 'Panel' },
})
</script>

<template>
  <div class="slot-panel">
    <header class="head">
      <slot name="encabezado">Encabezado por defecto</slot>
    </header>
    <p class="nombre">{{ nombre }}</p>
    <div class="cuerpo">
      <slot>
        <p class="fallback">Si el padre no pone nada aquí, verás este texto (contenido por defecto del slot).</p>
      </slot>
    </div>
    <footer class="foot">
      <slot name="pie"><span class="pie-def">Pie por defecto</span></slot>
    </footer>
  </div>
</template>

<style scoped>
.slot-panel {
  max-width: 26rem;
  border-radius: var(--lv-radius-sm);
  border: 1px solid var(--lv-border);
  overflow: hidden;
  background: #fff;
}

.head {
  padding: 0.65rem 1rem;
  font-weight: 700;
  background: linear-gradient(90deg, rgba(66, 184, 131, 0.14), rgba(66, 184, 131, 0.04));
  border-bottom: 1px solid var(--lv-border);
}

.nombre {
  margin: 0 !important;
  padding: 0.35rem 1rem 0;
  font-size: 0.75rem !important;
  color: var(--lv-muted) !important;
}

.cuerpo {
  padding: 0.85rem 1rem 1rem;
}

.fallback {
  margin: 0 !important;
  font-size: 0.9rem !important;
  color: var(--lv-muted) !important;
}

.foot {
  padding: 0.55rem 1rem;
  font-size: 0.85rem;
  background: var(--lv-soft);
  border-top: 1px solid var(--lv-border);
}

.pie-def {
  color: var(--lv-muted);
}
</style>
