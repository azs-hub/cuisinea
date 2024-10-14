import {
  getFakeRecipes,
  getFakeRecipe,
  getFakeRecipesByCategoryId,
  getCategoryRecipeById,
} from '@/mocks/recipe.mock'
import type { Recipe, RecipeCategory } from '@/types/Recipe'

export const getLatestRecipes = async (listLength = 5): Promise<Recipe[]> => {
  console.log('hello', listLength)
  return await getFakeRecipes(listLength)
}

export const getRecipesByCategoryId = (categoryId: string): Recipe[] =>
  getFakeRecipesByCategoryId(categoryId, 5)

export const getRecipe = (id: string): Recipe => getFakeRecipe(id)

export const getRecipeCategory = (id: string): RecipeCategory | undefined =>
  getCategoryRecipeById(id)
