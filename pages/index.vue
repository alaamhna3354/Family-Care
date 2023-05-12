<template>
 <div>
    <Home />
    <!-- <Home v-if="galleryData" :about="about.result" :gallery="galleryData"/> -->
 </div>
</template>

<script setup>
  const { api } = useRuntimeConfig()
  const PageSize = ref(window.innerWidth < 768 ? 10 : 20)
  const galleryQuery = `${api.GalleryGetPaginationsApi}?PageNumber=0&PageSize=${PageSize.value}`

  // Fetch The Data
  const { data: about, error: errorAbout, execute: executeAbout } = await useGetSiteApi().GetById(`${api.PagesGetByIdApi}`, 14)
  const { data: galleryData, error: galleryError, execute: executeGallery } = await useGetSiteApi().GetAll(galleryQuery)

  // refetch the token if 401 error occure
  if ((errorAbout.value && errorAbout.value.statusCode == 401) ||  
      (galleryError.value && galleryError.value.statusCode == 401)) {
      await useReauthorization().reAuthorize()
  }

  onMounted(() => {
    // Reexecute fetch data on mounted
    if (!about.value) executeAbout();
    if (!galleryData.value) executeGallery();
  })

</script>