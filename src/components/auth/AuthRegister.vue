<template>
  <div class="container mx-auto mt-10 register">
    <div>
      <HeaderTitle
        title="Register"
        description="Join the Cuisinea community"
      />
    </div>

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
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import HeaderTitle from '../shared/HeaderTitle.vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useAuthStore } from '@/stores/user'
import { userRegister } from '@/utilities/services/user'
import { useRouter } from 'vue-router'
import { FormValues } from '@/types/User'
import UserForm from '@/components/auth/UserForm.vue'

const router = useRouter()

/*
  Store
*/
const authStore = useAuthStore()

/*
  Ref
*/
const apiError = ref<string | undefined>(undefined)
const userData = reactive({
  username: '',
  email: '',
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
        .min(3, { message: 'Minimum 3 characters.' })
        .max(8, { message: 'Maximum 8 characters.' })
        .refine((value) => /[a-z]/.test(value), {
          message: 'Must have a lowercase letter.',
        })
        .refine((value) => /[A-Z]/.test(value), {
          message: 'Must have an uppercase letter.',
        })
        .refine((value) => /\d/.test(value), {
          message: 'Must have a number.',
        }),
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
      const user = await userRegister(values.username, values.password)
      authStore.setUser(user)
      apiError.value = undefined
      router.push('/')
    } catch (error: any) {
      apiError.value = error.message || 'An error occurred. Please try again.'
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  &-form {
    @apply flex flex-col gap-4 w-full;

    &--field {
      @apply flex flex-col gap-1;
    }
  }
  &-register {
    @apply flex flex-col items-center gap-2 mt-4;
  }
  &-forgot-password {
    @apply text-center mt-5 underline;
  }
}
</style>
