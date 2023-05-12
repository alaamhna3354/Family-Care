<template>
  <div class="footer ">
    <div class="row p-5">
      <hr style="height: 2px;">
      <div class="col-md-3 col-12">
         <NuxtLink to="/">
            <img width="90" class="navbar-logo" src="/images/FAMILYCAREPHARMACYlogo.png" alt="" />
          </NuxtLink>
      <h3 class="phone">+971 88 777 666</h3>
      <ul>
          <li>UAE, Dubai, 123 st.</li>
          <li>info@familycare.com</li>
          <li>info@familycare.com</li>
      </ul>
      <ul class="d-flex align-items-center mt-3 icons">
        <li><a target="_blank" href=""><img width="40" src="/icons/Layer3.png" alt=""></a></li>
        <li><a target="_blank" href=""><img width="40" src="/icons/Layer2.png" alt=""></a></li>
        <li><a target="_blank" href=""><img width="40" src="/icons/Layer1.png" alt=""></a></li>
        <li><a target="_blank" href=""><img width="40" src="/icons/Layer5.png" alt=""></a></li>
      </ul>
      </div>
      <div class="col-md-3 col-12">
        <h5>{{$t('Links')}}</h5>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/">About Us</NuxtLink></li>
          <li><NuxtLink to="/">Features</NuxtLink></li>
          <li><NuxtLink to="/">Shop</NuxtLink></li>
          <li><NuxtLink to="/">Offers</NuxtLink></li>
          <li><NuxtLink to="/">Photos</NuxtLink></li>
          <li><NuxtLink to="/">Contact Us</NuxtLink></li>
        </ul>
      </div>
      <div class="col-md-3 col-12">
        <h5>{{$t('Categories')}}</h5>
        <ul>
          <li><NuxtLink to="/">Medicine</NuxtLink></li>
          <li><NuxtLink to="/">Baby</NuxtLink></li>
          <li><NuxtLink to="/">Skin Care</NuxtLink></li>
          <li><NuxtLink to="/">Hair Care</NuxtLink></li>
          <li><NuxtLink to="/">Home Care</NuxtLink></li>
          <li><NuxtLink to="/">Face Care</NuxtLink></li>
          <li><NuxtLink to="/">Men Grooming</NuxtLink></li>
        </ul>
      </div>
      <div class="col-md-3 col-12">
        <VForm
                class="row send_Message"
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
               <div class="row">
                 <div class="col-6">
                    <ElementsFormVTextInput type="name" name="name" id="name" :label="$t('name')" :placeholder="$t('name')" />
                 </div>
                  <div class="col-6">
                <ElementsFormVTextInput type="email" name="email" id="email" :label="$t('email')" :placeholder="$t('email')" />
                 </div>
                 <div class="col-12">
                <ElementsFormVTextArea type="text" name="Message" id="Message" :label="$t('Message')" :placeholder="$t('email')" />
                 </div>
               </div>
                <div class="col-md-12 form-group">
                  <button type="submit" value="Login" class="btn-main btn-block " 
                  :class="{ 'btn-primary': formMeta.valid }" 
                  :disabled="!formMeta.valid || isLoading">
                    <span v-if="!isLoading">{{ $t('send') }}</span>
                    <span v-else>{{ $t('loading...') }}</span>
                  </button>              
                </div>
              </VForm>
      </div>
    </div>
    <div class="copyright bg-medium-gold text-center py-2">
      <div class="container py-1">
        <h6 class="text-white">Copyright @ {{ new Date().getFullYear() }} Luxmetallic LLC</h6>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { object, string, ref as yupRef } from "yup";
  import { configure } from "vee-validate";  
  const { $awn } = useNuxtApp()
  
  definePageMeta({
    middleware: ['not-authorize']
  })

  // const { apiBase, api } = useRuntimeConfig()
  const isLoading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');

  // Handle Form Submit
  // const handleSubmit = async (values, actions) => {
  //   /*
  //     - Account One : 
  //         - email : ttald2905@gmail.com
  //         - password : 123456    
  //     - Account Two : 
  //         - TalalPerson2@gmail.com
  //         - 123456
  //   */
  //   isLoading.value = true
  //   const { data, error } = await useFetch(`${api.AuthLoginApi}`, {
  //     baseURL: apiBase,
  //     method: 'POST',
  //     body: values
  //   })
  //   console.log('response :', data.value);
  //   if (data.value) {
  //     if (data.value.errors) {
  //       isLoading.value = false
  //       hasError.value = true
  //       errorMessage.value = data.value.errors
  //       // remove valid class and set invalid to email input
  //       actions.evt.target[0].classList.remove('is-valid');
  //       actions.evt.target[0].classList.add('is-invalid');
  //       // remove valid class and set invalid to password input
  //       actions.evt.target[1].classList.remove('is-valid');
  //       actions.evt.target[1].classList.add('is-invalid');
  //     } else {
  //       hasError.value = false                                // hide error message box
  //       localStorage.setItem('token', data.value.token)       // storage the token in localstorage
  //       localStorage.setItem('accountType', data.value.type)  // storage the token in localstorage
  //       useToken().value = data.value.token
  //       useAccountType().value = data.value.type
  //       const userInfoApi = data.value.type == 'Person' ? api.GetCurrentPersonInfoApi : api.GetCurrentCompanyInfoApi; 
  //       const { data: infoData, error: infoError } = await useFetch(`${userInfoApi}`, {
  //         baseURL: apiBase,
  //         headers: {
  //           'Authorization': `Bearer ${useToken().value}`
  //         }
  //       })
  //       // console.log(infoData.value);
  //       console.log('get info : ', infoData.value, infoError.value);
  //       if (infoData.value) {
  //         localStorage.setItem('userInfo', JSON.stringify(infoData.value))     // storage the user info inside inside localstorage
  //         useUserInfo().value = infoData.value
  //         useAuth().value.isAuthenticated = true          // make global isAuthenticated state true
  //         actions.resetForm();
  //         return navigateTo('/')
  //       } else {
  //         isLoading.value = false
  //         localStorage.removeItem('token');
  //         useToken().value = null
  //         useAuth().value.isAuthenticated = false          // make global isAuthenticated state false
  //         $awn.alert('There is an error has been occur, please try again', { durations: { global: 5000 } })
  //       }
  //     }
  //   }
  //   if (error.value) {
  //     console.log(error.value);
  //     isLoading.value = false
  //     $awn.alert('There is an error has been occur, please try again', { durations: { global: 5000 } })
  //   }
  // };
  configure({
    validateOnBlur: true,         // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true,       // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: false,       // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true,  // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  });
  const schema = object({
    email: string()
      .required()
      .email()
      // .test(
      //   "email-is-taken",
      //   "Email is already taken",
      //   async (value) => !(await existingEmail(value))
      // )
      .label("Email Address"),
    name: string().required().min(3).label("Your name"),
    Message: string().required().min(10).label("Your Message"),
    
  });
  const initialValues = { email: "", password: "" };
</script>
<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .footer{
  overflow: hidden;
   @media (max-width: 767.98px) {
      text-align: center;
      .icons{
        justify-content: center;
      }
    }
  .phone{
    margin-top: 25px;
    color: #0669a0;
    font-family: PoppinsBold;
    font-size: 1.5rem;
  }
  h5{
    color: $blue;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 50px;
  }
  ul{
    li{
      color: #a2a2a2;
      a{
      color: #a2a2a2;
      transition: $transition;
       &:hover{
          color: $blue;
        }
      }
      img{
        transition: $transition;
        cursor: pointer;
        &:hover{
          scale: 1.2;
        }
      }
    }
  }
  .copyright{
      background-color: $blue;
      h6{
        font-size: 14px;
      }
    }
    }
  

</style>