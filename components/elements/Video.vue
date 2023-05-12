<template>
    <ElementsVPlaceLoad v-if="!loaded" :width="width" :height="height" :classes="loadClasses"/>
    <video class="custom-video" v-if="loaded" @load="checkload" autoplay muted loop :poster="poster">
      <source :src="src" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
</template>

<script setup>
  const { src, width, height, poster, loadClasses, title = 'Video' } = defineProps(['src', 'width', 'height', 'poster', 'loadClasses', 'title']);
  const loaded = ref(false);

  const checkload = () => {
    console.log('load video done')
    loaded.value = true
  }

  onMounted(() => {
    checkload();
  })
</script>

<style lang="scss" scoped>
  .custom-video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
</style>