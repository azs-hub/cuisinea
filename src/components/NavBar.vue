<template>
  <div
    class="navbar"
    data-testid="navbar"
  >
    <PvMenubar :model="items">
      <template #start>
        <img
          src="@/assets/logo.jpg"
          width="250"
        />
      </template>

      <template #item="{ item, hasSubmenu }">
        <RouterLink
          v-if="item.route"
          class="flex align-items-center mx-3"
          :to="item.route"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span
            v-if="hasSubmenu"
            class="pi pi-fw pi-angle-down ml-2"
          />
        </RouterLink>
        <a
          v-else
          v-ripple
          :href="item.path"
          :target="item.target"
        >
          <span :class="item.icon"></span>
          <span class="ml-2">{{ item.label }} </span>
          <span
            v-if="hasSubmenu"
            class="pi pi-fw pi-angle-down ml-2"
          />
        </a>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <PvDropdown
            v-model="currentLang"
            :options="languagesList"
            placeholder="EN"
            class="md:w-[6rem]"
          >
          </PvDropdown>
          <PvInputText
            placeholder="Search"
            type="text"
            class="w-2/3 text-orange-600"
          />
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
const languagesList = ref(['fr', 'en'])
const currentLang = ref('en')
const items = ref([
  {
    label: 'Latest Recipes',
    path: '/',
  },
  {
    label: 'Recettes par catégories',
    items: [
      {
        label: 'Starters',
        path: '/recipes/categories/starters',
      },
      {
        label: 'Mains',
        path: '/recipes/categories/mains',
      },
      {
        label: 'Desserts',
        path: '/recipes/categories/desserts',
      },
    ],
  },
])
</script>

<style scoped lang="scss">
.p-menubar {
  @apply border-b-2 border-white rounded-none;

  .p-menubar-root-list > .p-menuitem > .p-menuitem-content {
    @apply rounded-none;
  }

  .p-menubar-root-list
    > .p-menuitem:not(.p-highlight):not(.p-disabled)
    > .p-menuitem-content:hover {
    @apply border-b-0 border-gray-600 bg-white;
  }

  .p-menuitem {
    @apply p-2;
  }

  .p-submenu-list {
    @apply mt-2 rounded-none;
  }
}
</style>
