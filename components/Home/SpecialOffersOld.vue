<template>
  <section class="special-offers text-center pt-4">
    <div class="container-fluid">
      <ElementsLinearIcon :src="`/icons/sm-black-logo.png`" :classes="['mx-auto']" :width="`30%`" />
      <h2 class="title text-center my-5">Special Offers</h2>
      <div class="offers-carousel">
        <div class="row">
          <Swiper
            :modules="[SwiperAutoplay, SwiperPagination]"
            :slides-per-view="3"
            :space-between="15"
            :autoplay="{delay: 3000}"
            :pagination="{clickable: true, bulletClass: ''}"
            :loop="true" >
            <SwiperSlide>
                <ElementsProductCard :src="`/images/offer-card-1.png`" :title="`Lorem Ipsume`" :newPrice="`0000`" :oldPrice="`0000`" />
            </SwiperSlide>
            <SwiperSlide>
                <ElementsProductCard :src="`/images/offer-card-2.png`" :title="`Lorem Ipsume`" :newPrice="`0000`" :oldPrice="`0000`" />
            </SwiperSlide>
            <SwiperSlide>
                <ElementsProductCard :src="`/images/offer-card-3.png`" :title="`Lorem Ipsume`" :newPrice="`0000`" :oldPrice="`0000`" />
            </SwiperSlide>
            <SwiperSlide>
                <ElementsProductCard :src="`/images/offer-card-4.png`" :title="`Lorem Ipsume`" :newPrice="`0000`" :oldPrice="`0000`" />
            </SwiperSlide>
            <SwiperSlide>
                <ElementsProductCard :src="`/images/offer-card-5.png`" :title="`Lorem Ipsume`" :newPrice="`0000`" :oldPrice="`0000`" />
            </SwiperSlide>          
          </Swiper>
        </div><!--.row-->
      </div><!--offers-carousel-->
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .special-offers {
    background: url('/images/bg-special-offers.webp') center center no-repeat;
    background-size: cover;
    color: #555;
    padding-bottom: 8rem;
    .title { font-size: 70px; color: #444; }    
  }
</style>