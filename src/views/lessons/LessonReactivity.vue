<script setup>
import { ref, watch } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'

const contador = ref(0)
const registro = ref('Pulsa el botón y mira cómo cambia este texto.')

function sumar() {
  contador.value++
}

watch(contador, (nuevo, viejo) => {
  registro.value = `Antes era ${viejo} y ahora es ${nuevo}.`
})
</script>

<template>
  <article class="lesson-page">
    <h1>Datos que “avisan” a la pantalla: <code class="inline">ref</code></h1>
    <p class="lead">
      En JavaScript normal, si tienes <code class="inline">let x = 0</code> y luego haces <code class="inline">x++</code>,
      un <code class="inline">&lt;span&gt;</code> en el HTML <strong>no se entera</strong>. Tienes que buscar ese
      <code class="inline">span</code> y escribir el número otra vez.
    </p>
    <p>
      En Vue guardas el valor en un <code class="inline">ref</code> (una cajita reactiva). Cuando cambias ese número en
      JavaScript, Vue <strong>vuelve a pintar</strong> la parte del HTML que depende de él. Eso se llama
      <strong> reactividad</strong>.
    </p>

    <h2>Regla simple que debes recordar</h2>
    <ul>
      <li>
        <strong>Dentro del <code class="inline">&lt;script setup&gt;</code>:</strong> el valor está envuelto. Para leer o
        escribir usas <code class="inline">contador.value</code> (con <code class="inline">.value</code>).
      </li>
      <li>
        <strong>Dentro del <code class="inline">&lt;template&gt;</code>:</strong> Vue hace el favor de “desenvolver”
        solo: escribes <code class="inline">&#123;&#123; contador &#125;&#125;</code> <strong>sin</strong>
        <code class="inline">.value</code>.
      </li>
    </ul>

    <TryItBox>
      <p class="big-count">
        <span class="lbl">Contador</span>
        <strong>{{ contador }}</strong>
      </p>
      <button type="button" class="primary-btn" @click="sumar">Sumar 1 (por dentro hace contador.value++)</button>
      <p class="watch-line">
        <strong>Extra — <code class="inline">watch</code>:</strong> es una función que Vue llama cuando cambia algo.
        Aquí solo muestra un mensaje; más adelante sirve para cosas como “cuando cambie el precio, vuelve a pedir datos al
        servidor”. {{ registro }}
      </p>
    </TryItBox>

    <h2>Y los objetos, ¿con qué?</h2>
    <p>
      Para objetos grandes también existe <code class="inline">reactive()</code>. En muchos cursos y proyectos se usa
      sobre todo <code class="inline">ref</code> para números, textos y también objetos, y dentro del script siempre
      acordarse del <code class="inline">.value</code>. Cuando lleves más práctica, elegirás lo que te resulte más claro.
    </p>
  </article>
</template>

<style scoped>
.big-count {
  margin: 0 0 0.75rem !important;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.lbl {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--lv-muted);
}

.big-count strong {
  font-size: 2rem;
  line-height: 1;
  color: var(--lv-green-dim);
}

.primary-btn {
  padding: 0.55rem 1rem;
  font-weight: 700;
  font-family: inherit;
  color: #fff;
  background: linear-gradient(135deg, var(--lv-green), var(--lv-green-dim));
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(66, 184, 131, 0.3);
}

.primary-btn:focus-visible {
  outline: 2px solid var(--lv-navy);
  outline-offset: 2px;
}

.watch-line {
  margin: 0.85rem 0 0 !important;
  font-size: 0.88rem !important;
  color: var(--lv-muted) !important;
}
</style>
