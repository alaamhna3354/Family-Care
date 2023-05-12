<template>
  <div class="">
    <ElementsImage :classes="['card-img-top']" :src="src" :width="`100%`" :height="`200px`"/>
    <div class="card-body text-center">
      <h2 class="card-title" :style="{'font-size': titleSize, 'color': titleColor}">{{ title }}</h2>
      <h3 class="d-inline-block new-price mb-0 mx-2" :style="{'font-size': priceSize, 'color': priceColor}">{{ newPrice }}</h3>
      <h3 class="d-inline-block old-price text-decoration-line-through mb-0 mx-2" :style="{'font-size': priceSize}">{{ oldPrice }}</h3>
    </div>
  </div><!--.card-->
</template>

<script setup>
  const { src, title, oldPrice, newPrice, titleSize, titleColor, priceSize, priceColor } = defineProps(['src', 'title', 'oldPrice', 'newPrice', 'titleSize', 'titleColor', 'priceSize', 'priceColor'])
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';

  .offer-card {
    .new-price, .old-price {
      letter-spacing: 0.1rem;
    }
  }
</style>