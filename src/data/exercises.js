/**
 * Ejercicios prácticos (es-ES). Objetivo: escribir código en tu máquina dentro de este proyecto.
 * Cada tarjeta enlaza a la lección afín para repasar teoría antes de implementar.
 */
export const exercises = [
  {
    id: 'ex-saludo',
    title: 'Saludo personal',
    difficulty: 'Calentamiento',
    minutes: 8,
    lessonPath: 'reactividad',
    goal:
      'Ver en vivo la reactividad básica: un texto en pantalla que sigue a una variable sin que tú repintes el DOM a mano.',
    problem: [
      'Crea o abre un componente Vue con <script setup>.',
      'Declara un ref llamado nombre (por ejemplo con valor inicial «Amigo» o cadena vacía).',
      'En el template muestra el texto «Hola, » seguido del nombre usando interpolación {{ }}.',
      'Añade un <input> con v-model="nombre". Al escribir, el saludo debe actualizarse al instante.',
    ],
    successCheck: [
      'Sin recargar la página, cada tecla en el input cambia lo que ves en el párrafo.',
      'En el script usas nombre.value si asignas por código; en el template solo nombre.',
    ],
    hints: [
      'Importa ref desde "vue" y envuelve el valor: const nombre = ref(\'Amigo\').',
      'v-model enlaza el input y el ref en las dos direcciones; no necesitas @input a mano.',
    ],
    solution: `<script setup>
import { ref } from 'vue'
const nombre = ref('Amigo')
<\/script>

<template>
  <p>Hola, {{ nombre }}</p>
  <input v-model="nombre" type="text" placeholder="Tu nombre" autocomplete="name" />
<\/template>`,
  },
  {
    id: 'ex-contador',
    title: 'Contador + y −',
    difficulty: 'Fácil',
    minutes: 10,
    lessonPath: 'eventos',
    goal: 'Practicar @click y funciones en el script en lugar de meter lógica larga dentro del template.',
    problem: [
      'Muestra un número (ref) inicializado en 0.',
      'Dos botones: «+1» y «−1». Cada uno debe llamar a una función del script (incrementar / decrementar).',
      'Extra (recomendado): evita que el contador baje de 0; el botón − puede quedarse o puedes deshabilitarlo cuando valga 0.',
    ],
    successCheck: [
      'Los botones solo disparan funciones; no hay contador.value++ directamente en el template.',
      'El valor mínimo es 0 si hiciste el extra.',
    ],
    hints: [
      'function mas() { contador.value++ } y function menos() { ... }',
      'Para el mínimo: if (contador.value > 0) contador.value-- dentro de menos().',
      'Opcional: :disabled="contador === 0" en el botón − para feedback visual.',
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
    goal: 'Combinar array reactivo, v-for, :key y eventos para añadir y quitar filas.',
    problem: [
      'Guarda en un ref un array de strings (artículos). Empieza con dos ítems de ejemplo.',
      'Usa v-for para mostrar cada ítem y asigna :key. Si solo usas texto sin duplicar, vale :key="item"; si puede repetirse el mismo texto, usa ids numéricos como en la lección.',
      'Campo de texto + botón «Añadir»: al pulsar o al pulsar Enter, añade el texto recortado (trim) al array y vacía el campo.',
      'Por cada fila, un botón «Quitar» que elimine únicamente ese ítem.',
    ],
    successCheck: [
      'Puedes añadir varios ítems seguidos y borrar uno del medio sin que el resto “salte” raro.',
      'No se añaden entradas vacías ni solo espacios.',
    ],
    hints: [
      'Al añadir: const t = borrador.value.trim(); if (!t) return; y luego empuja al array o copia con spread.',
      'Al quitar por texto: items.value = items.value.filter((x) => x !== texto).',
      'Si más adelante repites nombres en la lista, pasa a objetos { id, texto } y :key="id".',
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
    title: '¿El email parece válido?',
    difficulty: 'Media',
    minutes: 12,
    lessonPath: 'computed-watch',
    goal: 'Usar un computed que depende de un ref y reflejar el resultado en la interfaz (color o mensaje).',
    problem: [
      'Un ref email (string) enlazado con v-model a un input type="email" o type="text".',
      'Un computed llamado por ejemplo valido que sea true si el texto incluye «@» y tiene longitud mayor que 3 (regla de juguete, no validación real de correo).',
      'Muestra un mensaje en verde («Va en buen camino») si es válido y en rojo («Revisa el formato») si no. Puedes usar v-if / v-else o clases dinámicas con :class.',
    ],
    successCheck: [
      'Al borrar o escribir, el mensaje y el color cambian sin funciones extra: solo el computed reacciona.',
      'Comprendes que el computed se recalcula cuando email cambia.',
    ],
    hints: [
      'import { ref, computed } from \'vue\'',
      'const valido = computed(() => email.value.includes(\'@\') && email.value.length > 3)',
      'Ejemplo de clases: :class="{ ok: valido, bad: !valido }" y en <style scoped> .ok { color: #15803d } .bad { color: #b91c1c }',
    ],
    solution: `<script setup>
import { ref, computed } from 'vue'
const email = ref('')
const valido = computed(() => email.value.includes('@') && email.value.length > 3)
<\/script>

<template>
  <input v-model="email" type="email" autocomplete="email" />
  <p :class="{ ok: valido, bad: !valido }">
    {{ valido ? 'Va en buen camino' : 'Revisa el formato' }}
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
    goal: 'Dominar v-if con un booleano que alternas desde un botón.',
    problem: [
      'Un ref mostrar (o visible) inicializado a false.',
      'Un botón cuyo texto indique la acción siguiente («Mostrar panel» / «Ocultar panel») y que al pulsar invierta el booleano con una función toggle.',
      'Solo cuando el booleano sea true, muestra un bloque (div) con un párrafo de texto largo de relleno.',
    ],
    successCheck: [
      'Al ocultar con v-if, el bloque no está en el DOM (puedes comprobarlo con las herramientas de desarrollo del navegador).',
    ],
    hints: [
      'v-if="mostrar" en el div del panel.',
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
    goal: 'Encadenar async/await, refs de estado (carga, error, datos) y un template que cubra los tres casos.',
    problem: [
      'Botón «Cargar usuario» que ejecute una función async.',
      'La función hace fetch a https://jsonplaceholder.typicode.com/users/1 (API pública solo para practicar).',
      'Mientras la petición está en curso, muestra «Cargando…» y desactiva el botón si quieres evitar dobles clics.',
      'Si la respuesta no es correcta (!res.ok) o hay excepción de red, guarda un mensaje en un ref de error y muéstralo.',
      'Si todo va bien: parsea JSON, guarda el objeto en un ref y muestra al menos name y email en la pantalla.',
    ],
    successCheck: [
      'Ves los tres estados en algún momento: cargando, error simulado (por ejemplo desconectando la red) y datos correctos.',
      'Siempre termina en “ya no cargando” gracias a finally.',
    ],
    hints: [
      'const res = await fetch(url); if (!res.ok) throw new Error(...); const data = await res.json()',
      'Al inicio del intento: cargando.value = true; error.value = null; usuario.value = null',
      'finally { cargando.value = false } — así el estado de carga se limpia aunque falle el try.',
      'Esta URL suele funcionar desde el navegador sin configurar CORS en tu proyecto.',
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
    error.value = e instanceof Error ? e.message : 'Algo ha fallado'
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
    goal: 'Crear una tienda con defineStore, exponer estado y acciones, y consumirla desde un componente con useNombreTienda().',
    problem: [
      'En src/stores/ crea un archivo (por ejemplo notasPractica.js) con defineStore en estilo función, como en src/stores/ejemploNotas.js de este proyecto.',
      'Estado: array de strings notas. Acciones: agregar(texto) que haga trim y no añada vacíos; quitarPorTexto(texto) que filtre el array.',
      'Registra la tienda en la app si hace falta (en este curso Pinia ya está en main.js).',
      'En una vista, usa useTuStore(), pinta las notas con v-for, y añade input + botón que llamen a agregar.',
    ],
    successCheck: [
      'Las notas se leen y modifican desde el componente sin pasar props desde un “abuelo”.',
      'Tu código sigue el mismo patrón que useEjemploNotasStore en ejemploNotas.js.',
    ],
    hints: [
      'Copia la estructura de ejemploNotas.js y cambia el id del store y los nombres a tu gusto.',
      'En el componente: const store = useNotasPracticaStore(); en el template store.agregar(texto).',
      'Si necesitas que notas sea reactivo en plantillas complejas, revisa storeToRefs(store) en la documentación.',
    ],
    solution: `// src/stores/notasPractica.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotasPracticaStore = defineStore('notasPractica', () => {
  const notas = ref(['Primera nota'])

  function agregar(texto) {
    const t = texto.trim()
    if (t) notas.value = [...notas.value, t]
  }

  function quitarPorTexto(texto) {
    notas.value = notas.value.filter((n) => n !== texto)
  }

  return { notas, agregar, quitarPorTexto }
})

// Vista (fragmento)
<script setup>
import { ref } from 'vue'
import { useNotasPracticaStore } from '../stores/notasPractica'
const store = useNotasPracticaStore()
const borrador = ref('')
function add() {
  store.agregar(borrador.value)
  borrador.value = ''
}
<\/script>

<template>
  <ul>
    <li v-for="n in store.notas" :key="n">{{ n }}</li>
  </ul>
  <input v-model="borrador" />
  <button type="button" @click="add">Añadir</button>
<\/template>`,
  },
  {
    id: 'ex-mini-formulario',
    title: 'Mini registro (reto final)',
    difficulty: 'Reto',
    minutes: 35,
    lessonPath: 'formularios',
    goal: 'Encadenar varios controles, validación con computed y un historial en array al enviar.',
    problem: [
      'Campos: nombre (texto), edad (número con v-model.number), acepto términos (checkbox; el texto puede ser ficticio).',
      'Botón «Registrar» deshabilitado hasta que nombre tenga al menos 2 caracteres (tras trim), edad sea número ≥ 18 y el checkbox esté marcado. Usa un computed (por ejemplo puedeEnviar).',
      'Al pulsar «Registrar» con el formulario válido, añade { nombre, edad } a un ref historial (array) y vacía nombre y el checkbox; la edad puedes resetear a 18 o dejar la última, como prefieras.',
      'Lista el historial debajo con v-for.',
    ],
    successCheck: [
      'El botón solo se activa cuando se cumplen las tres condiciones a la vez.',
      'Cada registro válido aparece en la lista y los campos obligatorios quedan listos para otro envío.',
    ],
    hints: [
      'const puedeEnviar = computed(() => nombre.value.trim().length >= 2 && Number(edad.value) >= 18 && acepto.value)',
      'En el botón: :disabled="!puedeEnviar"',
      'Al enviar: if (!puedeEnviar.value) return antes de empujar al historial.',
      'Si edad “vacía” da problemas, min="0" en el input y comprueba con Number(edad.value).',
    ],
    solution: `<script setup>
import { ref, computed } from 'vue'

const nombre = ref('')
const edad = ref(18)
const acepto = ref(false)
const historial = ref([])

const puedeEnviar = computed(
  () => nombre.value.trim().length >= 2 && Number(edad.value) >= 18 && acepto.value
)

function registrar() {
  if (!puedeEnviar.value) return
  historial.value = [...historial.value, { nombre: nombre.value.trim(), edad: Number(edad.value) }]
  nombre.value = ''
  edad.value = 18
  acepto.value = false
}
<\/script>

<template>
  <input v-model="nombre" placeholder="Nombre" autocomplete="name" />
  <input v-model.number="edad" type="number" min="0" />
  <label><input v-model="acepto" type="checkbox" /> Acepto los términos de ejemplo</label>
  <button type="button" :disabled="!puedeEnviar" @click="registrar">Registrar</button>

  <ul>
    <li v-for="(h, i) in historial" :key="i">{{ h.nombre }}, {{ h.edad }} años</li>
  </ul>
<\/template>`,
  },
]
