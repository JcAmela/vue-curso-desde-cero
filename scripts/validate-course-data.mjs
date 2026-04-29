/**
 * Comprueba coherencia entre teoría, guía (meta + cuerpo), glosario y currículo.
 * Ejecutar: node scripts/validate-course-data.mjs
 */
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const theoryMod = await import(pathToFileURL(join(root, 'src/data/theory-chapters.js')).href)
const metaMod = await import(pathToFileURL(join(root, 'src/data/guide-steps-meta.js')).href)
const bodyMod = await import(pathToFileURL(join(root, 'src/data/guide-steps-content.js')).href)
const bridgeMod = await import(pathToFileURL(join(root, 'src/data/theory-guide-bridge.js')).href)
const glossaryMod = await import(pathToFileURL(join(root, 'src/data/glossary.js')).href)
const curriculumMod = await import(pathToFileURL(join(root, 'src/data/curriculum.js')).href)
const courseIndexMod = await import(pathToFileURL(join(root, 'src/data/course-index.js')).href)

const { theoryChapters } = theoryMod
const { guideStepsMeta } = metaMod
const { guideStepBodies } = bodyMod
const { THEORY_CHAPTER_PRACTICE_FALLBACK } = bridgeMod
const { glossary } = glossaryMod
const { lessons } = curriculumMod
const { courseSteps } = courseIndexMod

const errors = []

const chapterIds = new Set(theoryChapters.map((c) => c.id))
const metaIds = guideStepsMeta.map((s) => s.id)
const metaIdSet = new Set(metaIds)
const bodyKeys = Object.keys(guideStepBodies)

/** Rutas relativas válidas para RouterLink `to="/' + path"` bajo LearningLayout */
const validLessonPaths = new Set([
  'teoria',
  'guia',
  ...lessons.map((l) => l.path),
])

for (const s of guideStepsMeta) {
  if (!chapterIds.has(s.theoryId)) {
    errors.push(`Paso ${s.id}: theoryId "${s.theoryId}" no existe en theory-chapters.js`)
  }
}

for (const id of metaIdSet) {
  if (!Object.prototype.hasOwnProperty.call(guideStepBodies, id)) {
    errors.push(`guide-steps-meta incluye "${id}" pero guide-steps-content no tiene cuerpo`)
  }
}
for (const id of bodyKeys) {
  if (!metaIdSet.has(id)) {
    errors.push(`guide-steps-content tiene "${id}" pero no está en guide-steps-meta`)
  }
}

guideStepsMeta.forEach((s, i) => {
  if (s.n !== i + 1) {
    errors.push(`Paso ${s.id}: n=${s.n} debería ser ${i + 1} (orden del array)`)
  }
})

for (const id of metaIds) {
  const b = guideStepBodies[id]
  if (!b) continue
  for (const key of ['objectives', 'checklist', 'files', 'quiz', 'hints']) {
    if (b[key] === undefined) {
      errors.push(`Cuerpo ${id}: falta "${key}"`)
    }
  }
  if (b.files && typeof b.files === 'object' && Object.keys(b.files).length === 0) {
    errors.push(`Cuerpo ${id}: "files" vacío`)
  }
  if (b.quiz) {
    if (!b.quiz.question || !Array.isArray(b.quiz.options)) {
      errors.push(`Cuerpo ${id}: quiz inválido (question u options)`)
    } else {
      const correct = b.quiz.options.filter((o) => o.correct)
      if (correct.length !== 1) {
        errors.push(`Cuerpo ${id}: quiz debe tener exactamente una opción correcta (tiene ${correct.length})`)
      }
    }
  }
}

for (const [chId, fb] of Object.entries(THEORY_CHAPTER_PRACTICE_FALLBACK)) {
  if (!chapterIds.has(chId)) {
    errors.push(`THEORY_CHAPTER_PRACTICE_FALLBACK: clave "${chId}" no es id de capítulo teórico`)
  }
  if (!metaIdSet.has(fb.stepId)) {
    errors.push(`Fallback "${chId}": stepId "${fb.stepId}" no existe en la guía`)
  }
}

for (let i = 0; i < glossary.length; i++) {
  const g = glossary[i]
  if (g.path != null && !validLessonPaths.has(g.path)) {
    errors.push(`Glosario #${i} "${g.term}": path "${g.path}" no está en rutas del curso (teoria/guía/lecciones)`)
  }
}

const lessonPathSet = new Set(lessons.map((l) => l.path))
const courseIdSet = new Set()
if (!Array.isArray(courseSteps)) {
  errors.push('course-index: courseSteps no es un array')
} else {
  for (let i = 0; i < courseSteps.length; i++) {
    const cs = courseSteps[i]
    if (!cs || typeof cs.id !== 'string' || !cs.id.trim()) {
      errors.push(`Camino guiado [${i}]: falta id`)
      continue
    }
    if (courseIdSet.has(cs.id)) {
      errors.push(`Camino guiado: id duplicado "${cs.id}"`)
    }
    courseIdSet.add(cs.id)
    if (!['micro_read', 'mcq', 'practice'].includes(cs.type)) {
      errors.push(`Camino guiado ${cs.id}: type desconocido`)
    }
    if (typeof cs.order !== 'number' || !Number.isFinite(cs.order)) {
      errors.push(`Camino guiado ${cs.id}: order debe ser número`)
    }
    if (typeof cs.unitId !== 'string' || !lessonPathSet.has(cs.unitId)) {
      errors.push(`Camino guiado ${cs.id}: unitId no está en curriculum.js`)
    }
    if (cs.type === 'practice') {
      if (typeof cs.lessonPath !== 'string' || !lessonPathSet.has(cs.lessonPath)) {
        errors.push(`Camino guiado ${cs.id}: lessonPath no está en curriculum.js`)
      }
    }
  }
}

if (errors.length) {
  console.error('\n[validate-course-data] Errores:\n')
  for (const e of errors) console.error(' ·', e)
  console.error('')
  process.exit(1)
}

console.log('[validate-course-data] OK — teoría, guía, glosario, currículo y camino guiado coherentes.')
