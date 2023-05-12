<template>
  <main>
    <MyAccount v-if="data" :orders="data" />
  </main>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
  })
  const { api } = useRuntimeConfig()
  const query = `${api.ClientOrdersApi}?PageNumber=0&PageSize=10`
  const { data, error, execute } = await useGetUserApi().GetAll(query)
  // refetch the token if 401 error occure
  if (error.value && error.value.statusCode == 401) {
    await useReauthorization().reAuthorize()
  }
  

  onMounted(() => {
    // Reexecute fetch data on mounted
    if (!data.value) execute()
  })
</script>