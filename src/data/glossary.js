/**
 * Glosario rápido (inicio del curso).
 * `path` opcional: enlace a la lección donde se profundiza.
 */
export const glossary = [
  {
    term: 'Componente',
    def: 'Un bloque de interfaz con su HTML, estilo y lógica. Como una “mini-página” que puedes reutilizar.',
    path: 'sfc',
  },
  {
    term: 'Archivo .vue',
    def: 'Un solo fichero que junta <script>, <template> y <style>. Vite lo convierte en lo que el navegador entiende.',
    path: 'sfc',
  },
  {
    term: 'Template',
    def: 'La parte HTML del componente, con llaves y atributos v- para conectar datos y eventos.',
    path: 'plantilla',
  },
  {
    term: 'ref',
    def: 'Forma de guardar un número, texto o booleano “con aviso”: cuando cambia, Vue actualiza la pantalla.',
    path: 'reactividad',
  },
  {
    term: 'Reactividad',
    def: 'Que la vista se actualice sola cuando cambian los datos, sin buscar tú cada etiqueta en el DOM.',
    path: 'reactividad',
  },
  {
    term: 'Directiva (v-…)',
    def: 'Atributo especial en el HTML del template; le da órdenes a Vue (mostrar, repetir, enlazar…).',
    path: 'plantilla',
  },
  {
    term: 'Evento (@click, …)',
    def: 'Igual que addEventListener, pero declarado en el HTML, apuntando a una función de tu script.',
    path: 'eventos',
  },
  {
    term: 'v-for',
    def: 'Repite un trozo de HTML por cada elemento de una lista (como un for de JavaScript aplicado a etiquetas).',
    path: 'listas',
  },
  {
    term: 'v-model',
    def: 'Enlaza un input o checkbox con una variable en los dos sentidos: escribes y se guarda; cambias el dato y se ve en el input.',
    path: 'formularios',
  },
  {
    term: 'computed',
    def: 'Valor que se calcula a partir de otros (ej. total = precio × cantidad) y Vue lo refresca cuando debe.',
    path: 'computed-watch',
  },
  {
    term: 'Props',
    def: 'Datos que el padre pasa al hijo (de arriba abajo). El hijo los recibe pero no los cambia a su aire.',
    path: 'props-emit',
  },
  {
    term: 'emit',
    def: 'Forma en que el hijo avisa al padre (“haz +1”, “cierra”, etc.). El padre escucha con @nombreEvento.',
    path: 'props-emit',
  },
  {
    term: 'Slot',
    def: 'Hueco en el HTML de un componente hijo que el padre rellena con su propio contenido.',
    path: 'slots',
  },
  {
    term: 'Vue Router',
    def: 'Librería que une cada URL (ej. /listas) con un componente, sin recargar toda la página.',
    path: 'router-y-mas',
  },
  {
    term: 'fetch',
    def: 'Función del navegador para pedir datos por HTTP. Suele ir con async/await y devuelve JSON con .json().',
    path: 'datos-remotos',
  },
  {
    term: 'Pinia',
    def: 'Librería oficial de “tiendas” para compartir estado entre muchos componentes sin pasar props en cadena.',
    path: 'pinia',
  },
  {
    term: 'Tienda (store)',
    def: 'Archivo donde defines datos y acciones globales; en Pinia se crea con defineStore y se usa con useMiTienda().',
    path: 'pinia',
  },
]
