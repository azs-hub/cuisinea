import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'
import RecipesCategoryView from '../views/RecipesCategoryView.vue'
import AuthView from '../views/AuthView.vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

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
  {
    path: '/user',
    name: 'auth',
    component: AuthView,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
      },
      {
        path: 'forgotten-password',
        name: 'forgotten-password',
        component: Login,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { routes }

export default router
