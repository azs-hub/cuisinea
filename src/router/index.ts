import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'
import RecipesCategoryView from '../views/RecipesCategoryView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesCategoryView,
    children: [
      {
        path: 'categories/:categoryId',
        name: 'recipesCategory',
        component: RecipesCategoryView,
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
  history: createWebHistory(),
  routes,
})

export { routes }

export default router
