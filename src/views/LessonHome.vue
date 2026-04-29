<script setup>
import { RouterLink } from 'vue-router'
import { lessons } from '../data/curriculum'
import { glossary } from '../data/glossary'
</script>

<template>
  <div class="lesson-page">
    <header class="home-hero">
      <p class="badge">Curso en el navegador · pensado si ya sabes HTML, CSS y JS básico</p>
      <h1>Aprende Vue paso a paso</h1>
      <p class="lead">
        Si sabes hacer una página con <strong>HTML</strong>, darle estilo con <strong>CSS</strong> y escribir un poco de
        <strong>JavaScript</strong> (variables, funciones, <code class="inline">querySelector</code>,
        <code class="inline">addEventListener</code>), este curso te lleva al siguiente nivel. Cada lección tiene texto
        corto y una zona donde puedes probar cosas.
      </p>
      <p>
        Tu <strong>progreso</strong> (qué lecciones marcas como hechas) se guarda en el navegador, en
        <code class="inline">localStorage</code>: no hace falta cuenta; si borras los datos del sitio, se pierde el
        progreso.
      </p>
      <p>
        Empieza por
        <RouterLink to="/intro">¿Qué es Vue?</RouterLink>
        o elige un tema en las tarjetas de abajo. Si te pierdes con el vocabulario, tienes un
        <a href="#glossary-title">glosario corto</a>. Para practicar con retos y soluciones, abre
        <RouterLink to="/practica">ejercicios prácticos</RouterLink>; también añadimos al curso
        <RouterLink to="/datos-remotos">datos remotos (fetch)</RouterLink> y
        <RouterLink to="/pinia">estado global (Pinia)</RouterLink>.
      </p>
    </header>

    <h2>Lecciones</h2>
    <ul class="lesson-cards">
      <li v-for="l in lessons" :key="l.name">
        <RouterLink class="lesson-card" :to="'/' + l.path">
          <span class="ico" aria-hidden="true">{{ l.icon }}</span>
          <h2>{{ l.title }}</h2>
          <p class="meta">~{{ l.minutes }} min</p>
          <p>{{ l.summary }}</p>
          <span class="cta">Abrir lección →</span>
        </RouterLink>
      </li>
    </ul>

    <section class="glossary-section" aria-labelledby="glossary-title">
      <h2 id="glossary-title">Glosario rápido</h2>
      <p class="glossary-intro">
        Palabras que salen en casi todos los tutoriales. Vuelve aquí cuando leas una lección y no recuerdes el término.
        Algunas entradas enlazan a la lección donde se explica con más calma.
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
