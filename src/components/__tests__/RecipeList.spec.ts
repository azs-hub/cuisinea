import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecipeList from '@/components/recipes/RecipeList.vue'
import { Recipe } from '@/types/Recipe'
import { getFakeRecipes } from '@/mocks/recipe.mock'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

// Testing the real router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const recipes: Recipe[] = getFakeRecipes(5)

describe('RecipeList', () => {
  it('Displays the list of recipe', () => {
    const wrapper = mount(RecipeList, {
      props: { recipes: recipes },
      global: {
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
