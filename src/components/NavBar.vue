<template>
  <div
    class="navbar"
    data-testid="navbar"
  >
    <PvMenubar :model="items">
      <template #start>
        <RouterLink to="/">
          <img
            src="@/assets/logo.jpg"
            width="250"
          />
        </RouterLink>
      </template>

      <template #item="{ item, hasSubmenu }">
        <RouterLink
          v-if="item.path"
          class="flex align-items-center mx-5"
          :to="item.path"
        >
          <span :class="item.icon"></span>
          <span class="ml-2">{{ item.label }} </span>
        </RouterLink>

        <span
          v-else
          class="flex align-items-center mx-5"
        >
          <span :class="item.icon"></span>
          <span class="ml-2">{{ item.label }} </span>
          <span
            v-if="hasSubmenu"
            class="pi pi-fw pi-angle-down ml-2"
          />
        </span>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <router-link to="/user/login">
            <PvButton
              label="Login"
              rounded
            />
          </router-link>

          <PvAvatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </PvMenubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
/*
  refs
*/
const items = ref([
  {
    label: 'Latest Recipes',
    path: { name: 'home' },
  },
  {
    label: 'Recettes par catégories',
    items: [
      {
        label: 'Starters',
        path: { name: 'recipesCategory', params: { categoryId: 'starters' } },
      },
      {
        label: 'Mains',
        path: { name: 'recipesCategory', params: { categoryId: 'mains' } },
      },
      {
        label: 'Desserts',
        path: { name: 'recipesCategory', params: { categoryId: 'desserts' } },
      },
    ],
  },
])
</script>

<style lang="scss">
.p-menubar {
  &-item-content {
    @apply py-2;
  }
}
</style>
