<template>
  <article class="lesson-page">
    <h1>Archivos <code class="inline">.vue</code> (un componente en un archivo)</h1>
    <p class="lead">
      En una web clásica tienes <code class="inline">index.html</code>, <code class="inline">estilo.css</code> y
      <code class="inline">app.js</code>. En Vue cada pieza de la interfaz puede vivir en un archivo
      <code class="inline">.vue</code>: ahí van <strong>tres bloques</strong> seguidos —el programa que tú usas (por
      ejemplo <strong>Vite</strong>) los convierte al final en JavaScript y HTML que entiende el navegador.
    </p>

    <h2>Las tres partes del archivo</h2>
    <ol>
      <li>
        <strong><code class="inline">&lt;script setup&gt;</code></strong> — Aquí va el JavaScript del bloque: importas
        cosas, creas variables, defines funciones (como en un <code class="inline">.js</code> normal). Todo lo que declares
        aquí puedes usarlo en el HTML de abajo con el <em>mismo nombre</em>.
      </li>
      <li>
        <strong><code class="inline">&lt;template&gt;</code></strong> — Es el <strong>HTML</strong> de este bloque, pero
        con extras de Vue: por ejemplo <code class="inline">&#123;&#123; nombreVariable &#125;&#125;</code> para mostrar
        un valor, o atributos que empiezan por <code class="inline">v-</code> (los veremos en otras lecciones).
      </li>
      <li>
        <strong><code class="inline">&lt;style scoped&gt;</code></strong> — CSS que solo afecta a <em>este</em> archivo.
        “Scoped” significa que Vue marca las etiquetas del template para que tus reglas no se filtren al resto de la
        página.
      </li>
    </ol>

    <h2>Ejemplo mínimo (no hace falta memorizarlo)</h2>
    <p>Fíjate en la estructura: script arriba, HTML en el medio, estilo abajo.</p>
    <pre class="code-block">&lt;script setup&gt;
import { ref } from 'vue'
const mensaje = ref('Hola')
&lt;/script&gt;

&lt;template&gt;
  &lt;p&gt;&#123;&#123; mensaje &#125;&#125;&lt;/p&gt;
&lt;/template&gt;

&lt;style scoped&gt;
p { color: #42b883; font-weight: 600; }
&lt;/style&gt;</pre>

    <h2>Dónde está cada cosa en <em>este</em> proyecto</h2>
    <ul>
      <li>
        Las pantallas del curso están en <code class="inline">src/views/</code> y
        <code class="inline">src/views/lessons/</code> (cada lección es un archivo).
      </li>
      <li>
        Piezas reutilizables (menú lateral, cajas de práctica) en <code class="inline">src/components/learning/</code>.
      </li>
      <li>
        La “tabla” que dice qué URL muestra qué pantalla está en <code class="inline">src/router/index.js</code>.
      </li>
    </ul>
  </article>
</template>
