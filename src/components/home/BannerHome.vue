<template>
  <div
    class="home-banner text-center"
    data-testid="home-banner"
  >
    <div class="container mx-auto">
      <div class="flex flex-col">
        <h1 class="home-banner__title">What Would You Like<br />To Eat Today?</h1>
        <ul class="home-banner-categories">
          <li
            v-for="item in getRecipesCategories"
            :key="item.id"
            class="home-banner-categories__item"
          >
            <PvButton
              :label="item.label"
              @click="setSelectedCategory(item)"
              :class="{ selected: isCategorySelected(item) }"
              class="color"
              outlined
            />
          </li>
        </ul>
      </div>
    </div>

    <IconCarrot />
    <IconCabbage />
    <IconTomato />
    <IconLine />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconTomato from '@/components/home/IconTomato.vue'
import IconCabbage from '@/components/home/IconCabbage.vue'
import IconCarrot from '@/components/home/IconCarrot.vue'
import IconLine from '@/components/home/IconLine.vue'
import { getFakeAllCategoriesRecipes } from '@/mocks/recipe.mock'
import type { RecipeCategory } from '@/types/Recipe'
import { useRecipesStore } from '@/stores/recipes'

/*
  Store
*/
const recipesStore = useRecipesStore()

/*
  Computed
*/
const getRecipesCategories = computed<RecipeCategory[]>(() => getFakeAllCategoriesRecipes())

/*
  Methods
*/
const isCategorySelected = (category: RecipeCategory): boolean => {
  return recipesStore.getSelectedCategory?.id === category.id
}
const setSelectedCategory = (category: RecipeCategory): void => {
  recipesStore.setSelectedCategory(category)
}
</script>

<style scoped lang="scss">
.home-banner {
  @apply relative py-40;

  &__title {
    @apply mb-5 text-3xl font-black;
  }

  .container {
    @apply relative;
    z-index: 1;
  }

  &-categories {
    &__item {
      @apply inline-block mr-3;

      button {
        @apply py-1 px-4 border-red-900 border-2 rounded-full;

        &:hover,
        &.selected {
          @apply bg-red-900 text-white border-red-900 border-2;
        }
      }
    }
  }
}
</style>
