import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RecipeView from '@/views/RecipeView.vue'
// import { RecipeCategory } from '@/types/Recipe'
import { router } from './mock-router'
import { getFakeRecipe } from '@/mocks/recipe.mock'

const mockRecipe = getFakeRecipe('id')

vi.mock('@/utilities/services/recipe', () => ({
  getRecipe: () => mockRecipe,
}))

describe('RecipeView', () => {
  let wrapper: any

  beforeEach(() => {
    vi.resetAllMocks()
    wrapper = mount(RecipeView, {
      global: {
        plugins: [router],
        stubs: ['PvTag', 'PvChip', 'PvButton'],
      },
    })
  })

  it('Displays Recipe Page', () => {
    const previewContainer = wrapper.find('[data-testid="recipe-view"]')
    expect(previewContainer.exists()).toBeTruthy()
  })
})
