<template>
  <div
    class="recipe"
    data-testid="recipe-view"
  >
    <div class="container mx-auto mt-10">
      <div class="flex justify-center">
        <div class="w-2/3 mb-5">
          <h1 class="recipe__title">{{ recipe.name }}</h1>
          <p class="recipe__short-description">{{ recipe.shortDescription }}</p>
          <TagsRecipe
            :tags="recipe.tags"
            class="text-center"
          />

          <div class="recipe-card">
            <div class="mb-4">
              <img
                :src="recipe.image"
                alt="post-thumb"
              />
            </div>
            <ul class="recipe-card__primary">
              <li>
                <PvChip
                  :label="`${recipe.duration?.totalTimeMin} Min To Make`"
                  icon="pi pi-clock"
                />
              </li>
              <li>
                <PvChip
                  :label="`${recipe.level}`"
                  icon="pi pi-gauge"
                />
              </li>
              <li>
                <PvChip
                  :label="`${recipe.cost}`"
                  icon="pi pi-euro"
                />
              </li>
              <li>
                <PvChip
                  :label="`Serving ${recipe.serving}`"
                  icon="pi pi-user"
                />
              </li>
            </ul>

            <h3 class="recipe-card__title">Ingredients</h3>
            <div class="grid gap-4 grid-cols-5">
              <PvCard
                v-for="ingredient in recipe.ingredients"
                :key="ingredient.id"
              >
                <template #header>
                  <img
                    :src="ingredient.image"
                    alt=""
                  />
                </template>
                <template #title>{{ ingredient.name }}</template>
                <template #subtitle
                  >{{ ingredient.quantity }}
                  <span v-if="ingredient.unit != 'unit'">{{ ingredient.unit }}</span></template
                >
              </PvCard>
            </div>

            <h3 class="recipe-card__title">Steps</h3>

            <div
              class="block my-4"
              v-for="(step, index) in recipe.steps"
              :key="step.id"
            >
              <h4 class="recipe-card__step-title">{{ `Step ${index + 1}` }}</h4>
              <p>{{ step.description }}</p>
            </div>

            <hr />
            <h3 class="recipe-card__title">
              <i class="pi pi-sparkle"></i>
              Note from the author
            </h3>

            <p class="text-center">{{ recipe.note }}</p>
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

console.log(recipe)
</script>

<style lang="scss">
.recipe {
  &__title {
    @apply uppercase text-red-700 mb-5 text-4xl font-semibold text-center tracking-wider;
  }
  &__short-description {
    @apply text-lg font-semibold text-center tracking-wider mb-7;
  }

  .recipe-card {
    @apply bg-white rounded-md;

    &__title {
      @apply mt-8 mb-6 text-3xl font-semibold tracking-wider text-pink-700 uppercase text-center;
    }
    &__primary {
      @apply flex justify-around my-8;

      .p-chip-icon,
      .p-chip-label {
        @apply text-pink-700 font-semibold;
      }
    }
    &__step-title {
      @apply mb-3 font-semibold;
    }
  }
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
