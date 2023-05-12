<template>
  <main class="main-black-background">
    <section class="col-lg-8 login_box_area mx-auto">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 d-none">
            <!-- <div class="login_box_img">
              <img class="img-fluid" src="/images/login.jpg" alt="">
              <div class="hover">
                <h4>New to our website?</h4>
                <p>There is always new material being introduced, and the best way to find out is to find out</p>
                <NuxtLink to="/auth/register" class="primary-btn btn-custom px-5 mx-auto">Create Account</NuxtLink>
              </div>
            </div> -->
          </div>
          <div class="col-md-10 col-xl-8 mx-auto">
            <div class="register_form_inner">
              <h3 class="mb-3 font-philosopher">Singup to enter</h3>
                <div class="radio-group">
                  <div class="form-check form-switch form-check-inline">
                    <input type="radio" class="form-check-input" id="person" name="accountType" value="person" @change="chooseAccountType" checked />
                    <label for="person" class="form-check-label bright-white">Person</label>
                  </div>
                  <div class="form-check form-switch form-check-inline">
                    <input type="radio" class="form-check-input" id="company" name="accountType" value="company" @change="chooseAccountType" />
                    <label for="company" class="form-check-label bright-white">Company</label>
                  </div>
                </div>
                <div v-if="isPersonAccountType">
                  <AuthClientRegister :countries="countries"/>
                </div>
                <div v-if="!isPersonAccountType">
                  <AuthCompanyRegister :countries="countries" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
</template>

<script setup>
  const { countries } = defineProps(['countries'])
  const isPersonAccountType = ref(true)
  const chooseAccountType = (e) => {
    isPersonAccountType.value = e.target.value == 'person' ? true : false;   
  }
  onMounted(() => {
    isPersonAccountType.value = true;
  })
</script>

<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';

  .login_box_area {
    padding: 100px 0;
    @include sm-mobile {
      padding: 50px 0;
    }
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
    .register_form_inner {
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
        padding-top: 65px;
        padding-bottom: 50px;
      }
      h3 {
        color: #fff;
        text-transform: uppercase;
        font-size: 18px;
        margin-bottom: 30px; 
      }
      .form-check-input:checked {
        background-color: #D4AF37;
        border-color: #D4AF37;
      }
    }
  }

</style>
