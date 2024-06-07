<template>
  <div
    v-for="recipe in recipes"
    :key="recipe.id"
  >
    <RecipeCard
      :recipe="recipe"
      class="mb-5"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecipeCard from '@/components/recipes/CardRecipes.vue'
import type { Recipe } from '@/types/Recipe'

export default defineComponent({
  name: 'RecipesList',
  components: {
    RecipeCard,
  },
  props: {
    recipes: {
      type: Object as () => Recipe[],
      required: true,
    },
  },
})
</script>
