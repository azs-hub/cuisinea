import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LatestRecipes from '@/components/recipes/LatestRecipes.vue'
import { router } from './mock-router'
import { Layout, RecipeCategory } from '@/types/Recipe'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useRecipesStore } from '@/stores/recipes'
import { getFakeAllCategoriesRecipes, getFakeRecipes } from '@/mocks/recipe.mock'

const recipesCategories: RecipeCategory[] = getFakeAllCategoriesRecipes()

let mockLatestRecipes = getFakeRecipes(5)

const categoryMock: RecipeCategory = {
  id: 'id',
  label: 'Main',
}

vi.mock('@/utilities/services/RecipeService', () => ({
  getAllRecipeCategories: () => recipesCategories,
  getLatestRecipes: () => mockLatestRecipes,
}))

const mockGlobalOptions = (layout: Layout | undefined = undefined) => {
  return {
    props: { layout },
    global: {
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
        }),
      ],
      renderStubDefaultSlot: true,
      stubs: ['RecipeList', 'PvButton', 'PvPanel', 'PvChip', 'PvCarousel'],
    },
  }
}

describe('LatestRecipes', () => {
  let recipesStore: any = null

  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
    recipesStore = useRecipesStore()
  })

  it('Displays the wrapper', () => {
    const wrapper = mount(LatestRecipes, mockGlobalOptions())
    const container = wrapper.find('[data-testid="latest-recipes"]')

    expect(container.exists()).toBeTruthy()
  })

  describe('When there are latest recipes', () => {
    it('Displays the title for all recipes', () => {
      const wrapper = mount(LatestRecipes, mockGlobalOptions())
      const title = wrapper.find('[data-testid="latest-recipes-title"]')

      expect(title.exists()).toBeTruthy()
      expect(recipesStore.isCategorySelected).toBeFalsy()
      expect(title.text()).toBe('Latest Recipes')
    })

    it('Displays the title for a selected category', () => {
      recipesStore.setSelectedCategory(categoryMock)
      const wrapper = mount(LatestRecipes, mockGlobalOptions())

      const title = wrapper.find('[data-testid="latest-recipes-title-category"]')

      expect(title.exists()).toBeTruthy()
      expect(recipesStore.isCategorySelected).toBeTruthy()
      expect(recipesStore.getSelectedCategory).toEqual(categoryMock)
    })

    it('Displays the Carousel component', () => {
      recipesStore.setSelectedCategory({} as RecipeCategory)
      const wrapper = mount(LatestRecipes, mockGlobalOptions(Layout.carousel))

      const component = wrapper.find('[data-testid="latest-recipes-list-layout-component"]')

      expect(component.exists()).toBeTruthy()
      expect(component.attributes('data-ref')).toBe(Layout.carousel)
    })
    it('Displays the Grid component', () => {
      recipesStore.setSelectedCategory({} as RecipeCategory)
      const wrapper = mount(LatestRecipes, mockGlobalOptions(Layout.grid))

      const component = wrapper.find('[data-testid="latest-recipes-list-layout-component"]')

      expect(component.exists()).toBeTruthy()
      expect(component.attributes('data-ref')).toBe(Layout.grid)
    })
    it('Displays the List component', () => {
      recipesStore.setSelectedCategory({} as RecipeCategory)
      const wrapper = mount(LatestRecipes, mockGlobalOptions(Layout.list))

      const component = wrapper.find('[data-testid="latest-recipes-list-layout-component"]')

      expect(component.exists()).toBeTruthy()
      expect(component.attributes('data-ref')).toBe(Layout.list)
    })
  })

  describe('When there are no latest recipes', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      mockLatestRecipes = []
      recipesStore.fetchLatestRecipes(0)
    })

    it('Display the notification for no recipes', async () => {
      recipesStore.setSelectedCategory({} as RecipeCategory)
      const wrapper = mount(LatestRecipes, mockGlobalOptions())

      const title = wrapper.find('[data-testid="latest-recipes-no-recipes"]')

      expect(recipesStore.isLatestRecipesAvailable).toBe(false)
      expect(recipesStore.isCategorySelected).toBeFalsy()
      expect(title.exists()).toBeTruthy()
      expect(title.text()).toBe('Oh No! There are no latest recipes')
    })

    it('Displays the notification for no recipes for this category', async () => {
      recipesStore.setSelectedCategory(categoryMock)
      const wrapper = mount(LatestRecipes, mockGlobalOptions())

      const title = wrapper.find('[data-testid="latest-recipes-no-recipes"]')

      expect(title.exists()).toBeTruthy()
      expect(title.text()).toBe(
        `Oh No! There are no latest recipes for the category ${categoryMock?.label}`
      )
    })

    it('Diaply the button for all recipes of this category and redirect to the page', async () => {
      const wrapper = mount(LatestRecipes, mockGlobalOptions())
      const push = vi.spyOn(router, 'push')
      const btn = wrapper.find('[data-testid="latest-recipes-category-page-btn"]')
      await btn.trigger('click')
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith({
        name: 'recipesCategory',
        params: {
          categoryId: categoryMock.id,
        },
      })
    })
  })
})
