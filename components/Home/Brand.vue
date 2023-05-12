<template>
  <section class="brands">
           <div class="row p-5">
               <h4>{{$t('Shop_By_Brands')}}</h4>
                <Swiper
            :modules="[SwiperAutoplay, SwiperNavigation]"
            :slides-per-view="slidesPerView"
            navigation          
            :space-between="15"
            :autoplay="{delay: 5000}"
            :loop="false" >
             <SwiperSlide>
              <div class="card-category"  
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(2).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-category"  
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(3).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-category"   
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000">
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(4).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-category"  
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(5).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-category"  
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(6).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-category"  
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(7).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-category"  
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(9).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="card-category"  
              data-aos="zoom-out-down" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(9).png`" :width="`70`" :height="`100`"/>
             </div>
            </SwiperSlide>
          </Swiper>
        </div>
  </section>
</template>
<script setup>
  const slidesPerView = ref(7);

  const checkWindowWidth = () => {
    if (window.innerWidth > 1100) { 
      slidesPerView.value = 7;
    }
    if (window.innerWidth > 992 && window.innerWidth <= 1100) {
      slidesPerView.value = 5;
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 992) { 
      slidesPerView.value = 3;
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

<style lang="scss" >  
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .brands{
      border-top: 2px solid $blue2;
    //   border-bottom: 2px solid $blue2;
      position: relative;
      overflow: hidden;
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
      .card-category {
          cursor: pointer;
          border: 2px solid $blue;
          display: grid;
          place-content: center;
          padding: 10px 0;
          border-radius: 15px;
          .custom-image {
            margin: auto;
            width: 70px;
            height: 100px;
          }
      }
  }

</style>