import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import StepView from '../views/StepView.vue'
import End from '../views/End.vue'

const routes = [
  { path: '/', name: 'welcome', component: Welcome, meta: { title: 'Vue, paso a paso' } },
  { path: '/paso/:n', name: 'step', component: StepView, meta: { title: 'Paso' } },
  { path: '/fin', name: 'end', component: End, meta: { title: 'Hecho' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const base = 'Vue, paso a paso'
  if (to.name === 'step' && to.params.n) {
    document.title = `Paso ${to.params.n} · ${base}`
  } else if (to.meta?.title && to.meta.title !== base) {
    document.title = `${to.meta.title} · ${base}`
  } else {
    document.title = base
  }
})

export default router
