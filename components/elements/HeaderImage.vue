<template>
  <section class="header-image w-100" :style="{height: height}">
    <!-- <ElementsImage :classes="['responsive']" :src="src" /> -->
    <ElementsImage :classes="['responsive']" :src="src" :width="`100%`" :height="`400px`"/>
  </section>
</template>

<script setup>
  const { src, height } = defineProps(['src', 'height'])
</script>

<style lang="scss" scoped>
  .header-image {
    width: 100vw;
  }

</style>