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
            label="Submit"
          />
        </PvForm>

        <!-- Forgot Password Link -->
        <div class="forgot-password">
          <router-link to="/user/forgotten-password"> Forgot Password? </router-link>
        </div>
      </div>
    </div>
    <PvToast />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import HeaderTitle from '../shared/HeaderTitle.vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useAuthStore } from '@/stores/user'
import { userLogin } from '@/utilities/services/user'

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
    } catch (error: any) {
      console.log('error.message')
      console.log(error.message)
      apiError.value = error.message || 'An error occurred. Please try again.'
    }
  }
}

const forgotPassword = () => {
  alert('Redirecting to password reset page...')
  // Add "Forgot Password?" link navigation logic
}
</script>

<style scoped lang="scss"></style>
