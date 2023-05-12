<template>
  <section class="about_section" id="about">
    <!-- <ElementsHeaderImage :src="`/images/header (5).jpeg`" :height="`50vh`" /> -->
    <section class="home-about-us">
      <div class="container">
        <div class="col-12 col-md-10 col-lg-8 mx-auto">
          <!-- <ElementsGoldCorner :classes="['d-none d-md-block']" v-if="$i18n.locale == 'en'" :lang="$i18n.locale" :left="goldCornerLeft" :top="goldCornerTop" />
          <ElementsGoldCorner :classes="['d-none d-md-block']" v-if="$i18n.locale == 'ar'" :lang="$i18n.locale" :right="goldCornerLeft" :top="goldCornerTop" /> -->
          <!-- <p class="text-gold flow-word text-center">Metallic</p> -->
          <!-- <img src="/icons/footer-logo.png" alt="Site Logo" /> -->
          <h2 class="title text-medium-gold text-center font-philosopher my-4">{{ useTranslate(page, 'title') }}</h2>
          <ElementsImage v-if="page.imageUrl" :id="`front`" :classes="['responsive', 'front', 'mb-3']" :src="apiBase + '/' + page.imageUrl" :light="`loads`" :width="`100%`" :height="`330px`"/>
          <div class="content text-white" v-html="useTranslate(page, 'content')"></div>
          <div class="file" v-if="page.fileUrl">
            <a class="btn btn-medium-gold" :href="apiBase + '/' + page.fileUrl">Attached File</a>
          </div>
        </div>
      </div><!--.container-->
    </section>
  </section>
</template>

<script setup>
  const { page } = defineProps(['page'])
  const { apiBase } = useRuntimeConfig()
  const goldCornerTop = ref('9vh');
  const goldCornerLeft = ref('15%');
  
  const checkWindowWidth = () => {
    if (window.innerWidth > 1100) {
      // goldCornerTop.value = '5%';
      // goldCornerLeft.value = '15%';
    }
    if (window.innerWidth >= 992 && window.innerWidth <= 1100) {
      goldCornerTop.value = '7vh';
      goldCornerLeft.value = '10%';
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 992) {
      goldCornerTop.value = '7vh';
      goldCornerLeft.value = '5%';
    }
    if (window.innerWidth >= 576 && window.innerWidth < 768) {
      goldCornerLeft.value = '5%';
    }
    if (window.innerWidth < 576) {
    }
  }

  onMounted(() => {
    checkWindowWidth();
  })
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .home-about-us {
    background: url('/images/bg-about-us.webp') center center no-repeat;
    background-size: 100% 100%;
    padding-top: 5rem;
    padding-bottom: 10rem;
    position: relative;   
    @include tablet { padding-top: 3rem; }
    @include sm-mobile { padding-top: 2rem; }   
    .flow-word { 
      position: relative; 
      text-transform: uppercase; 
      font-size: 28px;
      margin-bottom: 2rem;    
    }
    h2.title { 
      font-size: 60px; 
      @include tablet { font-size: 50px; }
      @include sm-mobile { font-size: 35px; }
    }
    // p.content { 
    //   font-size: 25px; 
    //   margin-bottom: 5rem;
      // text-align: justify !important;
      // text-align-last: center;
    // }
    img { width: 220px; }
  }

</style>
