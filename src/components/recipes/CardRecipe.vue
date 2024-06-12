<template>
  <div
    class="container"
    data-testid="recipe-card"
  >
    <article
      v-if="recipe?.id"
      class="card p-5"
    >
      <div class="post-slider slider-sm">
        <img
          :src="recipe.image"
          class="card-img-top"
          alt="post-thumb"
        />
      </div>

      <div class="card-body">
        <h3 class="h3 my-5">
          <RouterLink
            :to="{ name: 'recipe', params: { id: recipe.id } }"
            data-testid="recipe-card-title-link"
          >
            {{ recipe.name }}
          </RouterLink>
        </h3>
        <ul class="card-meta list-inline">
          <li
            v-for="tag in recipe.tags"
            :key="tag.id"
            class="list-inline-item"
          >
            <RouterLink
              :to="{ name: 'recipesCategory', params: { categoryId: tag.id } }"
              data-testid="recipe-card-category-link"
            >
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
          data-testid="recipe-card-btn-link"
          >Make it</RouterLink
        >
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/Recipe'

defineProps<{
  recipe: Recipe
}>()
</script>
<style></style>
