<!-- UserForm.vue -->
<template>
  <PvForm
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="login-form"
  >
    <PvFormField
      v-slot="$field"
      name="username"
      :initialValue="initialValues.username"
      class="login-form--field"
    >
      <PvInputText
        type="text"
        placeholder="Username"
        v-model="initialValues.username"
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
      :initialValue="initialValues.email"
      class="login-form--field"
    >
      <PvInputText
        type="text"
        placeholder="Email"
        v-model="initialValues.email"
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
      v-if="initialValues.password !== undefined"
      v-slot="$field"
      name="password"
      initialValue=""
      class="login-form--field"
    >
      <PvPassword
        placeholder="Password"
        v-model="initialValues.password"
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
      v-if="initialValues.passwordConfirmation !== undefined"
      v-slot="$field"
      name="passwordConfirmation"
      initialValue=""
      class="login-form--field"
    >
      <PvPassword
        placeholder="Confirm Password"
        v-model="initialValues.passwordConfirmation"
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
      :label="label"
    />
  </PvForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormValues } from '@/types/User'
// import type { Resolver } from '@primevue/forms'

/*
  Emit
*/

const emit = defineEmits(['submit'])

/*
  Props and Refs
*/
interface Props {
  user: FormValues
  resolver: Function
  label: string
  apiError?: string
}
const props = defineProps<Props>()
const initialValues = ref(JSON.parse(JSON.stringify(props.user)))

/*
  Handle Form Submission
*/
const onFormSubmit = async ({ values, valid }: { values: any; valid: boolean }) => {
  if (valid) {
    emit('submit', { values, valid })
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
