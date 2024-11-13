<template>
  <div class="container mx-auto mt-10 register">
    <div>
      <HeaderTitle
        title="Register"
        description="Join the Cuisinea community"
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
          name="email"
          initialValue=""
          class="login-form--field"
        >
          <PvInputText
            type="text"
            placeholder="Email"
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
        <PvFormField
          v-slot="$field"
          name="passwordConfirmation"
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
          label="Register"
        />
      </PvForm>
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
  email: '',
  password: '',
  passwordConfirmation: '',
})

/*
  Handle Form Submission
*/
interface FormValues {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

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
      apiError.value = null
    } catch (error: any) {
      console.log('error.message')
      console.log(error.message)
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
