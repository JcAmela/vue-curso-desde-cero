/**
 * Metadatos ligeros de la guía (sin plantillas del REPL). Mismo orden que el itinerario g01…
 * Cada `intro` anticipa el objetivo y conecta con lo que ya sabes. Contenido pesado: guide-steps-content.js
 */
export const guideStepsMeta = [
  {
    id: 'g01',
    n: 1,
    title: 'Tu primer ref en pantalla',
    theoryId: 'reactividad',
    lessonHook: 'Lección 1 · unos minutos · empieza aquí si es tu primera vez con Vue',
    objectivesHeading: 'Lo que vas a conseguir',
    intro: [
      'Este primer taller es corto y va al grano: vas a enlazar un texto en JavaScript con lo que ves en pantalla. Si ya sabes HTML, el `<template>` te resultará familiar; lo nuevo es cómo Vue conecta ese HTML con el `<script setup>`. No hace falta memorizar a la primera: prueba, guarda (Ctrl+S) y mira el resultado; puedes repetir tantas veces como quieras.',
      '¿Qué es `ref`? Es una función que importas de Vue así: `import { ref } from \'vue\'`. Le pasas un valor inicial —en este paso, una cadena entre comillas simples— y obtienes una caja reactiva: dentro guardas el texto (o más adelante un número, un sí/no, una lista…). Cuando el contenido de esa caja cambia, Vue vuelve a pintar las partes de la página que dependen de ella. Sin eso, en JavaScript clásico tendrías que localizar tú el elemento (por ejemplo el `<h1>`) y asignar `textContent` cada vez que cambie el dato.',
      'En el ejemplo verás algo como `const titulo = ref(\'Hola, mundo Vue\')`. La palabra `titulo` es solo un nombre de variable: podrías llamarla `cabecera` o `mensaje` si mantienes el mismo nombre en la plantilla. Lo que importa es el patrón: crear la caja con `ref(...)` y mostrarla en el HTML con el mismo identificador.',
      'Las dobles llaves `{{ titulo }}` significan «sustituye aquí por el valor que hay dentro de la caja». Vue lo muestra como texto normal. (Si en el futuro el texto viniera de fuera y hubiera riesgo de HTML malicioso, el escape por defecto de Vue te protege; por ahora solo editas tú el string.)',
      'En este paso aún no usamos `.value`. Lo usarás en el paso 2 cuando cambies el ref desde el script (por ejemplo con un botón): ahí el valor «de verdad» va en `.value`. En el `<template>` Vue quita esa capa: `{{ titulo }}`, nunca `{{ titulo.value }}`. Esa costumbre te ahorra errores más adelante.',
      'Sigue el orden de la página: primero los «tips» rápidos, luego el editor, la checklist para autoevaluarte y un reto de una pregunta (como en los cursos que van por rachas: una unidad, un repaso, una comprobación). Si fallas el reto, no pasa nada: lee la explicación y reintenta. Para profundizar con calma, usa el enlace al capítulo de teoría arriba.',
    ].join('\n\n'),
  },
  {
    id: 'g02',
    n: 2,
    title: 'Botón que suma',
    theoryId: 'reactividad',
    intro:
      'Sigues con refs y la regla del `.value` en el script: un botón llamará a una función que incrementa un contador. Es el patrón «pulsar → cambiar dato → la vista se refresca».',
  },
  {
    id: 'g03',
    n: 3,
    title: 'Mostrar u ocultar con v-if',
    theoryId: 'plantilla',
    intro:
      'Un sí o no (booleano en un ref) decide si un bloque de HTML existe en la página. Verás la diferencia entre mostrar algo y que Vue lo quite del DOM cuando no hace falta.',
  },
  {
    id: 'g04',
    n: 4,
    title: 'Lista con v-for',
    theoryId: 'listas-eventos',
    intro:
      'Recorrerás un array de textos y pintarás una fila por elemento. Practicarás `:key`: imprescindible cuando la lista puede crecer, ordenarse o borrarse.',
  },
  {
    id: 'g05',
    n: 5,
    title: 'Input enlazado con v-model',
    theoryId: 'formularios',
    intro:
      'Conectarás un campo de texto a un ref con una sola directiva: lo que escribes y la variable van unidos. Verás el vínculo en tiempo real en la vista previa.',
  },
  {
    id: 'g06',
    n: 6,
    title: 'Computed: precio con IVA',
    theoryId: 'computed-watch',
    intro:
      'Calcularás un total a partir de base e IVA sin escribir fórmulas largas en la plantilla: `computed` se encarga de recalcular solo cuando cambian precio o porcentaje.',
  },
  {
    id: 'g07',
    n: 7,
    title: 'Watch: log cuando cambia el contador',
    theoryId: 'computed-watch',
    intro:
      'Observarás un ref y reaccionarás en código cada vez que cambie (p. ej. actualizar un mensaje de histórico). Es el puente natural hacia llamadas a red más adelante.',
  },
  {
    id: 'g08',
    n: 8,
    title: 'Props y evento al padre (un solo archivo)',
    theoryId: 'composicion',
    intro:
      'En un mismo ejemplo verás hijo y padre: el hijo recibe un valor por props y avisa con un evento cuando quieres sumar. Así se ve claro quién «posee» el estado.',
  },
  {
    id: 'g09',
    n: 9,
    title: 'Slot por defecto (patrón mental)',
    theoryId: 'composicion',
    intro:
      'Una tarjeta con borde fijo y un hueco donde el padre inserta párrafos o botones. Los slots son la forma idiomática de componentes flexibles en Vue.',
  },
  {
    id: 'g10',
    n: 10,
    title: 'fetch a API pública',
    theoryId: 'ecosistema',
    intro:
      'Pedirás datos JSON de prueba a Internet, mostrarás estados de «cargando» y error, y pintarás el resultado cuando llegue. Patrón muy habitual en aplicaciones reales.',
  },
  {
    id: 'g11',
    n: 11,
    title: 'Clases dinámicas con :class',
    theoryId: 'plantilla',
    intro:
      'Alternar estilos según el estado (activo / inactivo) sin duplicar bloques HTML. Es de los trucos más usados en interfaces con hojas de estilo por clases.',
  },
  {
    id: 'g12',
    n: 12,
    title: 'Reto integrador: mini panel',
    theoryId: 'ecosistema',
    intro:
      'Repaso guiado: lista, formulario, computed para el total y mensajes condicionados. Deberás completar la función addItem donde indica el comentario TODO (pistas debajo si te atascas).',
  },
]

export function getGuideStepMetaById(id) {
  return guideStepsMeta.find((s) => s.id === id) ?? null
}
