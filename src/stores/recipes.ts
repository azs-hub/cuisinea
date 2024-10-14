// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Recipe, RecipeCategory } from '@/types/Recipe'
import { getLatestRecipes as getLatestRecipeService } from '@/utilities/services/recipe'

interface State {
  recipeList: Recipe[]
  selectedCategory: RecipeCategory | null
}
const initialState: State = {
  recipeList: [],
  selectedCategory: {} as RecipeCategory,
}

export const useRecipesStore = defineStore({
  id: 'store',
  state: () => initialState,
  actions: {
    async getLatestRecipes(listLength: number = 5): Promise<void> {
      this.recipeList = await getLatestRecipeService(listLength)
    },
    setSelectedCategory: (state: State, category: RecipeCategory): void => {
      const isCategoryExist = state.selectedCategory?.id === category.id
      state.selectedCategory = isCategoryExist ? null : category
    },
  },
  getters: {
    sortedRecipesByCategory: (state: State): Recipe[] => {
      console.log('anais', state.recipeList)
      if (!state.selectedCategory?.id) return state.recipeList

      return state.recipeList?.filter((recipe) =>
        recipe.tags.some((tag) => tag.id === state.selectedCategory?.id)
      )
    },
  },
})
