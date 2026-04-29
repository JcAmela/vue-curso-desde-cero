import { createRouter, createWebHistory } from 'vue-router'
import LearningLayout from '../components/learning/LearningLayout.vue'
import LessonHome from '../views/LessonHome.vue'
import LessonIntro from '../views/lessons/LessonIntro.vue'
import LessonSfc from '../views/lessons/LessonSfc.vue'
import LessonReactivity from '../views/lessons/LessonReactivity.vue'
import LessonPlantilla from '../views/lessons/LessonPlantilla.vue'
import LessonEvents from '../views/lessons/LessonEvents.vue'
import LessonLists from '../views/lessons/LessonLists.vue'
import LessonForms from '../views/lessons/LessonForms.vue'
import LessonComputedWatch from '../views/lessons/LessonComputedWatch.vue'
import LessonPropsEmit from '../views/lessons/LessonPropsEmit.vue'
import LessonSlots from '../views/lessons/LessonSlots.vue'
import LessonRouterNext from '../views/lessons/LessonRouterNext.vue'
import LessonFetch from '../views/lessons/LessonFetch.vue'
import LessonPinia from '../views/lessons/LessonPinia.vue'
import LessonPractice from '../views/lessons/LessonPractice.vue'

const children = [
  { path: '', name: 'home', component: LessonHome, meta: { title: 'Inicio' } },
  { path: 'intro', name: 'intro', component: LessonIntro, meta: { title: '¿Qué es Vue?' } },
  { path: 'sfc', name: 'sfc', component: LessonSfc, meta: { title: 'Archivos .vue' } },
  { path: 'reactividad', name: 'reactividad', component: LessonReactivity, meta: { title: 'Reactividad' } },
  { path: 'plantilla', name: 'plantilla', component: LessonPlantilla, meta: { title: 'Plantilla' } },
  { path: 'eventos', name: 'eventos', component: LessonEvents, meta: { title: 'Eventos' } },
  { path: 'listas', name: 'listas', component: LessonLists, meta: { title: 'Listas' } },
  { path: 'formularios', name: 'formularios', component: LessonForms, meta: { title: 'Formularios' } },
  {
    path: 'computed-watch',
    name: 'computed-watch',
    component: LessonComputedWatch,
    meta: { title: 'Computed y watch' },
  },
  { path: 'props-emit', name: 'props-emit', component: LessonPropsEmit, meta: { title: 'Props y emit' } },
  { path: 'slots', name: 'slots', component: LessonSlots, meta: { title: 'Slots' } },
  {
    path: 'router-y-mas',
    name: 'router-next',
    component: LessonRouterNext,
    meta: { title: 'Router y siguiente paso' },
  },
  {
    path: 'datos-remotos',
    name: 'fetch-api',
    component: LessonFetch,
    meta: { title: 'Datos remotos (fetch)' },
  },
  { path: 'pinia', name: 'pinia', component: LessonPinia, meta: { title: 'Estado global (Pinia)' } },
  {
    path: 'practica',
    name: 'practica',
    component: LessonPractice,
    meta: { title: 'Ejercicios prácticos' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LearningLayout,
      children,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const base = 'Vue desde cero'
  document.title = to.meta?.title ? `${to.meta.title} · ${base}` : base
})

export default router
