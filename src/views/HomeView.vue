<template>
  <div data-testid="home-view">
    <BannerHome />
    <div class="container mx-auto mt-10 w-2/4">
      <div class="flex justify-center">
        <LatestRecipes />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BannerHome from '@/components/home/BannerHome.vue'
import LatestRecipes from '@/components/recipes/LatestRecipes.vue'
</script>

<style scoped></style>
