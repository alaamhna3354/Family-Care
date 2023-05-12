<template>
  <section id="nav_bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-12 px-0">
          <div class="top-menu">
            <SharedMenuTop @lang="getLang"/>
          </div>
           <div class="top-menu">
            <SharedMenuCenter/>
          </div>
          <div class="bottom-menu d-none d-md-block">
            <SharedMenuBottom />
          </div>
        </div>
      </div>
       <div class="icon text-white d-block d-md-none">
         <font-awesome-icon @click="hidden = !hidden" :icon="['fas', 'bars']"  size="lg" />  <!--bounce-->
         </div> 
         <div class="overlay" v-if="hidden" @click="hidden = !hidden"></div>
          <div class="side-bar" v-if="hidden" :class="hidden ? 'active':''">
            <ul>
              <li><NuxtLink to="/">Home</NuxtLink></li>
              <li><NuxtLink to="/About">About Us</NuxtLink></li>
              <li><NuxtLink to="/Features">Features</NuxtLink></li>
              <li><NuxtLink to="/Shop">Shop</NuxtLink></li>
              <li><NuxtLink to="/Offers">Offers</NuxtLink></li>
              <li><NuxtLink to="/Photos">Photos</NuxtLink></li>
              <li><NuxtLink to="/Contact">Contact Us</NuxtLink></li>
            </ul>
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
    </div>
  </section>
</template>
<script setup>
  // const emit = defineEmits(['navLang'])
  const hidden = ref(false)
  
  // Get Lnaguage from child comonent
  // const getLang = (event) => {
  //   emit('navLang', event)
  // }
  
  // window.onscroll = () => fixedNavBar()
 
  // const fixedNavBar = () => {
  //   const navBar = window.document.querySelector('#nav_bar');
  //   if (window.pageYOffset > 0) {
  //     hidden.value = true
  //     navBar.firstChild.classList.add('fixed-nav')
  //   } else {
  //     hidden.value = false
  //     navBar.firstChild.classList.remove('fixed-nav')
  //   }
  // }
  
  // onMounted(() => {
  //   fixedNavBar();
  // })
</script>

<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .icon{
    position: absolute;
    top: 25px;
    left: 10px;
    cursor: pointer;
  }
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.171);
    height: 100%;
    width: 100%;
    z-index: 998;
  }
  .side-bar{
    position: fixed;
    top: 0;
    left: -100%;
    background-color: $blue;
    padding: 20px;
    height: 100%;
    width: 70%;
    z-index: 999;
    transition: $transition;
    &.active{
      left: 0;
    }
    a{
      color: #fff;
      transition: $transition;
       &:hover{
      color:$DarkBlue !important;
    }
      &.router-link-exact-active{
        color: $DarkBlue;
      }
    }
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
      margin-top: 25px;
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
  }
</style>