<template>     
  <VForm
    id="registerForm"
    class="row register_form p-3"
    :validation-schema="schema"
    :initial-values="initialValues"
    v-slot="{ meta: formMeta }"
    @submit="handleSubmit" >
    <div v-if="hasError" class="error-messages mb-3">
      <div class="alert alert-danger text-center">
        <ul class="list-unstyled mb-0">
          <li v-for="(error, index) in errorMessage" :key="index">{{ error.errors[0] }}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ElementsFormVTextInput type="text" name="fullNameEn" id="fullNameEn" label="Name" placeholder="Name" astricts="true"  />
      </div>
      <div class="col-sm-6">
        <ElementsFormVTextInput type="text" name="mobile" id="mobile" label="PhoneNumber" placeholder="PhoneNumber" astricts="true" />
      </div>
      <div class="col-sm-6">
        <ElementsFormVTextInput type="email" name="email" id="email" label="Email" placeholder="Email" astricts="true" />
      </div>
      <div class="col-sm-6">
        <ElementsFormVTextInput type="password" name="password" id="password" label="Password" placeholder="Password" autocomplete="false" :activePasswordEye="true" astricts="true"/>
      </div>
      <div class="col-sm-6">
        <ElementsFormVTextInput type="password" name="confirmPassword" id="confirmPassword" label="Confirmed Password" placeholder="Confirmed Password" autocomplete="false" :activePasswordEye="true" astricts="true"/>
      </div>
      <!-- <div class="radio-group col-sm-6">
        <label class="bright-white text-start w-100 my-2">Gender : </label><br />
        <ElementsFormVRadioInput type="radio" name="gender" id="male" label="Male" value="male" />
        <ElementsFormVRadioInput type="radio" name="gender" id="female" label="Female" value="female" />                    
      </div>
      <div class="col-sm-6">
        <ElementsFormVTextInput type="date" name="birthDate" id="birthDate" label="Birth Of Date" placeholder="Birth Of Date" />
      </div> -->
      <div class="col-6">
        <ElementsFormVSelect name="countryId" id="countryId" :items="countries" :placeholder="$t('select-countries')" />
      </div>
      <div class="col-sm-6">
        <ElementsFormVTextInput type="text" name="addressEn" id="addressEn" label="Address" placeholder="Address" />
      </div>
    </div>

    <div class="col-md-12 form-group">
      <button type="submit" value="Login" class="btn btn-custom btn-block px-3" 
      :class="{ 'btn-primary': formMeta.valid }"
      :disabled="!formMeta.valid || isLoading">
        <span v-if="!isLoading">{{ $t('sign-up') }}</span>
        <span v-else>{{ $t('loading...') }}</span>
      </button>              
    </div>
  </VForm>

</template>

<script setup>
import { object, string, number, ref as yupRef } from "yup";
import { configure } from "vee-validate";  
const { countries } = defineProps(['countries'])
const { $awn } = useNuxtApp()

const { apiBase, api } = useRuntimeConfig()
const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

