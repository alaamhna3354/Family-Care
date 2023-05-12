<template>
  <main class="main-black-background">
    <section class="col-lg-8 login_box_area mx-auto">
      <div class="container">
        <div class="row">          
          <div class="col-12 col-md-11 col-lg-10 col-xl-9 mx-auto">
            <div class="login_form_inner">
              <h3 class="fs-3 mb-3">Edit Profile</h3>
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
                <!-- <div class="row"> -->
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="text" name="name" id="name" :label="$t('arabicName')" :placeholder="$t('arabicName')"/>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="text" name="enName" id="enName" :label="$t('englishName')" :placeholder="$t('englishName')"/>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="text" name="userName" id="userName" :label="$t('username')" :placeholder="$t('username')"/>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="email" name="email" id="email" :label="$t('email')" :placeholder="$t('email')" />
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="date" name="birthDate" format="yyyy-MM-dd" id="birthDate" :label="$t('birthDate')" :placeholder="$t('birthDate')" />
                  </div>
                  <div class="col-12 col-sm-6 text-start">
                    <label :class="`form-label bright-white ${$i18n.locale == 'ar' ? 'rtl' : '' }`">{{ $t('gender') }}</label>
                    <div class="radio-group mb-3">
                      <ElementsFormVRadioInput type="radio" name="gender" id="Male" label="Male" value="Male" />
                      <ElementsFormVRadioInput type="radio" name="gender" id="Female" label="Female" value="Female" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="text" name="address" id="address" :label="$t('arabicAddress')" :placeholder="$t('arabicAddress')"/>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="text" name="enAddress" id="enAddress" :label="$t('englishAddress')" :placeholder="$t('englishAddress')"/>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="number" name="phone" id="phone" :label="$t('phone')" :placeholder="$t('phone')"  />
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVTextInput type="number" name="mobile" id="mobile" :label="$t('mobile')" :placeholder="$t('mobile')"  />
                  </div>
                  <div class="col-12 col-sm-6">
                    <ElementsFormVSelect name="nationalities" id="nationalities" :items="nationalities" :placeholder="$t('select-nationality')" />
                  </div>
                <!-- </div> -->
                <div class="col-md-12 form-group mt-4">
                  <button type="submit" value="Login" class="btn btn-custom btn-block px-3" 
                  :class="{ 'btn-primary': formMeta.valid }" 
                  :disabled="!formMeta.valid || isLoading">
                    <span v-if="!isLoading">{{ $t('save') }}</span>
                    <span v-else>{{ $t('loading...') }}</span>
                  </button>
                </div>
              </VForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
  import { object, string, ref as yupRef } from "yup";
  import { configure } from "vee-validate";  
  const { nationalities } = defineProps(['nationalities'])
  console.log('nationalities', nationalities);
  const { $awn } = useNuxtApp()
  const { apiBase, api } = useRuntimeConfig()
  const userInfo = useUserInfo().value;
  console.log( userInfo);
  const isLoading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');
  const month = ref((new Date(userInfo.birthDate).getMonth() + 1) < 10 ? `0${(new Date(userInfo.birthDate).getMonth() + 1)}` : (new Date(userInfo.birthDate).getMonth() + 1));


  // Handle Form Submit
  const handleSubmit = async (values, actions) => {
    values.clientId = userInfo.id;
    values.nationalityId = values.nationalities;
    isLoading.value = true
    const { data, error } = await useHttpForUserApi().put(api.PersonClientsApi, values);
    console.log('data update', data);
    return;
    if (data.value) {
      if (data.value.hasErrors) {
        isLoading.value = false
        hasError.value = true
        errorMessage.value = data.value.validationErrors
        if (data.value.validationErrors[0].field == 'Email') {
          // remove valid class and set invalid to email input
          actions.evt.target[4].classList.remove('is-valid');
          actions.evt.target[4].classList.add('is-invalid');
        }
      } else {
        isLoading.value = false
        hasError.value = false
        localStorage.setItem('userInfo', JSON.stringify(data.value))     // storage the user info inside inside localstorage
        useUserInfo().value = data.value
        return navigateTo('/my-account');
      }
    } else {
      console.log();
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
    enName: string().required().min(3).label("Your English Name"),
    phone: string().nullable().min(3).label("Your Phone Number"),    
    birthDate: string().nullable().label("Your Phone Number"),    
    address: string().nullable().min(3).label("Your Address In Arabic"),
    enAddress: string().nullable().min(3).label("Your Address In English"),
    phone: string().nullable().min(3).label("Your phone"),
    mobile: string().nullable().min(3).label("Your phone"),
    userName: string().required().min(3).label("Your Username"),
    email: string().required().email().label("Email Address"),
  });
  const initialValues = { 
    name: userInfo.name,
    enName: userInfo.enName,
    userName: userInfo.userName,
    email: userInfo.email,
    gender: userInfo.gender,
    birthDate: new Date(userInfo.birthDate).getFullYear() + '-' + month.value + '-' + new Date(userInfo.birthDate).getDate(),
    address: userInfo.address,
    enAddress: userInfo.enAddress,
    phone: userInfo.phone,
    mobile: userInfo.mobile, 
    nationalityId: userInfo.nationalityId, 
  };

</script>

<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';

  .login_box_area {
    padding: 100px 0;
    @include sm-mobile { padding: 50px 0; }
    .login_box_img {
      margin-right: -30px;
      position: relative; 
      img { width: 100%; }
      &:before {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        content: "";
        background: #000;
        opacity: .5; 
      }
      .hover {
        position: absolute;
        top: 50%;
        left: 0px;
        text-align: center;
        width: 100%;
        transform: translateY(-50%); 
        h4 {
          font-size: 24px;
          color: #fff;
          margin-bottom: 15px; 
        }
        p {
          max-width: 380px;
          margin: 0px auto 25px;
          color: #fff; 
        }
        .primary-btn {
          border-radius: 0px;
          line-height: 38px;
          text-transform: uppercase; 
          &:hover:before { left: 260px; }
        }
      }
    }
    .login_form_inner {
      // box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.07);
      box-shadow: 0px 10px 30px 0px rgb(250 250 250 / 7%);
      height: 100%;
      text-align: center;
      padding-top: 115px; 
      padding-bottom: 100px; 
      -webkit-backdrop-filter: brightness(0.7);
      backdrop-filter: brightness(0.7);
      @include tablet {
        padding-top: 80px;
        padding-bottom: 65px;
      }
      @include sm-mobile {
        padding-top: 50px;
        padding-bottom: 50px;
      }
      h3 {
        color: #fff;
        text-transform: uppercase;
        font-size: 18px;
        margin-bottom: 30px; 
      }
      .login_form {
        // max-width: 385px;
        margin: auto;
        a {
          font-size: 14px;
          color: #777777;
          font-family: "Roboto", sans-serif;
          margin-top: 20px;
          display: block; 
        }
      }
    }
    
    .btn-custom {
      &:hover:before { left: 700px; opacity: 0.3; }
    }
  }

</style>