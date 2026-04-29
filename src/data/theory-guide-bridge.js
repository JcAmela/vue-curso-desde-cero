/**
 * Relación entre capítulos de theory-chapters.js y pasos de la guía (`theoryId` en guide-steps-meta).
 */
import { guideStepsMeta } from './guide-steps-meta.js'

/**
 * Pasos de la guía asociados a un capítulo teórico, en el orden del itinerario (g01…).
 * @param {string} chapterId — `id` de un capítulo en theory-chapters.js
 */
export function getGuideStepsForTheoryChapter(chapterId) {
  return guideStepsMeta.filter((s) => s.theoryId === chapterId)
}

/**
 * Primer paso práctico del tema, o `null` si ningún paso declara ese `theoryId`.
 */
export function getFirstGuideStepForTheoryChapter(chapterId) {
  return guideStepsMeta.find((s) => s.theoryId === chapterId) ?? null
}

/**
 * Capítulos teóricos sin pasos con el mismo `theoryId`: enlace manual al mejor siguiente paso.
 */
export const THEORY_CHAPTER_PRACTICE_FALLBACK = {
  fundamentos: {
    blurb:
      'Este capítulo no tiene un paso etiquetado igual: explica la idea del fichero `.vue`. En la guía, todos los talleres usan ese formato. Te recomendamos el paso 1: verás un `ref` cambiando el texto en pantalla y cerrarás la idea con las manos en el código.',
    stepId: 'g01',
    cta: 'Abrir paso 1 (primer ref)',
  },
}
