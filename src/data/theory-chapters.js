/**
 * Documentación teórica continua (modo «libro»).
 * Cada bloque va de lo concreto a lo abstracto: primero «para qué sirve», luego detalle.
 * La guía paso a paso enlaza por `id` al capítulo relacionado.
 */
export const theoryChapters = [
  {
    id: 'fundamentos',
    title: '1. Fundamentos: componentes y archivos .vue',
    sections: [
      {
        subtitle: 'Qué problema resuelve (si solo usabas HTML y un script suelto)',
        paragraphs: [
          'Imagina una página donde un mismo dato (un nombre, un contador, una lista) aparece en varios sitios. Si el dato cambia, en JavaScript «a lo tradicional» tienes que localizar cada etiqueta en el DOM (con querySelector y similares) y actualizar texto, clases o atributos a mano. Con pocas líneas se lleva; con varias pantallas y piezas que dependen unas de otras, el código se enreda y es fácil olvidar un sitio por actualizar.',
          'Las piezas reutilizables que verás en Vue se llaman componentes: cada una junta el trozo de HTML, el estilo y la lógica que le tocan. Tú te centras en declarar qué datos tiene esa pieza y cómo debe verse cuando esos datos toman cada valor; Vue vuelve a pintar solo lo necesario en el navegador. No sustituye lo que ya sabes de HTML y CSS: siguen ahí, dentro del bloque template.',
        ],
      },
      {
        subtitle: 'Un archivo .vue en tres partes (orden habitual)',
        paragraphs: [
          'Script: en este curso usamos `<script setup>`. Ahí van los imports, variables reactivas como `ref` o `computed`, y las funciones que disparan los eventos.',
          'Template: es HTML con «extras» de Vue: llaves `{{ }}` para mostrar datos, `v-if`, `v-for`, `@click` para reaccionar a acciones, etc.',
          'Estilo: con `<style scoped>` el CSS que escribes solo afecta a las etiquetas de este fichero. El compilador añade un atributo único a esas etiquetas para que no choquen con el resto de la página (en proyectos grandes eso evita efectos colaterales).',
        ],
      },
    ],
  },
  {
    id: 'reactividad',
    title: '2. Reactividad con ref',
    sections: [
      {
        subtitle: 'Regla de oro: .value en el script, sin .value en el template',
        paragraphs: [
          '`ref()` envuelve un valor (número, texto, booleano…). Dentro de `<script setup>` siempre lees y escribes con `miVariable.value`. En el `<template>` Vue lo «developa» solo: escribes `{{ miVariable }}` o `v-if="miVariable"` sin `.value`.',
          'El despiste más frecuente al empezar es olvidar el `.value` en el script: entonces parece que el dato no cambia o la consola del navegador avisa de algo raro. Cuando lo tengas claro aquí, el resto del curso va más fluido.',
        ],
      },
      {
        subtitle: 'Comparación rápida con JavaScript «a mano»',
        paragraphs: [
          'Sin Vue: podrías hacer `let n = 0` y cada vez que cambie `n`, buscar el elemento en el DOM y asignar `textContent`. Con Vue: `n` es un `ref`, en el template pones `{{ n }}` y solo actualizas `n.value` en tus funciones; la pantalla se alinea sola.',
        ],
      },
    ],
  },
  {
    id: 'plantilla',
    title: '3. Plantilla: interpolación y directivas',
    sections: [
      {
        subtitle: 'Qué son las dobles llaves {{ }}',
        paragraphs: [
          'Entre `{{` y `}}` puedes poner expresiones JavaScript sencillas: variables, sumas, llamadas a funciones que hayas definido en el script. Evita meter lógica muy larga ahí: para ramas y bucles existen `v-if` y `v-for`.',
          'Por defecto Vue escapa el texto: no inyecta HTML crudo (reduce riesgos si el contenido viniera de un usuario). Solo uses `v-html` si confías por completo en el origen del texto.',
        ],
      },
      {
        subtitle: 'Enlazar atributos (:) y escuchar eventos (@)',
        paragraphs: [
          '`v-bind:href="url"` se escribe a menudo como `:href="url"`: el atributo queda ligado a una expresión. `v-on:click="miFunción"` se abrevia como `@click="miFunción"`: es declarar el manejador en la propia etiqueta, parecido a addEventListener pero más legible en componentes.',
        ],
      },
      {
        subtitle: 'v-if frente a v-show (cuándo usar cada uno)',
        paragraphs: [
          'Con `v-if` falso, el nodo ni siquiera está en el DOM: útil si el bloque es pesado o no quieres que exista hasta que haga falta. Con `v-show` el nodo sigue ahí pero se oculta con CSS (display): conviene si vas a alternar muchas veces entre visible y oculto sin crear y destruir el trozo cada vez.',
        ],
      },
    ],
  },
  {
    id: 'listas-eventos',
    title: '4. Listas y eventos',
    sections: [
      {
        subtitle: 'v-for y la importancia de :key',
        paragraphs: [
          '`v-for` repite un fragmento de plantilla por cada elemento de una lista. La directiva `:key` debe ser estable: lo ideal es un identificador único por fila (un id del dato). Si solo usas el índice del array y la lista cambia de orden o borras elementos por en medio, Vue puede reutilizar nodos equivocados y verás fallos raros (sobre todo si hay campos de formulario en cada fila).',
        ],
      },
      {
        subtitle: 'Modificadores de evento (menos código repetitivo)',
        paragraphs: [
          '`@click.prevent` evita la acción por defecto del navegador (por ejemplo en enlaces). `@keydown.enter` limita la reacción a la tecla Intro. En formularios, `@submit.prevent` evita que la página se recargue al enviar: muy habitual en aplicaciones de una sola página (SPA).',
        ],
      },
    ],
  },
  {
    id: 'formularios',
    title: '5. Formularios y v-model',
    sections: [
      {
        subtitle: 'Enlace en dos direcciones (qué ves es lo que hay guardado)',
        paragraphs: [
          '`v-model` conecta un control (`input`, `textarea`, `select`, casilla de verificación…) con una variable reactiva. Si escribes en el cuadro, se actualiza la variable; si cambias la variable en código, el control refleja el valor. Es el patrón estándar para formularios en Vue.',
        ],
      },
      {
        subtitle: 'Modificadores que ahorran trabajo',
        paragraphs: [
          '`.lazy` actualiza el dato al salir del campo, no en cada pulsación de tecla. `.number` intenta guardar un número. `.trim` quita espacios al inicio y al final del texto al sincronizar.',
        ],
      },
    ],
  },
  {
    id: 'computed-watch',
    title: '6. computed y watch',
    sections: [
      {
        subtitle: 'computed: valores calculados a partir de otros datos',
        paragraphs: [
          'Un `computed` representa algo que se deduce del resto de datos (por ejemplo: total = precio por cantidad). Vue lo recalcula cuando cambia alguna dependencia y lo cachea: en la plantilla lo usas como una variable más. Úsalo siempre que la pregunta sea «¿puedo obtener esto solo leyendo otros datos?».',
        ],
      },
      {
        subtitle: 'watch: reaccionar cuando algo cambia (efectos laterales)',
        paragraphs: [
          '`watch` ejecuta una función cuando cambia una fuente reactiva. Sirve para efectos colaterales: guardar en localStorage, volver a pedir datos a un servidor, coordinar animaciones… Si solo necesitas un valor derivado, prueba antes `computed`; reserva `watch` para cuando haya que «hacer algo» además de calcular.',
        ],
      },
    ],
  },
  {
    id: 'composicion',
    title: '7. Composición: props, emit y slots',
    sections: [
      {
        subtitle: 'Datos hacia abajo (props), avisos hacia arriba (emit)',
        paragraphs: [
          'El componente padre pasa información al hijo mediante props. El hijo debe tratarlas como de solo lectura: si necesita que cambie un valor, emite un evento y quien está arriba (el padre) actualiza su estado. Así el flujo es predecible y es más fácil depurar.',
        ],
      },
      {
        subtitle: 'Slots: huecos que el padre rellena con su HTML',
        paragraphs: [
          'El hijo define la «carcasa» (cabecera, pie, bordes) y deja un sitio reservado con `<slot />`. El padre mete lo que quiera entre la etiqueta de apertura y cierre del hijo. Ese patrón encaja con tarjetas, modales, plantillas de página y componentes muy reutilizables.',
        ],
      },
    ],
  },
  {
    id: 'ecosistema',
    title: '8. Router, fetch y Pinia',
    sections: [
      {
        subtitle: 'Vue Router y aplicaciones de una sola página',
        paragraphs: [
          'Vue Router asocia cada ruta (lo que ves en la barra de direcciones, p. ej. /listas) con un componente principal. La aplicación no se recarga entera al navegar: cambia la vista activa. En producción el servidor debe devolver siempre `index.html` para rutas que no sean ficheros estáticos (configuración típica de SPA).',
        ],
      },
      {
        subtitle: 'fetch y async/await (pedir datos por la red)',
        paragraphs: [
          'Las funciones marcadas como `async` pueden usar `await` para esperar a la respuesta de la red. Con `fetch` sueles guardar en refs un estado de «cargando», el posible error y los datos recibidos, y la plantilla muestra un mensaje u otro según el caso. Antes de parsear JSON conviene comprobar `response.ok` (códigos 404 o 500 también devuelven cuerpo a veces).',
        ],
      },
      {
        subtitle: 'Pinia (estado compartido entre pantallas)',
        paragraphs: [
          'Pinia son «tiendas»: sitios donde guardas datos y acciones que varias pantallas o componentes lejanos necesitan sin pasar props de padre a hijo en cadena (evitas el llamado prop drilling). Úsala cuando el mismo estado deba verse o mutarse desde rutas o ramas distintas del árbol de componentes.',
        ],
      },
    ],
  },
]
