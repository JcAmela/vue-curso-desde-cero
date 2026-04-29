<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import TryItBox from '../../components/learning/TryItBox.vue'
import { useEjemploNotasStore } from '../../stores/ejemploNotas.js'

const store = useEjemploNotasStore()
const { notas } = storeToRefs(store)
const borrador = ref('')

function add() {
  store.agregar(borrador.value)
  borrador.value = ''
}
</script>

<template>
  <article class="lesson-page">
    <h1>Estado global con <strong>Pinia</strong></h1>
    <p class="lead">
      Con <code class="inline">props</code> pasas datos de un padre a un hijo. Si muchas pantallas necesitan los mismos
      datos (usuario logueado, carrito, lista de favoritos…), pasar props por cada nivel es cansado. Ahí entra un
      <strong>almacén</strong> compartido: en el mundo Vue 3 lo estándar es <strong>Pinia</strong>.
    </p>

    <h2>Idea en una frase</h2>
    <p>
      Defines una <strong>tienda</strong> (<code class="inline">defineStore</code>) con variables y funciones. Cualquier
      componente llama <code class="inline">useMiTienda()</code> y lee o cambia el mismo estado. Sigue siendo
      JavaScript reactivo; Pinia se integra con las herramientas de desarrollo de Vue.
    </p>

    <h2>Dónde vive el código</h2>
    <p>
      En este proyecto la demo está en <code class="inline">src/stores/ejemploNotas.js</code>. En
      <code class="inline">main.js</code> la app usa <code class="inline">createPinia()</code> para que las tiendas
      existan en toda la aplicación.
    </p>

    <TryItBox label="Lista compartida (al recargar la página se pierde; es normal en esta demo)">
      <p class="tiny">
        Las notas que ves aquí son las mismas que podría leer otro componente en otra ruta sin pasar props.
      </p>
      <ul class="lista">
        <li v-for="n in notas" :key="n">
          {{ n }}
          <button type="button" class="x" @click="store.quitarPorTexto(n)">✕</button>
        </li>
      </ul>
      <div class="row">
        <input v-model="borrador" type="text" placeholder="Nueva nota…" @keydown.enter.prevent="add" />
        <button type="button" class="add" @click="add">Añadir</button>
      </div>
    </TryItBox>

    <h2>Cuándo <em>no</em> hace falta Pinia</h2>
    <ul>
      <li>Datos que solo usa un componente o un padre y sus hijos → <code class="inline">ref</code> y props bastan.</li>
      <li>
        Estado derivado de la URL (qué usuario estás viendo) → muchas veces el router y un
        <code class="inline">fetch</code> en esa vista.
      </li>
    </ul>

    <p>
      Documentación oficial:
      <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener noreferrer">pinia.vuejs.org</a>
    </p>
  </article>
</template>

<style scoped>
.tiny {
  font-size: 0.85rem !important;
  color: var(--lv-muted) !important;
  margin: 0 0 0.65rem !important;
}

.lista {
  margin: 0 0 0.65rem !important;
  padding-left: 1.2rem !important;
}

.lista li {
  margin-bottom: 0.35rem;
}

.x {
  margin-left: 0.35rem;
  padding: 0.1rem 0.35rem;
  font-size: 0.75rem;
  border: none;
  background: #fee2e2;
  border-radius: 4px;
  cursor: pointer;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.row input {
  flex: 1;
  min-width: 10rem;
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
}

.add {
  padding: 0.5rem 0.9rem;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  background: var(--lv-green);
  color: #fff;
  cursor: pointer;
}
</style>
