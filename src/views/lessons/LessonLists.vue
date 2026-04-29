<script setup>
import { ref } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'

const items = ref([
  { id: 1, texto: 'Entender qué es :key' },
  { id: 2, texto: 'Practicar v-for con una lista' },
])
let nextId = 3
const borrador = ref('')

function addItem() {
  const t = borrador.value.trim()
  if (!t) return
  items.value.push({ id: nextId++, texto: t })
  borrador.value = ''
}

function remove(id) {
  items.value = items.value.filter((i) => i.id !== id)
}
</script>

<template>
  <article class="lesson-page">
    <h1>Listas: repetir HTML con <code class="inline">v-for</code></h1>
    <p class="lead">
      Si tienes un <strong>array</strong> en JavaScript (una lista de objetos), en Vue puedes decir: “por cada elemento,
      pinta este trozo de HTML”. Eso se hace con <code class="inline">v-for</code>, parecido a la idea de un
      <code class="inline">for…of</code> pero aplicado a etiquetas.
    </p>

    <h2>La importancia de <code class="inline">:key</code></h2>
    <p>
      Vue necesita saber <strong>qué fila es cuál</strong> cuando la lista cambia (alguien borra un elemento, reordena,
      etc.). Por eso añades un atributo <code class="inline">:key="algoÚnico"</code>, casi siempre un
      <code class="inline">id</code> estable.
    </p>
    <p>
      Si usas solo el índice del array (0, 1, 2…) y la lista se mueve, Vue puede mezclar filas y ver comportamientos
      raros, sobre todo si dentro de cada fila hay campos de formulario.
    </p>

    <TryItBox>
      <div class="row">
        <input v-model="borrador" type="text" placeholder="Escribe una nota y pulsa Enter…" @keydown.enter.prevent="addItem" />
        <button type="button" class="add" @click="addItem">Añadir</button>
      </div>
      <ul class="lista">
        <li v-for="item in items" :key="item.id">
          <span>{{ item.texto }}</span>
          <button type="button" class="del" @click="remove(item.id)">Quitar</button>
        </li>
      </ul>
    </TryItBox>
  </article>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.row input {
  flex: 1;
  min-width: 10rem;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
  font-size: 1rem;
}

.add {
  padding: 0.55rem 0.9rem;
  font-weight: 650;
  font-family: inherit;
  border-radius: 10px;
  border: none;
  color: #fff;
  background: var(--lv-green);
  cursor: pointer;
}

.lista {
  list-style: none;
  margin: 0 !important;
  padding: 0 !important;
}

.lista li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.65rem;
  margin-bottom: 0.35rem;
  background: #fff;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
}

.del {
  font-size: 0.78rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--lv-border);
  background: #fff;
  cursor: pointer;
}
</style>
