<template>
  <div
    class="recipe"
    data-testid="recipe-view"
  >
    <div class="container mx-auto mt-10">
      <div class="flex justify-center">
        <div class="w-2/3 mb-5">
          <h1 class="h1">{{ recipe.name }}</h1>

          <div class="recipe-card">
            <div class="mb-4">
              <img
                :src="recipe.image"
                alt="post-thumb"
              />
            </div>

            <TagsRecipe :tags="recipe.tags" />
            <p class="text-lg">{{ recipe.shortDescription }}</p>

            <h3 class="mt-8 mb-6 text-3xl text-red-500">
              <i class="pi pi-sparkles text-red-500"></i>
              Steps
            </h3>

            <ul class="card-meta list-inline">
              <li class="list-inline-item">
                <PvChip
                  :label="`${recipe.duration?.totalTimeMin} Min To Make`"
                  icon="pi pi-clock"
                />
              </li>
              <li class="list-inline-item">
                <PvChip
                  :label="`${recipe.level}`"
                  icon="pi pi-gauge"
                />
              </li>
              <li class="list-inline-item">
                <PvChip
                  :label="`${recipe.cost}`"
                  icon="pi pi-euro"
                />
              </li>
              <li class="list-inline-item">
                <PvChip
                  :label="`Serving ${recipe.serving}`"
                  icon="pi pi-user"
                />
              </li>
            </ul>

            <div
              class="block my-4"
              v-for="(step, index) in recipe.steps"
              :key="step.id"
            >
              <h4 class="h4 d-inline-block mb-3">{{ `Step ${index + 1}` }}</h4>
              <p>{{ step.description }}</p>
            </div>

            <hr />
            <h3 class="mt-8 mb-6 text-3xl text-red-500">
              <i class="pi pi-sparkles text-red-500"></i>
              Note from the author
            </h3>

            <p>{{ recipe.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Recipe } from '@/types/Recipe'
import { getRecipe } from '@/utilities/services/recipe'
import { useRoute } from 'vue-router'
import TagsRecipe from '@/components/recipes/TagRecipe.vue'

const route = useRoute()
/*
  Computed
*/
const recipe = computed<Recipe>(() => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  return getRecipe(id)
})
</script>

<style lang="scss" scoped>
.recipe-card {
  @apply bg-white p-5 rounded-md;
}

.p-chip-icon {
  @apply text-red-500 bg-slate-100;
}

.card-meta li:not(:last-child) {
  @apply border-r border-gray-300 pr-3;
}

.card-meta-tag {
  @apply mb-5;

  li {
    @apply text-base;
  }
}
</style>
