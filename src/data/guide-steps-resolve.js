import { getGuideStepMetaById } from './guide-steps-meta.js'
import { guideStepBodies } from './guide-steps-content.js'

/** Paso completo (meta + REPL + quiz). Solo importar desde vistas que cargan la guía interactiva. */
export function getGuideStepById(id) {
  const m = getGuideStepMetaById(id)
  if (!m) return undefined
  return { ...m, ...guideStepBodies[id] }
}
