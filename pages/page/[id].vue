<template>
  <main>
    <PagesDefault v-if="data" :page="data.result" />
  </main>
</template>

<script setup>
  const { id } = useRoute().params
  const { api } = useRuntimeConfig()
  // Fetch The Data
  const { data, error, execute } = await useGetSiteApi().GetById(`${api.PagesGetByIdApi}`, id)
  // refetch the token if 401 error occure
  if (error.value && error.value.statusCode == 401) {
    await useReauthorization().reAuthorize()
  }

  onMounted(() => {
    // Reexecute fetch data on mounted
    if (!data.value) execute()
  })
</script>