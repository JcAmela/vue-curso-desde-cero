/* Archivo generado por scripts/build-course.mjs — no editar a mano */
export const courseSteps = [
  {
    "id": "read-bienvenida-sesion",
    "type": "micro_read",
    "unitId": "intro",
    "order": 1,
    "prereqIds": [],
    "xp": 5,
    "title": "Antes de los ejercicios: cómo usar esta sesión",
    "paragraphs": [
      "Esta ruta es un «camino guiado» en una sola secuencia: primero lecturas muy cortas y tests rápidos, luego práctica con el mismo formato que la página de ejercicios (objetivo, criterios, pistas y solución).",
      "Lo ideal es bloques de pocos minutos, feedback inmediato en los tests y código en tu editor para la parte práctica. Marca cada paso cuando lo hayas trabajado en serio; el progreso se guarda solo en este navegador.",
      "Si algo no encaja, puedes abrir la lección relacionada desde la tarjeta de práctica o volver al índice de teoría y guía cuando lo necesites."
    ],
    "asideLink": {
      "path": "/practica",
      "label": "Ver todos los ejercicios como lista"
    }
  },
  {
    "id": "mcq-interpolacion-ref",
    "type": "mcq",
    "unitId": "reactividad",
    "order": 2,
    "prereqIds": [],
    "xp": 10,
    "quiz": {
      "question": "En `<script setup>`, tienes `const nombre = ref('Ana')`. ¿Qué muestra la plantilla `{{ nombre }}`?",
      "options": [
        {
          "text": "Ana (el string dentro del ref)",
          "correct": false
        },
        {
          "text": "RefImpl o un objeto raro — hay que usar nombre.value en la plantilla",
          "correct": false
        },
        {
          "text": "Ana — en la plantilla Vue « desenvuelve » refs automáticamente",
          "correct": true
        },
        {
          "text": "Nada, la interpolación no funciona con ref",
          "correct": false
        }
      ],
      "explain": "En el template, los refs declarados en el script se exponen desenvueltos: escribes `nombre` y Vue muestra el valor actual. En el script (JavaScript) sigues usando `nombre.value` al asignar o leer por código."
    }
  },
  {
    "id": "ex-saludo",
    "type": "practice",
    "unitId": "reactividad",
    "order": 10,
    "prereqIds": [],
    "xp": 15,
    "title": "Saludo personal",
    "difficulty": "Calentamiento",
    "minutes": 8,
    "lessonPath": "reactividad",
    "goal": "Ver en vivo la reactividad básica: un texto en pantalla que sigue a una variable sin que tú repintes el DOM a mano.",
    "problem": [
      "Crea o abre un componente Vue con <script setup>.",
      "Declara un ref llamado nombre (por ejemplo con valor inicial «Amigo» o cadena vacía).",
      "En el template muestra el texto «Hola, » seguido del nombre usando interpolación {{ }}.",
      "Añade un <input> con v-model=\"nombre\". Al escribir, el saludo debe actualizarse al instante."
    ],
    "successCheck": [
      "Sin recargar la página, cada tecla en el input cambia lo que ves en el párrafo.",
      "En el script usas nombre.value si asignas por código; en el template solo nombre."
    ],
    "hints": [
      "Importa ref desde \"vue\" y envuelve el valor: const nombre = ref('Amigo').",
      "v-model enlaza el input y el ref en las dos direcciones; no necesitas @input a mano."
    ],
    "stretch": [
      "Añade un ref apellido y muestra «Hola, nombre apellido» en una sola línea (con espacios razonables)."
    ],
    "solution": "<script setup>\nimport { ref } from 'vue'\nconst nombre = ref('Amigo')\n</script>\n\n<template>\n  <p>Hola, {{ nombre }}</p>\n  <input v-model=\"nombre\" type=\"text\" placeholder=\"Tu nombre\" autocomplete=\"name\" />\n</template>"
  },
  {
    "id": "ex-contador",
    "type": "practice",
    "unitId": "eventos",
    "order": 20,
    "prereqIds": [],
    "xp": 15,
    "title": "Contador + y −",
    "difficulty": "Fácil",
    "minutes": 10,
    "lessonPath": "eventos",
    "goal": "Practicar @click y funciones en el script en lugar de meter lógica larga dentro del template.",
    "problem": [
      "Muestra un número (ref) inicializado en 0.",
      "Dos botones: «+1» y «−1». Cada uno debe llamar a una función del script (incrementar / decrementar).",
      "Extra (recomendado): evita que el contador baje de 0; el botón − puede quedarse o puedes deshabilitarlo cuando valga 0."
    ],
    "successCheck": [
      "Los botones solo disparan funciones; no hay contador.value++ directamente en el template.",
      "El valor mínimo es 0 si hiciste el extra."
    ],
    "hints": [
      "function mas() { contador.value++ } y function menos() { ... }",
      "Para el mínimo: if (contador.value > 0) contador.value-- dentro de menos().",
      "Opcional: :disabled=\"contador === 0\" en el botón − para feedback visual."
    ],
    "stretch": [
      "Añade botones «+2» y «Volver a 0» que llamen a funciones del script."
    ],
    "solution": "<script setup>\nimport { ref } from 'vue'\nconst contador = ref(0)\nfunction mas() {\n  contador.value++\n}\nfunction menos() {\n  if (contador.value > 0) contador.value--\n}\n</script>\n\n<template>\n  <p>Valor: {{ contador }}</p>\n  <button type=\"button\" @click=\"mas\">+1</button>\n  <button type=\"button\" @click=\"menos\">−1</button>\n</template>"
  },
  {
    "id": "ex-lista-compra",
    "type": "practice",
    "unitId": "listas",
    "order": 30,
    "prereqIds": [],
    "xp": 20,
    "title": "Lista de la compra",
    "difficulty": "Fácil",
    "minutes": 15,
    "lessonPath": "listas",
    "goal": "Combinar array reactivo, v-for, :key y eventos para añadir y quitar filas.",
    "problem": [
      "Guarda en un ref un array de strings (artículos). Empieza con dos ítems de ejemplo.",
      "Usa v-for para mostrar cada ítem y asigna :key. Si solo usas texto sin duplicar, vale :key=\"item\"; si puede repetirse el mismo texto, usa ids numéricos como en la lección.",
      "Campo de texto + botón «Añadir»: al pulsar o al pulsar Enter, añade el texto recortado (trim) al array y vacía el campo.",
      "Por cada fila, un botón «Quitar» que elimine únicamente ese ítem."
    ],
    "successCheck": [
      "Puedes añadir varios ítems seguidos y borrar uno del medio sin que el resto “salte” raro.",
      "No se añaden entradas vacías ni solo espacios."
    ],
    "hints": [
      "Al añadir: const t = borrador.value.trim(); if (!t) return; y luego empuja al array o copia con spread.",
      "Al quitar por texto: items.value = items.value.filter((x) => x !== texto).",
      "Si más adelante repites nombres en la lista, pasa a objetos { id, texto } y :key=\"id\"."
    ],
    "stretch": [
      "Muestra el número de ítems en pantalla (items.length o un computed trivial).",
      "Bonus: un botón «Ordenar A→Z» que ordene copiando el array (sin mutar a lo loco: spread + sort)."
    ],
    "solution": "<script setup>\nimport { ref } from 'vue'\nconst items = ref(['Leche', 'Pan'])\nconst borrador = ref('')\nfunction add() {\n  const t = borrador.value.trim()\n  if (!t) return\n  items.value = [...items.value, t]\n  borrador.value = ''\n}\nfunction remove(t) {\n  items.value = items.value.filter((x) => x !== t)\n}\n</script>\n\n<template>\n  <ul>\n    <li v-for=\"item in items\" :key=\"item\">\n      {{ item }}\n      <button type=\"button\" @click=\"remove(item)\">Quitar</button>\n    </li>\n  </ul>\n  <input v-model=\"borrador\" @keydown.enter.prevent=\"add\" />\n  <button type=\"button\" @click=\"add\">Añadir</button>\n</template>"
  },
  {
    "id": "ex-email",
    "type": "practice",
    "unitId": "computed-watch",
    "order": 40,
    "prereqIds": [],
    "xp": 20,
    "title": "¿El email parece válido?",
    "difficulty": "Media",
    "minutes": 12,
    "lessonPath": "computed-watch",
    "goal": "Usar un computed que depende de un ref y reflejar el resultado en la interfaz (color o mensaje).",
    "problem": [
      "Un ref email (string) enlazado con v-model a un input type=\"email\" o type=\"text\".",
      "Un computed llamado por ejemplo valido que sea true si el texto incluye «@» y tiene longitud mayor que 3 (regla de juguete, no validación real de correo).",
      "Muestra un mensaje en verde («Va en buen camino») si es válido y en rojo («Revisa el formato») si no. Puedes usar v-if / v-else o clases dinámicas con :class."
    ],
    "successCheck": [
      "Al borrar o escribir, el mensaje y el color cambian sin funciones extra: solo el computed reacciona.",
      "Comprendes que el computed se recalcula cuando email cambia."
    ],
    "hints": [
      "import { ref, computed } from 'vue'",
      "const valido = computed(() => email.value.includes('@') && email.value.length > 3)",
      "Ejemplo de clases: :class=\"{ ok: valido, bad: !valido }\" y en <style scoped> .ok { color: #15803d } .bad { color: #b91c1c }"
    ],
    "solution": "<script setup>\nimport { ref, computed } from 'vue'\nconst email = ref('')\nconst valido = computed(() => email.value.includes('@') && email.value.length > 3)\n</script>\n\n<template>\n  <input v-model=\"email\" type=\"email\" autocomplete=\"email\" />\n  <p :class=\"{ ok: valido, bad: !valido }\">\n    {{ valido ? 'Va en buen camino' : 'Revisa el formato' }}\n  </p>\n</template>\n\n<style scoped>\n.ok { color: #15803d; font-weight: 700; }\n.bad { color: #b91c1c; font-weight: 700; }\n</style>"
  },
  {
    "id": "ex-panel-toggle",
    "type": "practice",
    "unitId": "plantilla",
    "order": 50,
    "prereqIds": [],
    "xp": 15,
    "title": "Panel visible u oculto",
    "difficulty": "Fácil",
    "minutes": 8,
    "lessonPath": "plantilla",
    "goal": "Dominar v-if con un booleano que alternas desde un botón.",
    "problem": [
      "Un ref mostrar (o visible) inicializado a false.",
      "Un botón cuyo texto indique la acción siguiente («Mostrar panel» / «Ocultar panel») y que al pulsar invierta el booleano con una función toggle.",
      "Solo cuando el booleano sea true, muestra un bloque (div) con un párrafo de texto largo de relleno."
    ],
    "successCheck": [
      "Al ocultar con v-if, el bloque no está en el DOM (puedes comprobarlo con las herramientas de desarrollo del navegador)."
    ],
    "hints": [
      "v-if=\"mostrar\" en el div del panel.",
      "function toggle() { mostrar.value = !mostrar.value }"
    ],
    "solution": "<script setup>\nimport { ref } from 'vue'\nconst mostrar = ref(false)\nfunction toggle() {\n  mostrar.value = !mostrar.value\n}\n</script>\n\n<template>\n  <button type=\"button\" @click=\"toggle\">{{ mostrar ? 'Ocultar' : 'Mostrar' }} panel</button>\n  <div v-if=\"mostrar\" class=\"panel\">\n    Aquí va el contenido que solo existe en el DOM cuando mostrar es true.\n  </div>\n</template>"
  },
  {
    "id": "ex-fetch",
    "type": "practice",
    "unitId": "datos-remotos",
    "order": 60,
    "prereqIds": [],
    "xp": 25,
    "title": "Un usuario de prueba (fetch)",
    "difficulty": "Media",
    "minutes": 20,
    "lessonPath": "datos-remotos",
    "goal": "Encadenar async/await, refs de estado (carga, error, datos) y un template que cubra los tres casos.",
    "problem": [
      "Botón «Cargar usuario» que ejecute una función async.",
      "La función hace fetch a https://jsonplaceholder.typicode.com/users/1 (API pública solo para practicar).",
      "Mientras la petición está en curso, muestra «Cargando…» y desactiva el botón si quieres evitar dobles clics.",
      "Si la respuesta no es correcta (!res.ok) o hay excepción de red, guarda un mensaje en un ref de error y muéstralo.",
      "Si todo va bien: parsea JSON, guarda el objeto en un ref y muestra al menos name y email en la pantalla."
    ],
    "successCheck": [
      "Ves los tres estados en algún momento: cargando, error simulado (por ejemplo desconectando la red) y datos correctos.",
      "Siempre termina en “ya no cargando” gracias a finally."
    ],
    "hints": [
      "const res = await fetch(url); if (!res.ok) throw new Error(...); const data = await res.json()",
      "Al inicio del intento: cargando.value = true; error.value = null; usuario.value = null",
      "finally { cargando.value = false } — así el estado de carga se limpia aunque falle el try.",
      "Esta URL suele funcionar desde el navegador sin configurar CORS en tu proyecto."
    ],
    "stretch": [
      "Elige el id de usuario (por ejemplo 1–5) con un select o un número antes de cargar; arma la URL con una plantilla `${base}/${id}`."
    ],
    "solution": "<script setup>\nimport { ref } from 'vue'\n\nconst cargando = ref(false)\nconst error = ref(null)\nconst usuario = ref(null)\n\nasync function cargar() {\n  cargando.value = true\n  error.value = null\n  usuario.value = null\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users/1')\n    if (!res.ok) throw new Error('Respuesta no OK')\n    usuario.value = await res.json()\n  } catch (e) {\n    error.value = e instanceof Error ? e.message : 'Algo ha fallado'\n  } finally {\n    cargando.value = false\n  }\n}\n</script>\n\n<template>\n  <button type=\"button\" :disabled=\"cargando\" @click=\"cargar\">Cargar usuario</button>\n  <p v-if=\"cargando\">Cargando…</p>\n  <p v-else-if=\"error\">Error: {{ error }}</p>\n  <template v-else-if=\"usuario\">\n    <p><strong>{{ usuario.name }}</strong></p>\n    <p>{{ usuario.email }}</p>\n  </template>\n</template>"
  },
  {
    "id": "ex-pinia",
    "type": "practice",
    "unitId": "pinia",
    "order": 70,
    "prereqIds": [],
    "xp": 25,
    "title": "Notas con Pinia",
    "difficulty": "Media",
    "minutes": 25,
    "lessonPath": "pinia",
    "goal": "Crear una tienda con defineStore, exponer estado y acciones, y consumirla desde un componente con useNombreTienda().",
    "problem": [
      "En src/stores/ crea un archivo (por ejemplo notasPractica.js) con defineStore en estilo función, como en src/stores/ejemploNotas.js de este proyecto.",
      "Estado: array de strings notas. Acciones: agregar(texto) que haga trim y no añada vacíos; quitarPorTexto(texto) que filtre el array.",
      "Registra la tienda en la app si hace falta (en este curso Pinia ya está en main.js).",
      "En una vista, usa useTuStore(), pinta las notas con v-for, y añade input + botón que llamen a agregar."
    ],
    "successCheck": [
      "Las notas se leen y modifican desde el componente sin pasar props desde un “abuelo”.",
      "Tu código sigue el mismo patrón que useEjemploNotasStore en ejemploNotas.js."
    ],
    "hints": [
      "Copia la estructura de ejemploNotas.js y cambia el id del store y los nombres a tu gusto.",
      "En el componente: const store = useNotasPracticaStore(); en el template store.agregar(texto).",
      "Si necesitas que notas sea reactivo en plantillas complejas, revisa storeToRefs(store) en la documentación."
    ],
    "solution": "// src/stores/notasPractica.js\nimport { ref } from 'vue'\nimport { defineStore } from 'pinia'\n\nexport const useNotasPracticaStore = defineStore('notasPractica', () => {\n  const notas = ref(['Primera nota'])\n\n  function agregar(texto) {\n    const t = texto.trim()\n    if (t) notas.value = [...notas.value, t]\n  }\n\n  function quitarPorTexto(texto) {\n    notas.value = notas.value.filter((n) => n !== texto)\n  }\n\n  return { notas, agregar, quitarPorTexto }\n})\n\n// Vista (fragmento)\n<script setup>\nimport { ref } from 'vue'\nimport { useNotasPracticaStore } from '../stores/notasPractica'\nconst store = useNotasPracticaStore()\nconst borrador = ref('')\nfunction add() {\n  store.agregar(borrador.value)\n  borrador.value = ''\n}\n</script>\n\n<template>\n  <ul>\n    <li v-for=\"n in store.notas\" :key=\"n\">{{ n }}</li>\n  </ul>\n  <input v-model=\"borrador\" />\n  <button type=\"button\" @click=\"add\">Añadir</button>\n</template>"
  },
  {
    "id": "ex-mini-formulario",
    "type": "practice",
    "unitId": "formularios",
    "order": 80,
    "prereqIds": [],
    "xp": 30,
    "title": "Mini registro (reto final)",
    "difficulty": "Reto",
    "minutes": 35,
    "lessonPath": "formularios",
    "goal": "Encadenar varios controles, validación con computed y un historial en array al enviar.",
    "problem": [
      "Campos: nombre (texto), edad (número con v-model.number), acepto términos (checkbox; el texto puede ser ficticio).",
      "Botón «Registrar» deshabilitado hasta que nombre tenga al menos 2 caracteres (tras trim), edad sea número ≥ 18 y el checkbox esté marcado. Usa un computed (por ejemplo puedeEnviar).",
      "Al pulsar «Registrar» con el formulario válido, añade { nombre, edad } a un ref historial (array) y vacía nombre y el checkbox; la edad puedes resetear a 18 o dejar la última, como prefieras.",
      "Lista el historial debajo con v-for."
    ],
    "successCheck": [
      "El botón solo se activa cuando se cumplen las tres condiciones a la vez.",
      "Cada registro válido aparece en la lista y los campos obligatorios quedan listos para otro envío."
    ],
    "hints": [
      "const puedeEnviar = computed(() => nombre.value.trim().length >= 2 && Number(edad.value) >= 18 && acepto.value)",
      "En el botón: :disabled=\"!puedeEnviar\"",
      "Al enviar: if (!puedeEnviar.value) return antes de empujar al historial.",
      "Si edad “vacía” da problemas, min=\"0\" en el input y comprueba con Number(edad.value)."
    ],
    "stretch": [
      "Impide registrar si el nombre contiene dígitos (búsqueda con /d/ o similar en un computed).",
      "Botón «Borrar historial» que solo actúe tras confirm() del navegador."
    ],
    "solution": "<script setup>\nimport { ref, computed } from 'vue'\n\nconst nombre = ref('')\nconst edad = ref(18)\nconst acepto = ref(false)\nconst historial = ref([])\n\nconst puedeEnviar = computed(\n  () => nombre.value.trim().length >= 2 && Number(edad.value) >= 18 && acepto.value\n)\n\nfunction registrar() {\n  if (!puedeEnviar.value) return\n  historial.value = [...historial.value, { nombre: nombre.value.trim(), edad: Number(edad.value) }]\n  nombre.value = ''\n  edad.value = 18\n  acepto.value = false\n}\n</script>\n\n<template>\n  <input v-model=\"nombre\" placeholder=\"Nombre\" autocomplete=\"name\" />\n  <input v-model.number=\"edad\" type=\"number\" min=\"0\" />\n  <label><input v-model=\"acepto\" type=\"checkbox\" /> Acepto los términos de ejemplo</label>\n  <button type=\"button\" :disabled=\"!puedeEnviar\" @click=\"registrar\">Registrar</button>\n\n  <ul>\n    <li v-for=\"(h, i) in historial\" :key=\"i\">{{ h.nombre }}, {{ h.edad }} años</li>\n  </ul>\n</template>"
  }
]
