import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'
import RecipesCategoryView from '../views/RecipesCategoryView.vue'
import AuthView from '../views/AuthView.vue'
import AuthLogin from '@/components/auth/AuthLogin.vue'
import AuthRegister from '@/components/auth/AuthRegister.vue'
import UserAccount from '@/components/auth/UserAccount.vue'

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
        component: AuthLogin,
      },
      {
        path: 'register',
        name: 'register',
        component: AuthRegister,
      },
      {
        path: 'forgotten-password',
        name: 'forgotten-password',
        component: AuthLogin,
      },
      {
        path: 'my-account',
        name: 'my-account',
        component: UserAccount,
      },
      {
        path: 'my-recipes',
        name: 'my-recipes',
        component: AuthLogin,
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
