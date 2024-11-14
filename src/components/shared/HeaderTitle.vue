<template>
  <div
    class="header-title"
    data-testid="header-title"
  >
    <header>
      <h1 class="header-title__title">{{ title }}</h1>
      <p
        v-if="description"
        class="header-title__description"
        >{{ description }}</p
      >
    </header>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<style scoped lang="scss">
.header-title {
  @apply justify-center;

  &__title {
    @apply uppercase text-red-700 mb-5 text-4xl font-semibold text-center tracking-wider;
  }
  &__description {
    @apply text-lg font-semibold text-center tracking-wider mb-7;
  }
}
</style>
