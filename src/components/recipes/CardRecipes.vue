<template>
  <div
    class="container"
    data-testid="recipe-card-container"
  >
    <article class="card p-5">
      <div class="post-slider slider-sm">
        <img
          :src="recipe.image"
          class="card-img-top"
          alt="post-thumb"
        />
      </div>

      <div class="card-body">
        <h3 class="h3 my-5">
          <RouterLink :to="{ name: 'recipe', params: { id: recipe.id } }">
            {{ recipe.name }}
          </RouterLink>
        </h3>
        <ul class="card-meta list-inline">
          <li
            v-for="tag in recipe.tags"
            :key="tag.id"
            class="list-inline-item"
          >
            <RouterLink :to="{ name: 'recipesCategory', params: { categoryId: tag.id } }">
              <PvTag
                :value="tag.label"
                severity="secondary"
              ></PvTag>
            </RouterLink>
          </li>
        </ul>
        <p class="mb-5">{{ recipe.shortDescription }}</p>
        <RouterLink
          :to="{ name: 'recipe', params: { id: recipe.id } }"
          class="btn btn-primary"
          >Make it</RouterLink
        >
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import type { Recipe } from '@/types/Recipe'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object as () => Recipe,
      required: true,
    },
  },
})
</script>
<style></style>
