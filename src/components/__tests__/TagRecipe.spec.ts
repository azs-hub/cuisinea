import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TagRecipe from '@/components/recipes/TagRecipe.vue'
import { RecipeCategory } from '@/types/Recipe'
import { getFakeTags } from '@/mocks/recipe.mock'
import { router } from './mock-router'

const tags: RecipeCategory[] = getFakeTags()

const mockGlobalOptions = () => {
  return {
    props: { tags },
    global: {
      plugins: [router],
      stubs: ['PvTag'],
    },
  }
}

describe('CardRecipe', () => {
  it('Displays the Recipe wrapper', () => {
    const wrapper = mount(TagRecipe, mockGlobalOptions())
    const previewContainer = wrapper.find('[data-testid="recipe-tags"]')
    expect(previewContainer.exists()).toBeTruthy()
  })

  it('Redirect to the category recipes page', () => {
    const wrapper = mount(TagRecipe, mockGlobalOptions())
    const push = vi.spyOn(router, 'push')
    const link = wrapper.find('[data-testid="recipe-tags-link"]')

    expect(link.exists()).toBeTruthy()

    link.trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: 'recipesCategory',
      params: {
        categoryId: tags[0].id,
      },
    })
  })
})
