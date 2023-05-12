<template>
  <div>
    <!-- Header Slider -->
    <HomeHeaderVideo />
    <!-- Services  -->
    <HomeService />
    <!-- Categories -->
    <HomeCategories />
     <!-- Brand -->
    <HomeBrand />
    <!-- Products -->
    <HomeProducts />
    <!-- Banner -->
    <HomeBanner />
    <!-- Offers -->
    <HomeOffers />
    <!-- Banner -->
    <HomeBanner />
    <!-- About Us -->
    <HomeAboutUs  />
    <!-- <HomeAboutUs v-if="about" :data="about" /> -->
    <!-- Photos -->
    <HomePhotos />
    <!-- Gallery -->
    <!-- <HomeGallery v-if="gallery" :data="gallery" /> -->

  </div>
</template>

<script setup>
  const { about, gallery } = defineProps(['about', 'gallery'])
</script>