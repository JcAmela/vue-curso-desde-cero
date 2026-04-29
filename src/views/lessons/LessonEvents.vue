<script setup>
import { ref } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'

const clics = ref(0)
const tecla = ref('—')

function onDivClick() {
  clics.value++
}

function onKeydown(e) {
  tecla.value = e.key === ' ' ? 'Espacio' : e.key
}
</script>

<template>
  <article class="lesson-page">
    <h1>Eventos: clics, teclas y formularios</h1>
    <p class="lead">
      En JavaScript puro harías <code class="inline">boton.addEventListener('click', …)</code>. En Vue puedes decirlo en
      el HTML del template con <code class="inline">v-on:click</code> o el atajo <code class="inline">@click</code>.
      Apunta a una función que tengas en el <code class="inline">&lt;script setup&gt;</code>.
    </p>

    <h2>Modificadores (pequeños atajos habituales)</h2>
    <p>Son sufijos con punto que ahorran una línea en la función:</p>
    <ul>
      <li>
        <code class="inline">@click.prevent</code> — evita el comportamiento por defecto del navegador (lo mismo que
        <code class="inline">event.preventDefault()</code> al inicio de tu función).
      </li>
      <li>
        <code class="inline">@click.stop</code> — el clic no “burbujea” a elementos padre (equivalente a
        <code class="inline">event.stopPropagation()</code>).
      </li>
      <li>
        <code class="inline">@keydown.enter</code> — solo reacciona cuando la tecla es Enter (útil en cajas de texto).
      </li>
      <li>
        <code class="inline">@submit.prevent</code> — muy usado en <code class="inline">&lt;form&gt;</code> para que la
        página no se recargue y tú controles el envío con JavaScript (apps tipo “una sola página”).
      </li>
    </ul>

    <TryItBox>
      <p>Clics en el botón: <strong>{{ clics }}</strong></p>
      <button type="button" class="hit" @click="onDivClick">Púlsame — uso <code class="inline">@click</code></button>
      <p class="kbd-hint">Haz clic en el cuadro de abajo y escribe algo; veremos la última tecla:</p>
      <input class="keyfield" type="text" placeholder="Escribe aquí…" @keydown="onKeydown" />
      <p class="tecla">Última tecla: <strong>{{ tecla }}</strong></p>
    </TryItBox>
  </article>
</template>

<style scoped>
.hit {
  padding: 0.5rem 1rem;
  font-weight: 650;
  font-family: inherit;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
  background: #fff;
  cursor: pointer;
  margin-bottom: 0.75rem;
}

.hit:hover {
  border-color: rgba(66, 184, 131, 0.45);
}

.kbd-hint {
  margin: 0 0 0.35rem !important;
  font-size: 0.85rem !important;
}

.keyfield {
  display: block;
  width: 100%;
  max-width: 20rem;
  padding: 0.55rem 0.75rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
}

.tecla {
  margin: 0.65rem 0 0 !important;
  font-size: 0.92rem !important;
}
</style>
