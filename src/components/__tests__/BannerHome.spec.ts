import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BannerHome from '@/components/home/BannerHome.vue'
import { RecipeCategory } from '@/types/Recipe'
import { getFakeAllCategoriesRecipes } from '@/mocks/recipe.mock'
import { router } from './mock-router'
import { setActivePinia, createPinia } from 'pinia'

const recipesCategories: RecipeCategory[] = getFakeAllCategoriesRecipes()
const selectedCategory: RecipeCategory = recipesCategories[0]

describe('BannerHome', () => {
  let wrapper: any

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(BannerHome, {
      props: { selectedCategory },
      global: {
        plugins: [router],
        stubs: ['IconTomato', 'IconCabbage', 'IconCarrot', 'IconLine', 'PvButton'],
      },
    })
  })

  it('Displays the Banner', () => {
    const previewContainer = wrapper.find('[data-testid="home-banner"]')
    expect(previewContainer.exists()).toBeTruthy()
  })

  // it('Emit the Selected Category when click on category button', () => {
  //   const category = wrapper.findComponent('pv-button-stub')

  //   expect(category.exists()).toBeTruthy()

  //   category.trigger('click')

  //   expect(wrapper.emitted()['set-selected-category']).toHaveLength(1)
  //   expect(wrapper.emitted()).toHaveProperty('set-selected-category')
  //   expect(wrapper.emitted()['set-selected-category'][0]).toStrictEqual([selectedCategory])
  // })
})
