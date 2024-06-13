<template>
  <div class="recipes">
    <div class="container mx-auto mt-10">
      <div class="flex justify-center">
        <div class="w-2/3 mb-5">
          <h1 class="h1">{{ currentCategory?.label }}</h1>
          <h2 class="h3">{{ recipesViewTitle }}</h2>
          <RecipesList
            v-if="isRecipesAvailable"
            :recipes="recipes"
          />
          <PvPanel v-else>
            <p>No recipes available</p>
          </PvPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Recipe, RecipeCategory } from '@/types/Recipe'
import { getRecipesByCategoryId, getRecipeCategory } from '@/utilities/services/recipe'
import { useRoute } from 'vue-router'
import RecipesList from '@/components/recipes/RecipeList.vue'

const route = useRoute()
const categoryId: string = route.params.categoryId

/*
  Computed
*/

const currentCategory = computed<RecipeCategory>(() => getRecipeCategory(categoryId))
const recipes = computed<Recipe[]>(() => getRecipesByCategoryId(categoryId))
const isRecipesAvailable = computed<boolean>(() => !!recipes.value.length)
const recipesViewTitle = computed<string>(() => `${recipes.value.length} Recipes`)
</script>

<style></style>
