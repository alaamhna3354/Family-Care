<template>
  <main>
    <AuthRegister v-if="data" :countries="data"/>
  </main>
</template>

<script setup>
  definePageMeta({
    middleware: ['not-authorize']
  })
  const { api } = useRuntimeConfig()
  // Fetch The Data
  const { data, error, execute } = await useGetSiteApi().GetAll(api.CountriesGetAllApi)
  // const { data: nationalities, error: nationalitiesError, execute: nationalityExecute } = await useGetSiteApi().GetAll(api.NationalitiesGetAllApi)
  // refetch the token if 401 error occure
  if (error.value && error.value.statusCode == 401) {
    await useReauthorization().reAuthorize()    
  }

  onMounted(() => {
    // Reexecute fetch data on mounted
    if (!data.value) execute()
  })

</script>

<style lang="scss">
  
</style>
