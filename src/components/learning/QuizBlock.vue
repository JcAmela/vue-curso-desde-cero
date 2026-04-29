<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  quiz: {
    type: Object,
    required: true,
  },
})

const selected = ref(null)
const locked = ref(false)

const isCorrect = computed(() => {
  if (selected.value === null) return null
  return !!props.quiz.options[selected.value]?.correct
})

function pick(index) {
  if (locked.value) return
  selected.value = index
  locked.value = true
}

function retry() {
  selected.value = null
  locked.value = false
}
</script>

<template>
  <div class="quiz" role="group" :aria-label="quiz.question">
    <p class="q">{{ quiz.question }}</p>
    <ul class="opts">
      <li v-for="(opt, i) in quiz.options" :key="i">
        <button
          type="button"
          class="opt"
          :class="{
            picked: selected === i,
            good: locked && opt.correct,
            bad: locked && selected === i && !opt.correct,
          }"
          :disabled="locked"
          @click="pick(i)"
        >
          {{ opt.text }}
        </button>
      </li>
    </ul>
    <p v-if="locked" class="explain" :class="{ ok: isCorrect, no: !isCorrect }">
      <span class="explain-tag">{{ isCorrect ? 'Correcto.' : 'Aún no.' }}</span>
      {{ quiz.explain }}
    </p>
    <button v-if="locked" type="button" class="retry" @click="retry">Volver a intentar</button>
  </div>
</template>

<style scoped>
.quiz {
  margin: 1.25rem 0;
  padding: 1rem 1.15rem;
  background: #f8fafc;
  border: 1px solid var(--lv-border);
  border-radius: var(--lv-radius-sm);
}

.q {
  margin: 0 0 0.75rem !important;
  font-weight: 700;
  font-size: 0.95rem !important;
}

.opts {
  margin: 0 !important;
  padding: 0 !important;
  list-style: none;
}

.opt {
  display: block;
  width: 100%;
  margin-bottom: 0.45rem;
  padding: 0.55rem 0.75rem;
  text-align: left;
  font-size: 0.9rem;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid var(--lv-border);
  background: #fff;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;
}

.opt:hover:not(:disabled) {
  border-color: rgba(66, 184, 131, 0.45);
}

.opt.picked:not(.bad):not(.good) {
  border-color: #94a3b8;
}

.opt.good {
  border-color: #22c55e;
  background: #ecfdf3;
}

.opt.bad {
  border-color: #ef4444;
  background: #fef2f2;
}

.explain-tag {
  display: block;
  font-weight: 800;
  margin-bottom: 0.25rem;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.explain.ok .explain-tag {
  color: #15803d;
}

.explain.no .explain-tag {
  color: #b91c1c;
}

.explain.ok {
  color: #15803d;
}

.explain.no {
  color: #b91c1c;
}

.retry {
  margin-top: 0.65rem;
  padding: 0.4rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 650;
  font-family: inherit;
  color: var(--lv-navy);
  background: #fff;
  border: 1px solid var(--lv-border);
  border-radius: 8px;
  cursor: pointer;
}

.retry:hover {
  border-color: rgba(66, 184, 131, 0.45);
  background: rgba(66, 184, 131, 0.06);
}
</style>
