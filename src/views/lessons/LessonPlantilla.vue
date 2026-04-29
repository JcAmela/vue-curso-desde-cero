<script setup>
import { ref } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'

const visibleIf = ref(false)
const visibleShow = ref(false)
</script>

<template>
  <article class="lesson-page">
    <h1>Plantilla: meter variables en el HTML y mostrar u ocultar cosas</h1>
    <p class="lead">
      El <code class="inline">&lt;template&gt;</code> de un componente es HTML “normal” con <strong>atajos</strong> de
      Vue. Ya viste que <code class="inline">&#123;&#123; nombre &#125;&#125;</code> muestra una variable. Además existen
      <strong>directivas</strong>: atributos que empiezan por <code class="inline">v-</code> y le dicen a Vue qué hacer
      con esa etiqueta.
    </p>

    <h2>Mostrar un valor en el HTML (interpolación)</h2>
    <p>
      Dentro de <code class="inline">&#123;&#123; &#125;&#125;</code> puedes poner expresiones sencillas de JavaScript
      (por ejemplo sumas o llamar a un método), pero no bloques largos como <code class="inline">if</code> completos. El
      resultado se muestra como <strong>texto</strong>; si alguien intenta colar HTML malicioso, Vue lo escapa por
      defecto (eso es bueno para la seguridad). Solo si tú controlas el 100 % del contenido usarías
      <code class="inline">v-html</code>, y con cuidado.
    </p>

    <h2>Atributos que dependen de una variable: <code class="inline">v-bind</code> o <code class="inline">:</code></h2>
    <p>
      En HTML fijo escribes <code class="inline">href="https://…"</code>. Si la URL viene de JavaScript, en Vue pones
      <code class="inline">:href="url"</code> (es corto para <code class="inline">v-bind:href="url"</code>). Lo mismo
      con <code class="inline">class</code>, <code class="inline">disabled</code>, etc.
    </p>

    <h2>¿Mostrar este bloque sí o no? <code class="inline">v-if</code> y <code class="inline">v-show</code></h2>
    <ul>
      <li>
        <strong><code class="inline">v-if</code>:</strong> si la condición es falsa, la etiqueta
        <strong>ni siquiera está</strong> en la página (Vue la quita del DOM). Es como si no existiera en el HTML hasta
        que la condición sea verdadera.
      </li>
      <li>
        <strong><code class="inline">v-show</code>:</strong> la etiqueta <strong>sí está</strong> en la página, pero
        Vue la oculta con CSS (como <code class="inline">display: none</code>). Para encender y apagar muy a menudo,
        a veces es más barato para el navegador.
      </li>
    </ul>

    <TryItBox label="Prueba v-if frente a v-show">
      <div class="toggles">
        <label><input v-model="visibleIf" type="checkbox" /> Mostrar bloque con <strong>v-if</strong></label>
        <label><input v-model="visibleShow" type="checkbox" /> Mostrar bloque con <strong>v-show</strong></label>
      </div>
      <p v-if="visibleIf" class="pill if">Este párrafo solo existe en la página cuando marcas la primera casilla.</p>
      <p v-show="visibleShow" class="pill show">
        Este párrafo sigue estando en la página; a veces solo está oculto con estilo.
      </p>
    </TryItBox>
  </article>
</template>

<style scoped>
.toggles {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.toggles label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.92rem;
}

.pill {
  margin: 0.5rem 0 0 !important;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  font-size: 0.9rem !important;
}

.pill.if {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.28);
}

.pill.show {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
}
</style>
