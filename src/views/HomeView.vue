<template>
  <div data-testid="home-view">
    <BannerHome
      :selectedCategory="state.selectedCategory"
      @set-selected-category="setSelectedCategory"
    />
    <div class="container mx-auto mt-10 w-2/4">
      <LatestRecipes
        :recipes="sortedRecipes"
        :selectedCategory="state.selectedCategory"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onBeforeMount } from 'vue'
import BannerHome from '@/components/home/BannerHome.vue'
import LatestRecipes from '@/components/recipes/LatestRecipes.vue'
import { Recipe, RecipeCategory } from '@/types/Recipe'
import { getLatestRecipes } from '@/utilities/services/recipe'

interface HomeView {
  selectedCategory?: RecipeCategory
  recipes: Recipe[]
}

/*
  Refs
*/
const state: HomeView = reactive({
  selectedCategory: undefined,
  recipes: [] as Recipe[],
})

/*
  Hooks
*/
onBeforeMount(() => {
  // shall get recipes with api
  state.recipes = getLatestRecipes(2)
})

/*
  Methods
*/
const checkCategorySelectedId = (category: RecipeCategory): boolean =>
  state.selectedCategory?.id === category.id

const setSelectedCategory = (category: RecipeCategory): void => {
  state.selectedCategory = checkCategorySelectedId(category) ? undefined : category
}
/*
  Computed
*/
const sortedRecipes = computed<Recipe[]>(() => {
  if (!state.selectedCategory?.id) return state.recipes

  return state.recipes.filter((recipe) =>
    recipe.tags.some((tag) => tag.id === state.selectedCategory?.id)
  )
})
</script>

<style scoped></style>
