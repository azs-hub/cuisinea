import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecipeList from '@/components/recipes/RecipeList.vue'
import { Recipe } from '@/types/Recipe'
import { getFakeRecipes } from '@/mocks/recipe.mock'
import { router } from './mock-router'

const recipes: Recipe[] = getFakeRecipes(5)

describe('RecipeList', () => {
  it('Displays the list of recipe', () => {
    const wrapper = mount(RecipeList, {
      props: { recipes: recipes },
      global: {
        mocks: {
          ['$primevue']: {
            config: {
              ripple: true,
            },
          },
        },
        plugins: [router],
        stubs: ['CardRecipe', 'PvTag'],
      },
    })

    const previewContainer = wrapper.find('[data-testid="recipe-list-container"]')
    const CardRecipe = wrapper.findAll('card-recipe-stub')

    expect(previewContainer.exists()).toBeTruthy()
    expect(CardRecipe).toHaveLength(recipes.length)
  })
})
