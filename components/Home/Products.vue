<template>
  <section class="products">
           <div class="row p-5">
               <h4>{{$t('Shop')}}</h4>
                <Swiper
            :modules="[SwiperAutoplay,SwiperNavigation]"
            :slides-per-view="slidesPerView"
            navigation
            :space-between="15"
            :autoplay="{delay: 5000}"
            :pagination="{clickable: true, bulletClass: ''}"
            :loop="false" >
             <SwiperSlide>
              <div class="card-product"  
              data-aos="zoom-out" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                  <div class="slug">
                      Hair Care
                  </div>
                  <div class="image">
                      <ElementsImage :classes="['custom-image']" :src="`/products/pngegg (2).png`" :width="`70`" :height="`100`"/>
                  </div>
                <div class="card-info">
                    <h5>Product Name</h5>
                    <h8>Company Name</h8>
                    <p class="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, tempore nulla rem ipsam, laudantium ea molestias voluptatum dolor dignissimos, commodi corrupti? Deleniti est debitis maiores nisi eos magni adipisci suscipit?</p>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <h4 class="price">69 AED</h4>
                        <div class="cart-shop">
                            <span class="counter">{{counter}}</span>
                            <div style="display: grid;">
                                <font-awesome-icon @click="counter++" :icon="['fas', 'angle-up']" />
                                <font-awesome-icon @click="counter--" :icon="['fas', 'angle-down']" />
                            </div>
                             
                            <img src="/icons/Layer11.png" alt="">
                        </div>
                    </div>
                </div>
             </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="card-product"  
              data-aos="zoom-out" 
              data-aos-offset="300"
              data-aos-duration="2000">
                  <div class="slug">
                      Hair Care
                  </div>
                  <ElementsImage :classes="['custom-image']" :src="`/products/pngegg (2).png`" :width="`70`" :height="`100`"/>
                <div class="card-info">
                    <h5>Product Name</h5>
                    <h8>Company Name</h8>
                    <p class="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, tempore nulla rem ipsam, laudantium ea molestias voluptatum dolor dignissimos, commodi corrupti? Deleniti est debitis maiores nisi eos magni adipisci suscipit?</p>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <h4 class="price">69 AED</h4>
                        <div class="cart-shop">
                            <span class="counter">{{counter}}</span>
                            <div style="display: grid;">
                                <font-awesome-icon @click="counter++" :icon="['fas', 'angle-up']" />
                                <font-awesome-icon @click="counter--" :icon="['fas', 'angle-down']" />
                            </div>
                             
                            <img src="/icons/Layer11.png" alt="">
                        </div>
                    </div>
                </div>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-product"  
              data-aos="zoom-out" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                  <div class="slug">
                      Hair Care
                  </div>
                  <ElementsImage :classes="['custom-image']" :src="`/products/pngegg (2).png`" :width="`70`" :height="`100`"/>
                <div class="card-info">
                    <h5>Product Name</h5>
                    <h8>Company Name</h8>
                    <p class="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, tempore nulla rem ipsam, laudantium ea molestias voluptatum dolor dignissimos, commodi corrupti? Deleniti est debitis maiores nisi eos magni adipisci suscipit?</p>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <h4 class="price">69 AED</h4>
                        <div class="cart-shop">
                            <span class="counter">{{counter}}</span>
                            <div style="display: grid;">
                                <font-awesome-icon @click="counter++" :icon="['fas', 'angle-up']" />
                                <font-awesome-icon @click="counter--" :icon="['fas', 'angle-down']" />
                            </div>
                            <img src="/icons/Layer11.png" alt="">
                        </div>
                    </div>
                </div>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-product"   
              data-aos="zoom-out" 
              data-aos-offset="300"
              data-aos-duration="2000">
                  <div class="slug">
                      Hair Care
                  </div>
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg (2).png`" :width="`70`" :height="`100`"/>
                <div class="card-info">
                    <h5>Product Name</h5>
                    <h8>Company Name</h8>
                    <p class="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, tempore nulla rem ipsam, laudantium ea molestias voluptatum dolor dignissimos, commodi corrupti? Deleniti est debitis maiores nisi eos magni adipisci suscipit?</p>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <h4 class="price">69 AED</h4>
                        <div class="cart-shop">
                            <span class="counter">{{counter}}</span>
                            <div style="display: grid;">
                                <font-awesome-icon @click="counter++" :icon="['fas', 'angle-up']" />
                                <font-awesome-icon @click="counter--" :icon="['fas', 'angle-down']" />
                            </div>
                            <img src="/icons/Layer11.png" alt="">
                        </div>
                    </div>
                </div>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-product"  
              data-aos="zoom-out" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                  <div class="slug">
                      Hair Care
                  </div>
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg (2).png`" :width="`70`" :height="`100`"/>
                <div class="card-info">
                    <h5>Product Name</h5>
                    <h8>Company Name</h8>
                    <p class="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, tempore nulla rem ipsam, laudantium ea molestias voluptatum dolor dignissimos, commodi corrupti? Deleniti est debitis maiores nisi eos magni adipisci suscipit?</p>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <h4 class="price">69 AED</h4>
                        <div class="cart-shop">
                            <span class="counter">{{counter}}</span>
                            <div style="display: grid;">
                                <font-awesome-icon @click="counter++" :icon="['fas', 'angle-up']" />
                                <font-awesome-icon @click="counter--" :icon="['fas', 'angle-down']" />
                            </div>
                            <img src="/icons/Layer11.png" alt="">
                        </div>
                    </div>
                </div>
             </div>
            </SwiperSlide>
             <SwiperSlide>
              <div class="card-product"  
              data-aos="zoom-out" 
              data-aos-offset="300"
              data-aos-duration="2000" >
                  <div class="slug">
                      Hair Care
                  </div>
                <ElementsImage :classes="['custom-image']" :src="`/products/pngegg (2).png`" :width="`70`" :height="`100`"/>
                <div class="card-info">
                    <h5>Product Name</h5>
                    <h8>Company Name</h8>
                    <p class="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, tempore nulla rem ipsam, laudantium ea molestias voluptatum dolor dignissimos, commodi corrupti? Deleniti est debitis maiores nisi eos magni adipisci suscipit?</p>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <h5 class="price">69 AED</h5>
                        <div class="cart-shop">
                            <span class="counter">{{counter}}</span>
                            <div style="display: grid;">
                                <font-awesome-icon @click="counter++" :icon="['fas', 'angle-up']" />
                                <font-awesome-icon @click="counter--" :icon="['fas', 'angle-down']" />
                            </div>
                            <img src="/icons/Layer11.png" alt="">
                        </div>
                    </div>
                </div>
             </div>
            </SwiperSlide>
          </Swiper>
        </div>
  </section>
