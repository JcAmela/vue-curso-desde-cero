# Arquitectura técnica — Vue Learn

> Plataforma para aprender Vue.js orientada a desarrolladores con base de JavaScript, donde el aprendizaje ocurre construyendo, no leyendo.

---

## 1. Resumen ejecutivo

Vue Learn es una plataforma web cuyo diferenciador es un **playground de tres niveles** que cubre desde un widget inline para ilustrar un concepto (50 ms hasta interactivo) hasta un proyecto Nuxt completo ejecutándose en el navegador. El currículo vive en Git como Markdown extendido (MDC), lo que permite tratarlo como código: PRs, revisiones, versionado y CI.

La filosofía es radicalmente opuesta a la de un MOOC tradicional: la teoría se reduce al mínimo necesario para llegar al ejercicio, cada concepto se valida con tests automáticos ejecutándose en el cliente, y el progreso se construye sobre logros verificables, no sobre vídeos vistos.

**Stack en una línea:** Nuxt 3 + Nuxt Content + WebContainers + Supabase + Meilisearch + Claude API, desplegado en el edge de Cloudflare.

---

## 2. Principios de diseño

Las decisiones de este documento se derivan de siete principios. Cuando exista conflicto entre opciones, se desempata aplicando este orden:

1. **Aprender haciendo antes que leyendo.** Cada concepto debe poder tocarse en menos de 30 segundos desde que aparece.
2. **Latencia percibida < 100 ms.** Toda interacción del estudiante (pulsar, escribir, ejecutar) debe responder dentro de ese presupuesto. Lo que no se pueda, debe mostrar feedback optimista.
3. **Validación automática.** Si un ejercicio no se puede validar con tests, no es un ejercicio: es un ejemplo.
4. **El currículo es código.** Markdown en Git, revisado por PR, desplegado por CI. Sin CMS propietario.
5. **Edge-first.** Los usuarios europeos (audiencia principal) deben tener TTFB < 50 ms. Esto descarta arquitecturas con un único origen en us-east.
6. **Accesibilidad WCAG 2.2 AA no negociable.** Incluyendo el editor de código, que es históricamente el componente más excluyente.
7. **Open core.** El currículo y el motor del playground son open source. La monetización (si la hay) viene de servicios alrededor: certificaciones, mentoría, IA ilimitada.

---

## 3. Stack técnico

### 3.1. Frontend

| Capa | Elección | Razón |
|------|----------|-------|
| Framework | Nuxt 3 (Vue 3) | Es la herramienta canónica de Vue. Construir una plataforma Vue con React sería incoherente; con Vue solo (sin Nuxt) renunciamos al SSR/SSG que el SEO exige para contenido educativo. |
| Lenguaje | TypeScript estricto | `strict: true`, `noUncheckedIndexedAccess: true`. Sin excepciones. |
| Estado | Pinia | Estándar de facto en Vue 3. Composables para lógica compartida; Pinia solo para estado verdaderamente global (sesión, progreso, preferencias). |
| Composables base | VueUse | Cubre el 80% de utilidades reactivas. No reinventamos `useLocalStorage` ni `useIntersectionObserver`. |
| Estilos | Tailwind CSS v4 | JIT, sin runtime, perfecto para edge. |
| Componentes UI | Reka UI (ex Radix-Vue) | Componentes accesibles sin estilos, montamos nuestro design system encima. |
| Iconos | Lucide via `@nuxt/icon` | Tree-shakeable, consistente. |
| i18n | `@nuxtjs/i18n` v9 | Español e inglés en lanzamiento; arquitectura preparada para más. |

### 3.2. Backend

| Capa | Elección | Razón |
|------|----------|-------|
| API | Nitro (rutas server de Nuxt) | Mismo runtime que el frontend, despliegue unificado, edge-compatible. |
| Auth | Better Auth | Más flexible y type-safe que Auth.js, con soporte nativo para Nuxt. Email + magic links + GitHub/Google OAuth. |
| BD principal | PostgreSQL (Supabase) | Postgres porque necesitamos transacciones reales para el progreso. Supabase porque incluye auth, storage y realtime, acelerando el time-to-market sin lock-in (es Postgres puro debajo). |
| ORM | Drizzle | Type-safe, migrations en código, cero overhead en runtime. Prisma es alternativa pero pesa más en edge. |
| Búsqueda | Meilisearch (auto-hospedado) | Latencia < 50 ms, tipo-tolerante, en español maneja acentos y plurales correctamente. |
| Embeddings | pgvector + `text-embedding-3-small` | Búsqueda semántica ("explícame cómo funciona la reactividad" → encuentra lecciones aunque no usen esas palabras). |
| Cola de trabajos | Trigger.dev v3 | Procesamiento async (envío de emails, generación de certificados, recálculo de rankings). |
| Email transaccional | Resend | DX excelente, plantillas en React Email (renderizadas server-side). |

