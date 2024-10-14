<template>
  <div
    class="latest-recipes"
    data-testid="latest-recipes"
  >
    <div class="mb-5">
      <h2
        class="latest-recipes__title"
        data-testid="latest-recipes-title"
        >{{ latestRecipesLabel }}</h2
      >
      <RecipeList
        v-if="isRecipesAvailable"
        :recipes="recipesStore.getLatestRecipes"
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
import { onBeforeMount, computed } from 'vue'
import RecipeList from '@/components/recipes/RecipeList.vue'
import { useRecipesStore } from '@/stores/recipes'

/*
  Store
*/
const recipesStore = useRecipesStore()

/*
  Computed
*/
const isRecipesAvailable = computed<boolean>(() => {
  return !!recipesStore.getLatestRecipes
})
const latestRecipesLabel = computed<string>(() => {
  return !recipesStore.getSelectedCategory
    ? 'Latest Recipes'
    : `Latest ${recipesStore.getSelectedCategory?.label} Recipes`
})
const noRecipesAvailableLabel = computed<string>(() => {
  return recipesStore.getSelectedCategory
    ? `Oh No! There are no latest recipes for the category ${recipesStore.getSelectedCategory?.label}`
    : 'Oh No! There are no latest recipes'
})
const noRecipesAvailableButtonLabel = computed<string>(() => {
  return `Go checkout all our ${recipesStore.getSelectedCategory?.label} recipes.`
})

/*
  Hooks
*/
onBeforeMount(async () => {
  // shall get recipes with api
  await recipesStore.fetchLatestRecipes(2)
})
</script>

<style scoped lang="scss">
.latest-recipes {
  @apply flex justify-center;

  &__title {
    @apply relative uppercase mb-9 tracking-wider text-red-800 text-2xl font-semibold;

    &::before {
      @apply absolute left-0 bg-red-800;
      bottom: -8px;
      content: '';
      height: 2px;
      width: 60px;
    }
  }
}
</style>
