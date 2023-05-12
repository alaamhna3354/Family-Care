<template>
  <section class="about-us">
    <!-- <div class="container">
      <h2 class="title text-white text-center font-philosopher">Luxmetallic converts your plastic credit/debit card to luxurious metal.</h2>
      <p class="sub-title text-center text-medium-gold pb-5">
        <span>Work in any ATMs</span>
        <span class="mx-2">|</span>
        <span>No hidden fees</span>
        <span class="mx-2">|</span>
        <span>Secure</span>
      </p>
      <div class="row">
        <div class="col-12 col-lg-6 pb-3 pb-md-0">
          <p class="content-desc text-white mb-5" v-html="useTranslate(data, 'content').slice(0, 600) + ' ....'"></p>
        </div>
        <div class="col-6 d-lg-block d-none">
          <ElementsImage :classes="['img-fluid']" src="/images/bg-home-about-us-icons.png" :width="`100%`" :height="`100%`" />
        </div>
      </div>
    </div> -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-12" 
              data-aos="zoom-out-right" 
              data-aos-offset="500"
              data-aos-duration="2000">
          <ElementsImage  :classes="['custom-image']" :src="`/images/Group 26_.png`" />
        </div>
        <div class="col-md-4 col-12"   
              data-aos="zoom-out-left" 
              data-aos-offset="500"
              data-aos-duration="2000">
          <h3> {{$t('about-us')}} </h3>
          <!-- <p class="content" v-html="useTranslate(data, 'content').slice(0, 600) + ' ....'"></p> -->
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt mollitia eaque inventore vel distinctio? Reiciendis consequatur nisi molestiae laudantium perferendis enim nesciunt optio commodi? Voluptates alias autem natus sit veniam.</p>
          <div class="d-flex mb-3">
            <button class="btn-main">Read More</button>
            <button class="btn-main btn-main2">Contact Us</button>
          </div>
          <p>Said {{$t('about-us')}}</p>
          <swiper
    :modules="[SwiperEffectCoverflow]"
    :effect="'coverflow'"
    :slides-per-view="3"
    :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
    class="mySwiper"
  >
    <swiper-slide>
      <ElementsImage :classes="['custom-image']" src="https://swiperjs.com/demos/images/nature-1.jpg" />
    </swiper-slide>
    <swiper-slide>
      <ElementsImage :classes="['custom-image']" src="https://swiperjs.com/demos/images/nature-1.jpg" />
    </swiper-slide>
    <swiper-slide>
      <ElementsImage :classes="['custom-image']" src="https://swiperjs.com/demos/images/nature-1.jpg" />
    </swiper-slide>
  </swiper>
  <div class="Doctor d-flex justify-content-between p-4 pt-2 pb-0">
        <div>
          <h5>Doctor Name</h5>
          <h6>location</h6>
        </div>
        <div>
          <font-awesome-icon style="color:#f7ca05" :icon="['fass', 'star']" />
          <font-awesome-icon style="color:#f7ca05" :icon="['fass', 'star']" />
          <font-awesome-icon style="color:#f7ca05" :icon="['fass', 'star']" />
          <font-awesome-icon style="color:#f7ca05" :icon="['fass', 'star']" />
          <font-awesome-icon style="color:#f7ca05" :icon="['fass', 'star']" />
        </div>
    </div>
      <p class="info p-4 pt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium fugiat quasi fugit eius, quas amet vel.</p>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
  const { data } = defineProps(['data'])
</script>

<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .about-us {
    overflow: hidden;
    img{
      width: 100%;
    }
    h3{
      color: $blue2;
      font-family: PoppinsBold;
    }
    P{
      color: #458ab2;
    }
    .content{
      width: 90%;
    }
    .btn-main{
      font-size: 13px;
    }
    .btn-main2{
      margin-inline-start: 20px;
    }
    .Doctor{
      h5{
        color:#3683ac;
        font-size: 1.1rem;
        margin-bottom: 0;
      }
       h6{
        color:#3683ac;
        font-size: .8rem;
      }
    }
    .info{
      color: #2eb0bf;
      font-size: 1rem;
      line-height: 1;
    }
  }

</style>