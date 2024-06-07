import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { Recipe } from '@/types/Recipe'
import { getFakeRecipes } from '@/mocks/recipe.mock'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

// Testing the real router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const recipes: Recipe[] = getFakeRecipes(5)

describe('HomeView', () => {
  it('Displays the Recipe information', () => {
    const wrapper = mount(HomeView, {
      props: { recipes: recipes },
      global: {
        plugins: [router],
        stubs: ['HomeView', 'PvButton', 'PvPanel', 'PvTag'],
      },
    })
    const previewContainer = wrapper.find('[data-testid="recipe-list-container"]')
    expect(previewContainer.exists()).toBeTruthy()
  })
})
