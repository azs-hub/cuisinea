<template>
  <div data-testid="user-view">
    <div class="container mx-auto mt-10 w-2/4">
      <div class="flex justify-center">
        <RouterView :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
