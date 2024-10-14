import { defineStore } from 'pinia'
import { Recipe, RecipeCategory } from '@/types/Recipe'
import { getLatestRecipes as getLatestRecipeService } from '@/utilities/services/recipe'

interface State {
  recipeList: Recipe[]
  latestRecipes: Recipe[]
  selectedCategory: RecipeCategory
}
const initialState: State = {
  recipeList: [],
  latestRecipes: [] as Recipe[],
  selectedCategory: {} as RecipeCategory,
}

export const useRecipesStore = defineStore({
  id: 'store',
  state: () => initialState,
  actions: {
    async fetchLatestRecipes(listLength: number = 5): Promise<void> {
      this.latestRecipes = await getLatestRecipeService(listLength)
    },
    setSelectedCategory: (state: State, category: RecipeCategory): void => {
      const isCategoryExist = state.selectedCategory?.id === category.id
      state.selectedCategory = isCategoryExist ? ({} as RecipeCategory) : category
    },
  },
  getters: {
    sortedRecipesByCategory: (state: State): Recipe[] => {
      if (!state.selectedCategory?.id) return state.recipeList

      return state.recipeList?.filter((recipe) =>
        recipe.tags.some((tag) => tag.id === state.selectedCategory?.id)
      )
    },
    getSelectedCategory: (state: State): RecipeCategory => state.selectedCategory,
    getLatestRecipes: (state: State): Recipe[] => state.latestRecipes,
  },
})
