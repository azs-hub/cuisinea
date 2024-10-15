<template>
  <div data-testid="home-view">
    <BannerHome />
    <div class="container mx-auto mt-10 w-2/4">
      <LatestRecipes />
    </div>
  </div>
</template>

<script setup lang="ts">
import BannerHome from '@/components/home/BannerHome.vue'
import LatestRecipes from '@/components/recipes/LatestRecipes.vue'
import { useRecipesStore } from '@/stores/recipes'

/*
  Store
*/
const recipesStore = useRecipesStore()
</script>

<style scoped></style>
