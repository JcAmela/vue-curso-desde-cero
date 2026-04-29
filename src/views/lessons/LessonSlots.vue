<script setup>
import { ref } from 'vue'
import TryItBox from '../../components/learning/TryItBox.vue'
import DemoSlotPanel from '../../components/learning/DemoSlotPanel.vue'

const tema = ref('claro')
</script>

<template>
  <article class="lesson-page">
    <h1>Slots: dejar huecos en un componente para que el padre rellene</h1>
    <p class="lead">
      A veces quieres un “marco” fijo (título arriba, cuerpo, pie abajo) pero el <strong>contenido</strong> lo decide quien
      usa el componente. En HTML puro copiarías y pegarías mucho código. En Vue el hijo declara
      <strong>ranuras</strong> (<code class="inline">&lt;slot&gt;</code>): son sitios donde el padre puede meter más HTML.
    </p>

    <h2>Slot por defecto y slots con nombre</h2>
    <ul>
      <li>Sin nombre: todo lo que pongas <strong>entre la etiqueta de apertura y cierre</strong> del componente cae ahí.</li>
      <li>
        Con nombre (<code class="inline">#pie</code> en el padre, <code class="inline">name="pie"</code> en el hijo): sirve
        cuando hay varias zonas (cabecera, pie, barra lateral…).
      </li>
    </ul>

    <p>
      Prueba cambiar el tema del panel (solo es estilo CSS para que veas que el exterior sigue siendo el mismo componente):
    </p>
    <p>
      <label class="tema-sel">
        <input v-model="tema" type="radio" value="claro" />
        Tema claro
      </label>
      <label class="tema-sel">
        <input v-model="tema" type="radio" value="oscuro" />
        Tema oscuro
      </label>
    </p>

    <TryItBox>
      <DemoSlotPanel :class="['panel-wrap', tema]" nombre="DemoSlotPanel.vue">
        <template #encabezado>Este título lo envió el padre al slot «encabezado».</template>
        <p>Este párrafo va al <strong>slot por defecto</strong> (el cuerpo).</p>
        <template #pie>
          <small>Pie enviado desde el padre — tema: {{ tema }}</small>
        </template>
      </DemoSlotPanel>
    </TryItBox>

    <h2>Slots con datos del hijo (más adelante)</h2>
    <p>
      Existe una versión avanzada en la que el hijo “pasa” variables al contenido que insertaste (por ejemplo cada fila de
      una tabla). Eso son los <strong>scoped slots</strong>. Cuando trabajes con tablas reutilizables, volverás a esta
      idea.
    </p>
  </article>
</template>

<style scoped>
.tema-sel {
  margin-right: 0.85rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.panel-wrap.oscuro :deep(.slot-panel) {
  border-color: #334155;
  background: #1e293b;
  color: #e2e8f0;
}

.panel-wrap.oscuro :deep(.slot-panel .head) {
  background: rgba(66, 184, 131, 0.12);
  border-color: #334155;
}

.panel-wrap.oscuro :deep(.slot-panel .foot) {
  background: #0f172a;
  border-color: #334155;
}

.panel-wrap.oscuro :deep(.fallback) {
  color: #94a3b8 !important;
}
</style>
