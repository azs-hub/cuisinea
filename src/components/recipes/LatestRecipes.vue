<template>
  <div
    class="flex justify-center"
    data-testid="latest-recipes"
  >
    <div class="mb-5">
      <h2
        class="h2 latest-recipes__title"
        data-testid="latest-recipes-title"
        >{{ latestRecipesLabel }}</h2
      >
      <RecipeList
        v-if="isRecipesAvailable"
        :recipes="recipes"
      />
      <PvPanel v-else>
        <p data-testid="latest-recipes-no-recipes">{{ noRecipesAvailableLabel }}</p>

        <RouterLink
          v-if="selectedCategory"
          :to="{
            name: 'recipesCategory',
            params: { categoryId: selectedCategory?.id },
          }"
          class="btn btn-primary"
          data-testid="latest-recipes-category-page-btn"
        >
          {{ noRecipesAvailableButtonLabel }}
        </RouterLink>
      </PvPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RecipeList from '@/components/recipes/RecipeList.vue'
import { Recipe, RecipeCategory } from '@/types/Recipe'

/*
  Props
*/
const props = defineProps<{
  recipes: Recipe[]
  selectedCategory?: RecipeCategory
}>()

/*
  Computed
*/
const isRecipesAvailable = computed<boolean>(() => {
  return !!props.recipes.length
})
const latestRecipesLabel = computed<string>(() => {
  return !props.selectedCategory
    ? 'Latest Recipes'
    : `Latest ${props.selectedCategory?.label} Recipes`
})
const noRecipesAvailableLabel = computed<string>(() => {
  return props.selectedCategory
    ? `Oh No! There are no latest recipes for the category ${props.selectedCategory?.label}`
    : 'Oh No! There are no latest recipes'
})
const noRecipesAvailableButtonLabel = computed<string>(() => {
  return `Go checkout all our ${props.selectedCategory?.label} recipes.`
})
</script>

<style scoped lang="scss">
.latest-recipes {
  &__title {
    @apply relative uppercase mb-4 tracking-wider text-red-500;

    &::before {
      @apply absolute left-0 bg-red-500;
      bottom: -8px;
      content: '';
      height: 2px;
      width: 60px;
    }
  }
}
</style>
