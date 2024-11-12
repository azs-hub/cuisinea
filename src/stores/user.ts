// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { User } from '@/types/User'

import { userLogin } from '@/utilities/services/user'

export const useAuthStore = defineStore('auth', () => {
  // State: Define user state as a User type, and initialize with data from localStorage (or null if no data exists)
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  // Getter: Compute whether the user is authenticated
  const isAuthenticated = computed(() => !!user.value)

  // Actions: Handle login and logout
  const setUser = (auth: User) => {
    user.value = auth
    localStorage.setItem('user', JSON.stringify(auth))
  }
  const login = async (username: string, password: string) => {
    const user = await userLogin(username, password)
    console.log(user)

    return user
  }

  const logout = () => {
    user.value = null
    // Remove user data from localStorage
    localStorage.removeItem('user')
  }

  return { user, isAuthenticated, login, logout, setUser }
})
