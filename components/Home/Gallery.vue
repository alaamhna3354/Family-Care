<template>
  <section class="gallery golden-gradient-background">
    <div class="container">
      <h2 class="title text-white">{{ $t('gallery') }}</h2>
    </div>
    <div class="white-box bg-body py-5">
      <div class="container">
        <div class="gallery-grid">
          <div class="item p-2 p-md-3" v-for="item in data" :key="item.id">
            <NuxtLink :to="`/our-product/3/${item.id}`">
              <h3 class="fw-bolder font-philosopher">{{ useTranslate(item, 'name') }}</h3>
              <ElementsImage :classes="['item-image']" :src="apiBase + '/' + item.frontImageUrl" :width="`100%`" :height="`150px`" />
              <h4 class="price mt-3 mb-0 fw-bolder">{{ item.price + ' ' + currency.symbol}}</h4>
              <span class="plus-icon"><i class="fa fa-plus fa-fw fa-lg"></i></span>
            </NuxtLink>
          </div><!--.item-->
        </div><!--.gallery-grid-->
      </div>
    </div>
  </section>
</template>

<script setup>
  const { data } = defineProps(['data'])
  const { apiBase } = useRuntimeConfig()
  const currency = useCurrency().value
</script>

<style lang="scss">
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .gallery {
    padding-top: 7rem;
    padding-bottom: 7rem;
    @include medium { 
      padding-top: 6rem;
      padding-bottom: 6rem;
     }
    @include tablet { 
      padding-top: 5rem;
      padding-bottom: 5rem;
     }
    @include sm-mobile { 
      padding-top: 3rem;
      padding-bottom: 3rem;
     }
    .title { 
      font-size: 60px; 
      @include tablet { font-size: 50px; }
      @include sm-mobile { font-size: 40px; }
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: minmax(200px, auto);
      column-gap: 20px;
      row-gap: 35px;
      @include large { grid-template-columns: repeat(4, 1fr); }
      @include medium { grid-template-columns: repeat(3, 1fr); }
      @include tablet { grid-template-columns: repeat(2, 1fr); }
      @include sm-mobile { grid-template-columns: repeat(2, 1fr); }
      .item {
        position: relative;
        border-radius: 10px;
        border: 5px solid $medium-gold;
        @include transition(all, .5s, ease);
        @include sm-mobile { 
          border: 3px solid $medium-gold;
        }
        &:hover { border: 5px solid $light-gold-v2; }
        a { color: $medium-gold; }
        h3 {
          @include sm-mobile { font-size: 1.2rem; }
        }
        .item-image {
          width: 100%;
          height: 130px;
          border-radius: 7px;
          @include sm-mobile { height: 100px; }
        }
        h4 {
          @include sm-mobile { font-size: 1rem; }
        }
        .plus-icon {
          position: absolute;
          bottom: -18px;
          display: inline-block;
          width: 36px;
          height: 36px;
          background: $medium-gold;
          border-radius: 50%;
          text-align: center;
          vertical-align: super;
          color: #fff;
          right: 17px;
          i { vertical-align: text-bottom; }
        }
      }
    }
  }
</style>
