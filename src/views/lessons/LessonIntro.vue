<template>
  <article class="lesson-page">
    <h1>¿Qué es Vue?</h1>
    <p class="lead">
      Con HTML y CSS haces la estructura y el aspecto. Con JavaScript sueles buscar elementos en la página (el
      <strong>DOM</strong>: el árbol de etiquetas que ve el navegador) y cambiar textos, clases o escuchar clics. Eso
      funciona, pero en apps un poco grandes el código se vuelve difícil de mantener.
    </p>
    <p>
      <strong>Vue</strong> es una herramienta (una biblioteca / framework) que te ayuda a partir la pantalla en
      <strong>bloques reutilizables</strong> llamados <strong>componentes</strong>. Cada bloque tiene su HTML, su CSS y
      la lógica en JavaScript. Lo importante: describes <em>qué datos tienes</em> y <em>cómo debe verse la página cuando
      esos datos cambian</em>; Vue se encarga de actualizar el DOM por ti.
    </p>

    <h2>Relación con lo que ya conoces</h2>
    <ul>
      <li>
        En vez de hacer <code class="inline">elemento.textContent = 'Hola'</code> cada vez, guardas el texto en una
        variable “especial” y en el HTML escribes algo como <code class="inline">&#123;&#123; mensaje &#125;&#125;</code>.
      </li>
      <li>
        En vez de muchos <code class="inline">addEventListener</code> repartidos, puedes enlazar eventos en las propias
        etiquetas (<code class="inline">@click</code>, etc.).
      </li>
      <li>Sigue siendo JavaScript normal debajo; no es otro lenguaje.</li>
    </ul>

    <h2>¿Por qué molestarse?</h2>
    <ul>
      <li><strong>Menos trabajo repetitivo</strong> al actualizar la pantalla cuando cambian los datos.</li>
      <li>
        <strong>Bloques claros:</strong> un mismo “botón” o “tarjeta” se puede usar en varias vistas sin copiar y pegar
        HTML a mano.
      </li>
      <li>
        <strong>Herramientas que encajan:</strong> en proyectos reales casi siempre usarás algo para las “páginas” (en esta
        web es <strong>Vue Router</strong>) y, más adelante, para datos globales (por ejemplo <strong>Pinia</strong>).
        No hace falta que sepas eso ahora; aquí solo ves que existen.
      </li>
    </ul>

    <h2>Qué es Vue 3 y ese <code class="inline">&lt;script setup&gt;</code></h2>
    <p>
      La versión actual es <strong>Vue 3</strong>. En este curso la lógica va en
      <code class="inline">&lt;script setup&gt;</code>: es una forma cómoda de escribir el JavaScript del componente. No
      tienes que compararla con Vue 2 todavía; si ves tutoriales viejos, pueden usar otra sintaxis, pero la idea (datos →
      vista) es la misma.
    </p>

    <h2>Siguiente paso</h2>
    <p>
      Sigue con <strong>Archivos .vue</strong> para ver cómo encajan en un solo archivo el script, el HTML y los
      estilos.
    </p>
  </article>
</template>
