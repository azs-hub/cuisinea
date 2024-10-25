import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LatestRecipes from '@/components/recipes/LatestRecipes.vue'
import { router } from './mock-router'
import { Layout, RecipeCategory } from '@/types/Recipe'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useRecipesStore } from '@/stores/recipes'
import { nextTick } from 'vue'

const categoryMock: RecipeCategory = {
  id: 'id',
  label: 'Main',
}

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
      stubs: ['RecipeList', 'PvButton', 'PvPanel', 'PvChip'],
    },
  }
}

describe('LatestRecipes', () => {
  let recipesStore: any = null
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Displays the wrapper', async () => {
    recipesStore = useRecipesStore()
    const wrapper = mount(LatestRecipes, mockGlobalOptions())
    await nextTick()

    expect(recipesStore.isLatestRecipesAvailable).toBeTruthy()
    const container = wrapper.find('[data-testid="latest-recipes"]')

    expect(container.exists()).toBeTruthy()
  })

  describe('No category selected', () => {
    it('Displays the title for all recipes', async () => {
      recipesStore = useRecipesStore()
      const wrapper = mount(LatestRecipes, mockGlobalOptions())
      const title = wrapper.find('[data-testid="latest-recipes-title"]')
      await nextTick()
      expect(title.exists()).toBeTruthy()
      expect(recipesStore.isCategorySelected).toBeFalsy()
      expect(title.text()).toBe('Latest Recipes')
    })

    //   it('Displays the panel if no recipes available', () => {
    //     const wrapper = mount(LatestRecipes, mockGlobalOptions(undefined, [] as Recipe[]))
    //     const title = wrapper.find('[data-testid="latest-recipes-no-recipes"]')

    //     expect(title.exists()).toBeTruthy()
    //     expect(wrapper.vm.selectedCategory).toBe(undefined)
    //     expect(title.text()).toBe(`Oh No! There are no latest recipes`)
    //   })
  })
  describe('Category selected', () => {
    it('Displays the title for a selected category', async () => {
      recipesStore = useRecipesStore()
      recipesStore.setSelectedCategory(categoryMock)
      const wrapper = mount(LatestRecipes, mockGlobalOptions())
      const title = wrapper.find('[data-testid="latest-recipes-title-category"]')

      await nextTick()

      expect(title.exists()).toBeTruthy()
      expect(recipesStore.isCategorySelected).toBeTruthy()
      expect(recipesStore.getSelectedCategory).toEqual(categoryMock)
    })
    //   it('Displays the panel when no recipes available', () => {
    //     const wrapper = mount(LatestRecipes, mockGlobalOptions(category, [] as Recipe[]))
    //     const title = wrapper.find('[data-testid="latest-recipes-no-recipes"]')

    //     expect(title.exists()).toBeTruthy()
    //     expect(wrapper.vm.selectedCategory).toEqual(category)
    //     expect(title.text()).toBe(
    //       `Oh No! There are no latest recipes for the category ${category?.label}`
    //     )
    //   })
    //   it('Displays the category page button when no recipes available', () => {
    //     const wrapper = mount(LatestRecipes, mockGlobalOptions(category, [] as Recipe[]))
    //     const btn = wrapper.find('[data-testid="latest-recipes-category-page-btn"]')

    //     expect(btn.exists()).toBeTruthy()
    //     expect(wrapper.vm.selectedCategory).toEqual(category)
    //     expect(btn.text()).toBe(`Go checkout all our ${category?.label} recipes.`)
    //   })
    //   it('Go to category page', async () => {
    //     const wrapper = mount(LatestRecipes, mockGlobalOptions(category, [] as Recipe[]))
    //     const push = vi.spyOn(router, 'push')
    //     const btn = wrapper.find('[data-testid="latest-recipes-category-page-btn"]')

    //     await btn.trigger('click')

    //     expect(push).toHaveBeenCalledTimes(1)
    //     expect(push).toHaveBeenCalledWith({
    //       name: 'recipesCategory',
    //       params: {
    //         categoryId: category.id,
    //       },
    //     })
    //   })
  })
})
