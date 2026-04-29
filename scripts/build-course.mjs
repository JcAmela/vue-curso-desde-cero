/**
 * Fusiona course/index.json + course/steps/*.json + ejercicios legacy (exercises.js)
 * y genera src/data/generated/course-steps.js
 *
 * Ejecutar: node scripts/build-course.mjs
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src/data/generated')
const outFile = join(outDir, 'course-steps.js')
const indexPath = join(root, 'course/index.json')
const stepsDir = join(root, 'course/steps')

const exercisesMod = await import(pathToFileURL(join(root, 'src/data/exercises.js')).href)
const curriculumMod = await import(pathToFileURL(join(root, 'src/data/curriculum.js')).href)

const { exercises } = exercisesMod
const { lessons } = curriculumMod
const exerciseById = Object.fromEntries(exercises.map((e) => [e.id, e]))

const validUnitIds = new Set(lessons.map((l) => l.path))

const STEP_TYPES = new Set(['micro_read', 'mcq', 'practice'])

const raw = readFileSync(indexPath, 'utf8')
const index = JSON.parse(raw)

if (!index || !Array.isArray(index.steps)) {
  console.error('[build-course] course/index.json debe tener { "steps": [...] }')
  process.exit(1)
}

const errors = []
const seenIds = new Set()
const merged = []

function readStepJson(id) {
  const p = join(stepsDir, `${id}.json`)
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch (e) {
    errors.push(`Paso "${id}": no se puede leer ${p} (${e.message})`)
    return null
  }
}

function validateMcq(quiz, ctx) {
  if (!quiz || typeof quiz !== 'object') {
    errors.push(`${ctx}: quiz inválido`)
    return
  }
  if (!quiz.question || typeof quiz.question !== 'string') {
    errors.push(`${ctx}: falta quiz.question`)
  }
  if (!Array.isArray(quiz.options)) {
    errors.push(`${ctx}: quiz.options debe ser array`)
    return
  }
  const correct = quiz.options.filter((o) => o && o.correct)
  if (correct.length !== 1) {
    errors.push(`${ctx}: debe haber exactamente una opción correcta (tiene ${correct.length})`)
  }
  for (let i = 0; i < quiz.options.length; i++) {
    const o = quiz.options[i]
    if (!o || typeof o.text !== 'string') {
      errors.push(`${ctx}: opción #${i} inválida (falta text)`)
    }
  }
  if (!quiz.explain || typeof quiz.explain !== 'string') {
    errors.push(`${ctx}: falta quiz.explain`)
  }
}

for (const row of index.steps) {
  if (!row || typeof row.id !== 'string' || !row.id.trim()) {
    errors.push('Entrada sin id válido')
    continue
  }
  if (seenIds.has(row.id)) {
    errors.push(`Id duplicado en índice: "${row.id}"`)
  }
  seenIds.add(row.id)

  if (!STEP_TYPES.has(row.type)) {
    errors.push(`Paso ${row.id}: type "${row.type}" no reconocido (use micro_read, mcq, practice)`)
  }
  if (typeof row.order !== 'number' || !Number.isFinite(row.order)) {
    errors.push(`Paso ${row.id}: order debe ser número`)
  }
  if (typeof row.unitId !== 'string' || !validUnitIds.has(row.unitId)) {
    errors.push(
      `Paso ${row.id}: unitId "${row.unitId}" no está en curriculum.js (paths de lección)`
    )
  }
  if (row.prereqIds !== undefined && !Array.isArray(row.prereqIds)) {
    errors.push(`Paso ${row.id}: prereqIds debe ser array`)
  }
  if (row.xp !== undefined && (typeof row.xp !== 'number' || row.xp < 0)) {
    errors.push(`Paso ${row.id}: xp debe ser número >= 0`)
  }

  const base = {
    id: row.id,
    type: row.type,
    unitId: row.unitId,
    order: row.order,
    prereqIds: Array.isArray(row.prereqIds) ? row.prereqIds : [],
    xp: typeof row.xp === 'number' ? row.xp : 0,
  }

  if (row.type === 'practice') {
    if (row.source !== 'exercise') {
      errors.push(`Paso ${row.id}: practice requiere "source": "exercise" hasta integrar payloads locales`)
      continue
    }
    const ex = exerciseById[row.id]
    if (!ex) {
      errors.push(`Paso ${row.id}: no existe en exercises.js`)
      continue
    }
    merged.push({ ...base, ...structuredClone(ex) })
    continue
  }

  const fragment = readStepJson(row.id)
  if (!fragment) continue

  if (row.type === 'micro_read') {
    if (typeof fragment.title !== 'string' || !fragment.title.trim()) {
      errors.push(`micro_read ${row.id}: falta title`)
    }
    if (!Array.isArray(fragment.paragraphs) || fragment.paragraphs.length < 1) {
      errors.push(`micro_read ${row.id}: paragraphs debe ser array no vacío`)
    } else {
      for (let i = 0; i < fragment.paragraphs.length; i++) {
        if (typeof fragment.paragraphs[i] !== 'string') {
          errors.push(`micro_read ${row.id}: paragraphs[${i}] no es string`)
        }
      }
    }
    if (fragment.asideLink !== undefined) {
      const a = fragment.asideLink
      if (!a || typeof a.path !== 'string' || typeof a.label !== 'string') {
        errors.push(`micro_read ${row.id}: asideLink debe tener path y label string`)
      }
    }
    merged.push({
      ...base,
      title: fragment.title,
      paragraphs: fragment.paragraphs,
      asideLink: fragment.asideLink,
    })
  }

  if (row.type === 'mcq') {
    validateMcq(fragment.quiz, `mcq ${row.id}`)
    merged.push({
      ...base,
      quiz: fragment.quiz,
    })
  }
}

const idSet = new Set(index.steps.map((s) => s.id))
for (const row of index.steps) {
  const prereqs = row.prereqIds || []
  for (const p of prereqs) {
    if (!idSet.has(p)) {
      errors.push(`Paso ${row.id}: prereqIds referencia id inexistente "${p}"`)
    }
  }
}

if (errors.length) {
  console.error('\n[build-course] Errores:\n')
  for (const e of errors) console.error(' ·', e)
  console.error('')
  process.exit(1)
}

merged.sort((a, b) => a.order - b.order)

mkdirSync(outDir, { recursive: true })

const banner = `/* Archivo generado por scripts/build-course.mjs — no editar a mano */\n`

writeFileSync(
  outFile,
  `${banner}export const courseSteps = ${JSON.stringify(merged, null, 2)}\n`,
  'utf8'
)

console.log(`[build-course] OK — ${merged.length} pasos → ${outFile}`)
