<script setup>
import { ref, computed, watch } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'

const precio = ref(12)
const unidades = ref(3)
const cupon = ref('')
const total = computed(() => precio.value * unidades.value)
const log = ref([])

watch([precio, unidades], () => {
  log.value = [`Total actual: ${total.value} € (watch se ejecutó otra vez)`, ...log.value].slice(0, 4)
})
</script>

<template>
  <article class="lesson-page">
    <h1>Valores calculados (<code class="inline">computed</code>) y “cuando cambie esto…” (<code class="inline">watch</code>)</h1>
    <p class="lead">
      A veces un dato no lo escribes a mano: lo <strong>sacas</strong> de otros. En una tienda, el total es precio ×
      cantidad. Podrías calcularlo dentro del template, pero es más limpio declarar un
      <code class="inline">computed</code>: Vue lo recalcula solo cuando cambian precio o cantidad.
    </p>

    <h2>Diferencia sencilla</h2>
    <ul>
      <li>
        <strong><code class="inline">computed</code>:</strong> “Dame un valor que depende de otros valores.” Sirve para
        textos de resumen, totales, listas filtradas…
      </li>
      <li>
        <strong><code class="inline">watch</code>:</strong> “Cuando esto cambie, <em>haz algo</em>.” Por ejemplo guardar
        en <code class="inline">localStorage</code>, volver a pedir datos a un servidor o mostrar un mensaje. No abuses:
        muchas cosas se pueden resolver solo con <code class="inline">computed</code> y el template.
      </li>
    </ul>

    <TryItBox>
      <div class="grid2">
        <label>
          Precio por unidad (€)
          <input v-model.number="precio" type="number" min="0" step="1" />
        </label>
        <label>
          Unidades
          <input v-model.number="unidades" type="number" min="0" step="1" />
        </label>
      </div>
      <label class="cupon">
        Cupón de prueba: escribe <strong>dto</strong> (en minúsculas) para un 10 % de descuento de juguete
        <input v-model="cupon" type="text" />
      </label>
      <p class="total-line">
        Total (con <code class="inline">computed</code>):
        <strong>{{ cupon.toLowerCase() === 'dto' ? total * 0.9 : total }} €</strong>
        <span v-if="cupon.toLowerCase() === 'dto'" class="tag">−10 %</span>
      </p>
      <ul class="mini-log">
        <li v-for="(linea, i) in log" :key="i">{{ linea }}</li>
        <li v-if="!log.length" class="placeholder">Mueve el precio o las unidades y verás mensajes del watch.</li>
      </ul>
    </TryItBox>
  </article>
</template>

<style scoped>
.grid2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--lv-muted);
}

label input {
  display: block;
  margin-top: 0.35rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
}

.cupon {
  display: block;
  margin-bottom: 0.75rem;
}

.cupon input {
  display: block;
  margin-top: 0.35rem;
  max-width: 16rem;
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
}

.total-line {
  margin: 0 0 0.65rem !important;
  font-size: 1rem !important;
}

.total-line strong {
  color: var(--lv-green-dim);
  font-size: 1.2rem;
}

.tag {
  margin-left: 0.5rem;
  padding: 0.15rem 0.45rem;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  background: rgba(245, 158, 11, 0.2);
  border-radius: 6px;
}

.mini-log {
  margin: 0 !important;
  padding: 0.65rem 0.85rem !important;
  background: #fff;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
  font-size: 0.82rem !important;
  list-style: disc;
  max-width: none !important;
}

.placeholder {
  color: var(--lv-muted);
  list-style: none;
  margin-left: -1rem;
}
</style>
