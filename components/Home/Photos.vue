<template>
  <section class="Photos">
           <div class="row p-5">
               <h4>{{$t('Photos')}}</h4>
                <Swiper
            :modules="[SwiperAutoplay,SwiperNavigation]"
            :slides-per-view="slidesPerView"
            navigation
            :space-between="15"
            :autoplay="{delay: 5000}"
            :pagination="{clickable: true, bulletClass: ''}"
            :loop="false" >
             <SwiperSlide>
                <ElementsImage :classes="['custom-image']" :src="`/photos/Rectangle12copy.png`"/>
            </SwiperSlide>
            <SwiperSlide>
                <ElementsImage :classes="['custom-image']" :src="`/photos/Rectangle12copy2.png`"/>
            </SwiperSlide>
            <SwiperSlide>
                <ElementsImage :classes="['custom-image']" :src="`/photos/Rectangle12copy3.png`"/>
            </SwiperSlide>
            <SwiperSlide>
                <ElementsImage :classes="['custom-image']" :src="`/photos/Rectangle12.png`"/>
            </SwiperSlide>
            <SwiperSlide>
                <ElementsImage :classes="['custom-image']" :src="`/photos/Rectangle12.png`"/>
            </SwiperSlide>
          </Swiper>
        </div>
  </section>
</template>

<script setup >
    const counter = ref(0)
const slidesPerView= ref(4);
  const checkWindowWidth = () => {
    if (window.innerWidth > 1100) { 
      slidesPerView.value = 4;
    }
    if (window.innerWidth > 992 && window.innerWidth <= 1100) {
      slidesPerView.value = 4;
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 992) { 
      slidesPerView.value = 2;
    }
    if (window.innerWidth >= 576 && window.innerWidth < 768) { 
      slidesPerView.value = 1;
    }
    if (window.innerWidth < 576) { 
      slidesPerView.value = 1;
    }
  }

    window.addEventListener('resize', () => {
    checkWindowWidth()
    });
</script>
<style lang="scss">  
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .Photos{
    //   border-top: 2px solid $blue2;
    //   border-bottom: 2px solid $blue2;
      overflow: hidden;
      position: relative;
      .swiper {
          position: static;
      }
      .swiper-button-next::after,
      .swiper-button-prev::after{
          font-size: 20px;
          padding: 10px 15px;
            border: 1px solid #007aff;
            border-radius: 50%;
      }
        .swiper-button-next{
        top: 60px;
        right: 50px;
        z-index: 1000;
      }
      .swiper-button-prev{
        top: 60px;
        right: 100px ;
        left: auto;
        z-index: 1000;
      }
       h4{
        color: $blue2;
        font-family: PoppinsBold;
        margin-bottom: 25px;
      }
      img{
          width: 100%;
      }
      
  }

</style>