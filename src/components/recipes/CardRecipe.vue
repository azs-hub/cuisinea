<template>
  <div
    class="container card-recipe"
    data-testid="card-recipe"
  >
    <article
      v-if="recipe?.id"
      class="card"
    >
      <h3 class="card-recipe__title">
        <RouterLink
          :to="{ name: 'recipe', params: { id: recipe.id } }"
          data-testid="card-recipe-title-link"
        >
          {{ recipe.name }}
        </RouterLink>
      </h3>
      <img
        :src="recipe.image"
        alt="post-thumb"
      />

      <div>
        <TagRecipe :tags="recipe.tags" />
        <p class="card-recipe__description">{{ recipe.shortDescription }}</p>
        <RouterLink
          :to="{ name: 'recipe', params: { id: recipe.id } }"
          data-testid="card-recipe-btn-link"
        >
          <PvButton label="MAKE IT"
        /></RouterLink>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/Recipe'
import TagRecipe from '@/components/recipes/TagRecipe.vue'

defineProps<{
  recipe: Recipe
}>()
</script>

<style scoped lang="scss">
.card-recipe {
  @apply bg-slate-50 p-7;

  &__title {
    @apply uppercase text-red-700 mb-5 text-2xl font-semibold;
  }
  &__description {
    @apply text-xl mb-5;
  }
}
</style>
