import { getFakeRecipes, getFakeRecipe } from '@/mocks/recipe.mock'
import type { Recipe } from '@/types/Recipe'

export const getLatestRecipes = (listLength = 5): Recipe[] => getFakeRecipes(listLength)

export const getRecipe = (id: string): Recipe => getFakeRecipe(id)
