<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-light-gold-v2 py-0">
    <div :class="`col-9 navbar-reverse ${$i18n.locale == 'en' ? 'ms-auto me-3' : 'me-auto ms-3'}`">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse custom-collapse" id="navbarSupportedContent">
        <ul :class="`navbar-nav mb-2 mb-lg-0 py-1 ${$i18n.locale == 'en' ? 'me-auto ps-4 pe-0' : 'ms-auto pe-4 ps-0'}`">
          <li :class="`nav-item ${$i18n.locale == 'en' ? 'me-lg-4 text-start' : 'ms-lg-4 text-end'}`">
            <NuxtLink @click="hideMenuOnNavigate" to="/" class="nav-link text-dark font-philosopher">{{ $t('home') }}</NuxtLink>
          </li>
          <li :class="`nav-item ${$i18n.locale == 'en' ? 'me-lg-4 text-start' : 'ms-lg-4 text-end'}`">
            <NuxtLink @click="hideMenuOnNavigate" to="/gallery" class="nav-link text-dark font-philosopher">{{ $t('gallery') }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->
    <div class="container-fluid menu-bottom">
    <div class="row align-items-center">
      <div class="col-md-3">
          <div class="dropdown">
            <button class="dropbtn">
              <img width="25" src="/images/Layer9.png" alt="">
              {{$t('category')}}
             <font-awesome-icon :icon="['fas', 'angle-down']" />
              </button>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
      </div>
      <div class="col-md-6">
       <ul class="d-flex align-items-center justify-content-between nav-links">
         <li><NuxtLink to="/">Home</NuxtLink></li>
         <li><NuxtLink to="/About">About Us</NuxtLink></li>
         <li><NuxtLink to="/Features">Features</NuxtLink></li>
         <li><NuxtLink to="/Shop">Shop</NuxtLink></li>
         <li><NuxtLink to="/Offers">Offers</NuxtLink></li>
         <li><NuxtLink to="/Photos">Photos</NuxtLink></li>
         <li><NuxtLink to="/Contact">Contact Us</NuxtLink></li>
       </ul>
      </div>
      <div class="col-md-3 d-flex cartShop">
        <div class="icons">
          <img width="40" src="/icons/Layer10.png" alt="">
          <img width="40" src="/icons/Layer7.png" alt="">
          <img width="20" src="/icons/Layer11.png" alt="">
        </div>
        <div>
          <h6 class="text-white m-0">{{$t('My_Cart')}}</h6>
          <h6 class="text-white m-0">0 AED</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>



<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
.menu-bottom{
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: $blue;
  .dropdown {
      position: relative;
      display: inline-block;
      &:hover{
        .dropdown-content {
          display: block;
        }
      }
      .dropbtn {
      background-color: #aff5fd;
      color: #3a91b5;
      font-size: 16px;
      border: none;
      cursor: pointer;
      padding: 10px 20px;
      width: 200px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
     .dropdown-content {
    display: none;
    position: absolute;
    background-color: $blue;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    a {
    color: $white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover{
      background-color: #f1f1f1;
      color:$DarkBlue;
    }
  }
  }
    }
    .nav-links{
      a{
        color: $white;
        font-size: .9rem;
        transition: $transition;
      &:hover{
      color:$DarkBlue;
    }
      &.router-link-exact-active{
        color: $DarkBlue;
      }
      }
    }
    .cartShop{
      justify-content: end;
    .icons{
          margin-inline-end: 10px;
        }
        h6{
          font-size: .8rem;
        }
    }
    

}


</style>