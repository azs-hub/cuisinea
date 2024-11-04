import { defineStore } from 'pinia'
import { Recipe, RecipeCategory } from '@/types/Recipe'
import {
  getLatestRecipes as getLatestRecipeService,
  getAllRecipeCategories,
} from '@/utilities/services/recipe'

interface State {
  recipeList: Recipe[]
  latestRecipes: Recipe[]
  selectedCategory: RecipeCategory
  categories: RecipeCategory[]
}
const initialState: State = {
  recipeList: [] as Recipe[],
  latestRecipes: [] as Recipe[],
  selectedCategory: {} as RecipeCategory,
  categories: [] as RecipeCategory[],
}

export const useRecipesStore = defineStore({
  id: 'RecipesStore',
  state: () => initialState,
  actions: {
    async fetchLatestRecipes(listLength: number = 5): Promise<void> {
      this.latestRecipes = await getLatestRecipeService(listLength)
    },
    async fetchAllCategories(): Promise<void> {
      this.categories = await getAllRecipeCategories()
    },
    setSelectedCategory(category: RecipeCategory): void {
      const isCategoryExist = this.selectedCategory?.id === category.id
      this.selectedCategory = isCategoryExist ? ({} as RecipeCategory) : category
    },
  },
  getters: {
    getLatestRecipesByCategory: (state: State): Recipe[] => {
      if (!state.selectedCategory?.id) return state.latestRecipes

      return state.latestRecipes?.filter((recipe) =>
        recipe.tags.some((tag) => tag.id === state.selectedCategory?.id)
      )
    },
    getSelectedCategory: (state: State): RecipeCategory => state.selectedCategory,
    isCategorySelected: (state: State): Boolean => !!state.selectedCategory?.id,
    getLatestRecipes: (state: State): Recipe[] => state.latestRecipes,
    isLatestRecipesAvailable(): Boolean {
      return this.getLatestRecipesByCategory.length > 0
    },
    checkSelectedCategory: (state: State) => (id: string) => state.selectedCategory?.id === id,
  },
})
