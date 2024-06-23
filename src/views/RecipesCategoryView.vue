<template>
  <div class="recipes-category">
    <div class="container mx-auto mt-10">
      <div class="flex justify-center">
        <div class="w-2/3 mb-5">
          <div class="recipes-category__title">
            <h1
              class="h1"
              v-html="recipesViewTitle"
            ></h1>
            <h2 class="h3">{{ recipesViewSubTitle }}</h2>
          </div>
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
const recipesViewTitle = computed<string>(
  () =>
    `Discover all our <span class='recipes-category__title--underline'>${currentCategory?.value.label}</span> Recipes`
)
const recipesViewSubTitle = computed<string>(() => `${recipes.value.length} Recipes`)
</script>

<style lang="scss">
.recipes-category {
  &__title {
    @apply mb-9;

    .h1 {
      @apply text-red-900 font-thin mb-2;
    }

    &--underline {
      @apply underline;
    }
  }
}
</style>
