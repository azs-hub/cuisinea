<template>
  <main>
    <BannerHome
      :selectedCategory="selectedCategory"
      @set-selected-category="setSelectedCategory"
    />
    <div class="container mx-auto mt-10">
      <div class="flex justify-center">
        <div class="w-2/3 mb-5">
          <h2 class="h2 section-title">{{ latestRecipesLabel }}</h2>
          <RecipeList
            v-if="isRecipesAvailable"
            :recipes="sortedRecipes"
          />
          <PvPanel v-else>
            <p>{{ noRecipesAvailableLabel }}</p>

            <RouterLink
              :to="{
                name: 'recipesCategory',
                params: { categoryId: selectedCategory?.id },
              }"
              target="_blank"
              rel="noopener"
            >
              <PvButton :label="noRecipesAvailableButtonLabel" />
            </RouterLink>
          </PvPanel>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

import BannerHome from '@/components/home/BannerHome.vue'
import RecipeList from '@/components/recipes/RecipeList.vue'

import { Recipe, RecipeCategory } from '@/types/Recipe'

import { getFakeRecipes } from '@/mocks/recipe.mock'

const recipes: Recipe[] = getFakeRecipes(5)

/*
  Refs
*/
const selectedCategory: Ref<RecipeCategory | undefined> = ref(undefined)

/*
  Methods
*/
const isCategorySelected = (category: RecipeCategory): boolean => {
  return selectedCategory.value?.id === category.id
}
const setSelectedCategory = (category: RecipeCategory): void => {
  console.log('ete')
  const res = isCategorySelected(category) ? ({} as RecipeCategory) : category
  selectedCategory.value = res
}
/*
  Computed
*/
const sortedRecipes = computed<Recipe[]>(() => {
  if (!selectedCategory?.value?.id) return recipes

  return recipes.filter((recipe) =>
    recipe.tags.some((tag) => tag.id === selectedCategory?.value?.id)
  )
})
const isRecipesAvailable = computed<boolean>(() => {
  return !!sortedRecipes.value.length
})
const latestRecipesLabel = computed<string>(() => {
  return !selectedCategory.value
    ? 'Latest Recipes'
    : `Latest ${selectedCategory.value.label} Recipes`
})
const noRecipesAvailableLabel = computed<string>(() => {
  return `Oh No! There are no latest recipe for the category ${selectedCategory?.value?.label}`
})
const noRecipesAvailableButtonLabel = computed<string>(() => {
  return `Go checkout all our ${selectedCategory?.value?.label} recipes.`
})
</script>

<style scoped></style>
