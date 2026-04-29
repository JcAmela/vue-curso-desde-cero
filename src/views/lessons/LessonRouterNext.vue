<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <article class="lesson-page">
    <h1>Cambiar de pantalla sin recargar (y cómo sigue el curso)</h1>
    <p class="lead">
      En una web clásica cada enlace carga un HTML nuevo del servidor. En esta aplicación, cuando cambias de lección en
      el menú, el navegador <strong>no recarga todo</strong>: solo Vue sustituye el contenido central. Eso lo hace la
      librería <strong>Vue Router</strong>: asocia cada ruta (por ejemplo <code class="inline">/listas</code>) con un
      componente.
    </p>

    <h2>Cómo está montado este proyecto (mapa mental)</h2>
    <p>
      No tienes que aprenderte los nombres de memoria; sirven para saber dónde mirar cuando quieras cambiar el curso o
      añadir una lección.
    </p>
    <pre class="code-block">src/
  main.js              → crea la app; registra Pinia y el router
  App.vue              → envoltorio mínimo
  router/index.js      → lista de rutas: "/intro" → pantalla X
  stores/              → tiendas Pinia de ejemplo (estado global)
  data/curriculum.js   → títulos y textos del menú lateral
  data/exercises.js    → enunciados de la página de práctica
  composables/         → código reutilizable (progreso, ejercicios…)
  components/learning/ → menú lateral, tarjetas de ejercicio…
  views/               → página de inicio
  views/lessons/       → cada lección</pre>

    <h2>Dos comandos en la terminal</h2>
    <ul>
      <li>
        <code class="inline">npm run dev</code> — arranca el servidor de desarrollo: guardas un archivo y la página se
        actualiza sola (útil mientras aprendes).
      </li>
      <li>
        <code class="inline">npm run build</code> — genera la versión optimizada para publicar en la carpeta
        <code class="inline">dist/</code>.
      </li>
    </ul>

    <h2>Qué viene después en <em>este</em> curso</h2>
    <p>
      En el menú lateral, después de esta lección encontrarás <strong>datos remotos (fetch)</strong>, para pedir JSON a
      Internet, <strong>Pinia</strong> para estado compartido y la página
      <RouterLink to="/practica"><strong>ejercicios prácticos</strong></RouterLink> con retos y soluciones.
    </p>

    <h2>Otras buenas ideas cuando domines lo anterior</h2>
    <ol>
      <li>
        <strong>Librerías HTTP</strong> — además de <code class="inline">fetch</code>, muchos equipos usan axios u
        otras; el concepto es el mismo: pedir datos y mostrar carga/error.
      </li>
      <li>
        <strong>Tests</strong> — herramientas como Vitest comprueban que tus componentes se comportan bien al cambiar
        datos.
      </li>
      <li>
        <strong>Nuxt</strong> (opcional, más adelante) — capa extra sobre Vue para proyectos con muchas páginas, SEO y
        servidor; no hace falta para tu primer mes con Vue.
      </li>
    </ol>

    <p>
      Documentación oficial (está en inglés, pero con traductor y ejemplos vale mucho la pena):
      <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer">Guía de Vue</a>
      ·
      <a href="https://router.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue Router</a>
    </p>
  </article>
</template>
