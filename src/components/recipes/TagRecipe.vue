<template>
  <ul
    class="recipe-tags"
    data-testid="recipe-tags"
  >
    <li
      v-for="tag in tags"
      :key="tag.id"
      class="recipe-tags__tag"
    >
      <RouterLink
        :to="{ name: 'recipesCategory', params: { categoryId: tag.id } }"
        data-testid="recipe-tags-link"
      >
        <PvTag
          :value="tag.label"
          severity="secondary"
        ></PvTag>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { RecipeCategory } from '@/types/Recipe'

defineProps<{
  tags: RecipeCategory[]
}>()
</script>

<style scoped lang="scss">
.recipe-tags {
  @apply capitalize my-6 pb-3;
  &__tag {
    @apply inline-block mr-2;
  }
}
</style>
