<template>
    <div class="more-btn-box">
      <NuxtLink :to="url" :class="`btn-more ${classes}`" :style="{width: width, 'font-size': fontSize}">{{ btnText }}</NuxtLink>
    </div>
</template>

<script setup>
  const { url, classes, width, fontSize, btnText } = defineProps(['url', 'classes', 'width', 'fontSize', 'btnText'])
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  .more-btn-box {
    .btn-more {
      // @include defaultLinearGradient();
      // width: 300px !important;
      display: inline-block;
      text-align: center;
      color: #fff;
      border-radius: 30px;
      background: $medium-gold;
      padding-left: 1rem;
      padding-right: 1rem;
      // font-size: 28px;
      &:hover { color : #000; }
    }
  }

</style>