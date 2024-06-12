import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: HomeView,
    children: [
      {
        path: 'categories/:categoryId',
        name: 'recipesCategory',
        component: HomeView,
      },
    ],
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: RecipeView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { routes }

export default router
