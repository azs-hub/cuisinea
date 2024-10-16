<template>
  <PvCarousel
    :value="recipes"
    :numVisible="3"
    :numScroll="3"
    :responsiveOptions="responsiveOptions"
  >
    <template #item="slotProps">
      <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
        <div class="mb-4">
          <div class="relative mx-auto">
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.name"
              class="w-full rounded"
            />
          </div>
        </div>
        <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
        <div class="flex justify-between items-center">
          <RouterLink
            :to="{ name: 'recipe', params: { id: slotProps.data.id } }"
            data-testid="card-recipe-btn-link"
          >
            <PvButton
              label="MAKE IT"
              link
          /></RouterLink>
        </div>
      </div>
    </template>
  </PvCarousel>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/Recipe'
import { ref } from 'vue'

defineProps<{
  recipes: Recipe[]
}>()

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
])
</script>
