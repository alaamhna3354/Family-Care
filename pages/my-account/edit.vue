<template>
  <main>
    <MyAccountEditPersonProfile v-if="accountType == 'Person' && data && countries" :nationalities="data" :countries="countries" />
    <MyAccountEditCompanyProfile v-if="accountType == 'Company' && data && countries" :nationalities="data" :countries="countries" />
  </main>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  const { api } = useRuntimeConfig()
  const accountType = useAccountType()
  // Fetch The Data
  const { data, error, execute } = await useGetSiteApi().GetAll(`${api.NationalitiesGetAllApi}`)
  const { data: countries, error: countriesError, execute: countriesExecute } = await useGetSiteApi().GetAll(api.CountriesGetAllApi)
  // refetch the token if 401 error occure
  if ((error.value && error.value.statusCode == 401) || (countriesError.value && countriesError.value.statusCode == 401)) {
    await useReauthorization().reAuthorize()
  }
  
  onMounted(() => {
    // Reexecute fetch data on mounted
    if (!data.value) execute()
    if (!countries.value) countriesExecute()
  })
</script>