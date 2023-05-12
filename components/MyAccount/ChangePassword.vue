<template>
  <section class="change-password">
    <h5 class="bright-white px-3 mb-4 mb-sm-5">Type Your New Password To Change Your Current One : </h5>
    <div class="login_form_inner">
      <VForm
        id="loginForm"
        class="row login_form px-3"
        :validation-schema="schema"
        :initial-values="initialValues"
        v-slot="{ meta: formMeta }"
        @submit="handleSubmit" >
        <div v-if="hasError" class="error-messages mb-3">
          <div class="alert alert-danger text-center">
            <ul class="list-unstyled mb-0">
              <li v-for="(error, index) in errorMessage" :key="index">{{ error }}</li>
            </ul>
          </div>
        </div>
        <div class="col-sm-6">
          <ElementsFormVTextInput type="password" name="password" id="password" label="New Password" placeholder="New Password" autocomplete="false" :activePasswordEye="true"/>
        </div>
        <div class="col-sm-6">
          <ElementsFormVTextInput type="password" name="confirmPassword" id="confirmPassword" label="Confirmed Password" placeholder="Confirmed Password" autocomplete="false" :activePasswordEye="true"/>
        </div>
        <div class="col-md-12 form-group mt-4">
          <button type="submit" value="Login" class="btn btn-custom btn-block px-3" 
          :class="{ 'btn-primary': formMeta.valid }" 
          :disabled="!formMeta.valid || isLoading">
            <span v-if="!isLoading">Change Password</span>
            <span v-else>{{ $t('loading...') }}</span>
          </button>
        </div>
      </VForm>
    </div>
  </section>  
</template>

<script setup>
  import { object, string, ref as yupRef } from "yup";
  import { configure } from "vee-validate";  
  const { $awn } = useNuxtApp()
  
  definePageMeta({
    middleware: ['not-authorize']
  })

  const { apiBase, api } = useRuntimeConfig()
  const isLoading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');

  // Handle Form Submit
  const handleSubmit = async (values, actions) => {
    console.log('values', values);
  };
  configure({
    validateOnBlur: true,         // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true,       // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: false,       // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true,  // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  });
  const schema = object({
    password: string().required().min(6).label("Your Password"),
    confirmPassword: string()
      .required()
      .oneOf([yupRef("password")], "Passwords do not match") //Cross-Field Validation
      .label("Your Confirmation Password"),
  });
  const initialValues = {
    password: "", 
    confirmPassword: "" 
   };
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .change-password {
    h5 {
      @include sm-mobile {
        font-size: 1rem;
      }
    }
  }
</style>