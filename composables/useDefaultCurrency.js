export const useDefaultCurrency = () => {
  const { apiBase, api } = useRuntimeConfig()

  const getCurrency = async () => useFetch(`${api.CurrenciesGetAllApi}`, {
    key: `${api.CurrenciesGetAllApi}`,
    baseURL: apiBase,
    headers: {
      'Authorization': `Bearer ${useMainToken().value}`
    },
    onRequest({ request, options }) {
      // Set the request headers
      options.headers.Authorization = `Bearer ${useMainToken().value}`
    },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response._data) {
        response._data.forEach(e => {
          if (e.isDefault) {
            localStorage.removeItem('defaultCurrency')
            localStorage.setItem('defaultCurrency', JSON.stringify(e))
            useCurrency().value = e;
          }
        })
      }
      return response._data
    }
  })

  return {
    getCurrency
  }
}