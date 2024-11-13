<template>
  <div
    class="navbar"
    data-testid="navbar"
  >
    <PvMenubar :model="navigationItems">
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
          <router-link
            to="/user/login"
            v-if="!authStore.isAuthenticated"
          >
            <PvButton
              label="Login"
              rounded
            />
          </router-link>
          <div v-else>
            <PvButton
              type="button"
              @click="menuToggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              variant="text"
            >
              <PvAvatar
                v-if="authStore.isAuthenticated"
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
            </PvButton>
            <PvMenu
              ref="userMenu"
              id="overlay_menu"
              :model="userMenuItems"
              :popup="true"
            />
          </div>
        </div>
      </template>
    </PvMenubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
/*
  Store
*/
const authStore = useAuthStore()

/*
  refs
*/
const navigationItems = ref([
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
const userMenu = ref()
const userMenuItems = ref([
  {
    label: 'Account',
    items: [
      {
        label: 'Logout',
        command: () => {
          authStore.logout()
          router.push('/')
        },
      },
    ],
  },
])

/*
  Methods
*/
const menuToggle = (event) => {
  userMenu.value.toggle(event)
}
</script>

<style lang="scss">
.p-menubar {
  &-item-content {
    @apply py-2;
  }
}
</style>
