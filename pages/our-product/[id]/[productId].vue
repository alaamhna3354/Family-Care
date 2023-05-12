<template>
  <main>
    <ProductsCardReadyCustomization v-if="data && colors && priceData" :card="data.result" :colors="colors" :prices="priceData" />
  </main>
</template>

<script setup>
  definePageMeta({
    middleware: 'auth-product-customized'
  })
  const { api } = useRuntimeConfig()
  const { productId } = useRoute().params
  // Fetch The Data
  const { data, error, execute } = await useGetSiteApi().GetById(`${api.ColorsGetByIdApi}`, productId)
  const { data: colors, error: colorsError, execute: ColorExecute } = await useGetSiteApi().GetAll(`${api.ColorsGetCustomApi}`)
  const { data: priceData, error: priceError, execute: executePrice } = await useGetSiteApi().GetAll(`${api.PricesGetAllApi}`)

  // refetch the token if 401 error occure
  if ((error.value && error.value.statusCode == 401) || 
      (colorsError.value && colorsError.value.statusCode == 401) ||
      (priceError.value && priceError.value.statusCode == 401)) {
    await useReauthorization().reAuthorize()
  }

  onMounted(() => {
    // Reexecute fetch data on mounted
    if (!data.value) execute()
    if (!colors.value) ColorExecute()
    if (!priceData.value) executePrice()
  })
</script>