// Handle Form Submit
const handleSubmit = async (values, actions) => {
  console.log('values', values);
  // return;
  values.fullNameAr = values.fullNameEn;
  values.Phone = values.mobile;
  isLoading.value = true
  const { data, error } = await useFetch(api.PersonClientsApi, {
    baseURL: apiBase,
    method: 'POST',
    body: values,
    headers: {
      'Authorization': `Bearer ${useMainToken().value}`
    }
  })
  console.log('register success ', data.value, error.value);

  if (data.value) {
    if (data.value.hasErrors) {  
      isLoading.value = false
      hasError.value = true
      errorMessage.value = data.value.validationErrors
      if (data.value.validationErrors[0].field == 'Email') {
        // remove valid class and set invalid to email input
        actions.evt.target[3].classList.remove('is-valid');
        actions.evt.target[3].classList.add('is-invalid');
      }
    } else {
      hasError.value = false                                // hide error message box
      const loginValue = { email: values.email, password: values.password }
      // storage the user info inside inside localstorage
      localStorage.setItem('userInfo', JSON.stringify(data.value.result))
      useUserInfo().value = data.value.result                 
      // Login After Success Registered
      const { data: loginData, error: loginError } = await useFetch(`${api.AuthLoginApi}`, {
        baseURL: apiBase,
        method: 'POST',
        body: loginValue
      })
      console.log('Login after register', loginData.value, loginData.value.errors);
      if (loginData.value) {
        if (loginData.value.errors) {      
          isLoading.value = false
          hasError.value = true
          errorMessage.value = loginData.value.errors
          $awn.alert('There is an error has been occur, please try to login with the same information', { durations: { global: 5000 } })
          localStorage.removeItem('userInfo')
          useUserInfo().value = null
        } else {
          hasError.value = false                                // hide error message box
          $awn.success('Your request has been successfully registered', { durations: { global: 5000 } })
          localStorage.setItem('token', loginData.value.token)  // storage the token in localstorage
          useAuth().value.isAuthenticated = true                // make global isAuthenticated state true  
          useToken().value = loginData.value.token              // store token in the store
          localStorage.setItem('accountType', loginData.value.type)  // storage the token in localstorage
          useAccountType().value = loginData.value.type
          return navigateTo('/')
        }
      }
    }
  }
  if (error.value) {
    isLoading.value = false
    console.log(error.value);
  }
};
configure({
  validateOnBlur: true,         // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true,       // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false,       // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true,  // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
const schema = object({
  // name: string().required().min(3).label("Your Name"),
  fullNameEn: string().required().min(3).label("Your Name"),
  mobile: string().required().min(3).label("Your Phone Number"),
  // licenseNumber: string().nullable().min(3).label("Your license Number"),
  // licenseIssuarDate: string().nullable().label("Your License Issuar Date"),
  // licenseEndData: string().nullable().label("Your license End Date"),
  // address: string().nullable().min(3).label("Your Address In Arabic"),
  // addressEn: string().nullable().min(3).label("Your Address In English"),
  // website: string().nullable().min(3).label("Your website"),
  // activityTypeName: string().nullable().min(3).label("Your Activity Type Name"),
  // phone: string().nullable().min(3).label("Your phone"),
  // officePhone: number().nullable().label("Your office Phone"),
  // userName: string().nullable().min(3).label("Your Username"),
  email: string().required().email().label("Email Address"),
  password: string().required().min(6).label("Your Password"),
  confirmPassword: string()
    .required()
    .oneOf([yupRef("password")], "Passwords do not match") //Cross-Field Validation
    .label("Your Confirmation Password"),
});
const initialValues = {
  // name: "",
  fullNameEn: "",
  mobile: "",
  // gender: "male",
  countryId: "",
  // nationalityId: "",
  // address: "",
  addressEn: "",
  // phone: "",
  email: "", 
  // userName: "", 
  password: "", 
  confirmPassword: "" 
};

</script>

<style lang="scss">
@import '~/assets/styles/scss/theme/variables';
@import '~/assets/styles/scss/theme/mixin';

.register_form {
  margin: auto;
  a {
    font-size: 14px;
    color: #777777;
    font-family: "Roboto", sans-serif;
    margin-top: 20px;
    display: block; 
  }
}
.btn-custom {
  background: linear-gradient(90deg, #fbe9b0 0%, #D4AF37 100%);
  color: #212529;
  border-radius: 0px;
  line-height: 38px;
  width: 100%;
  text-transform: uppercase;
  border: none;
  position: relative;
  overflow: hidden;
  color: #fff;
  padding: 0 30px;
  &:before {
    position: absolute;
    left: -145px;
    top: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: #000;
    opacity: 0;
    transform: skew(40deg);
    transition: all 0.3s ease 0s;
    // left: 180px;
    opacity: 0;
  }
  &:hover:before { left: 700px; opacity: 0.3; }
  &.primary-btn {
    display: block;
    width: max-content;
  }
}

</style>
