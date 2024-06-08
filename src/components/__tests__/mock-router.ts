import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

// Testing the real router
export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
