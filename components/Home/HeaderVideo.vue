<template>
  <section class="header-slider">
     <!-- 
      navigation
      :pagination="{ clickable: true }"
     -->
     <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
    :slides-per-view="1"
    navigation
    :loop="false"
    :pagination="{ clickable: true }"
    :effect="'creative'"
   
    :autoplay="{
      delay: 10000,
      disableOnInteraction: true,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
  >
    <SwiperSlide class="item-slide" v-for="slide in 3" :key="slide">
    <img src="/images/ad_01.png" alt="">
       <div class="row p-5">
       <div class="col-md-6 col-12 content-slide">
         <h6>Lorem ipsum dolor sit amet consectetur</h6>
         <h1 class="ml2">Lorem ipsum dolor sit amet, consecteturBeautiful Questions</h1>
         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos veritatis molestias optio. Soluta necessitatibus quas odit aperiam modi molestias, error dignissimos quisquam dicta</p>
         <button class="btn-main">Buy Now</button>
       </div>
     </div>
    </SwiperSlide>
  </Swiper>
  
  </section>
</template>

<script setup>
onMounted(() => {
setTimeout(() => {
  var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 2000
  });
}, 2000);
})

</script>

<style lang="scss" scoped>  
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
.item-slide{
  position: relative;
  padding: 20px 0;
 img{
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
  z-index: -1;
 }
 .content-slide{
   h6{
     color: $blue;
     font-weight: bold;
     font-size: 1.5rem;
       @media (max-width: 767.98px) {
      font-size: 1rem;
  }
   }
     .ml2 {
       color: $blue2;
     font-family: PoppinsBold;
  font-weight: 900;
  font-size: 2.5em;
      @media (max-width: 767.98px) {
      font-size: 1.5rem;
  }
    .letter {
    display: inline-block;
    line-height: 1em;
  }
}
   p{
     color: $blue;
     width: 80%;
     line-height: 1.2;
       @media (max-width: 767.98px) {
      font-size: 1rem;
      width: 100%;
  }
   }
 }
}
</style>