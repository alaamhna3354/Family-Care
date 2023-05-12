<template>
  <section class="custom-card bg-black">
    <div class="main-video">  
      <!-- <ElementsIFrame :classes="['ratio-16x9']" :title="`Card video`" :src="`https://player.vimeo.com/video/709181677?autoplay=1&playsinline=1&color&autopause=0&loop=1&muted=1&title=0&portrait=0&byline=0`" :width="`100%`" :height="`500px`"/> -->
      <ElementsImage :classes="['responsive']" :src="`/images/dul-chip.jpeg`" :width="`100%`" :height="`500px`"/>
    </div>
    <div class="row w-100 mx-auto">
      <div class="col-12">
        <h1 class="title text-center text-medium-gold font-philosopher pt-5 mb-0">{{ useTranslate(data, 'title') }}</h1>
      </div>
      <!-- <div class="col-12">
        <hr class="bg-gold mt-0"/>
      </div> -->
      <div class="bright-white col-12 col-md-10 col-lg-8 col-xl-6 mx-auto text-center text-white pt-2 pb-5">
        <div v-html="useTranslate(data, 'content')"></div>
        <ElementsCustomBtn :url="`/our-product/5`" :classes="['py-2']" :width="`300px`" :fontSize="`15px`" :btnText="`Get 2 In 1 Card Now`" />
      </div>
    </div>
  </section>
</template>

<script setup>
  const { data } = defineProps(['data'])
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .custom-card {
    .title {
      font-size: 3.5rem;
      @include medium { font-size: 3rem; }
      @include tablet { font-size: 2.5rem; }
      @include sm-mobile { font-size: 2.5rem; }
    }
  }
</style>