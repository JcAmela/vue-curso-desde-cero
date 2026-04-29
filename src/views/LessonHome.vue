<script setup>
import { RouterLink } from 'vue-router'
import { lessons } from '../data/curriculum'
import { glossary } from '../data/glossary'
</script>

<template>
  <div class="lesson-page">
    <header class="home-hero">
      <p class="badge">Curso en el navegador · base: HTML, CSS y un poco de JavaScript</p>
      <h1>Vue desde cero, con tres caminos de estudio</h1>
      <p class="lead">
        Si sabes montar una página con <strong>HTML</strong>, darle estilo con <strong>CSS</strong> y escribir algo de
        <strong>JavaScript</strong> (variables, funciones, <code class="inline">querySelector</code> y
        <code class="inline">addEventListener</code>), puedes seguir este curso sin problema. El objetivo es que pases de
        «manipular el DOM a mano» a «describir datos y dejar que Vue mantenga la pantalla al día».
      </p>
      <p>
        <strong>Cómo está organizado (aprendizaje por capas):</strong> primero puedes leer la
        <RouterLink to="/teoria">teoría tipo manual</RouterLink>; en paralelo o después, la
        <RouterLink to="/guia">guía con consola</RouterLink> te hace practicar cada idea con feedback inmediato; las
        <strong>lecciones con demos</strong> sirven de referencia por tema cuando necesites una explicación más pausada
        o un ejemplo visual. Marca las lecciones como leídas cuando termines: el progreso se guarda en
        <code class="inline">localStorage</code> en este navegador (si borras datos del sitio, se pierde la marca).
      </p>
    </header>

    <h2 class="home-h2">Por dónde empezar</h2>
    <ul class="home-pillars">
      <li>
        <RouterLink class="pillar-card" to="/teoria">
          <span class="pillar-ico" aria-hidden="true">📖</span>
          <h3>Teoría (libro)</h3>
          <p>
            Capítulos enlazados de lo general a lo concreto. Ideal para una primera lectura o para volver a un concepto
            con el índice.
          </p>
          <span class="pillar-cta">Abrir teoría →</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="pillar-card pillar-accent" to="/guia">
          <span class="pillar-ico" aria-hidden="true">🧰</span>
          <h3>Guía paso a paso</h3>
          <p>
            Doce talleres con código ejecutable en el navegador, checklist para repetir en tu editor y un mini test por
            paso. Es el camino más práctico.
          </p>
          <span class="pillar-cta">Empezar la guía →</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="pillar-card" to="/practica">
          <span class="pillar-ico" aria-hidden="true">✏️</span>
          <h3>Práctica y retos</h3>
          <p>
            Ejercicios con enunciado, pistas y solución de referencia. Combínalos con la guía cuando quieras consolidar.
          </p>
          <span class="pillar-cta">Ir a práctica →</span>
        </RouterLink>
      </li>
    </ul>

    <p class="home-after-pillars">
      ¿Primera vez con el curso? Empieza por
      <RouterLink to="/intro">¿Qué es Vue?</RouterLink>
      y luego elige teoría o guía según prefieras leer antes o tocar código. Más abajo tienes todas las lecciones con
      demos. Si te pierdes con el vocabulario, usa el
      <a href="#glossary-title">glosario</a>;
      <RouterLink to="/datos-remotos">datos remotos (fetch)</RouterLink> y
      <RouterLink to="/pinia">estado global (Pinia)</RouterLink> están también en el menú lateral.
    </p>

    <h2 class="home-h2">Lecciones con demos</h2>
    <ul class="lesson-cards">
      <li v-for="l in lessons" :key="l.name">
        <RouterLink class="lesson-card" :to="'/' + l.path">
          <span class="ico" aria-hidden="true">{{ l.icon }}</span>
          <h2>{{ l.title }}</h2>
          <p class="meta">~{{ l.minutes }} min de lectura orientativa</p>
          <p>{{ l.summary }}</p>
          <span class="cta">Abrir lección →</span>
        </RouterLink>
      </li>
    </ul>

    <section class="glossary-section" aria-labelledby="glossary-title">
      <h2 id="glossary-title">Glosario rápido</h2>
      <p class="glossary-intro">
        Términos que salen en casi todos los tutoriales de Vue. Léelo por encima una vez y vuelve aquí cuando algo no te
        suene; muchas entradas enlazan a la lección donde se explica con más detalle.
      </p>
      <dl class="glossary-list">
        <div v-for="(item, i) in glossary" :key="i" class="glossary-row">
          <dt>{{ item.term }}</dt>
          <dd>
            {{ item.def }}
            <RouterLink v-if="item.path" class="glossary-lesson-link" :to="'/' + item.path">Ver en el curso →</RouterLink>
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
