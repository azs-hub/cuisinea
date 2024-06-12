import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RecipeView from '@/views/RecipeView.vue'
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

  it('Redirect to the category recipes page', () => {
    const push = vi.spyOn(router, 'push')
    const categoryLink = wrapper.find('[data-testid="recipe-view-tag-link"]')

    expect(categoryLink.exists()).toBeTruthy()

    categoryLink.trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: 'recipesCategory',
      params: {
        categoryId: mockRecipe.tags[0].id,
      },
    })
  })
})
