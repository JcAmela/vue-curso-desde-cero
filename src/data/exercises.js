/**
 * Ejercicios prácticos: hazlos en tu propio editor dentro de este mismo proyecto.
 * Cada uno enlaza a la lección relacionada.
 */
export const exercises = [
  {
    id: 'ex-saludo',
    title: 'Saludo personal',
    difficulty: 'Calentamiento',
    minutes: 8,
    lessonPath: 'reactividad',
    problem: [
      'Crea un componente Vue (puedes duplicar una vista de prueba) con un ref llamado nombre.',
      'Muestra en el template: «Hola, » seguido del nombre.',
      'Añade un input con v-model enlazado a nombre. Al escribir, debe cambiar el saludo al momento.',
    ],
    hints: [
      'Necesitas importar ref desde "vue" y usar <script setup>.',
      'En el template no uses .value; en el script sí, al cambiar el valor por código.',
    ],
    solution: `<script setup>
import { ref } from 'vue'
const nombre = ref('Amigo')
<\/script>

<template>
  <p>Hola, {{ nombre }} 👋</p>
  <input v-model="nombre" type="text" placeholder="Tu nombre" />
<\/template>`,
  },
  {
    id: 'ex-contador',
    title: 'Contador +',
    difficulty: 'Fácil',
    minutes: 10,
    lessonPath: 'eventos',
    problem: [
      'Muestra un número (ref) inicializado en 0.',
      'Botón «+1» y otro «−1» que modifiquen el número vía funciones (no escribas la lógica en el template).',
      'Extra: evita que el número baje de 0.',
    ],
    hints: [
      '@click llama a una función que hace contador.value++ o contador.value--.',
      'Para el mínimo en 0: if (contador.value > 0) antes de restar.',
    ],
    solution: `<script setup>
import { ref } from 'vue'
const contador = ref(0)
function mas() {
  contador.value++
}
function menos() {
  if (contador.value > 0) contador.value--
}
<\/script>

<template>
  <p>Valor: {{ contador }}</p>
  <button type="button" @click="mas">+1</button>
  <button type="button" @click="menos">−1</button>
<\/template>`,
  },
  {
    id: 'ex-lista-compra',
    title: 'Lista de la compra',
    difficulty: 'Fácil',
    minutes: 15,
    lessonPath: 'listas',
    problem: [
      'ref con un array de strings (artículos). Empieza con dos ítems de ejemplo.',
      'v-for para pintar cada ítem; usa :key única (puede ser el propio texto si no se repite).',
      'Input + botón «Añadir»: al pulsar o con Enter, mete el texto en el array y vacía el input.',
      'Botón «Quitar» por fila que elimine ese ítem del array.',
    ],
    hints: [
      'Para añadir: items.value = [...items.value, nuevoTexto] o push en el mismo ref.',
      'Para quitar uno: filter dejando los que no coincidan con el texto.',
    ],
    solution: `<script setup>
import { ref } from 'vue'
const items = ref(['Leche', 'Pan'])
const borrador = ref('')
function add() {
  const t = borrador.value.trim()
  if (!t) return
  items.value = [...items.value, t]
  borrador.value = ''
}
function remove(t) {
  items.value = items.value.filter((x) => x !== t)
}
<\/script>

<template>
  <ul>
    <li v-for="item in items" :key="item">
      {{ item }}
      <button type="button" @click="remove(item)">Quitar</button>
    </li>
  </ul>
  <input v-model="borrador" @keydown.enter.prevent="add" />
  <button type="button" @click="add">Añadir</button>
<\/template>`,
  },
  {
    id: 'ex-email',
    title: 'Email parece válido',
    difficulty: 'Media',
    minutes: 12,
    lessonPath: 'computed-watch',
    problem: [
      'Un ref email (string) enlazado con v-model a un input.',
      'Un computed devuelva true si el texto incluye «@» y tiene longitud mayor que 3.',
      'Muestra en verde «Pinta bien» si es válido y en rojo «Falta algo razonable» si no (usa v-if / v-else o clases).',
    ],
    hints: [
      'email.includes(\'@\') en el computed.',
      'Para colores: :class="{ ok: valido, bad: !valido }" y CSS .ok { color: green }',
    ],
    solution: `<script setup>
import { ref, computed } from 'vue'
const email = ref('')
const valido = computed(() => email.value.includes('@') && email.value.length > 3)
<\/script>

<template>
  <input v-model="email" type="email" />
  <p :class="{ ok: valido, bad: !valido }">
    {{ valido ? 'Pinta bien' : 'Falta algo razonable' }}
  </p>
<\/template>

<style scoped>
.ok { color: #15803d; font-weight: 700; }
.bad { color: #b91c1c; font-weight: 700; }
<\/style>`,
  },
  {
    id: 'ex-panel-toggle',
    title: 'Panel visible u oculto',
    difficulty: 'Fácil',
    minutes: 8,
    lessonPath: 'plantilla',
    problem: [
      'Un ref mostrar con valor false.',
      'Botón que alterne true/false al pulsar (puedes usar mostrar = !mostrar en una función).',
      'Solo si mostrar es true, muestra un div con un texto largo de relleno.',
    ],
    hints: [
      'v-if="mostrar" en el div es suficiente.',
      'function toggle() { mostrar.value = !mostrar.value }',
    ],
    solution: `<script setup>
import { ref } from 'vue'
const mostrar = ref(false)
function toggle() {
  mostrar.value = !mostrar.value
}
<\/script>

<template>
  <button type="button" @click="toggle">{{ mostrar ? 'Ocultar' : 'Mostrar' }} panel</button>
  <div v-if="mostrar" class="panel">
    Aquí va el contenido que solo existe en el DOM cuando mostrar es true.
  </div>
<\/template>`,
  },
  {
    id: 'ex-fetch',
    title: 'Un usuario de prueba (fetch)',
    difficulty: 'Media',
    minutes: 20,
    lessonPath: 'datos-remotos',
    problem: [
      'Botón «Cargar usuario» que llame a fetch(\'https://jsonplaceholder.typicode.com/users/1\').',
      'Mientras esperas, muestra «Cargando…». Si falla, muestra un mensaje de error.',
      'Si va bien, parsea JSON y muestra el name y el email en párrafos.',
      'Puedes usar refs: cargando, error, usuario (null al inicio).',
    ],
    hints: [
      'async function cargar() { cargando.value = true; error.value = null; try { const r = await fetch(...); ...',
      'const data = await r.json(); usuario.value = data',
      'finally { cargando.value = false }',
    ],
    solution: `<script setup>
import { ref } from 'vue'

const cargando = ref(false)
const error = ref(null)
const usuario = ref(null)

async function cargar() {
  cargando.value = true
  error.value = null
  usuario.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    if (!res.ok) throw new Error('Respuesta no OK')
    usuario.value = await res.json()
  } catch (e) {
    error.value = e.message || 'Algo salió mal'
  } finally {
    cargando.value = false
  }
}
<\/script>

<template>
  <button type="button" :disabled="cargando" @click="cargar">Cargar usuario</button>
  <p v-if="cargando">Cargando…</p>
  <p v-else-if="error">Error: {{ error }}</p>
  <template v-else-if="usuario">
    <p><strong>{{ usuario.name }}</strong></p>
    <p>{{ usuario.email }}</p>
  </template>
<\/template>`,
  },
  {
    id: 'ex-pinia',
    title: 'Notas con Pinia',
    difficulty: 'Media',
    minutes: 25,
    lessonPath: 'pinia',
    problem: [
      'Crea una tienda defineStore con array de strings notas y acciones agregar / quitarPorTexto (como en este curso).',
      'En una vista, importa la tienda con useMiStore(), muestra las notas con v-for y añade input+botón.',
      'Abre dos componentes o pestañas mentales: el estado es el mismo mientras la app viva (prueba en una sola página).',
    ],
    hints: [
      'import { useMiStore } from \'../stores/miStore\'',
      'const store = useMiStore(); en template store.notas, store.agregar(texto)',
    ],
    solution: `Ver src/stores/ejemploNotas.js y la lección Pinia: copia el patrón defineStore(() => { ... return { ... } }).`,
  },
  {
    id: 'ex-mini-formulario',
    title: 'Mini registro (reto final)',
    difficulty: 'Reto',
    minutes: 35,
    lessonPath: 'formularios',
    problem: [
      'Campos: nombre (texto), edad (número con v-model.number), acepto términos (checkbox).',
      'Botón «Registrar» deshabilitado hasta que nombre tenga al menos 2 caracteres, edad ≥ 18 y el checkbox marcado (usa computed).',
      'Al «registrar», añade un objeto { nombre, edad } a un array ref historial y limpia los campos (opcional).',
      'Lista el historial debajo con v-for.',
    ],
    hints: [
      'const puedeEnviar = computed(() => nombre.value.trim().length >= 2 && edad.value >= 18 && acepto.value)',
      ':disabled="!puedeEnviar" en el botón',
    ],
    solution: `<script setup>
import { ref, computed } from 'vue'

const nombre = ref('')
const edad = ref(18)
const acepto = ref(false)
const historial = ref([])

const puedeEnviar = computed(
  () => nombre.value.trim().length >= 2 && edad.value >= 18 && acepto.value
)

function registrar() {
  if (!puedeEnviar.value) return
  historial.value = [...historial.value, { nombre: nombre.value.trim(), edad: edad.value }]
  nombre.value = ''
  edad.value = 18
  acepto.value = false
}
<\/script>

<template>
  <input v-model="nombre" placeholder="Nombre" />
  <input v-model.number="edad" type="number" min="0" />
  <label><input v-model="acepto" type="checkbox" /> Acepto</label>
  <button type="button" :disabled="!puedeEnviar" @click="registrar">Registrar</button>

  <ul>
    <li v-for="(h, i) in historial" :key="i">{{ h.nombre }}, {{ h.edad }} años</li>
  </ul>
<\/template>`,
  },
]
