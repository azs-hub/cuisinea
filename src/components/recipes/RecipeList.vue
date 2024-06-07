<template>
  <div
    v-for="recipe in recipes"
    :key="recipe.id"
    data-testid="recipe-list-container"
  >
    <CardRecipe
      :recipe="recipe"
      class="mb-5"
    />
  </div>
</template>

<script setup lang="ts">
import CardRecipe from '@/components/recipes/CardRecipe.vue'
import type { Recipe } from '@/types/Recipe'

defineProps<{
  recipes: Recipe[]
}>()
</script>
