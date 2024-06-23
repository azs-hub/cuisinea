<template>
  <div
    class="container card-recipe"
    data-testid="card-recipe"
  >
    <article
      v-if="recipe?.id"
      class="card p-5"
    >
      <div>
        <img
          :src="recipe.image"
          alt="post-thumb"
        />
      </div>

      <div>
        <h3 class="h3 card-recipe__title">
          <RouterLink
            :to="{ name: 'recipe', params: { id: recipe.id } }"
            data-testid="card-recipe-title-link"
          >
            {{ recipe.name }}
          </RouterLink>
        </h3>
        <TagsRecipe :tags="recipe.tags" />
        <p class="card-recipe__description">{{ recipe.shortDescription }}</p>
        <RouterLink
          :to="{ name: 'recipe', params: { id: recipe.id } }"
          class="btn btn-primary"
          data-testid="card-recipe-btn-link"
          >Make it</RouterLink
        >
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/Recipe'
import TagsRecipe from '@/components/recipes/TagRecipe.vue'

defineProps<{
  recipe: Recipe
}>()
</script>

<style scoped lang="scss">
.card-recipe {
  &__title {
    @apply capitalize text-red-500 my-5 text-3xl;
  }
  &__description {
    @apply text-xl mb-5;
  }
}
</style>
