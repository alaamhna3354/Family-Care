<template>
  <div class="more-box" 
  :style="{
    transform: translateX,
    'justify-content': justifyContent
  }">
    <NuxtLink :to="url" class="txt-more">
      <span class="dot-before"></span>
      <span class="text">{{ $t('more') }}</span>
      <span class="dot-after"></span>
    </NuxtLink>
  </div>
</template>

<script setup>
  const { url, translateX, justifyContent } = defineProps(['url', 'translateX', 'justifyContent']);
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .more-box {
    display: flex;
    cursor: pointer;
    .txt-more {
      color: #fff;
      direction: ltr;
      &:hover { color: $gold; }
      .text{ font-size: 20px; vertical-align: middle; }
      .dot-after,
      .dot-before {
        display: inline-block;
        height: 1px;
        background: $gold;
        position: relative;
      }
      .dot-before:before,
      .dot-after:after {    
          content: '';
          position: absolute;
          display: inline-block;
          width: 5px;
          height: 5px;
          top: -2px;
          border-radius: 50%;
          background: $gold;        
      }
      .dot-before { 
        width: 120px; margin-right: 15px;
        @include sm-mobile { 
          width: 80px;
        }
        &:before { left: 0; }
      }
      .dot-after { 
        width: 90px; margin-left: 15px;       
        @include sm-mobile { 
          width: 50px;
        }
        &:after { right: 0; }
      }    
    }
  }

</style>