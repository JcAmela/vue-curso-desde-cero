import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Tienda de demostración para la lección Pinia (lista simple de notas).
 */
export const useEjemploNotasStore = defineStore('ejemploNotas', () => {
  const notas = ref(['Revisar lección de Pinia', 'Practicar fetch'])

  function agregar(texto) {
    const t = texto.trim()
    if (t) notas.value = [...notas.value, t]
  }

  function quitarPorTexto(texto) {
    notas.value = notas.value.filter((n) => n !== texto)
  }

  return { notas, agregar, quitarPorTexto }
})
