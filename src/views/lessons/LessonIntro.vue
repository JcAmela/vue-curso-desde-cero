<template>
  <article class="lesson-page">
    <h1>¿Qué es Vue?</h1>
    <p class="lead">
      Con <strong>HTML</strong> marcas la estructura y con <strong>CSS</strong> el aspecto. Con <strong>JavaScript</strong>
      sueles buscar elementos en el navegador (el <strong>DOM</strong>: el árbol de etiquetas) y cambiar textos, clases o
      escuchar pulsaciones. Eso funciona, pero en aplicaciones medianas el código se vuelve frágil y cuesta ver qué dato
      «manda» en cada pantalla.
    </p>
    <p>
      <strong>Vue</strong> es una herramienta (<strong>marco de trabajo / librería</strong> según cómo la montes) para
      dividir la interfaz en <strong>componentes</strong>: cada uno con su plantilla HTML, sus estilos y su lógica.
      Tú declaras <em>qué datos tiene la pieza</em> y <em>cómo debería verse cuando esos datos cambian</em>; Vue
      actualiza el DOM por ti. Sigues escribiendo JavaScript normal en el script del componente.
    </p>

    <h2>Relación con lo que ya hacías a mano</h2>
    <ul>
      <li>
        En lugar de repetir <code class="inline">elemento.textContent = …</code> en cada cambio, guardas el texto en una
        variable reactiva y en el HTML usas
        <code class="inline">&#123;&#123; mensaje &#125;&#125;</code> para mostrarla.
      </li>
      <li>
        En lugar de registrar muchos <code class="inline">addEventListener</code> dispersos, enlazas el evento en la
        propia etiqueta con <code class="inline">@click</code>, <code class="inline">@submit</code>, etc.
      </li>
      <li>Debajo sigue siendo JavaScript: no es otro lenguaje de programación distinto.</li>
    </ul>

    <h2>¿Para qué merece la pena?</h2>
    <ul>
      <li><strong>Menos trabajo repetitivo</strong> cuando los datos y la vista deben ir sincronizados.</li>
      <li>
        <strong>Componentes reutilizables:</strong> una tarjeta, un botón o un panel puedes usarlos en varias pantallas
        sin duplicar montones de HTML.
      </li>
      <li>
        <strong>Herramientas de equipo real:</strong> en proyectos serios casi siempre hay enrutador (en esta web,
        <strong>Vue Router</strong>) y a veces estado global (por ejemplo <strong>Pinia</strong>). No hace falta dominar
        eso al primer día; aquí solo verás que encajan con lo demás.
      </li>
    </ul>

    <h2>Vue 3 y <code class="inline">&lt;script setup&gt;</code></h2>
    <p>
      La rama actual es <strong>Vue 3</strong>. En este curso la lógica irá en
      <code class="inline">&lt;script setup&gt;</code>: una forma corta y habitual de escribir el script del componente.
      Si encuentras tutoriales antiguos de Vue 2, la sintaxis puede diferir, pero la idea (datos → plantilla
      actualizada) es la misma.
    </p>

    <h2>Siguiente paso sugerido</h2>
    <p>
      Continúa con <strong>Archivos .vue</strong> para ver cómo el script, la plantilla y los estilos conviven en un solo
      fichero.
    </p>
  </article>
</template>
