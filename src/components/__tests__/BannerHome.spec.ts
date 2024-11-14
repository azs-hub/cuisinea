import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BannerHome from '@/components/home/BannerHome.vue'
import { RecipeCategory } from '@/types/Recipe'
import { getFakeAllCategoriesRecipes } from '@/mocks/recipe.mock'
import { router } from './mock-router'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useRecipesStore } from '@/stores/recipes'

const recipesCategories: RecipeCategory[] = getFakeAllCategoriesRecipes()

vi.mock('@/utilities/services/RecipeService', () => ({
  getAllRecipeCategories: () => recipesCategories,
}))

const selectedCategory: RecipeCategory = recipesCategories[0]

const mockGlobalOptions = () => {
  return {
    global: {
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
        }),
      ],
      renderStubDefaultSlot: true,
      stubs: ['IconTomato', 'IconCabbage', 'IconCarrot', 'IconLine', 'PvButton'],
    },
  }
}

describe('BannerHome', () => {
  let recipesStore: any = null

  beforeEach(() => {
    vi.clearAllMocks()
    // vi.mocked(getAllRecipeCategories).mockReset()

    setActivePinia(createPinia())
    recipesStore = useRecipesStore()
  })

  it('Displays the Banner', () => {
    const wrapper = mount(BannerHome, mockGlobalOptions())
    const previewContainer = wrapper.find('[data-testid="home-banner"]')
    expect(previewContainer.exists()).toBeTruthy()
  })

  it('Fetch all categories', async () => {
    mount(BannerHome, mockGlobalOptions())
    expect(recipesStore.categories).toEqual(recipesCategories)
  })

  it('Select and Unselect a Category when click on category button', () => {
    const wrapper = mount(BannerHome, mockGlobalOptions())
    const categoryBtn = wrapper.findComponent('pv-button-stub')

    expect(categoryBtn.exists()).toBeTruthy()
    expect(recipesStore.isCategorySelected).toBeFalsy()
    expect(categoryBtn.attributes('label')).toBe(selectedCategory.label)

    categoryBtn.trigger('click')

    expect(recipesStore.isCategorySelected).toBeTruthy()
    expect(recipesStore.getSelectedCategory).toStrictEqual(selectedCategory)

    categoryBtn.trigger('click')
    expect(recipesStore.isCategorySelected).toBeFalsy()
    expect(recipesStore.getSelectedCategory).toStrictEqual({} as RecipeCategory)
  })
})
