/**
 * Metadatos ligeros de la guía (sin plantillas del REPL). Mismo orden que el itinerario g01…
 * Cada `intro` anticipa el objetivo y conecta con lo que ya sabes. Contenido pesado: guide-steps-content.js
 */
export const guideStepsMeta = [
  {
    id: 'g01',
    n: 1,
    title: 'Primer ref en pantalla',
    theoryId: 'reactividad',
    intro:
      'Objetivo: comprobar que al cambiar un dato en JavaScript el título en pantalla se actualiza solo. Trabajarás con un ref y un `<h1>`; en la consola de la derecha puedes editar y ver la vista previa al momento.',
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
