<script setup>
import { ref } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'

const cargando = ref(false)
const error = ref(null)
const usuario = ref(null)

async function cargarUsuario() {
  cargando.value = true
  error.value = null
  usuario.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    if (!res.ok) throw new Error('El servidor respondió mal (' + res.status + ')')
    usuario.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'No se pudo completar la petición'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <article class="lesson-page">
    <h1>Datos remotos con <code class="inline">fetch</code></h1>
    <p class="lead">
      Hasta ahora todo vive en tu navegador. En apps reales casi siempre hay que <strong>pedir datos a un servidor</strong>
      (JSON por HTTP). En JavaScript moderno lo más directo es <code class="inline">fetch(url)</code>: devuelve una
      promesa, así que usamos <code class="inline">async</code> / <code class="inline">await</code> dentro de funciones.
    </p>

    <h2>Flujo típico</h2>
    <ol>
      <li>Guardas en <code class="inline">ref</code> un estado «cargando», otro para «error» y otro para los datos.</li>
      <li>Antes de la petición: <code class="inline">cargando.value = true</code> y limpias el error anterior.</li>
      <li>
        <code class="inline">const respuesta = await fetch('https://…')</code> — compruebas
        <code class="inline">respuesta.ok</code>.
      </li>
      <li><code class="inline">const datos = await respuesta.json()</code> y los guardas en un ref (por ejemplo <code class="inline">usuario.value = datos</code>).</li>
      <li>
        En <code class="inline">finally</code> pones <code class="inline">cargando.value = false</code> para que siempre
        se quite el mensaje de carga, falle o no.
      </li>
    </ol>

    <h2>¿Y si no hay internet o la URL está mal?</h2>
    <p>
      Rodea la lógica con <code class="inline">try / catch</code>. En el <code class="inline">catch</code> guardas un
      mensaje legible en un ref y lo muestras en el template. Así la persona que usa tu app entiende qué pasó.
    </p>

    <TryItBox label="Demo en vivo (API pública de prueba)">
      <button type="button" class="btn-fetch" :disabled="cargando" @click="cargarUsuario">
        {{ cargando ? 'Cargando…' : 'Pedir usuario de ejemplo' }}
      </button>
      <p v-if="error" class="err">Error: {{ error }}</p>
      <div v-else-if="usuario" class="okbox">
        <p><strong>{{ usuario.name }}</strong> · {{ usuario.username }}</p>
        <p class="mail">{{ usuario.email }}</p>
        <p class="city">{{ usuario.address?.city }}</p>
      </div>
      <p v-else class="hint">Pulsa el botón. Los datos vienen de jsonplaceholder.typicode.com (solo práctica).</p>
    </TryItBox>

    <h2>Buenas costumbres</h2>
    <ul>
      <li>No repitas la URL en diez sitios: úsala desde una constante o configuración.</li>
      <li>Para APIs grandes suele haber capas (servicios, composables) en lugar de fetch suelto en el template.</li>
      <li>Muestra siempre estado de carga y error; la gente odia pantallas en blanco.</li>
    </ul>
  </article>
</template>

<style scoped>
.btn-fetch {
  padding: 0.55rem 1rem;
  font-weight: 700;
  font-family: inherit;
  border-radius: 10px;
  border: none;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  cursor: pointer;
  margin-bottom: 0.75rem;
}

.btn-fetch:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.err {
  color: #b91c1c;
  font-weight: 600;
}

.okbox {
  padding: 0.75rem 1rem;
  background: #fff;
  border-radius: 10px;
  border: 1px solid var(--lv-border);
}

.mail,
.city {
  margin: 0.25rem 0 0 !important;
  font-size: 0.9rem !important;
  color: var(--lv-muted) !important;
}

.hint {
  margin: 0 !important;
  font-size: 0.9rem !important;
  color: var(--lv-muted) !important;
}
</style>
