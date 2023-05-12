<template>
  <div :class="`gold-corner ${classes}`" :style="{
    transform: rotate,
    left: left,
    right: right,
    top: top,
    }">
    <span :class="`vertical ${lang == 'en' ? 'ltr' : 'rtl'}`"></span>
    <span :class="`horizontal ${lang == 'en' ? 'ltr' : 'rtl'}`"></span>
  </div>
</template>

<script setup>
  const { rotate, left, right, top, lang, classes } = defineProps(['rotate', 'left', 'right', 'top', 'lang', 'classes'])
</script>

<style lang="scss" scoped>
@import '~/assets/styles/scss/theme/variables';
  .gold-corner {
    position: absolute;
    // left: 15%;
    // top: 13%;
    .horizontal,
      .vertical {
        display: inline-block;
        height: 1px;
        background: $gold;
        position: relative;
      }
      .vertical:before,
      .horizontal:after {    
          content: '';
          position: absolute;
          display: inline-block;
          width: 5px;
          height: 5px;
          top: -2px;
          border-radius: 50%;
          background: $gold;        
      }
      .vertical { 
        width: 50vh;      
        top: 25vh;
        transform: rotate(-90deg);
        &:before { left: 0; }
        &.ltr { left: -25vh; }
        &.rtl { right: -25vh; }
      }
      .horizontal { 
        width: 35vh;
        &:after { right: 0; }
        &.ltr { left: -50vh; }
        &.rtl { right: -50vh; transform: rotateY(-180deg) }
      }
  }

</style>