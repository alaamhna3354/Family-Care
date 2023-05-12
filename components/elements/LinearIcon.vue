<template>
  <div :style="{width: width}" :class="classes">
    <img class="header-content-logo text-center mx-3" width="50" :src="src" alt="Header Content Logo" />
  </div>
</template>

<script setup>
  const { src, width, classes } = defineProps(['src', 'width', 'classes'])
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  div {
    &:after, &:before {
      content: '';
      display: inline-block;
      height: 1px;
      width: calc(50% - 47px);
      background: $gold;
    }
    img { vertical-align: bottom; }
  }
</style>