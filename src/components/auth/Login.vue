<template>
  <div class="container mx-auto mt-10">
    <div class="">
      <div>
        <HeaderTitle
          title="Login"
          description="Nous sommes heureux de vous revoir"
        />
      </div>

      <div class="mb-5">
        <PvForm
          v-slot="$form"
          :initialValues
          :resolver
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full"
        >
          <PvFormField
            v-slot="$field"
            name="username"
            initialValue=""
            class="flex flex-col gap-1"
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
            class="flex flex-col gap-1"
          >
            <PvPassword
              type="password"
              placeholder="Password"
              :feedback="false"
              toggleMask
              fluid
            />
            <PvMessage
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</PvMessage
            >
          </PvFormField>
          <PvButton
            type="submit"
            severity="secondary"
            label="Submit"
          />
        </PvForm>

        <!-- Forgot Password Link -->
        <div class="forgot-password">
          <a
            href="#"
            @click.prevent="forgotPassword"
            >Forgot Password?</a
          >
        </div>
      </div>
    </div>
    <PvToast />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import HeaderTitle from '../shared/HeaderTitle.vue'

import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const toast = useToast()

const initialValues = reactive({
  username: '',
  password: '',
})

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

const onFormSubmit = ({ valid }) => {
  console.log('submit', valid)
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
  }
}

const forgotPassword = () => {
  alert('Redirecting to password reset page...')
  // Add "Forgot Password?" link navigation logic
}
</script>

<style scoped lang="scss">
.recipe {
  &__title {
    @apply uppercase text-red-700 mb-5 text-4xl font-semibold text-center tracking-wider;
  }
  &__short-description {
    @apply text-lg font-semibold text-center tracking-wider mb-7;
  }
}
</style>
