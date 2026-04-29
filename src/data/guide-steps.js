/**
 * Punto de entrada opcional del módulo de la guía.
 * En la app se prefiere: `guide-steps-meta.js` + `guide-steps-resolve.js` para trocear el bundle.
 */
export { guideStepsMeta, getGuideStepMetaById } from './guide-steps-meta.js'
export { getGuideStepById } from './guide-steps-resolve.js'
