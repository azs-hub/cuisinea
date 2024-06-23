import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CardRecipe from '@/components/recipes/CardRecipe.vue'
import { Recipe } from '@/types/Recipe'
import { getFakeRecipe } from '@/mocks/recipe.mock'
import { router } from './mock-router'

const recipe: Recipe = getFakeRecipe()

const mockGlobalOptions = (recipe = {} as Recipe) => {
  return {
    props: { recipe },
    global: {
      plugins: [router],
      stubs: ['TagsRecipe'],
    },
  }
}

describe('CardRecipe', () => {
  it('Displays the Recipe wrapper', () => {
    const wrapper = mount(CardRecipe, mockGlobalOptions(recipe))
    const previewContainer = wrapper.find('[data-testid="card-recipe"] .card')
    expect(previewContainer.exists()).toBeTruthy()
  })

  it('Does not displays the Recipe wrapper', () => {
    const wrapper = mount(CardRecipe, mockGlobalOptions())
    const previewContainer = wrapper.find('[data-testid="card-recipe"] .card')
    expect(previewContainer.exists()).toBeFalsy()
  })

  it('Redirect to the recipe page by the title', () => {
    const wrapper = mount(CardRecipe, mockGlobalOptions(recipe))
    const push = vi.spyOn(router, 'push')

    const recipeLink = wrapper.find('[data-testid="card-recipe-title-link"]')

    expect(recipeLink.exists()).toBeTruthy()

    recipeLink.trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: 'recipe',
      params: {
        id: recipe.id,
      },
    })
  })

  it('Redirect to the recipe page by the MakeIt Button', () => {
    const wrapper = mount(CardRecipe, mockGlobalOptions(recipe))
    const push = vi.spyOn(router, 'push')
    const makeit = wrapper.find('[data-testid="card-recipe-btn-link"]')

    expect(makeit.exists()).toBeTruthy()

    makeit.trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: 'recipe',
      params: {
        id: recipe.id,
      },
    })
  })
})
