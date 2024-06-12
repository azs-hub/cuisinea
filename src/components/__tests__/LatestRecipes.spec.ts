import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LatestRecipes from '@/components/recipes/LatestRecipes.vue'
import { router } from './mock-router'
import { Recipe, RecipeCategory } from '@/types/Recipe'
import { getFakeRecipes } from '@/mocks/recipe.mock'

const recipesMock = getFakeRecipes(5)
recipesMock[0].tags[0].id = 'test'
recipesMock[0].tags[0].label = 'Test'
const category: RecipeCategory = { id: 'test', label: 'Test' }

const mockGlobalOptions = (
  category: RecipeCategory | undefined = undefined,
  recipes: Recipe[] = recipesMock
) => {
  return {
    props: { selectedCategory: category, recipes },
    global: {
      plugins: [router],
      renderStubDefaultSlot: true,
      stubs: ['RecipeList', 'PvButton', 'PvPanel'],
    },
  }
}

describe('LatestRecipes', () => {
  it('Displays the wrapper', () => {
    const wrapper = mount(LatestRecipes, mockGlobalOptions())
    const container = wrapper.find('[data-testid="latest-recipes"]')
    expect(container.exists()).toBeTruthy()
  })

  describe('No category selected', () => {
    it('Displays the title for all recipes', () => {
      const wrapper = mount(LatestRecipes, mockGlobalOptions())
      const title = wrapper.find('[data-testid="latest-recipes-title"]')

      expect(title.exists()).toBeTruthy()
      expect(wrapper.vm.selectedCategory).toEqual(undefined)
      expect(title.text()).toBe('Latest Recipes')
    })

    it('Displays the panel if no recipes available', () => {
      const wrapper = mount(LatestRecipes, mockGlobalOptions(undefined, [] as Recipe[]))
      const title = wrapper.find('[data-testid="latest-recipes-no-recipes"]')

      expect(title.exists()).toBeTruthy()
      expect(wrapper.vm.selectedCategory).toBe(undefined)
      expect(title.text()).toBe(`Oh No! There are no latest recipes`)
    })
  })
  describe('Category selected', () => {
    it('Displays the title for a selected category', () => {
      const wrapper = mount(LatestRecipes, mockGlobalOptions(category))
      const title = wrapper.find('[data-testid="latest-recipes-title"]')

      expect(title.exists()).toBeTruthy()
      expect(wrapper.vm.selectedCategory).toEqual(category)
      expect(title.text()).toBe(`Latest ${category.label} Recipes`)
    })

    it('Displays the panel if no recipes available', () => {
      const wrapper = mount(LatestRecipes, mockGlobalOptions(category, [] as Recipe[]))
      const title = wrapper.find('[data-testid="latest-recipes-no-recipes"]')

      expect(title.exists()).toBeTruthy()
      expect(wrapper.vm.selectedCategory).toEqual(category)
      expect(title.text()).toBe(
        `Oh No! There are no latest recipes for the category ${category?.label}`
      )
    })
  })
})
