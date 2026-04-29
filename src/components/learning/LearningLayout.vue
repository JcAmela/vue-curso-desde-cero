<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { lessons } from '../../data/curriculum'
import { useLessonProgress } from '../../composables/useLessonProgress'
import LessonFooter from './LessonFooter.vue'

const menuOpen = ref(false)
const { percent, completedCount, total, isDone } = useLessonProgress()

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <div class="learn-app">
    <button
      type="button"
      class="fab-menu"
      :aria-expanded="menuOpen"
      aria-label="Abrir o cerrar menú"
      @click="menuOpen = !menuOpen"
    >
      {{ menuOpen ? '✕' : '☰' }}
    </button>

    <div class="backdrop" :class="{ show: menuOpen }" aria-hidden="true" @click="closeMenu" />

    <aside class="sidebar" :class="{ open: menuOpen }">
      <div class="sidebar-inner">
        <RouterLink class="brand" to="/" @click="closeMenu">
          <span class="brand-mark">V</span>
          <span class="brand-text">Vue desde cero</span>
        </RouterLink>

        <div class="progress-block" aria-label="Progreso del curso">
          <div class="progress-top">
            <span>Progreso</span>
            <strong>{{ completedCount }}/{{ total }}</strong>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: percent + '%' }" />
          </div>
          <p class="progress-hint">
            Cuando termines una lección, pulsa “Marcar…” abajo. Se recuerda en este navegador (no en un servidor).
          </p>
        </div>

        <nav class="side-nav" aria-label="Lecciones">
          <RouterLink class="nav-item home-link" to="/" :class="{ active: $route.name === 'home' }" @click="closeMenu">
            <span class="ico">🏠</span>
            Inicio del curso
          </RouterLink>
          <RouterLink
            v-for="l in lessons"
            :key="l.name"
            class="nav-item"
            :to="'/' + l.path"
            :class="{ active: $route.name === l.name, done: isDone(l.name) }"
            @click="closeMenu"
          >
            <span class="ico">{{ l.icon }}</span>
            <span class="nav-label">{{ l.title }}</span>
            <span v-if="isDone(l.name)" class="check" aria-hidden="true">✓</span>
          </RouterLink>
        </nav>
      </div>
    </aside>

    <div class="main-wrap learn-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
      <LessonFooter />
    </div>
  </div>
</template>

<style scoped>
.learn-app {
  min-height: 100vh;
  display: flex;
  background:
    radial-gradient(1000px 500px at 0% 0%, rgba(66, 184, 131, 0.14), transparent 55%),
    radial-gradient(800px 400px at 100% 10%, rgba(53, 73, 94, 0.08), transparent 45%),
    linear-gradient(180deg, #eef6f2 0%, #f3f1f8 45%, #faf9fc 100%);
}

.sidebar {
  width: 288px;
  flex-shrink: 0;
  background: var(--lv-surface);
  border-right: 1px solid var(--lv-border);
  box-shadow: 4px 0 24px rgba(53, 73, 94, 0.05);
  z-index: 5;
}

.sidebar-inner {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  padding: 1.15rem 1rem 2rem;
  scrollbar-width: thin;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding: 0.35rem 0;
  text-decoration: none !important;
  color: var(--lv-navy) !important;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  font-weight: 900;
  font-size: 1.1rem;
  color: #fff;
  background: linear-gradient(145deg, var(--lv-green), var(--lv-green-dim));
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.35);
}

.brand-text {
  font-weight: 800;
  font-size: 1.02rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.progress-block {
  padding: 0.85rem 0.75rem;
  margin-bottom: 1rem;
  background: var(--lv-soft);
  border-radius: var(--lv-radius-sm);
  border: 1px solid var(--lv-border);
}

.progress-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--lv-muted);
  margin-bottom: 0.45rem;
}

.progress-top strong {
  color: var(--lv-navy);
}

.progress-track {
  height: 8px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--lv-green), #5fd4a4);
  transition: width 0.35s ease;
}

.progress-hint {
  margin: 0.55rem 0 0;
  font-size: 0.72rem;
  line-height: 1.4;
  color: var(--lv-muted);
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.55rem;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--lv-text);
  text-decoration: none !important;
  border-radius: 10px;
  border: 1px solid transparent;
  transition:
    background 0.12s ease,
    border-color 0.12s ease;
}

.nav-item:hover {
  background: rgba(66, 184, 131, 0.08);
}

.nav-item.active {
  background: rgba(66, 184, 131, 0.14);
  border-color: rgba(66, 184, 131, 0.28);
  color: var(--lv-green-dim);
}

.nav-item.done:not(.active) {
  opacity: 0.92;
}

.ico {
  font-size: 1rem;
  line-height: 1;
  width: 1.5rem;
  text-align: center;
}

.nav-label {
  flex: 1;
  min-width: 0;
  line-height: 1.25;
}

.check {
  font-size: 0.75rem;
  color: var(--lv-green-dim);
  font-weight: 800;
}

.home-link {
  margin-bottom: 0.35rem;
  padding: 0.55rem 0.55rem;
  background: rgba(53, 73, 94, 0.04);
}

.main-wrap {
  flex: 1;
  min-width: 0;
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 2.5rem) 3rem;
}

.fab-menu {
  display: none;
  position: fixed;
  bottom: 1.15rem;
  right: 1.15rem;
  z-index: 20;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  border: none;
  font-size: 1.35rem;
  line-height: 1;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(145deg, var(--lv-navy), #2a3f52);
  box-shadow: 0 8px 28px rgba(53, 73, 94, 0.35);
}

.fab-menu:focus-visible {
  outline: 3px solid var(--lv-green);
  outline-offset: 3px;
}

.backdrop {
  display: none;
}

@media (max-width: 900px) {
  .learn-app {
    flex-direction: column;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    transform: translateX(-102%);
    transition: transform 0.28s ease;
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: 12px 0 40px rgba(0, 0, 0, 0.12);
  }

  .fab-menu {
    display: grid;
    place-items: center;
  }

  .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 4;
    background: rgba(30, 41, 59, 0.35);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  .backdrop.show {
    opacity: 1;
    pointer-events: auto;
  }

  .main-wrap {
    padding-bottom: 5rem;
  }
}
</style>
