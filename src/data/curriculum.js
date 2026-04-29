/**
 * Currículo del curso «Vue desde cero» (es-ES).
 * Cada entrada coincide con una ruta hija bajo /. Los resúmenes anticipan qué podrás hacer al terminar.
 */
export const lessons = [
  {
    name: 'intro',
    path: 'intro',
    title: '¿Qué es Vue?',
    icon: '🌱',
    summary:
      'Idea general: por qué conviene trocear la interfaz en componentes y cómo Vue se encarga de mantener la vista alineada con tus datos.',
    minutes: 8,
  },
  {
    name: 'sfc',
    path: 'sfc',
    title: 'Archivos .vue',
    icon: '📄',
    summary:
      'Un único fichero junta script, plantilla HTML y estilos: la base de casi todo proyecto Vue con Vite.',
    minutes: 10,
  },
  {
    name: 'reactividad',
    path: 'reactividad',
    title: 'Reactividad',
    icon: '⚡',
    summary:
      'Guardar números o textos en `ref` y que el navegador actualice la pantalla solo, sin tocar el DOM a mano.',
    minutes: 12,
  },
  {
    name: 'plantilla',
    path: 'plantilla',
    title: 'Plantilla y directivas',
    icon: '🎯',
    summary:
      'Mostrar datos en el HTML, condiciones (`v-if`), enlazar atributos (`:`) y reaccionar a eventos (`@`).',
    minutes: 14,
  },
  {
    name: 'eventos',
    path: 'eventos',
    title: 'Eventos',
    icon: '👆',
    summary:
      'Responder a clics, teclas o envío de formulario de forma clara, parecido a addEventListener pero en la plantilla.',
    minutes: 10,
  },
  {
    name: 'listas',
    path: 'listas',
    title: 'Listas',
    icon: '📋',
    summary:
      'Repetir filas o tarjetas con `v-for` y elegir una `:key` que no rompa la lista si cambia el orden.',
    minutes: 12,
  },
  {
    name: 'formularios',
    path: 'formularios',
    title: 'Formularios',
    icon: '✏️',
    summary:
      'Casillas, cuadros de texto y desplegables enlazados con `v-model`: lo que escribes y lo que guarda la variable van a la par.',
    minutes: 12,
  },
  {
    name: 'computed-watch',
    path: 'computed-watch',
    title: 'Computed y watch',
    icon: '🔄',
    summary:
      'Calcular valores derivados con `computed` y ejecutar acciones cuando cambia algo con `watch` (útil antes de APIs).',
    minutes: 14,
  },
  {
    name: 'props-emit',
    path: 'props-emit',
    title: 'Props y emit',
    icon: '🔌',
    summary:
      'Montar piezas que reciben datos del componente padre y le avisan con eventos cuando ocurre algo importante.',
    minutes: 16,
  },
  {
    name: 'slots',
    path: 'slots',
    title: 'Slots',
    icon: '🧩',
    summary:
      'Dejar sitios reservados en un componente para que quien lo use inserte su propio contenido HTML.',
    minutes: 12,
  },
  {
    name: 'router-next',
    path: 'router-y-mas',
    title: 'Router y siguiente paso',
    icon: '🚀',
    summary:
      'Cómo encajan las rutas en esta propia web y qué temas suele tocar quien ya domina lo anterior.',
    minutes: 10,
  },
  {
    name: 'fetch-api',
    path: 'datos-remotos',
    title: 'Datos remotos (fetch)',
    icon: '🌐',
    summary:
      'Pedir JSON a un servidor: estados de carga y error, y mostrar el resultado como en una aplicación real.',
    minutes: 18,
  },
  {
    name: 'pinia',
    path: 'pinia',
    title: 'Estado global (Pinia)',
    icon: '🗂️',
    summary:
      'Compartir datos entre pantallas lejanas sin enredar la familia de componentes con props en cadena.',
    minutes: 16,
  },
  {
    name: 'practica',
    path: 'practica',
    title: 'Ejercicios prácticos',
    icon: '✅',
    summary:
      'Retos guiados con pistas y soluciones de ejemplo; lo ideal es practicarlos en tu editor dentro de este proyecto.',
    minutes: 45,
  },
]
