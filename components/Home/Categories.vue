<template>
  <section class="Categories">
           <div class="row p-5">
               <h4>{{$t('Categories')}}</h4>
                <Swiper
            :modules="[SwiperAutoplay,SwiperNavigation]"
            :slides-per-view="slidesPerView"
            navigation
            :space-between="15"
            :autoplay="{delay: 4000}"
            :loop="false" >
             <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000">
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(2).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000">
                 <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(3).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000">
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(4).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                 <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(5).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                 <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(6).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                 <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(7).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(9).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
             </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="card-catigory"  
              data-aos="zoom-out-up" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg(9).png`" 
                :width="`70`" :height="`100`"/>
                <div class="content-service">
                    <h7>Medicine</h7>
                </div>  
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
<style lang="scss">  
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .Categories{
      border-top: 2px solid $blue2;
    //   border-bottom: 2px solid $blue2;
      overflow: hidden;
      
      .swiper-button-next::after,
      .swiper-button-prev::after{
          font-size: 20px;
          padding: 10px 15px;
            border: 1px solid #007aff;
            border-radius: 50%;
            background-color: #fff;
      }
      h4{
        color: $blue2;
        font-family: PoppinsBold;
        margin-bottom: 25px;
      }
      .card-catigory{
          cursor: pointer;
          background-color: #aad7dd;
          text-align: center;
          padding: 20px 0;
          border-radius: 15px;
        .content-service{

                margin-inline-start: 10px;
            h7{
                color: $blue2;
                font-weight: bold;
                font-size: 1.2rem;
                margin-bottom: 5px;
            }
            }
      }
   
  }

</style>