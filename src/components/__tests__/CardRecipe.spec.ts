import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardRecipe from '@/components/recipes/CardRecipe.vue'
import { Recipe } from '@/types/Recipe'
import { getFakeRecipe } from '@/mocks/recipe.mock'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

// Testing the real router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const recipe: Recipe = getFakeRecipe()

describe('CardRecipe', () => {
  it('Displays the Recipe information', () => {
    const wrapper = mount(CardRecipe, {
      props: { recipe: recipe },
      global: {
        plugins: [router],
        stubs: ['PvTag'],
      },
    })
    const previewContainer = wrapper.find('[data-testid="recipe-card-container"] .card')
    expect(previewContainer.exists()).toBeTruthy()
  })

  it('Does not displays the Recipe information', () => {
    const wrapper = mount(CardRecipe, {
      props: { recipe: {} as Recipe },
      global: {
        plugins: [router],
        stubs: ['PvTag'],
      },
    })
    const previewContainer = wrapper.find('[data-testid="recipe-card-container"] .card')
    expect(previewContainer.exists()).toBeFalsy()
  })
})