### 3.3. Infraestructura

| Capa | Elección | Razón |
|------|----------|-------|
| Hosting frontend | Cloudflare Pages | Edge global, despliegues atómicos por commit, gratis hasta volumen significativo. |
| Edge functions | Cloudflare Workers | Para rutas de API que requieren latencia mínima. |
| Almacenamiento de objetos | Cloudflare R2 | Sin coste de egreso, compatible con S3, ideal para assets de lecciones. |
| BD gestionada | Supabase (eu-west) | Región europea por GDPR y latencia. |
| CDN | Cloudflare (incluido) | — |
| Observabilidad de errores | Sentry | Source maps, replays de sesión opt-in. |
| Logs y métricas | Axiom | Pricing predecible, queries SQL-like. |
| Analítica de producto | PostHog (cloud EU) | Heatmaps del editor, A/B tests pedagógicos, funnels de progresión. |
| CI/CD | GitHub Actions | Workflows reutilizables, preview deployments por PR. |

---

## 4. Arquitectura del playground

Esto es el corazón de la plataforma. Lo desarrollo con detalle porque es donde se gana o se pierde la diferenciación.

### 4.1. Por qué tres niveles

Un solo motor de playground no sirve para todo. Un WebContainer arrancando en cada párrafo de tutorial es excesivo: tarda 1-3 segundos en estar listo, consume RAM, y no se puede instanciar 20 veces en una página. Pero un REPL ligero no puede ejecutar `npm install` ni correr Vitest.

La solución es un sistema escalonado donde cada nivel hace lo mínimo necesario:

| Nivel | Motor | Tiempo a interactivo | Multi-archivo | npm install | Tests |
|-------|-------|----------------------|---------------|-------------|-------|
| 1. Inline | `@vue/repl` | ~50 ms | No (1 SFC) | No | No |
| 2. Lección | WebContainers | ~1.5 s | Sí | Pre-cacheado | Sí (Vitest) |
| 3. Proyecto | WebContainers | ~3 s | Sí | Sí, en vivo | Sí + E2E |

### 4.2. Nivel 1 — Playground inline

