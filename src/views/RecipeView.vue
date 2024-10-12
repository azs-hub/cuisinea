<template>
  <div
    class="recipe"
    data-testid="recipe-view"
  >
    <div class="container mx-auto mt-10">
      <div class="flex justify-center">
        <div
          class="w-2/3 mb-5"
          v-if="isRecipeLoaded"
          data-testid="recipe-view-card"
        >
          <h1 class="recipe__title">{{ recipe?.name }}</h1>
          <p class="recipe__short-description">{{ recipe?.shortDescription }}</p>
          <TagsRecipe
            v-if="recipe?.tags"
            :tags="recipe.tags"
            class="text-center"
          />

          <div class="recipe-card">
            <div class="mb-4">
              <img
                :src="recipe?.image"
                alt="post-thumb"
              />
            </div>
            <div class="recipe-card__primary">
              <PvChip
                :label="`${recipe?.duration?.totalTimeMin} Min To Make`"
                icon="pi pi-clock"
              />

              <PvChip
                :label="`${recipe?.level}`"
                icon="pi pi-gauge"
              />

              <PvChip
                :label="`${recipe?.cost}`"
                icon="pi pi-euro"
              />

              <PvChip
                :label="`Serving ${recipe?.serving}`"
                icon="pi pi-user"
              />
            </div>

            <h3 class="recipe-card__title">Ingredients</h3>
            <div class="grid gap-4 grid-cols-5">
              <PvCard
                v-for="ingredient in recipe?.ingredients"
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
                  <span v-if="isMeasurementUnit(ingredient.unit)">{{
                    ingredient.unit
                  }}</span></template
                >
              </PvCard>
            </div>

            <h3 class="recipe-card__title">Steps</h3>

            <div
              class="block my-4"
              v-for="(step, index) in recipe?.steps"
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

            <p class="text-center">{{ recipe?.note }}</p>
          </div>
        </div>
        <div
          class="w-2/3 mb-5"
          v-else
          data-testid="recipe-view-skeleton"
        >
          <SkeletonRecipeView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeMount, computed, defineExpose } from 'vue'
import type { Recipe } from '@/types/Recipe'
import { IngredientUnit } from '@/types/Recipe'
import { getRecipe } from '@/utilities/services/recipe'
import { getParamValue } from '@/utilities/helpers/stringUtils'
import { useRoute } from 'vue-router'
import TagsRecipe from '@/components/recipes/TagRecipe.vue'
import SkeletonRecipeView from '@/components/recipes/SkeletonRecipeView.vue'

const route = useRoute()

const loading: Ref<Boolean> = ref(true)
const recipe: Ref<Recipe | null> = ref(null)

/*
  Computed
*/
const isRecipeLoaded = computed<Boolean>(() => loading.value === false)

/*
  Methods
*/
const fetchRecipe = async (idParam: string | string[]) => {
  // while getching data the Skeleton design will be displayed
  loading.value = true
  const id = getParamValue(idParam)

  // setTimeout(async () => {
  try {
    recipe.value = await getRecipe(id)
  } catch (err) {
    console.error('Error fetching data:', err.message)
  } finally {
    loading.value = false
  }
  // }, 800)
}
const isMeasurementUnit = (unit: IngredientUnit): Boolean => {
  return unit != IngredientUnit.unit
}

/*
  Hooks
*/
// Load the recipe before the component load
onBeforeMount(() => {
  fetchRecipe(route.params.id)
})

defineExpose({
  fetchRecipe,
})
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
    @apply bg-white rounded-md mt-6;

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

// .p-chip-icon {
//   @apply text-red-500 bg-slate-100;
// }

// .card-meta li:not(:last-child) {
//   @apply border-r border-gray-300 pr-3;
// }

// .card-meta-tag {
//   @apply mb-5;

//   li {
//     @apply text-base;
//   }
// }
</style>
