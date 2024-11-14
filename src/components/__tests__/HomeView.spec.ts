import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { router } from './mock-router'
import { setActivePinia, createPinia } from 'pinia'
// import { RecipeCategory } from '@/types/Recipe'
// import { getFakeRecipes } from '@/mocks/recipe.mock'

// const mockRecipes = getFakeRecipes(5)
// mockRecipes[0].tags[0].id = 'test'
// mockRecipes[0].tags[0].label = 'Test'
// const category: RecipeCategory = { id: 'test', label: 'Test' }

// vi.mock('@/utilities/services/RecipeService', () => ({
//   getLatestRecipes: () => mockRecipes,
// }))

describe('HomeView', () => {
  beforeEach(async () => {
    vi.resetAllMocks()
    setActivePinia(createPinia())
  })

  it('Displays the wrapper', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        stubs: ['RecipeList', 'BannerHome', 'PvPanel', 'PvButton', 'LatestRecipes'],
      },
    })
    const container = wrapper.find('[data-testid="home-view"]')
    expect(container.exists()).toBeTruthy()
  })

  // it('Displays all recipes when no categry is select', async () => {
  //   const wrapper = mount(HomeView, {
  //     global: {
  //       plugins: [router],
  //       stubs: ['RecipeList', 'BannerHome', 'PvPanel', 'PvButton', 'LatestRecipes'],
  //     },
  //   })

  //   expect(wrapper.vm.state.selectedCategory).toEqual(undefined)
  //   expect(wrapper.vm.sortedRecipes).toHaveLength(mockRecipes.length)
  // })

  // it('Displays recipes for specific category', async () => {
  //   const wrapper = mount(HomeView, {
  //     global: {
  //       plugins: [router],
  //       stubs: ['RecipeList', 'BannerHome', 'PvPanel', 'PvButton', 'LatestRecipes'],
  //     },
  //   })

  //   expect(wrapper.vm.state.selectedCategory).toEqual(undefined)
  //   await wrapper.vm.setSelectedCategory(category)
  //   expect(wrapper.vm.state.selectedCategory).toEqual(category)
  //   expect(wrapper.vm.sortedRecipes).toContainEqual(mockRecipes[0])
  // })
})
