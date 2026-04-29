/**
 * Plantillas del REPL, objetivos, quiz y pistas. Separado para no cargar esto en la ruta de teoría.
 */
export const guideStepBodies = {
  "g01": {
    "lessonStages": [
      {
        "label": "Idea",
        "text": "`ref` es la función que crea la «caja»: metes un texto inicial y Vue vigila ese dato para actualizar la vista cuando cambie."
      },
      {
        "label": "Patrón",
        "text": "En el script: `import` + `const nombre = ref('…')`. En el HTML del template: `{{ nombre }}` con el mismo identificador."
      },
      {
        "label": "Regla",
        "text": "En plantilla no va `.value` (eso es para el script cuando leas o escribas el interior de la caja; lo verás en el paso 2)."
      }
    ],
    "lessonTips": [
      "Un cambio pequeño cada vez: primero solo el texto entre comillas, guarda y mira; luego prueba otra frase.",
      "Ctrl+S en el editor del REPL es tu «enviar respuesta»: sin guardar, la vista previa puede no enterarse.",
      "Si algo falla, mira si el nombre en `{{ … }}` coincide exactamente con el del `const … = ref`.",
      "Equivocarse en el reto de abajo es normal: la explicación después del intento es parte del aprendizaje."
    ],
    "objectives": [
      "Explicar con tus palabras qué hace `ref('…')`: una caja reactiva con ese texto dentro",
      "Localizar en el fichero el `import`, la línea `const … = ref(…)` y el `<template>` con `{{ }}`",
      "Unir el nombre del script (`titulo`) con `{{ titulo }}` en el HTML",
      "Editar el string, guardar con Ctrl+S y ver el título nuevo en la vista previa sin tocar el DOM a mano"
    ],
    "checklist": [
      "Sé qué es la «caja» de `ref` frente al texto que se muestra en pantalla",
      "He cambiado el texto dentro de `ref('…')` y el encabezado de la vista previa lo refleja",
      "He repetido `{{ titulo }}` en un segundo sitio del template para ver que un solo ref alimenta varias líneas",
      "Me acuerdo: en plantilla no llevo `.value`; eso lo usaré en el script en el siguiente paso"
    ],
    "practiceHeading": "Tu turno · editor en vivo",
    "checklistHeading": "¿Lo llevas?",
    "hintsSummary": "¿Atascado? Abre las pistas: son píldoras cortas, como los tips de ayuda en una app de idiomas.",
    "recapHeading": "Repaso de 20 segundos",
    "recapBullets": [
      "`ref` + texto inicial = dato reactivo en un `.vue` con `<script setup>`.",
      "`{{ nombre }}` en el template muestra lo que hay dentro de la caja; mismo `nombre` que en el `const`.",
      "`.value` lo dejamos para cuando cambies el dato desde el script (paso siguiente)."
    ],
    "quizSectionTitle": "Reto rápido (una pregunta)",
    "quizPreamble": "Elige la opción que mejor encaje. Si no aciertas a la primera, lee la explicación y pulsa «Volver a intentar»: aquí no hay vidas que perder, solo práctica.",
    "doneEncouragement": "¡Bien hecho cuando termines! Marca la casilla: así la guía recuerda tu progreso en este navegador (como completar una lección).",
    "replHint": "En este primer taller el editor está a la izquierda y la vista previa a la derecha. Tras cambiar el texto dentro de ref('…'), guarda con Ctrl+S. Si la previsualización no reacciona, busca un icono de recargar o actualizar en la barra del playground. No hace falta instalar nada extra: todo va en el navegador.",
    "files": {
      "App.vue": "<script setup>\n// ref() viene de Vue: crea una «caja» reactiva. El valor inicial va entre paréntesis.\nimport { ref } from 'vue'\n\nconst titulo = ref('Hola, mundo Vue')\n\n// En el <script> el dato «de verdad» sería titulo.value —pero en el <template> no hace falta el .value.\n</script>\n\n<template>\n  <!-- {{ }} inserta el contenido del ref como texto -->\n  <h1>{{ titulo }}</h1>\n  <p>\n    Modifica el string en el script (entre comillas de ref('…')), guarda con Ctrl+S y observa este bloque y el título.\n  </p>\n</template>"
    },
    "quiz": {
      "question": "Tienes en el script `const mensaje = ref('Hola')`. En el `<template>`, ¿cómo muestras ese texto dentro de un `<p>`?",
      "options": [
        {
          "text": "<p>{{ mensaje }}</p>",
          "correct": true
        },
        {
          "text": "<p>{{ mensaje.value }}</p>",
          "correct": false
        },
        {
          "text": "<p>{ mensaje }</p>",
          "correct": false
        }
      ],
      "explain": "En la plantilla Vue desenvuelve el ref: usas el mismo nombre que en el script, entre dobles llaves. `.value` es para el `<script setup>` cuando lees o asignas; las llaves simples `{ }` no son la sintaxis de Vue para interpolar."
    },
    "hints": [
      "¿No cambia la vista previa? Guarda otra vez (Ctrl+S) y, si sigue igual, recarga el panel del REPL.",
      "El `import { ref } from 'vue'` debe vivir en el bloque `<script setup>`, antes de usar `ref`.",
      "Si renombras `titulo` a `mensaje`, cambia también cada `{{ titulo }}` por `{{ mensaje }}` o verás error de variable no definida.",
      "Las comillas del string deben cerrarse bien: `ref('Texto')` o `ref(\"Texto\")`; no mezcles una sin cerrar la otra.",
      "Un truco de lectura: busca en el template todas las `{{ … }}` y comprueba que cada nombre existe como `const … = ref` arriba.",
      "Si aparece mensaje de error en rojo en el playground, léelo con calma: suele indicar la línea (falta una etiqueta, un paréntesis, etc.)."
    ]
  },
  "g02": {
    "objectives": [
      "Declarar un `ref` numérico para el contador",
      "Enlazar un botón con `@click` a una función que use `.value`"
    ],
    "checklist": [
      "Al pulsar «Sumar 1» el número sube y la vista previa se actualiza",
      "Opcional: segundo botón que deje el contador en 0"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref } from 'vue'\n\nconst contador = ref(0)\n\nfunction sumar() {\n  contador.value++\n}\n</script>\n\n<template>\n  <p>Cuenta: {{ contador }}</p>\n  <button type=\"button\" @click=\"sumar\">Sumar 1</button>\n</template>"
    },
    "quiz": {
      "question": "¿Qué atajo es equivalente a v-on:click?",
      "options": [
        {
          "text": ":click",
          "correct": false
        },
        {
          "text": "@click",
          "correct": true
        },
        {
          "text": "#click",
          "correct": false
        }
      ],
      "explain": "`@` es la forma corta de `v-on:` (escuchar eventos del DOM)."
    },
    "hints": [
      "Para reiniciar: otra función que haga `contador.value = 0` y un botón con `@click`."
    ]
  },
  "g03": {
    "objectives": [
      "Controlar un bloque con `v-if` y un ref booleano",
      "Cambiar ese booleano desde un botón"
    ],
    "checklist": [
      "El párrafo solo se muestra cuando `ver` vale true"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref } from 'vue'\n\nconst ver = ref(false)\n\nfunction toggle() {\n  ver.value = !ver.value\n}\n</script>\n\n<template>\n  <button type=\"button\" @click=\"toggle\">{{ ver ? 'Ocultar' : 'Mostrar' }} detalle</button>\n  <p v-if=\"ver\">Este bloque solo vive en el DOM cuando ver es true.</p>\n</template>"
    },
    "quiz": {
      "question": "¿Qué directiva oculta con CSS pero mantiene el nodo?",
      "options": [
        {
          "text": "v-if",
          "correct": false
        },
        {
          "text": "v-show",
          "correct": true
        },
        {
          "text": "v-hide",
          "correct": false
        }
      ],
      "explain": "`v-show` oculta con CSS; `v-if` evita crear el nodo cuando la condición es falsa."
    },
    "hints": [
      "Prueba un `v-else` con un texto del tipo «no hay detalle» cuando `ver` sea false."
    ]
  },
  "g04": {
    "objectives": [
      "Usar `v-for` para generar elementos de lista",
      "Asignar una `:key` estable por elemento"
    ],
    "checklist": [
      "La lista muestra al menos tres ítems",
      "Cada `<li>` tiene `:key` (aquí vale el texto si no se repite)"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref } from 'vue'\n\nconst frutas = ref(['manzana', 'plátano', 'kiwi'])\n</script>\n\n<template>\n  <ul>\n    <li v-for=\"f in frutas\" :key=\"f\">{{ f }}</li>\n  </ul>\n</template>"
    },
    "quiz": {
      "question": "¿Por qué usar :key con un id único en listas dinámicas?",
      "options": [
        {
          "text": "Por estética",
          "correct": false
        },
        {
          "text": "Para que Vue reordene nodos sin mezclar estado de filas",
          "correct": true
        },
        {
          "text": "Porque es obligatorio en HTML",
          "correct": false
        }
      ],
      "explain": "Una key estable permite que Vue identifique cada fila al reordenar o borrar sin mezclar contenido."
    },
    "hints": [
      "Extra: función que haga `frutas.value.push('nueva')` o equivalente con un ref nuevo."
    ]
  },
  "g05": {
    "objectives": [
      "Enlazar un `<input>` con `v-model` a un ref",
      "Mostrar el valor en la plantilla al vuelo"
    ],
    "checklist": [
      "Al escribir en el campo, el párrafo de saludo refleja el texto"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref } from 'vue'\n\nconst nombre = ref('')\n</script>\n\n<template>\n  <label>\n    Nombre\n    <input v-model=\"nombre\" type=\"text\" placeholder=\"Escribe…\" />\n  </label>\n  <p v-if=\"nombre.trim()\">Encantado, {{ nombre.trim() }}</p>\n</template>"
    },
    "quiz": {
      "question": "v-model en un checkbox enlaza típicamente a…",
      "options": [
        {
          "text": "un string",
          "correct": false
        },
        {
          "text": "un valor verdadero / falso (booleano)",
          "correct": true
        },
        {
          "text": "siempre un número",
          "correct": false
        }
      ],
      "explain": "Una casilla suele representar «marcado o no»: encaja con true/false en Vue."
    },
    "hints": [
      "Prueba `v-model.lazy` y fíjate en que el valor se actualiza al salir del campo."
    ]
  },
  "g06": {
    "objectives": [
      "Declarar un `computed` que dependa de otros refs",
      "Leer siempre los refs con `.value` dentro del computed"
    ],
    "checklist": [
      "Si cambio base o el porcentaje de IVA, el total se recalcula solo"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref, computed } from 'vue'\n\nconst base = ref(100)\nconst ivaPorcentaje = ref(21)\n\nconst conIva = computed(() => {\n  return base.value * (1 + ivaPorcentaje.value / 100)\n})\n</script>\n\n<template>\n  <label>Base <input v-model.number=\"base\" type=\"number\" /></label>\n  <label>IVA % <input v-model.number=\"ivaPorcentaje\" type=\"number\" /></label>\n  <p>Total con IVA: {{ conIva.toFixed(2) }} €</p>\n</template>"
    },
    "quiz": {
      "question": "¿Cuándo prefiere computed a watch?",
      "options": [
        {
          "text": "Cuando solo necesitas un valor calculado desde otros datos",
          "correct": true
        },
        {
          "text": "Cuando siempre llamas a fetch",
          "correct": false
        },
        {
          "text": "Nunca, watch es mejor",
          "correct": false
        }
      ],
      "explain": "`computed` sirve para valores que se deducen de otros; `watch` para «hacer algo» cuando cambian."
    },
    "hints": [
      "Dentro de `computed` solo cálculos; no llames a APIs ni toques el DOM."
    ]
  },
  "g07": {
    "objectives": [
      "Usar `watch` sobre un ref",
      "Actualizar otro ref cuando cambie el observado"
    ],
    "checklist": [
      "Cada clic en +1 cambia el historial mostrado"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref, watch } from 'vue'\n\nconst n = ref(0)\nconst historial = ref('Aún sin cambios.')\n\nfunction mas() {\n  n.value++\n}\n\nwatch(n, (nuevo, viejo) => {\n  historial.value = `Antes: ${viejo} → ahora: ${nuevo}`\n})\n</script>\n\n<template>\n  <p>{{ n }}</p>\n  <button type=\"button\" @click=\"mas\">+1</button>\n  <p class=\"log\">{{ historial }}</p>\n</template>\n\n<style scoped>\n.log { font-size: 0.9rem; color: #555; }\n</style>"
    },
    "quiz": {
      "question": "watch recibe el nuevo valor como…",
      "options": [
        {
          "text": "primer argumento del callback",
          "correct": true
        },
        {
          "text": "return del ref",
          "correct": false
        },
        {
          "text": "solo en el template",
          "correct": false
        }
      ],
      "explain": "El primer argumento del callback es el valor nuevo; el segundo, el anterior (ref primitivo)."
    },
    "hints": [
      "Opcional: `{ immediate: true }` como tercer argumento para ejecutar al montar el componente."
    ]
  },
  "g08": {
    "objectives": [
      "Seguir el dato: baja con props, sube con emit"
    ],
    "checklist": [
      "Sé decir con una frase quién es dueño del contador (padre o hijo)"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref } from 'vue'\nimport Hijo from './Hijo.vue'\n\nconst total = ref(0)\n\nfunction alSumar() {\n  total.value++\n}\n</script>\n\n<template>\n  <p>Total en el padre: {{ total }}</p>\n  <Hijo :valor=\"total\" @pedir-suma=\"alSumar\" />\n</template>",
      "Hijo.vue": "<script setup>\ndefineProps({\n  valor: { type: Number, required: true },\n})\n\nconst emit = defineEmits(['pedir-suma'])\n</script>\n\n<template>\n  <div style=\"border:1px solid #42b883; padding:8px; border-radius:8px;\">\n    <p>Hijo muestra: {{ valor }}</p>\n    <button type=\"button\" @click=\"emit('pedir-suma')\">Pedir +1 al padre</button>\n  </div>\n</template>"
    },
    "mainFile": "App.vue",
    "quiz": {
      "question": "¿El componente hijo debe cambiar por su cuenta el valor de una prop recibida?",
      "options": [
        {
          "text": "Sí, así va más rápido",
          "correct": false
        },
        {
          "text": "No: avisa con un evento y actualiza el padre",
          "correct": true
        },
        {
          "text": "Solo si la prop es texto",
          "correct": false
        }
      ],
      "explain": "Así un solo sitio controla el estado y evitas efectos impredecibles."
    },
    "hints": [
      "Añade un segundo evento emit para reiniciar a cero."
    ]
  },
  "g09": {
    "objectives": [
      "Ver el contenido que el padre coloca dentro de `<Tarjeta>…</Tarjeta>` en el `<slot>` del hijo"
    ],
    "checklist": [
      "He modificado el interior de la tarjeta solo editando `App.vue`"
    ],
    "files": {
      "App.vue": "<script setup>\nimport Tarjeta from './Tarjeta.vue'\n</script>\n\n<template>\n  <Tarjeta titulo=\"Mi tarjeta\">\n    <p>Este párrafo entra en el slot por defecto.</p>\n    <p>Cámbialo por una lista o un botón.</p>\n  </Tarjeta>\n</template>",
      "Tarjeta.vue": "<script setup>\ndefineProps({\n  titulo: { type: String, default: 'Sin título' },\n})\n</script>\n\n<template>\n  <article style=\"border:1px solid #ccc;border-radius:12px;padding:12px;max-width:320px\">\n    <h2>{{ titulo }}</h2>\n    <slot />\n  </article>\n</template>"
    },
    "quiz": {
      "question": "¿Dónde va el contenido que el padre pone entre <Tarjeta>…</Tarjeta>?",
      "options": [
        {
          "text": "En el <slot> del hijo",
          "correct": true
        },
        {
          "text": "En el public/index.html",
          "correct": false
        },
        {
          "text": "En main.js solamente",
          "correct": false
        }
      ],
      "explain": "`<slot />` marca dónde se «inyecta» lo que el padre escribe entre las etiquetas del hijo."
    },
    "hints": [
      "Opcional: en el hijo añade `<slot name=\"pie\" />` y en el padre `<template #pie>…</template>`."
    ]
  },
  "g10": {
    "objectives": [
      "Pedir JSON con `fetch` en una función `async`",
      "Mostrar mensajes distintos para carga, error y datos listos"
    ],
    "checklist": [
      "He visto los estados «cargando», éxito y mensaje inicial antes de pulsar"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref } from 'vue'\n\nconst cargando = ref(false)\nconst error = ref(null)\nconst usuario = ref(null)\n\nasync function cargar() {\n  cargando.value = true\n  error.value = null\n  usuario.value = null\n  try {\n    const r = await fetch('https://jsonplaceholder.typicode.com/users/1')\n    if (!r.ok) throw new Error('HTTP ' + r.status)\n    usuario.value = await r.json()\n  } catch (e) {\n    error.value = e instanceof Error ? e.message : 'Error'\n  } finally {\n    cargando.value = false\n  }\n}\n</script>\n\n<template>\n  <button type=\"button\" :disabled=\"cargando\" @click=\"cargar\">Cargar usuario</button>\n  <p v-if=\"cargando\">Cargando…</p>\n  <p v-else-if=\"error\">{{ error }}</p>\n  <div v-else-if=\"usuario\">\n    <strong>{{ usuario.name }}</strong>\n    <div>{{ usuario.email }}</div>\n  </div>\n  <p v-else>Pulsa el botón.</p>\n</template>"
    },
    "quiz": {
      "question": "Antes de hacer `.json()` sobre la respuesta, ¿qué suele comprobarse?",
      "options": [
        {
          "text": "Si la respuesta fue correcta (`response.ok` o el código HTTP)",
          "correct": true
        },
        {
          "text": "El estilo del botón",
          "correct": false
        },
        {
          "text": "Nada: siempre viene JSON válido",
          "correct": false
        }
      ],
      "explain": "Un 404 o 500 puede devolver cuerpo igualmente; sin comprobarlo, el JSON puede fallar o engañar."
    },
    "hints": [
      "Cambia el número al final de la URL del `fetch` para pedir otro usuario de prueba."
    ]
  },
  "g11": {
    "objectives": [
      "Aplicar `:class` con un objeto (clases condicionadas al estado)",
      "Alternar el estado con un botón y ver el cambio visual"
    ],
    "checklist": [
      "La caja usa estilos distintos según activa / apagada"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref } from 'vue'\n\nconst activa = ref(true)\n\nfunction toggle() {\n  activa.value = !activa.value\n}\n</script>\n\n<template>\n  <button type=\"button\" @click=\"toggle\">Toggle</button>\n  <div\n    class=\"caja\"\n    :class=\"{ 'caja--activa': activa, 'caja--apagada': !activa }\"\n  >\n    Estado: {{ activa ? 'activa' : 'apagada' }}\n  </div>\n</template>\n\n<style scoped>\n.caja {\n  margin-top: 8px;\n  padding: 12px;\n  border-radius: 8px;\n  border: 2px dashed #ccc;\n}\n.caja--activa {\n  border-color: #42b883;\n  background: #e8f7f2;\n}\n.caja--apagada {\n  opacity: 0.6;\n}\n</style>"
    },
    "quiz": {
      "question": ":class puede recibir…",
      "options": [
        {
          "text": "solo un string fijo",
          "correct": false
        },
        {
          "text": "un objeto, un array o una expresión que devuelva string",
          "correct": true
        },
        {
          "text": "solo números",
          "correct": false
        }
      ],
      "explain": "Vue mezcla clases de string, objetos y arrays de forma predecible."
    },
    "hints": [
      "Prueba también `:style` con un objeto para un color en línea."
    ]
  },
  "g12": {
    "objectives": [
      "Reunir lista, formulario, computed y condicionales en un solo flujo"
    ],
    "checklist": [
      "La función `addItem` añade texto recortado, incrementa id y vacía el borrador"
    ],
    "files": {
      "App.vue": "<script setup>\nimport { ref, computed } from 'vue'\n\nconst borrador = ref('')\nconst items = ref([\n  { id: 1, texto: 'Aprender Vue' },\n  { id: 2, texto: 'Practicar en el REPL' },\n])\nlet nextId = 3\n\nconst total = computed(() => items.value.length)\n\nfunction addItem() {\n  // TODO: trim borrador, si no está vacío hacer push de { id: nextId++, texto }\n  // y vaciar borrador\n}\n\nfunction remove(id) {\n  items.value = items.value.filter((i) => i.id !== id)\n}\n</script>\n\n<template>\n  <h2>Tareas ({{ total }})</h2>\n  <p v-if=\"total === 0\">No hay tareas. ¡Añade la primera!</p>\n  <ul>\n    <li v-for=\"item in items\" :key=\"item.id\">\n      {{ item.texto }}\n      <button type=\"button\" @click=\"remove(item.id)\">✕</button>\n    </li>\n  </ul>\n  <input v-model=\"borrador\" placeholder=\"Nueva tarea…\" @keydown.enter.prevent=\"addItem\" />\n  <button type=\"button\" @click=\"addItem\">Añadir</button>\n</template>"
    },
    "quiz": {
      "question": "Para seguir mejorando después de esta guía, ¿qué suele funcionar mejor?",
      "options": [
        {
          "text": "Solo leer tutoriales sin escribir código",
          "correct": false
        },
        {
          "text": "Proyectos pequeños, documentación oficial y aprender de los errores",
          "correct": true
        },
        {
          "text": "Evitar el enrutador en cualquier app",
          "correct": false
        }
      ],
      "explain": "La práctica repetida con objetivos claros fija lo que la teoría ordena."
    },
    "hints": [
      "Pista: `const t = borrador.value.trim(); if (!t) return;` luego copia el array con spread y suma `nextId++`, y por último `borrador.value = ''`."
    ]
  }
}
