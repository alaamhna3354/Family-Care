<template>
    <ElementsVPlaceLoad v-if="!loaded" :width="width" :height="height" :classes="loadClasses"/>
    <div v-if="loaded" :class="`ratio ${classes}`">
      <iframe @load="checkload" :title="title" :src="src" allowfullscreen></iframe>
    </div>
</template>

<script setup>
  const { src, width, height, classes, loadClasses, title = 'Video' } = defineProps(['src', 'classes', 'width', 'height', 'loadClasses', 'title']);
  const loaded = ref(false);

  const checkload = () => {
    console.log('load video done')
    loaded.value = true
  }

  onMounted(() => {
    checkload();
  })
</script>