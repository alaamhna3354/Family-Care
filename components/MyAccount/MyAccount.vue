<template>
  <section class="my-account-section pb-5">
    <!-- <ElementsHeaderImage :src="`/images/header (4).jpeg`" :height="`50vh`" /> -->
    <div class="container py-5">
      <div class="" v-if="!isWideScreen">
        <ul class="nav nav-pills nav-pills-mobile shadow p-3 mb-5 rounded" id="pills-tab" role="tablist">          
          <li class="nav-item" role="presentation">
            <button data-index="profile" class="nav-link active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="true">
              <i class="fa fa-user fa-xl"></i><br v-if="hideBreaker" />
              <span class="fs-5 fs-sm-4">{{ $t('profile') }}</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button data-index="orders" class="nav-link" id="v-pills-orders-tab" data-bs-toggle="pill" data-bs-target="#v-pills-orders" type="button" role="tab" aria-controls="v-pills-orders" aria-selected="true">
              <i class="fa fa-shopping-cart fa-xl"></i><br v-if="hideBreaker" />
              <span class="fs-5 fs-sm-4">{{ $t('orders') }}</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button data-index="change-password" class="nav-link" id="v-pills-change-password-tab" data-bs-toggle="pill" data-bs-target="#v-pills-change-password" type="button" role="tab" aria-controls="v-pills-change-password" aria-selected="true">
              <i class="fa fa-lock fa-xl"></i><br v-if="hideBreaker" />
              <span class="fs-5 fs-sm-4">Change Password</span>
            </button>
          </li>
        </ul>
        <div class="tab-content shadow rounded text-white" id="pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <MyAccountProfile />
          </div>
          <div class="tab-pane fade show" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab">
            <MyAccountUserOrder v-if="orders.length" :orders="orders" />
            <div v-else class="alert alert-warning text-center">There isn't any order to display yet</div>
          </div>
          <div class="tab-pane fade show" id="v-pills-change-password" role="tabpanel" aria-labelledby="v-pills-change-password-tab">
            <MyAccountChangePassword />
          </div>
        </div>
      </div>
      <div class="row" v-if="isWideScreen">
          <div class="nav col-3 flex-column nav-pills wide-screens shadow p-3 mb-5 rounded" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button data-index="profile" class="nav-link mb-4 active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="true">
              <i class="fa fa-user fa-2x"></i><br />
              <span class="fs-4">{{ $t('profile') }}</span>
            </button>
            <button data-index="orders" class="nav-link mb-4" id="v-pills-orders-tab" data-bs-toggle="pill" data-bs-target="#v-pills-orders" type="button" role="tab" aria-controls="v-pills-orders" aria-selected="true">
              <i class="fa fa-shopping-cart fa-2x"></i><br />
              <span class="fs-4">{{ $t('orders') }}</span>
            </button>
            <button data-index="change-password" class="nav-link mb-4" id="v-pills-change-password-tab" data-bs-toggle="pill" data-bs-target="#v-pills-change-password" type="button" role="tab" aria-controls="v-pills-change-password" aria-selected="true">
              <i class="fa fa-lock fa-2x"></i><br />
              <span class="fs-4">Change Password</span>
            </button>
          </div>
          <div class="col-9 tab-content shadow p-3 mb-5 rounded text-white" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
              <MyAccountProfile />
            </div>
            <div class="tab-pane fade show" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab">
              <MyAccountUserOrder v-if="orders.length" :orders="orders" />
              <div v-else class="alert alert-warning">There isn't any order to display yet</div>
            </div>
            <div class="tab-pane fade show" id="v-pills-change-password" role="tabpanel" aria-labelledby="v-pills-change-password-tab">
              <MyAccountChangePassword />
            </div>
          </div><!--.tab-content-->
        </div><!--.row-->
    </div>
  </section>
</template>

<script setup>
  const { orders } = defineProps(['orders'])
  const isWideScreen = ref(true);
  const hideBreaker = ref(true)
  // const date = ref('');
  // const user = useUserInfo().value;
  // date.value = new Date(user.birthDate).getFullYear() + '-' + (new Date(user.birthDate).getMonth() + 1) + '-' + new Date(user.birthDate).getDate();
  const checkWindowWidth = () => {
    if (window.innerWidth > 1100) { 
      isWideScreen.value = true;
    }
    if (window.innerWidth > 992 && window.innerWidth <= 1100) {
      isWideScreen.value = true;
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 992) { 
      isWideScreen.value = true;
    }
    if (window.innerWidth >= 576 && window.innerWidth < 768) { 
      isWideScreen.value = false;
    }
    if (window.innerWidth < 576) { 
      isWideScreen.value = false;
    }
    if (window.innerWidth < 576) {
      hideBreaker.value = false
    }
  }

  onMounted(() => {
    checkWindowWidth()
  })
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';

.my-account-section {
  background: url('/images/bg-about-us.webp') center center no-repeat;
  background-size: 100% 100%;
  .nav-pills.wide-screens {
    border-right: 1px solid #fff;
  }
  .nav-pills-mobile {
    border-bottom: 1px solid #fff;;
    display: flex;
    justify-content: space-around;
    .nav-item {
      @include sm-mobile {
        width: 100%;
      }
      button.nav-link {
        width: 13rem;
        @include tablet { width: 10rem; }
        @include sm-mobile {
          // width: 9rem;
          width: 100%; }
        i {
          @include sm-mobile {
            font-size: 1.2rem;
            margin-left: 7px;
            margin-right: 7px;
            vertical-align: baseline;
          }
        }
        span {
          @include tablet { font-size: 1rem !important; }
        }
      }
    }
  }
}
.nav-link {
  color:  $gold;
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
  background-color: $gold;
}
.black-light-shadow {
  box-shadow: 0px 0px 45px -7px #333;
}
</style>