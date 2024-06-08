import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'
import { Recipe } from '@/types/Recipe'
import { getFakeRecipes } from '@/mocks/recipe.mock'
import { router } from './mock-router'

const recipes: Recipe[] = getFakeRecipes(5)

describe('NavBar', () => {
  it('Displays the list of recipe', () => {
    const wrapper = mount(NavBar, {
      props: { recipes: recipes },
      global: {
        plugins: [router],
        stubs: ['PvMenubar', 'PvDropdown', 'PvInputText', 'PvAvatar'],
        directives: {
          ripple() {
            /* stub */
          },
        },
      },
    })

    const previewContainer = wrapper.find('[data-testid="navbar"]')

    expect(previewContainer.exists()).toBeTruthy()
  })
})
