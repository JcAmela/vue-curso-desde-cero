<script setup>
import { ref, computed } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'

const nombre = ref('')
const plan = ref('pro')
const acepta = ref(false)
const aceptaTexto = computed(() => (acepta.value ? 'Has marcado la casilla.' : 'Aún no has marcado la casilla.'))
const resumen = computed(() => {
  const n = nombre.value.trim()
  if (!n) return 'Escribe un nombre para ver el resumen.'
  return `${n} eligió el plan «${plan.value}».`
})
</script>

<template>
  <article class="lesson-page">
    <h1>Formularios: enlazar inputs a variables con <code class="inline">v-model</code></h1>
    <p class="lead">
      En JavaScript clásico lees <code class="inline">input.value</code> cuando te interesa, y escribes en el input
      cambiando esa propiedad. <code class="inline">v-model</code> hace las <strong>dos direcciones</strong> de una vez:
      lo que escribe el usuario entra en tu variable, y si tu variable cambia en código, el input se actualiza solo.
    </p>

    <h2>Qué tipo de dato sale de cada control</h2>
    <ul>
      <li>Cajas de texto → un <strong>string</strong> (texto).</li>
      <li><code class="inline">input type="checkbox"</code> → <strong>true</strong> o <strong>false</strong>.</li>
      <li><code class="inline">select</code> y radios → el <code class="inline">value</code> de la opción elegida.</li>
      <li><code class="inline">textarea</code> → texto, igual que un input de una línea.</li>
    </ul>

    <TryItBox>
      <label class="block">
        <span>Nombre</span>
        <input v-model="nombre" type="text" autocomplete="given-name" placeholder="Tu nombre" />
      </label>
      <label class="block">
        <span>Plan</span>
        <select v-model="plan">
          <option value="free">Gratis</option>
          <option value="pro">Pro</option>
          <option value="team">Equipo</option>
        </select>
      </label>
      <label class="inline-check">
        <input v-model="acepta" type="checkbox" />
        Acepto términos de ejemplo (no son reales)
      </label>
      <p class="out"><strong>Resumen:</strong> {{ resumen }}</p>
      <p class="out muted-sm">{{ aceptaTexto }}</p>
    </TryItBox>

    <h2>Modificadores opcionales</h2>
    <p>
      Por ejemplo: <code class="inline">v-model.lazy</code> actualiza la variable cuando el usuario
      <strong>sale</strong> del campo, no en cada letra. <code class="inline">v-model.number</code> intenta guardar un
      número. <code class="inline">v-model.trim</code> quita espacios al principio y al final. Son detalles que vas a
      ver en formularios largos.
    </p>
  </article>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}

.block span {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--lv-navy);
}

.block input,
.block select {
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
  font-size: 1rem;
  max-width: 22rem;
}

.inline-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0 0.85rem;
  cursor: pointer;
  font-size: 0.92rem;
}

.out {
  margin: 0 !important;
  padding: 0.65rem 0.75rem;
  background: #fff;
  border-radius: 10px;
  border: 1px dashed rgba(66, 184, 131, 0.35);
  font-size: 0.95rem !important;
}

.muted-sm {
  margin: 0.45rem 0 0 !important;
  font-size: 0.85rem !important;
  color: var(--lv-muted) !important;
}
</style>
