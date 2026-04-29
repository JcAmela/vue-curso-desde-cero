/**
 * Curso lineal de Vue 3 en 15 micro-pasos.
 * Cada paso: una idea, un cambio observable, un detector que comprueba el resultado.
 *
 * Detector: función `(doc, sim) => boolean | Promise<boolean>` que recibe el documento
 * del iframe del REPL y un simulador de eventos.
 */

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function txt(el) {
  return (el?.textContent || '').replace(/\s+/g, ' ').trim()
}

function trimEq(a, b) {
  return txt({ textContent: a }) === txt({ textContent: b })
}

async function clickAll(doc, sel, n = 1) {
  const el = doc.querySelector(sel)
  if (!el) return false
  for (let i = 0; i < n; i++) {
    el.click()
    await wait(20)
  }
  return true
}

async function typeInto(doc, sel, text) {
  const el = doc.querySelector(sel)
  if (!el) return false
  const win = doc.defaultView
  el.focus()
  el.value = text
  el.dispatchEvent(new win.Event('input', { bubbles: true }))
  el.dispatchEvent(new win.Event('change', { bubbles: true }))
  await wait(40)
  return true
}

const sim = { clickAll, typeInto, wait }

export const steps = [
  // 1
  {
    n: 1,
    title: 'Texto en plantilla',
    concept: 'En Vue, lo que ves en pantalla viene del bloque <template>. Es HTML normal.',
    task: 'Cambia el texto del párrafo para que diga: Hola, Vue',
    files: {
      'App.vue': `<template>
  <p>Hola</p>
</template>
`,
    },
    hint: 'Edita lo que hay entre <p> y </p>.',
    solution: {
      'App.vue': `<template>
  <p>Hola, Vue</p>
</template>
`,
    },
    check: (doc) => txt(doc.querySelector('p')) === 'Hola, Vue',
  },

  // 2
  {
    n: 2,
    title: 'Mostrar una variable',
    concept:
      'Con {{ }} pintas el valor de una variable JavaScript dentro del HTML. Se llama interpolación.',
    task:
      'Cambia el párrafo para que muestre el valor de la variable nombre. Debe verse: Hola, Vue',
    files: {
      'App.vue': `<script setup>
const nombre = 'Vue'
</script>

<template>
  <p>Hola, NOMBRE</p>
</template>
`,
    },
    hint: 'Sustituye la palabra NOMBRE por {{ nombre }}.',
    solution: {
      'App.vue': `<script setup>
const nombre = 'Vue'
</script>

<template>
  <p>Hola, {{ nombre }}</p>
</template>
`,
    },
    check: (doc) => txt(doc.querySelector('p')) === 'Hola, Vue',
  },

  // 3
  {
    n: 3,
    title: 'Variables que cambian: ref',
    concept:
      'Una variable normal no actualiza la pantalla cuando la cambias. ref() la convierte en reactiva: si su .value cambia, Vue repinta.',
    task:
      'Convierte nombre en un ref con valor inicial "Mundo". Al pulsar el botón, el saludo debe cambiar a: Hola, Vue',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'

// TODO: convierte esto en un ref con valor 'Mundo'
const nombre = 'Mundo'

function cambiar() {
  nombre.value = 'Vue'
}
</script>

<template>
  <p>Hola, {{ nombre }}</p>
  <button @click="cambiar">Cambiar</button>
</template>
`,
    },
    hint: 'Sustituye const nombre = \'Mundo\' por const nombre = ref(\'Mundo\').',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'

const nombre = ref('Mundo')

function cambiar() {
  nombre.value = 'Vue'
}
</script>

<template>
  <p>Hola, {{ nombre }}</p>
  <button @click="cambiar">Cambiar</button>
</template>
`,
    },
    check: async (doc) => {
      const p = doc.querySelector('p')
      if (!p) return false
      if (txt(p) !== 'Hola, Mundo') return false
      await clickAll(doc, 'button')
      return txt(doc.querySelector('p')) === 'Hola, Vue'
    },
  },

  // 4
  {
    n: 4,
    title: 'Input enlazado: v-model',
    concept:
      'v-model conecta un <input> con un ref en las dos direcciones: lo que escribes va al ref, y lo que cambia el ref va al input.',
    task:
      'Conecta el input al ref nombre con v-model. Al teclear, el saludo debe seguir lo que escribes.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const nombre = ref('Vue')
</script>

<template>
  <p>Hola, {{ nombre }}</p>
  <input placeholder="Escribe tu nombre" />
</template>
`,
    },
    hint: 'Añade v-model="nombre" al <input>.',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const nombre = ref('Vue')
</script>

<template>
  <p>Hola, {{ nombre }}</p>
  <input v-model="nombre" placeholder="Escribe tu nombre" />
</template>
`,
    },
    check: async (doc) => {
      const input = doc.querySelector('input')
      const p = doc.querySelector('p')
      if (!input || !p) return false
      await typeInto(doc, 'input', 'Ana')
      return txt(doc.querySelector('p')) === 'Hola, Ana'
    },
  },

  // 5
  {
    n: 5,
    title: 'Reaccionar a clics',
    concept:
      '@click="funcion" llama a una función cuando se pulsa un botón. La función vive en <script setup>.',
    task:
      'Crea una función sumar() que aumente n en 1 y conéctala al botón con @click. Al pulsar, el número debe subir.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const n = ref(0)

// TODO: crea aquí la función sumar
</script>

<template>
  <p>Valor: {{ n }}</p>
  <button>+1</button>
</template>
`,
    },
    hint: 'function sumar() { n.value++ }  y luego <button @click="sumar">.',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const n = ref(0)

function sumar() {
  n.value++
}
</script>

<template>
  <p>Valor: {{ n }}</p>
  <button @click="sumar">+1</button>
</template>
`,
    },
    check: async (doc) => {
      const p = doc.querySelector('p')
      if (!p || !/0/.test(txt(p))) return false
      await clickAll(doc, 'button', 3)
      return /3/.test(txt(doc.querySelector('p')))
    },
  },

  // 6
  {
    n: 6,
    title: 'Atributos dinámicos con :',
    concept:
      'Con dos puntos delante de un atributo (:disabled, :class, :href...) Vue evalúa lo de las comillas como JavaScript en lugar de tratarlo como texto.',
    task:
      'Haz que el botón − se desactive cuando n vale 0. Usa :disabled.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const n = ref(0)
function mas() { n.value++ }
function menos() { if (n.value > 0) n.value-- }
</script>

<template>
  <p>Valor: {{ n }}</p>
  <button @click="menos">−</button>
  <button @click="mas">+</button>
</template>
`,
    },
    hint: 'En el primer botón añade :disabled="n === 0".',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const n = ref(0)
function mas() { n.value++ }
function menos() { if (n.value > 0) n.value-- }
</script>

<template>
  <p>Valor: {{ n }}</p>
  <button :disabled="n === 0" @click="menos">−</button>
  <button @click="mas">+</button>
</template>
`,
    },
    check: async (doc) => {
      const buttons = doc.querySelectorAll('button')
      if (buttons.length < 2) return false
      const minus = buttons[0]
      if (!minus.disabled) return false
      await clickAll(doc, 'button:nth-of-type(2)', 2)
      if (minus.disabled) return false
      await clickAll(doc, 'button:nth-of-type(1)', 5)
      return minus.disabled && /0/.test(txt(doc.querySelector('p')))
    },
  },

  // 7
  {
    n: 7,
    title: 'Mostrar y ocultar: v-if',
    concept:
      'v-if="condicion" elige si un elemento existe en la página. Si la condición es false, el elemento ni aparece en el HTML.',
    task:
      'Haz que el panel solo aparezca cuando visible es true. El botón ya cambia el booleano.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const visible = ref(false)
function alternar() { visible.value = !visible.value }
</script>

<template>
  <button @click="alternar">Mostrar / ocultar</button>
  <div class="panel">Soy un panel.</div>
</template>
`,
    },
    hint: 'Añade v-if="visible" al <div class="panel">.',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const visible = ref(false)
function alternar() { visible.value = !visible.value }
</script>

<template>
  <button @click="alternar">Mostrar / ocultar</button>
  <div v-if="visible" class="panel">Soy un panel.</div>
</template>
`,
    },
    check: async (doc) => {
      if (doc.querySelector('.panel')) return false
      await clickAll(doc, 'button')
      if (!doc.querySelector('.panel')) return false
      await clickAll(doc, 'button')
      return !doc.querySelector('.panel')
    },
  },

  // 8
  {
    n: 8,
    title: 'Listas con v-for',
    concept:
      'v-for repite un elemento por cada item de un array. La :key ayuda a Vue a saber qué fila es cuál cuando cambian.',
    task: 'Pinta un <li> por cada nombre del array. Deben aparecer 3 elementos en la lista.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const nombres = ref(['Ana', 'Luis', 'Eva'])
</script>

<template>
  <ul>
    <!-- TODO: un <li> por nombre -->
  </ul>
</template>
`,
    },
    hint: '<li v-for="nombre in nombres" :key="nombre">{{ nombre }}</li>',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const nombres = ref(['Ana', 'Luis', 'Eva'])
</script>

<template>
  <ul>
    <li v-for="nombre in nombres" :key="nombre">{{ nombre }}</li>
  </ul>
</template>
`,
    },
    check: (doc) => {
      const items = doc.querySelectorAll('li')
      if (items.length !== 3) return false
      const list = [...items].map(txt)
      return list.includes('Ana') && list.includes('Luis') && list.includes('Eva')
    },
  },

  // 9
  {
    n: 9,
    title: 'Añadir a la lista',
    concept:
      'Para que la pantalla refleje el cambio, hay que modificar el .value del ref que contiene el array.',
    task:
      'Completa la función añadir(): debe añadir borrador.value al final del array y vaciar el campo. No añadir si está vacío.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const tareas = ref(['Comprar pan'])
const borrador = ref('')

function añadir() {
  // TODO: si borrador no está vacío, añadirlo a tareas y vaciar borrador
}
</script>

<template>
  <ul>
    <li v-for="t in tareas" :key="t">{{ t }}</li>
  </ul>
  <input v-model="borrador" placeholder="Nueva tarea" />
  <button @click="añadir">Añadir</button>
</template>
`,
    },
    hint:
      'const t = borrador.value.trim(); if (!t) return; tareas.value = [...tareas.value, t]; borrador.value = "".',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const tareas = ref(['Comprar pan'])
const borrador = ref('')

function añadir() {
  const t = borrador.value.trim()
  if (!t) return
  tareas.value = [...tareas.value, t]
  borrador.value = ''
}
</script>

<template>
  <ul>
    <li v-for="t in tareas" :key="t">{{ t }}</li>
  </ul>
  <input v-model="borrador" placeholder="Nueva tarea" />
  <button @click="añadir">Añadir</button>
</template>
`,
    },
    check: async (doc) => {
      const initial = doc.querySelectorAll('li').length
      if (initial !== 1) return false
      await typeInto(doc, 'input', 'Estudiar Vue')
      await clickAll(doc, 'button')
      const after = doc.querySelectorAll('li')
      const last = txt(after[after.length - 1])
      const inputVal = doc.querySelector('input').value
      return after.length === 2 && last === 'Estudiar Vue' && inputVal === ''
    },
  },

  // 10
  {
    n: 10,
    title: 'Quitar de la lista',
    concept:
      'Para borrar un item, sustituye el array por uno nuevo filtrado. .filter() es perfecto.',
    task:
      'Completa quitar(t) para que elimine ese item del array. Cada fila tiene ya un botón ×.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const tareas = ref(['Comprar pan', 'Llamar a Ana', 'Estudiar Vue'])

function quitar(t) {
  // TODO: deja en tareas todos menos t
}
</script>

<template>
  <ul>
    <li v-for="t in tareas" :key="t">
      {{ t }}
      <button @click="quitar(t)">×</button>
    </li>
  </ul>
</template>
`,
    },
    hint: 'tareas.value = tareas.value.filter((x) => x !== t)',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const tareas = ref(['Comprar pan', 'Llamar a Ana', 'Estudiar Vue'])

function quitar(t) {
  tareas.value = tareas.value.filter((x) => x !== t)
}
</script>

<template>
  <ul>
    <li v-for="t in tareas" :key="t">
      {{ t }}
      <button @click="quitar(t)">×</button>
    </li>
  </ul>
</template>
`,
    },
    check: async (doc) => {
      const before = doc.querySelectorAll('li').length
      if (before !== 3) return false
      const firstBtn = doc.querySelector('li button')
      if (!firstBtn) return false
      firstBtn.click()
      await wait(40)
      const after = doc.querySelectorAll('li')
      return after.length === 2 && !txt(after[0]).includes('Comprar pan')
    },
  },

  // 11
  {
    n: 11,
    title: 'Clases dinámicas',
    concept:
      ':class="{ nombre: condicion }" añade la clase nombre solo cuando la condición es true. Útil para feedback visual sin if/else.',
    task:
      'Aplica la clase ok al <p> cuando email contenga una @. Hazlo con :class y un objeto.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const email = ref('')
</script>

<template>
  <input v-model="email" placeholder="tu@correo.com" />
  <p>{{ email || 'Escribe algo' }}</p>
</template>

<style>
.ok { color: green; font-weight: bold; }
</style>
`,
    },
    hint: '<p :class="{ ok: email.includes(\'@\') }">',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
const email = ref('')
</script>

<template>
  <input v-model="email" placeholder="tu@correo.com" />
  <p :class="{ ok: email.includes('@') }">{{ email || 'Escribe algo' }}</p>
</template>

<style>
.ok { color: green; font-weight: bold; }
</style>
`,
    },
    check: async (doc) => {
      const p = doc.querySelector('p')
      if (!p || p.classList.contains('ok')) return false
      await typeInto(doc, 'input', 'a@b')
      return doc.querySelector('p').classList.contains('ok')
    },
  },

  // 12
  {
    n: 12,
    title: 'Valores derivados: computed',
    concept:
      'computed crea un valor que se recalcula automáticamente cuando cambian sus dependencias. Limpia el template de lógica.',
    task:
      'Crea un computed esValido que valga true si email contiene @ y tiene más de 3 caracteres. Úsalo en el :class y en el texto.',
    files: {
      'App.vue': `<script setup>
import { ref, computed } from 'vue'
const email = ref('')

// TODO: crea aquí el computed esValido
</script>

<template>
  <input v-model="email" />
  <p :class="{ ok: false, mal: true }">
    Escribe un email
  </p>
</template>

<style>
.ok { color: green; }
.mal { color: #b91c1c; }
</style>
`,
    },
    hint:
      'const esValido = computed(() => email.value.includes(\'@\') && email.value.length > 3). Después usa esValido y !esValido en :class, y un texto distinto según esValido.',
    solution: {
      'App.vue': `<script setup>
import { ref, computed } from 'vue'
const email = ref('')
const esValido = computed(() => email.value.includes('@') && email.value.length > 3)
</script>

<template>
  <input v-model="email" />
  <p :class="{ ok: esValido, mal: !esValido }">
    {{ esValido ? 'Parece un email' : 'Escribe un email' }}
  </p>
</template>

<style>
.ok { color: green; }
.mal { color: #b91c1c; }
</style>
`,
    },
    check: async (doc) => {
      const p = doc.querySelector('p')
      if (!p || !p.classList.contains('mal')) return false
      await typeInto(doc, 'input', 'hola@vue.com')
      const p2 = doc.querySelector('p')
      return p2.classList.contains('ok') && !p2.classList.contains('mal')
    },
  },

  // 13
  {
    n: 13,
    title: 'Componente hijo y props',
    concept:
      'Trocear la app en componentes la hace manejable. El padre pasa datos al hijo con atributos; el hijo los recibe con defineProps.',
    task:
      'Abre el archivo Saludo.vue y declara la prop nombre (string). Úsala en el <p> del hijo. El padre ya pasa nombre="Vue".',
    files: {
      'App.vue': `<script setup>
import Saludo from './Saludo.vue'
</script>

<template>
  <Saludo nombre="Vue" />
  <Saludo nombre="Mundo" />
</template>
`,
      'Saludo.vue': `<script setup>
// TODO: declara aquí defineProps({ nombre: String })
</script>

<template>
  <p>Hola, ???</p>
</template>
`,
    },
    hint:
      'En el <script setup> del hijo: defineProps({ nombre: String }). En el template: <p>Hola, {{ nombre }}</p>.',
    solution: {
      'App.vue': `<script setup>
import Saludo from './Saludo.vue'
</script>

<template>
  <Saludo nombre="Vue" />
  <Saludo nombre="Mundo" />
</template>
`,
      'Saludo.vue': `<script setup>
defineProps({ nombre: String })
</script>

<template>
  <p>Hola, {{ nombre }}</p>
</template>
`,
    },
    check: (doc) => {
      const ps = [...doc.querySelectorAll('p')].map(txt)
      return ps.includes('Hola, Vue') && ps.includes('Hola, Mundo')
    },
  },

  // 14
  {
    n: 14,
    title: 'El hijo avisa al padre: emit',
    concept:
      'El hijo no toca los datos del padre directamente. Le avisa con un evento (emit), y el padre decide qué hacer.',
    task:
      'En Boton.vue, cuando se pulse el botón emite el evento "sumar". El padre ya escucha @sumar y aumenta el contador.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'
import Boton from './Boton.vue'
const total = ref(0)
function añadirUno() { total.value++ }
</script>

<template>
  <p>Total: {{ total }}</p>
  <Boton @sumar="añadirUno" />
</template>
`,
      'Boton.vue': `<script setup>
const emit = defineEmits(['sumar'])

function pulsar() {
  // TODO: emite el evento 'sumar'
}
</script>

<template>
  <button @click="pulsar">Sumar uno</button>
</template>
`,
    },
    hint: 'Dentro de pulsar(): emit(\'sumar\').',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'
import Boton from './Boton.vue'
const total = ref(0)
function añadirUno() { total.value++ }
</script>

<template>
  <p>Total: {{ total }}</p>
  <Boton @sumar="añadirUno" />
</template>
`,
      'Boton.vue': `<script setup>
const emit = defineEmits(['sumar'])

function pulsar() {
  emit('sumar')
}
</script>

<template>
  <button @click="pulsar">Sumar uno</button>
</template>
`,
    },
    check: async (doc) => {
      const p = doc.querySelector('p')
      if (!p || !/0/.test(txt(p))) return false
      await clickAll(doc, 'button', 3)
      return /3/.test(txt(doc.querySelector('p')))
    },
  },

  // 15
  {
    n: 15,
    title: 'Pedir datos a un servidor',
    concept:
      'Una app real pide datos a un servidor. Mientras esperas, hay tres estados posibles: cargando, error o datos. Hay que cubrir los tres.',
    task:
      'Completa cargar(): pon cargando=true al empezar; usa try/catch/finally; si res.ok parsea JSON en datos; si no, guarda mensaje en error; en finally apaga cargando.',
    files: {
      'App.vue': `<script setup>
import { ref } from 'vue'

const cargando = ref(false)
const error = ref(null)
const datos = ref(null)

async function cargar() {
  // TODO: cargando=true, error=null, datos=null
  // try: fetch a https://jsonplaceholder.typicode.com/users/1
  //      si !res.ok lanza un Error
  //      datos.value = await res.json()
  // catch: error.value = e.message
  // finally: cargando.value = false
}
</script>

<template>
  <button :disabled="cargando" @click="cargar">Cargar usuario</button>
  <p v-if="cargando">Cargando…</p>
  <p v-else-if="error">Error: {{ error }}</p>
  <p v-else-if="datos">{{ datos.name }}</p>
</template>
`,
    },
    hint:
      'cargando.value=true; error.value=null; datos.value=null; try { const res = await fetch(...); if (!res.ok) throw new Error("fallo"); datos.value = await res.json() } catch (e) { error.value = e.message } finally { cargando.value = false }',
    solution: {
      'App.vue': `<script setup>
import { ref } from 'vue'

const cargando = ref(false)
const error = ref(null)
const datos = ref(null)

async function cargar() {
  cargando.value = true
  error.value = null
  datos.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    if (!res.ok) throw new Error('fallo de red')
    datos.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <button :disabled="cargando" @click="cargar">Cargar usuario</button>
  <p v-if="cargando">Cargando…</p>
  <p v-else-if="error">Error: {{ error }}</p>
  <p v-else-if="datos">{{ datos.name }}</p>
</template>
`,
    },
    check: async (doc) => {
      const btn = doc.querySelector('button')
      if (!btn) return false
      btn.click()
      // esperar a que termine la petición
      for (let i = 0; i < 60; i++) {
        await wait(150)
        const ps = [...doc.querySelectorAll('p')].map(txt).filter(Boolean)
        if (ps.some((t) => /^Error/i.test(t))) return false
        if (ps.some((t) => t.length > 0 && !/Cargando/i.test(t) && !/^Error/i.test(t))) return true
      }
      return false
    },
  },
]

export { sim }
export const TOTAL = steps.length
