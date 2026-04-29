<script setup>
defineProps({
  label: { type: String, default: 'Pruébalo tú' },
})
</script>

<template>
  <div class="try-it">
    <p v-if="label" class="try-label">{{ label }}</p>
    <div class="try-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.try-it {
  margin: 1rem 0;
  padding: 1rem 1.1rem 1.15rem;
  background: linear-gradient(145deg, #f8fbff 0%, #f2faf6 100%);
  border: 1px dashed rgba(66, 184, 131, 0.38);
  border-radius: var(--lv-radius-sm);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.try-label {
  margin: 0 0 0.75rem;
  display: inline-block;
  padding: 0.18rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--lv-green-dim);
  background: rgba(66, 184, 131, 0.12);
  border-radius: 6px;
  border: 1px solid rgba(66, 184, 131, 0.22);
}

.try-body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
