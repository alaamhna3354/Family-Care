<template>
  <section class="service">
           <div class="row p-5">
                <Swiper
            :modules="[SwiperAutoplay]"
            :slides-per-view="slidesPerView"
            :space-between="15"
            :autoplay="{delay: 3000}"
            :loop="false" >
            <SwiperSlide>
              <div class="d-flex align-items-center" 
              data-aos="flip-left" 
              data-aos-offset="300"
              data-aos-duration="2000">
                <img width="70" src="/images/pngegg(31).png">
                <div class="content-service">
                    <h3>Free Shipping</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>  
             </div>
            </SwiperSlide>
            <SwiperSlide>
               <div class="d-flex align-items-center"  
              data-aos="flip-left" 
              data-aos-offset="300"
              data-aos-duration="2000">
                <img width="70" src="/images/download(1).png">
                <div class="content-service">
                    <h3>Money Guarantee</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>  
             </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="d-flex align-items-center"  
              data-aos="flip-left" 
              data-aos-offset="300"
              data-aos-duration="2000">
                <img width="70" src="/images/payment-methods.png">
                <div class="content-service">
                    <h3>Payment Method</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>  
             </div>
            </SwiperSlide>
            <SwiperSlide>
               <div class="d-flex align-items-center"  
              data-aos="flip-left" 
              data-aos-offset="300"
              data-aos-duration="2000">
                <img width="70" src="/images/online-support-icon-15.png">
                <div class="content-service">
                    <h3>Online Support</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>  
             </div>
            </SwiperSlide>
          </Swiper>
        </div>
  </section>
</template>
<script setup>
  const slidesPerView = ref(4);

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
<style lang="scss" scoped>  
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .service{
      border-top: 2px solid $blue2;
      // border-bottom: 2px solid $blue2;
      overflow: hidden;
      position: relative;
     
    .content-service{
        margin-inline-start: 10px;
    h3{
        color: $blue2;
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 5px;
    }
    p{
        color: $blue;
        line-height: 1.1;
        font-size: .8rem;
    }
    }
  }

</style>