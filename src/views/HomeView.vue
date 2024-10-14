<template>
  <div data-testid="home-view">
    <BannerHome
      :selectedCategory="state.selectedCategory"
      @set-selected-category="recipesStore.setSelectedCategory"
    />
    <div class="container mx-auto mt-10 w-2/4">
      <LatestRecipes
        :recipes="recipesStore.sortedRecipesByCategory"
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
// import { getLatestRecipes } from '@/utilities/services/recipe'
import { useRecipesStore } from '@/stores/recipes'

interface HomeView {
  selectedCategory?: RecipeCategory
  // recipes: Recipe[]
}

/*
  Store
*/
const recipesStore = useRecipesStore()

/*
  Refs
*/
const state: HomeView = reactive({
  selectedCategory: undefined,
  // recipes: [] as Recipe[],
})

/*
  Hooks
*/
onBeforeMount(async () => {
  // shall get recipes with api
  await recipesStore.getLatestRecipes(2)
  // console.log(state.recipes)
})

/*
  Methods
*/
// const checkCategorySelectedId = (category: RecipeCategory): boolean =>
//   state.selectedCategory?.id === category.id

// const recipesStore.setSelectedCategory = (category: RecipeCategory): void => {
//   state.selectedCategory = checkCategorySelectedId(category) ? undefined : category
// }
/*
  Computed
*/
const sortedRecipesByCategory = computed<Recipe[]>(() => {
  if (!state.selectedCategory?.id) return state.recipes

  return state.recipes.filter((recipe) =>
    recipe.tags.some((tag) => tag.id === state.selectedCategory?.id)
  )
})
</script>

<style scoped></style>
