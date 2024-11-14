<template>
  <div class="container mx-auto mt-10 login">
    <div>
      <HeaderTitle title="My account" />

      <div class="mb-5">
        <UserForm
          :user="userData"
          :resolver="resolver"
          :api-error="apiError"
          :label="'Register'"
          @submit="onFormSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import HeaderTitle from '../shared/HeaderTitle.vue'
import { useAuthStore } from '@/stores/user'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { User, FormValues } from '@/types/User'
import UserForm from '@/components/auth/UserForm.vue'

/*
  Store
*/
const authStore = useAuthStore()

/*
  Ref
*/
const apiError = ref<string | undefined>(undefined)
const userData = reactive({
  id: authStore.user?.id || '',
  token: authStore.user?.token || '',
  username: authStore.user?.username || '',
  email: authStore.user?.email || '',
  password: '',
  passwordConfirmation: '',
})

/*
  Handle Form Submission
*/
const resolver = zodResolver(
  z
    .object({
      username: z.string().min(1, { message: 'Username is required.' }),
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
      password: z
        .string()
        .max(8, { message: 'Maximum 8 characters.' })
        .refine((value) => /[a-z]/.test(value), {
          message: 'Must have a lowercase letter.',
        })
        .refine((value) => /[A-Z]/.test(value), {
          message: 'Must have an uppercase letter.',
        })
        .refine((value) => /\d/.test(value), {
          message: 'Must have a number.',
        })
        .optional()
        .or(z.literal('')),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords don't match",
      path: ['passwordConfirmation'],
    })
)
const onFormSubmit = async ({ values, valid }: { values: FormValues; valid: boolean }) => {
  if (valid) {
    try {
      const user: User = {
        id: userData.id,
        token: userData.token,
        username: values.username,
        email: values.email,
        password: values.password,
      }

      authStore.saveUser(user)
    } catch (error: any) {
      apiError.value = error.message || 'An error occurred. Please try again.'
    }
  }
}
</script>
