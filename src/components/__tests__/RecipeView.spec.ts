import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RecipeView from '@/views/RecipeView.vue'
import { router } from './mock-router'
import { getFakeRecipe, getFakeRecipes } from '@/mocks/recipe.mock'
// import * as apiRecipeService from '@/utilities/services/recipe'

import { setActivePinia, createPinia } from 'pinia'
// import { useCounterStore } from '../src/stores/counter'

vi.mock('@/utilities/services/recipe', () => ({
  getRecipe: () => getFakeRecipe('uuid'),
  getLatestRecipes: () => getFakeRecipes(5),
}))

describe('RecipeView', () => {
  let wrapper: any

  beforeEach(() => {
    vi.resetAllMocks()
    setActivePinia(createPinia())
    wrapper = mount(RecipeView, {
      global: {
        plugins: [router],
        stubs: [
          'PvChip',
          'PvButton',
          'TagsRecipe',
          'PvCard',
          'SkeletonRecipeView',
          'PvTag',
          'PvPanel',
          'PvCarousel',
        ],
      },
    })
  })

  it('Displays Recipe Page', () => {
    const previewContainer = wrapper.find('[data-testid="recipe-view"]')
    expect(previewContainer.exists()).toBeTruthy()
  })

  // it('Displays the recipe data when data is fetched', () => {
  //   const recipeCard = wrapper.find('[data-testid="recipe-view-card"]')
  //   const skeleton = wrapper.find('[data-testid="recipe-view-skeleton"]')

  //   expect(recipeCard.exists()).toBeTruthy()
  //   expect(skeleton.exists()).toBeFalsy()
  // })

  it('Displays Ingredient Unit', () => {
    const ingredientUnit = wrapper.vm.isMeasurementUnit('unit')
    expect(ingredientUnit).toBeFalsy()
  })

  // it('Displays the skeleton while data is loading', () => {
  //   const wrapper = mount(RecipeView, {
  //     global: {
  //       plugins: [router],
  //       stubs: ['PvChip', 'PvButton', 'TagsRecipe', 'PvCard', 'SkeletonRecipeView', 'PvTag'],
  //     },
  //   })
  //   const recipeCard = wrapper.find('[data-testid="recipe-view-card"]')
  //   const skeleton = wrapper.find('[data-testid="recipe-view-skeleton"]')

  //   expect(recipeCard.exists()).toBeFalsy()
  //   expect(skeleton.exists()).toBeTruthy()
  // })
})

// describe('RecipeView - BeforeMount behavior', () => {
//   it('Fetch Recipe data from service', () => {
//     const fetchFromApiSpy = vi
//       .spyOn(apiRecipeService, 'getRecipe')
//       .mockResolvedValue(getFakeRecipe('uuid'))

//     mount(RecipeView, {
//       global: {
//         plugins: [router],
//         stubs: ['PvChip', 'PvButton', 'TagsRecipe', 'PvCard', 'SkeletonRecipeView', 'PvTag'],
//       },
//     })
//     expect(fetchFromApiSpy).toHaveBeenCalled()
//   })

// it('Displays the skeleton while data is loading', () => {
//   const wrapper = mount(RecipeView, {
//     global: {
//       plugins: [router],
//       stubs: ['PvChip', 'PvButton', 'TagsRecipe', 'PvCard', 'SkeletonRecipeView', 'PvTag'],
//     },
//   })
//   const recipeCard = wrapper.find('[data-testid="recipe-view-card"]')
//   const skeleton = wrapper.find('[data-testid="recipe-view-skeleton"]')

//   expect(recipeCard.exists()).toBeFalsy()
//   expect(skeleton.exists()).toBeTruthy()
// })
// })
