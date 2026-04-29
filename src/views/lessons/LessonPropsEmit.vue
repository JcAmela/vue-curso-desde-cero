<script setup>
import { ref } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'
import DemoChildCounter from '../../components/learning/DemoChildCounter.vue'

const cuenta = ref(0)

function alSumar() {
  cuenta.value++
}

function alReiniciar() {
  cuenta.value = 0
}
</script>

<template>
  <article class="lesson-page">
    <h1>Piezas dentro de piezas: el padre pasa datos y el hijo avisa</h1>
    <p class="lead">
      Imagina que haces un “contador” que quieres usar en varias pantallas. Ese contador puede ser su propio archivo
      <code class="inline">.vue</code> (un <strong>componente hijo</strong>). El problema: ¿quién guarda el número? Lo
      normal es que lo guarde el <strong>padre</strong> (la pantalla grande) y se lo <strong>pase al hijo</strong> como
      propiedad (prop).
    </p>

    <h2>Props: del padre al hijo</h2>
    <p>
      En el hijo declaras con <code class="inline">defineProps</code> qué datos aceptas (nombre, tipo, valor por defecto).
      Es como la firma de una función: “este bloque necesita un <code class="inline">valor</code> numérico”.
    </p>

    <h2>Emitir eventos: del hijo al padre</h2>
    <p>
      El hijo <strong>no debe cambiar la prop a su bola</strong>. En vez de eso, avisa al padre con
      <code class="inline">emit('nombreDelEvento')</code>. El padre escucha con
      <code class="inline">@nombreDelEvento="miFunción"</code>, igual que un
      <code class="inline">@click</code>, y allí actualiza el <code class="inline">ref</code>.
    </p>

    <TryItBox label="El número vive en el padre; el hijo solo pide cambios">
      <p class="padre-state">
        Número en el <strong>padre</strong> (aquí es la fuente de verdad):
        <span class="num">{{ cuenta }}</span>
      </p>
      <DemoChildCounter titulo="Componente hijo" :valor="cuenta" @sumar="alSumar" @reiniciar="alReiniciar" />
    </TryItBox>

    <h2><code class="inline">v-model</code> en componentes propios (adelanto)</h2>
    <p>
      Cuando domines props y <code class="inline">emit</code>, verás que en componentes personalizados
      <code class="inline">v-model</code> es solo un atajo: una prop llamada <code class="inline">modelValue</code> más
      un evento <code class="inline">update:modelValue</code>. En Vue 3.4+ hay <code class="inline">defineModel</code>
      para escribir menos. No te preocupes si no lo usas todavía.
    </p>
  </article>
</template>

<style scoped>
.padre-state {
  margin: 0 0 0.85rem !important;
  font-size: 0.95rem !important;
}

.num {
  display: inline-block;
  margin-left: 0.35rem;
  padding: 0.2rem 0.65rem;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--lv-green-dim);
  background: #fff;
  border-radius: 8px;
  border: 1px solid var(--lv-border);
}
</style>
