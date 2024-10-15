<template>
  <div
    class="latest-recipes"
    data-testid="latest-recipes"
  >
    <div class="mb-5">
      <h2
        v-if="!recipesStore.isCategorySelected"
        class="latest-recipes__title"
        data-testid="latest-recipes-title"
        >Latest Recipes</h2
      >
      <div
        class="latest-recipes__title"
        v-else
      >
        <h2>Latest recipes for</h2>
        <PvChip
          :label="recipesStore.getSelectedCategory.label"
          @remove="recipesStore.setSelectedCategory({} as RecipeCategory)"
          removable
      /></div>

      <RecipeList
        v-if="recipesStore.isLatestRecipesAvailable"
        :recipes="recipesStore.getLatestRecipesByCategory"
      />
      <PvPanel v-else>
        <p data-testid="latest-recipes-no-recipes">{{ noRecipesAvailableLabel }}</p>

        <RouterLink
          v-if="recipesStore.getSelectedCategory?.id"
          :to="{
            name: 'recipesCategory',
            params: { categoryId: recipesStore.getSelectedCategory?.id },
          }"
          class="btn btn-primary"
          data-testid="latest-recipes-category-page-btn"
        >
          <PvButton
            :label="noRecipesAvailableButtonLabel"
            link
          />
        </RouterLink>
      </PvPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue'
import RecipeList from '@/components/recipes/RecipeList.vue'
import { useRecipesStore } from '@/stores/recipes'
import { RecipeCategory } from '@/types/Recipe'

/*
  Store
*/
const recipesStore = useRecipesStore()

/*
  Computed
*/
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
  await recipesStore.fetchLatestRecipes(5)
})
</script>

<style scoped lang="scss">
.latest-recipes {
  @apply flex justify-center;

  &__title {
    @apply relative uppercase mb-9 tracking-wider text-red-800 font-semibold inline-flex items-center;

    &::before {
      @apply absolute left-0 bg-red-800;
      bottom: -8px;
      content: '';
      height: 2px;
      width: 60px;
    }
    .p-chip {
      @apply my-0 ml-4 p-2 text-red-800 text-sm;
    }
  }
}
</style>
