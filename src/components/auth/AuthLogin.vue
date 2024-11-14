<template>
  <div class="container mx-auto mt-10 login">
    <div>
      <HeaderTitle
        title="Login"
        description="We are happy to see you again"
      />
    </div>

    <div class="mb-5">
      <PvForm
        v-slot="$form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="login-form"
      >
        <PvFormField
          v-slot="$field"
          name="username"
          initialValue=""
          class="login-form--field"
        >
          <PvInputText
            type="text"
            placeholder="Username"
          />
          <PvMessage
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</PvMessage
          >
        </PvFormField>
        <PvFormField
          v-slot="$field"
          name="password"
          initialValue=""
          class="login-form--field"
        >
          <PvPassword
            placeholder="Password"
            :feedback="false"
            toggleMask
            fluid
            :inputProps="{ autocomplete: true }"
          />
          <PvMessage
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</PvMessage
          >
        </PvFormField>

        <PvMessage
          v-if="apiError"
          severity="error"
          size="small"
          variant="simple"
          >{{ apiError }}</PvMessage
        >
        <PvButton
          type="submit"
          severity="secondary"
          label="Log In"
        />
      </PvForm>
      <div class="login-register">
        <p>or</p>
        <RouterLink
          :to="{ name: 'register' }"
          data-testid="login-register-btn"
        >
          <PvButton label="Register"
        /></RouterLink>
      </div>

      <!-- Forgot Password Link -->
      <div class="login-forgot-password">
        <router-link to="/user/forgotten-password"> Forgot Password? </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import HeaderTitle from '../shared/HeaderTitle.vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useAuthStore } from '@/stores/user'
import { userLogin } from '@/utilities/services/user'
import { useRouter } from 'vue-router'

const router = useRouter()

/*
  Store
*/
const authStore = useAuthStore()

/*
  Ref
*/
const apiError = ref<string | null>(null)
const initialValues = reactive({
  username: '',
  password: '',
})

/*
  Handle Form Submission
*/
interface FormValues {
  username: string
  password: string
}

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
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
  })
)

const onFormSubmit = async ({ values, valid }: { values: FormValues; valid: boolean }) => {
  if (valid) {
    try {
      const user = await userLogin(values.username, values.password)
      authStore.setUser(user)
      apiError.value = null
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