**Tecnología:** `@vue/repl` (el mismo paquete que potencia [play.vuejs.org](https://play.vuejs.org)).

**Caso de uso:** dentro del flujo de lectura, junto a la explicación de un concepto. Ejemplo: "Aquí tienes un ref reactivo. Cambia el valor inicial y observa el contador":

```html
<!-- En el Markdown del currículo -->
::PlaygroundInline{height=240}
```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <button @click="count++">Cliquéame: {{ count }}</button>
</template>
```
::
```

**Cómo funciona internamente:**
- `@vue/compiler-sfc` compila el SFC a JavaScript en el cliente (vía WebAssembly).
- El resultado se inyecta en un iframe sandbox con `srcdoc`.
- HMR completo: cambiar el código actualiza el iframe sin recargar.
- El iframe sandbox usa `allow-scripts` pero NO `allow-same-origin`, aislando completamente la ejecución.

**Restricciones a documentar bien al estudiante:**
- Solo Vue y librerías declaradas como peer (Pinia, VueUse) están disponibles.
- Sin acceso a red, sin localStorage compartido, sin APIs del DOM padre.

### 4.3. Nivel 2 — Playground de lección

**Tecnología:** WebContainers (StackBlitz) embebidos vía `@webcontainer/api`.

**Caso de uso:** ejercicios sustanciales con varios archivos. El estudiante recibe un proyecto base y debe completar una tarea verificada por tests.

**Estructura de un ejercicio:**

```
exercises/composition-api/02-computed/
├── starter/
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── src/
│   │   ├── App.vue        ← lo que el estudiante edita
│   │   └── main.ts
│   └── tests/
│       └── App.test.ts    ← oculto durante la edición, ejecutado al validar
├── solution/
│   └── App.vue
├── lesson.md              ← teoría + instrucciones (MDC)
└── manifest.yaml          ← metadatos: prerequisitos, XP, tags
```

**Flujo de ejecución:**
1. El estudiante abre la lección. El frontend carga el manifiesto y muestra la teoría inmediatamente.
2. Mientras el estudiante lee, en background se inicia el WebContainer y se montan los archivos del `starter/`. Se ejecuta `npm install` con un caché compartido entre lecciones de la misma track (los `node_modules` de Vue/Vite/Vitest se reutilizan).
3. Al hacer clic en "Empezar a editar", el WebContainer ya está listo. Vite arranca en hot-reload.
4. El estudiante escribe. Cada save dispara HMR.
5. Al hacer clic en "Validar", se ejecuta `vitest run` dentro del WebContainer. Los tests están en el directorio `tests/` que el estudiante no edita (UI lo oculta, pero técnicamente están ahí).
6. Resultado de los tests → API server → registro de intento + actualización de progreso.

**Optimización crítica:** `node_modules` precalentados. Mantenemos un snapshot del filesystem post-install para cada track del currículo, servido como TAR comprimido desde R2. Cargar el snapshot tarda ~300 ms vs. los 8-15 s de un `npm install` real.

### 4.4. Nivel 3 — Playground de proyecto (capstones)

**Tecnología:** WebContainers en modo "proyecto completo".

**Caso de uso:** capstones al final de cada track. El estudiante construye una aplicación completa: blog con Nuxt, dashboard con composables, juego de cartas con animaciones.

**Diferencias respecto al Nivel 2:**
- El estudiante puede instalar dependencias adicionales.
- Persistencia: el estado del WebContainer se serializa al filesystem virtual, se sincroniza con R2, y al reabrir el proyecto se restaura.
- Validación más laxa: en lugar de tests específicos, se ejecuta una suite de "contratos" (¿la app responde en /? ¿hay un componente con cierta estructura? ¿se usa Composition API?).
- Opción de "exportar a StackBlitz" o "abrir en GitHub Codespaces" para que el estudiante continúe fuera de la plataforma.

### 4.5. Editor de código

**Tecnología:** Monaco Editor (el de VS Code) con `volar.vue.language-tools` para soporte nativo de SFC.

**Configuración pedagógica clave:**
- Autocompletado y type-checking encendidos por defecto, pero con una "vista limpia" opcional para principiantes que se abruman con squiggles.
- "Hint mode": al pasar 30 s sin escribir tras un error, aparece un botón "Pista" que llama al tutor IA con el código actual y el contexto del ejercicio.
- Atajos de teclado de VS Code por defecto, con perfiles alternativos (Vim, Emacs).
- **Accesibilidad:** Monaco tiene buena base, pero la activamos explícitamente con `accessibilitySupport: 'on'` y testamos con screen readers.

### 4.6. Validación de ejercicios

Vitest dentro del WebContainer es la base, pero añadimos dos capas pedagógicas encima:

**Capa 1: Aserciones amistosas.** Una librería propia que envuelve `expect` con mensajes orientados a aprendizaje:

```ts
// En vez del críptico "Expected true to be false"
expectComponent(wrapper).toUseComputed('total')
// Mensaje: "Esperaba que el componente usara una propiedad computada llamada
//           'total'. Encontré una función normal. ¿Quizás te falta envolverla
//           con computed()? → ver lección 'Computeds vs métodos'"
```

**Capa 2: Análisis AST.** Para chequeos estructurales que Vitest no puede ver (porque no se ejecutan):

```ts
// "¿Has usado la Composition API en este ejercicio?"
import { parse } from '@vue/compiler-sfc'
const sfc = parse(studentCode)
const usesSetup = sfc.descriptor.scriptSetup !== null
```

Ambas capas comparten un contrato común: cada falla devuelve `{ passed: false, hint: string, docsLink: string }`. El frontend renderiza esto como una tarjeta de feedback, no como un stack trace.

---

## 5. Modelo de contenido

### 5.1. Currículo en Git

El repositorio del currículo es **independiente** del de la aplicación. Razones:

- Permite que profesores/colaboradores contribuyan sin tocar código.
- CI específico: linting de prosa (Vale), tests de ejercicios, validación de manifiestos.
- Despliegue independiente: una corrección de typo no requiere redesplegar la app.

Estructura:

```
vue-learn-curriculum/
├── tracks/
│   ├── 01-fundamentals/
│   │   ├── track.yaml             ← metadatos de la track
│   │   ├── 01-reactivity/
│   │   │   ├── lesson.md
│   │   │   ├── exercises/
│   │   │   └── quiz.yaml
│   │   └── ...
│   ├── 02-composition-api/
│   ├── 03-components/
│   ├── 04-state-management/
│   ├── 05-routing/
│   ├── 06-nuxt/
│   ├── 07-testing/
│   └── 08-performance/
├── i18n/                          ← traducciones
│   └── en/                        ← misma estructura, contenido traducido
├── shared/                        ← snippets reutilizables, glosario
└── .github/workflows/             ← CI propio
```

### 5.2. MDC: Markdown extendido con componentes

El estudiante ve markdown enriquecido con componentes interactivos definidos en línea. Ejemplos:

```markdown
::Concept{title="Reactividad" level="core"}
Vue rastrea cuándo cambias datos para actualizar el DOM automáticamente.
::

::PlaygroundInline
```vue
<script setup>...</script>
```
::

::Quiz
- pregunta: ¿Qué devuelve ref(0)?
  opciones:
    - Un número
    - Un objeto reactivo con .value
    - Una función
  correcta: 1
  explicacion: ref envuelve el valor en un objeto reactivo...
::

::Challenge{level="opcional" xp=50}
Implementa un contador que se reinicie a las 10 vueltas.
::
```

Estos componentes (`Concept`, `PlaygroundInline`, `Quiz`, `Challenge`, `Diagram`, `Compare`, `Pitfall`, `Reveal`) están definidos en la app como componentes Vue. Nuxt Content los renderiza nativamente.

### 5.3. Pipeline de contenido

```
PR en vue-learn-curriculum
    │
    ├─► Linter de prosa (Vale, reglas propias en español)
    ├─► Validación de manifiestos (schema YAML)
    ├─► Tests de ejercicios (las soluciones deben pasar sus propios tests)
    ├─► Build de preview (sub-dominio temporal)
    │
    ▼
  Merge a main
    │
    ├─► Indexación a Meilisearch
    ├─► Generación de embeddings (pgvector)
    ├─► Invalidación de caché en Cloudflare
    │
    ▼
  Producción
```

---

## 6. Sistema de progreso y persistencia

### 6.1. Modelo de datos (resumen)

```sql
-- Usuarios y autenticación (gestionado por Better Auth)
users (id, email, display_name, avatar_url, locale, timezone, created_at)
sessions (id, user_id, token, expires_at)
oauth_accounts (id, user_id, provider, provider_account_id)

-- Estructura del currículo (sincronizada desde Git al hacer build)
tracks (id, slug, title, description, order, total_xp)
lessons (id, track_id, slug, title, order, estimated_minutes, xp)
exercises (id, lesson_id, slug, kind, xp, validation_spec)

-- Progreso del estudiante
lesson_attempts (id, user_id, lesson_id, started_at, completed_at)
exercise_attempts (
  id, user_id, exercise_id, code_submission,
  test_results JSONB, passed BOOL, attempted_at, time_spent_seconds
)
user_xp (user_id, total_xp, current_level, xp_to_next_level)
streaks (user_id, current_streak, longest_streak, last_activity_date)
achievements (id, user_id, badge_id, earned_at)

-- Social y notas
lesson_notes (id, user_id, lesson_id, content, created_at, updated_at)
discussions (id, lesson_id, user_id, parent_id, content, created_at)
```

Decisiones notables:
- `code_submission` se guarda completo (gzipeado) para revisión posterior, generación de portfolio y entrenamiento de un futuro tutor IA personalizado. Tamaño máximo: 100 KB por intento, ~30 días de retención salvo opt-in del usuario.
- `validation_spec` permite que el motor de validación cambie sin migrar BD.

### 6.2. Gamificación

La gamificación es una herramienta, no un objetivo. La regla: cada mecánica debe correlacionar con aprendizaje real, no con tiempo en pantalla.

| Mecánica | Disparador | Por qué funciona |
|----------|-----------|------------------|
| XP | Completar ejercicio | Granular, observable. |
| Niveles | Acumular XP | Progresión visible a largo plazo. |
| Logros | Hitos cualitativos ("primer Composition API", "track completada") | Reconocen profundidad, no solo cantidad. |
| Rachas | Días consecutivos con actividad | Hábito. **Con perdón**: una racha rota por motivos legítimos no debe penalizar. Sistema de "freeze tokens" inspirado en Duolingo. |
| Leaderboards | Opcional, opt-in, semanal | La mayoría no lo quiere; los que sí, lo disfrutan. |

Lo que **no** hacemos:
- Notificaciones push agresivas para reactivar.
- "Diamantes" o moneda virtual artificial.
- Bloqueo de contenido por XP (todo el currículo es accesible siempre).

---

## 7. Tutor IA con Claude

### 7.1. Casos de uso

1. **Pista contextualizada.** El estudiante lleva 2 minutos atascado. Botón "Pista" → contexto (lección + código actual + intentos previos) → Claude genera una pista que apunta sin resolver.
2. **Explicación bajo demanda.** "Explícame este error", "¿Por qué se llama así?", botón en cualquier término del glosario.
3. **Revisión de código del proyecto capstone.** "Revisa mi solución y dime qué mejorarías" → review estructurado por categorías (legibilidad, idiomático, performance).
4. **Q&A general sobre Vue.** Como un compañero senior siempre disponible.

### 7.2. Arquitectura del tutor

```
Cliente (chat UI)
    │
    ▼
API server (Nitro)
    │
    ├─► Rate limiter (Redis: por usuario, por minuto y por día)
    ├─► Construcción del contexto:
    │     ├─ System prompt versionado por caso de uso
    │     ├─ Lección actual (resumida si > 4k tokens)
    │     ├─ Código del estudiante
    │     └─ Intentos previos (top 3)
    │
    ▼
Anthropic API (Claude)
    │
    ├─► Streaming de respuesta al cliente
    └─► Logging (Axiom) con redacción de PII
```

### 7.3. Decisiones críticas

- **Versión del modelo:** Claude Sonnet por defecto (balance calidad/coste); Claude Opus para revisiones de código de capstones.
- **Sistema de prompts versionado:** los prompts viven en `/prompts/*.md` en el repo, con tests de regresión usando snapshots de respuestas. Cambiar un prompt requiere PR con justificación.
- **Sandboxing pedagógico:** el system prompt restringe a Claude a hablar de Vue/JavaScript. Si el estudiante pregunta por la receta de la paella, redirige amablemente.
- **Salvaguardas anti-alucinación:** cuando Claude cita una API o método, validamos a posteriori contra una lista de APIs reales de Vue (extraída del package). Si no coincide, marcamos la respuesta y la registramos para revisión.
- **Privacidad:** opción explícita para que el estudiante excluya su código de logs.

---

## 8. Búsqueda y descubrimiento

### 8.1. Búsqueda léxica (Meilisearch)

Indexa: títulos de lección, contenido completo del markdown, tags, ejemplos de código.

Configuración relevante para español:
- Synonyms: `["computed", "computada", "propiedad computada"]`, `["composable", "composables", "composición"]`, etc.
- Stop words mínimos (Meilisearch ya los maneja para `es`).
- Filtros: track, nivel, duración, "tiene ejercicio práctico".

### 8.2. Búsqueda semántica (pgvector)

Para queries que no comparten léxico con el contenido:

> "no entiendo cómo Vue sabe qué cambia" → encuentra lección "Sistema de reactividad"

Pipeline:
1. Al indexar una lección, troceamos en chunks de ~500 tokens, generamos embeddings con `text-embedding-3-small`, guardamos en `pgvector`.
2. La query del usuario se embebe igual.
3. `cosine_similarity` con threshold para evitar resultados ruidosos.
4. Ranking final: 70% semántico + 30% léxico (Meilisearch), con boost por popularidad de la lección.

---

## 9. Internacionalización y accesibilidad

### 9.1. i18n

- Lanzamiento con español (canónico) e inglés.
- El currículo se traduce manualmente; nunca máquina-traducido sin revisión humana, porque los matices técnicos importan.
- Las URLs son `/es/...` y `/en/...`. Selector de idioma persistente por usuario.
- `hreflang` correcto para SEO multi-idioma.

### 9.2. Accesibilidad

Compromiso WCAG 2.2 AA en todo, con énfasis en:

| Componente | Riesgo | Solución |
|-----------|--------|----------|
| Editor Monaco | Históricamente malo con screen readers | Activar `accessibilitySupport: 'on'`, testar con NVDA/VoiceOver, modo "screen reader friendly" alternativo con textarea + sintáxis simplificada. |
| Iframe del playground | El foco se "pierde" | Indicadores visuales claros, atajo para alternar foco editor↔preview. |
| Diagramas y animaciones | Inaccesibles a no-videntes | Alt-text descriptivo en cada diagrama, `prefers-reduced-motion` respetado en animaciones. |
| Color | Daltonismo | Todo el código de colores duplicado con forma/icono. Probado con simuladores. |
| Contraste | — | Ratio mínimo 4.5:1 en texto, 3:1 en componentes. Auditado con axe. |

---

## 10. Performance

### 10.1. Presupuestos (Lighthouse en móvil 4G)

| Métrica | Presupuesto |
|---------|-------------|
| LCP | < 1.8 s |
| INP | < 150 ms |
| CLS | < 0.05 |
| Total JS inicial | < 150 KB gzip |
| Total JS por lección | < 250 KB gzip (excluyendo WebContainer) |

### 10.2. Estrategias

- **SSG por defecto** para todas las lecciones. La capa dinámica (progreso, comentarios) se hidrata client-side.
- **Code splitting agresivo:** WebContainer y Monaco solo se cargan cuando el usuario va a editar, nunca antes.
- **Imágenes:** Nuxt Image con AVIF + WebP fallback, lazy por defecto.
- **CSS crítico inlineado**, resto deferido.
- **Preconnect** a R2 y Anthropic API en lecciones que los usan.
- **Service Worker** con Workbox para offline en lecciones ya visitadas (la teoría, no el playground).

---

## 11. Seguridad y cumplimiento

### 11.1. GDPR (relevante para España/UE)

- Datos en región europea (Supabase eu-west, Cloudflare con localización europea).
- Consentimiento explícito y granular (analítica, comunicaciones, IA).
- Exportación de datos a un clic (formato JSON + ZIP de submisiones).
- Borrado completo a un clic (soft delete + purga real a 30 días).
- Política de retención por tipo de dato, documentada y auditada.

### 11.2. Seguridad de la app

- **CSP estricto** con nonces. El iframe del playground tiene su propio CSP (`sandbox` flags).
- **Rate limiting** por endpoint en Cloudflare (IP) + en aplicación (user_id).
- **Aislamiento del código del estudiante:** WebContainers ejecuta en un worker aislado, sin acceso al DOM padre, sin cookies, sin localStorage del origen principal.
- **Secret management:** env vars en Cloudflare/Vercel, nunca en el repo. Rotación trimestral de API keys.
- **Cabeceras de seguridad:** HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy.

---

## 12. Observabilidad

### 12.1. Errores (Sentry)

- Frontend: source maps subidos en CI, replay de sesión opt-in.
- Backend: errores de API server, con contexto de usuario hasheado.
- Alertas: errores nuevos > 10 ocurrencias en 5 min → notificación.

### 12.2. Logs (Axiom)

- Logs estructurados (JSON) desde Nitro.
- Retención: 30 días caliente, 1 año comprimido.
- Queries SQL-like para análisis (ej: tasas de éxito por ejercicio).

### 12.3. Métricas de producto (PostHog)

- Funnels: registro → primera lección → primer ejercicio → primera track completa.
- Heatmaps del editor: ¿dónde miran los estudiantes cuando se atascan?
- A/B tests: dos variantes de explicación de un concepto, medida = tasa de éxito en el ejercicio siguiente.
- Cohortes: estudiantes que abandonan en lección X → entrevista para entender por qué.

### 12.4. Métricas de aprendizaje (custom)

Más allá de la analítica de producto, registramos:
- Tasa de éxito por ejercicio.
- Tiempo medio para resolver.
- Top 5 errores típicos por ejercicio (extraídos de submisiones fallidas).

Esto alimenta un dashboard interno donde un autor de currículo ve "este ejercicio tiene una tasa del 35%, los estudiantes intentan X y Y; revisemos la lección que lo precede".

---

## 13. CI/CD

### 13.1. Pipelines

**App principal (vue-learn-app):**
```
push → install → typecheck → test (vitest) → build → preview deploy → e2e (playwright) → merge → prod deploy
```

**Currículo (vue-learn-curriculum):**
```
push → lint prosa (Vale) → validar YAML → tests de ejercicios → preview → merge → indexar Meilisearch + embeddings + invalidar caché
```

### 13.2. Calidad

- **Tests unitarios:** Vitest, cobertura > 80% en lógica crítica (validación, progreso, auth).
- **Tests E2E:** Playwright, suite reducida en cada PR (smoke), suite completa en main.
- **Visual regression:** Chromatic en componentes del design system.
- **Tests de carga:** k6 en pre-producción antes de cada release mayor.

---

## 14. Roadmap de implementación

Fases pensadas para que en cada una haya un producto utilizable, no un slice horizontal sin valor.

### Fase 1 — MVP cerrado (8-10 semanas)

Objetivo: validar la experiencia de aprendizaje con 50-100 beta testers.

- Nuxt 3 con auth y un track ("Composition API fundamentals", ~12 lecciones).
- Playground Nivel 1 (`@vue/repl`) funcional.
- Validación básica con Vitest.
- Progreso persistido en Supabase.
- Sin IA, sin búsqueda, sin gamificación, sin i18n.
- Despliegue en Cloudflare Pages.

### Fase 2 — Lanzamiento público (8-12 semanas más)

Objetivo: salir al público con valor diferencial claro.

- 3 tracks completas.
- Playground Nivel 2 (WebContainers) integrado.
- Búsqueda léxica (Meilisearch).
- i18n español + inglés.
- Gamificación básica (XP, niveles, logros).
- Tutor IA en modo "pista" (no chat libre).
- Observabilidad completa.

### Fase 3 — Profundidad (3-4 meses más)

- Playground Nivel 3 + capstones.
- Búsqueda semántica.
- Tutor IA en modo conversacional.
- Comunidad: comentarios, notas, discusión por lección.
- Tracks 4-6.

### Fase 4 — Escala y monetización (continuo)

- Certificaciones verificables.
- Programa de mentoría.
- Tracks especializadas (testing, performance, animaciones, Nuxt avanzado).
- App móvil (Nuxt PWA + capacidad nativa con Capacitor para offline real).
- Marketplace de tracks creadas por la comunidad.

---

## 15. Decisiones pendientes

Estas no se cierran en este documento, requieren validación con datos o stakeholders:

1. **Pricing de IA.** El coste de Claude por estudiante activo. Necesario hacer un piloto con telemetría real antes de definir si la IA es free, freemium con cap, o pago.
2. **Modelo de monetización.** Open core vs. freemium vs. fully free + sponsoring. Decisión post-Fase 2 con datos de retención.
3. **Self-hosting de WebContainers.** Stackblitz cobra por uso a escala; evaluar a partir de cierto volumen si compensa montar infra propia.
4. **Estrategia de comunidad.** ¿Discord/Discourse externo, o foros nativos en la plataforma? Trade-off: nativo retiene a usuarios, externo tiene mejor moderación y descubrimiento.

---

## 16. Anti-patrones que evitamos

Lo que NO vamos a hacer, escrito explícitamente para no caer por inercia:

- **Vídeos de 20 minutos como núcleo del aprendizaje.** Si necesitamos vídeo, será corto (< 3 min) y siempre acompañado de un ejercicio.
- **CMS visual propietario.** Hace inconveniente el versionado y dificulta contribuciones externas.
- **Frameworks que no sean Vue para la app principal.** La plataforma es un manifiesto: si Vue no es lo bastante bueno para construir Vue Learn, no es lo bastante bueno para enseñarlo.
- **Notificaciones push manipuladoras.** "¡Tu racha está en peligro!" 30 min antes de las 23:59 es dark pattern. No.
- **Bloqueo de contenido por pago en lecciones core.** El currículo principal es siempre gratis.
- **Tracking de comportamiento sin consentimiento granular.**

---

## 17. Apéndice — Referencias clave

- [Vue.js docs](https://vuejs.org)
- [Nuxt 3 docs](https://nuxt.com)
- [WebContainers API](https://webcontainers.io)
- [@vue/repl en GitHub](https://github.com/vuejs/repl) (motor del playground oficial de Vue)
- [Better Auth](https://better-auth.com)
- [Supabase](https://supabase.com)
- [Meilisearch](https://meilisearch.com)
- [Anthropic Claude API](https://docs.claude.com)

---

*Documento vivo. Versión 1.0 · 29 de abril de 2026*
