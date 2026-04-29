/**
 * Glosario rápido (es-ES). Cada entrada enlaza, si aplica, a la lección donde se profundiza.
 */
export const glossary = [
  {
    term: 'Teoría (libro)',
    def: 'Texto ordenado por capítulos: mapa mental de Vue sin obligarte a escribir código en ese momento. Combínala con la guía práctica.',
    path: 'teoria',
  },
  {
    term: 'Guía paso a paso',
    def: 'Doce talleres cortos con consola integrada, checklist y una pregunta de comprobación por paso: aprendizaje activo inmediato.',
    path: 'guia',
  },
  {
    term: 'Componente',
    def: 'Trozo de interfaz con su HTML, estilos y lógica propios. Piensa en una «mini pantalla» que puedes reutilizar donde haga falta.',
    path: 'sfc',
  },
  {
    term: 'Archivo .vue',
    def: 'Fichero que agrupa `<script>`, `<template>` y `<style>`. Herramientas como Vite lo transforman a lo que entiende el navegador.',
    path: 'sfc',
  },
  {
    term: 'Template (plantilla)',
    def: 'La parte HTML del componente, ampliada con llaves `{{ }}` y directivas `v-…` para conectar datos y eventos.',
    path: 'plantilla',
  },
  {
    term: 'ref',
    def: 'Función importada de `vue` que envuelve un valor (texto, número, booleano…) en una caja reactiva. En `<script setup>` lees y escribes el interior con `miRef.value`; en el `<template>` usas solo el nombre (`{{ miRef }}`) porque Vue desenvuelve solo.',
    path: 'reactividad',
  },
  {
    term: 'Reactividad',
    def: 'La vista se mantiene alineada con los datos: no hace falta buscar tú cada etiqueta en el DOM al cambiar una variable.',
    path: 'reactividad',
  },
  {
    term: 'Directiva (v-…)',
    def: 'Atributo especial en el HTML del template: le indica a Vue qué hacer (mostrar, repetir, enlazar, etc.).',
    path: 'plantilla',
  },
  {
    term: 'Evento (@click, …)',
    def: 'Equivalente a addEventListener, pero declarado en la etiqueta y enlazado a una función de tu script.',
    path: 'eventos',
  },
  {
    term: 'v-for',
    def: 'Repite un trozo de HTML por cada elemento de una lista, como un bucle for aplicado a etiquetas.',
    path: 'listas',
  },
  {
    term: 'v-model',
    def: 'Enlace bidireccional típico en formularios: lo que escribes en el control y el valor en memoria van sincronizados.',
    path: 'formularios',
  },
  {
    term: 'computed',
    def: 'Valor que se obtiene de otros datos (ej. total = precio × cantidad). Vue lo recalcula solo cuando cambian sus dependencias.',
    path: 'computed-watch',
  },
  {
    term: 'Props',
    def: 'Datos que el padre envía al hijo «hacia abajo». El hijo no debe cambiarlos por su cuenta: pide al padre que los actualice.',
    path: 'props-emit',
  },
  {
    term: 'emit',
    def: 'Forma en que el hijo avisa al padre («suma uno», «cierra ventana»…). El padre escucha con `@nombreDelEvento`.',
    path: 'props-emit',
  },
  {
    term: 'Slot',
    def: 'Hueco en el template del hijo que el padre rellena con su propio HTML al usar el componente.',
    path: 'slots',
  },
  {
    term: 'Vue Router',
    def: 'Biblioteca que asocia cada URL a un componente sin recargar toda la página: navegación dentro de una SPA.',
    path: 'router-y-mas',
  },
  {
    term: 'fetch',
    def: 'Función del navegador para pedir recursos por HTTP. Suele usarse con async/await y `.json()` para leer respuestas JSON.',
    path: 'datos-remotos',
  },
  {
    term: 'Pinia',
    def: 'Forma oficial en Vue 3 de tener «tiendas» de datos compartidos entre muchos componentes sin pasar props en cadena.',
    path: 'pinia',
  },
  {
    term: 'Tienda (store)',
    def: 'Módulo donde defines estado y acciones globales; en Pinia se declara con defineStore y se usa en componentes con el hook correspondiente.',
    path: 'pinia',
  },
]