</template>

<script setup >
    const counter = ref(0)
const slidesPerView= ref(5);
  const checkWindowWidth = () => {
    if (window.innerWidth > 1100) { 
      slidesPerView.value = 5;
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
  .products{
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
      .card-product{
          cursor: pointer;
          border: 2px solid $blue;
          border-radius: 35px;
          position: relative;
          overflow: hidden;
          height: 300px;
          text-align: center;
          img{
              margin-bottom: 25px;
              margin-top: 50px;
          }
          .slug{
              position: absolute;
              top: -2px;
              left: -2px;
              background-color: $blue;
              color: #fff;
              padding: 5px 20px;
              border-top-left-radius: 35px;
              border-bottom-right-radius: 35px;
          }
          .card-info{
              background-color: #abcee1;
              text-align: center;
              padding: 10px 30px;
              height: 100%;
              h5{
                  color: #04669d;
                  font-size: 1.1rem;
                  margin: 0;
              }
              h8{
                  color: #64bccd;
                  font-size: .8rem;
                  margin: 0;
              }
              p{
                  color: #fff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin: auto;
                  font-size: .8rem;
              }
              .price{
                  color: $red;
                  margin: 0;
              }
              .cart-shop{
                  display: flex;
                  align-items: center;
                  background-color: #fff;
                  width: 80px;
                  justify-content: space-around;
                    border-radius: 10px;
                  .counter,svg{
                      color: $blue;
                  }
                  svg{
                      font-size: 14px;
                      transition: $transition;
                      &:hover{
                          scale: 1.2;
                      }
                  }
                  img{
                      margin: 0;
                      width: 20px;
                      height: 20px;
                  }
              }
          }
      }
  }

</style>