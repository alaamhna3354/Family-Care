<template>
    <section class="profile-section">
        <div class="row w-100 mx-auto">
            <div class="col-12 mb-3">
                <NuxtLink to="/my-account/edit" class="edit-profile">
                    <i class="fa fa-edit"></i>
                    Edit Profile
                </NuxtLink>
            </div>
            <div class="col-12 col-sm-6 col-lg-4 mb-4">
                <div class="black-light-shadow p-3">{{ $t('name') + ': ' + useTranslate(user, 'fullName') }}</div>
            </div>
            <div class="col-12 col-sm-6 col-lg-4 mb-4">
                <div class="black-light-shadow p-3">{{ $t('email') + ': ' + user.email }}</div>
            </div>
            <div class="col-12 col-sm-6 col-lg-4 mb-4" v-if="user.userName">
                <div class="black-light-shadow p-3">{{ $t('username') + ': ' + user.userName }}</div>
            </div>
            <div class="col-12 col-sm-6 col-lg-4 mb-4">
                <div class="black-light-shadow p-3">{{ $t('address') + ': ' + useTranslate(user, 'address') }}</div>
            </div>
            <div class="col-12 col-sm-6 col-lg-4 mb-4" v-if="user.birthDate">
                <div class="black-light-shadow p-3">{{ $t('birthDate') + ': ' + date }}</div>
            </div>
            <div class="col-12 col-sm-6 col-lg-4 mb-4" v-if="user.gender">
                <div class="black-light-shadow p-3">{{ $t('gender') + ': ' + user.gender }}</div>
            </div>
            <div class="col-12 col-sm-6 col-lg-4 mb-4" v-if="user.phone">
                <div class="black-light-shadow p-3">{{ $t('mobile') + ': ' + user.phone }}</div>
            </div>
        </div>
    </section>
  </template>
  
  <script setup>
    const date = ref('');
    const user = useUserInfo().value;
    date.value = new Date(user.birthDate).getFullYear() + '-' + (new Date(user.birthDate).getMonth() + 1) + '-' + new Date(user.birthDate).getDate();
  </script>
  
  <style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  
  .edit-profile {
    color: $medium-gold;
    font-size: 1.3rem;
    &:hover {
        color: $light-gold-v1;
    }
  }
  .black-light-shadow {
    box-shadow: 0px 0px 45px -7px #333;
  }
  </style>