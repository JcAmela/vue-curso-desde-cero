import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { lessons } from '../data/curriculum'

export function useLessonNav() {
  const route = useRoute()

  const lessonIndex = computed(() => {
    const n = route.name
    if (n === 'home') return -1
    return lessons.findIndex((l) => l.name === n)
  })

  const currentLesson = computed(() => {
    const i = lessonIndex.value
    if (i < 0) return null
    return lessons[i]
  })

  const prevLesson = computed(() => {
    const i = lessonIndex.value
    if (i <= 0) return null
    return lessons[i - 1]
  })

  const nextLesson = computed(() => {
    const i = lessonIndex.value
    if (i < 0 || i >= lessons.length - 1) return null
    return lessons[i + 1]
  })

  return { lessonIndex, currentLesson, prevLesson, nextLesson }
}
