export const useGetSiteApi = () => {
  const { apiBase } = useRuntimeConfig();
  
  // Get All Data (Get All)
  const GetAll = async (endpoint, transformOptions = null) => useFetch(() => `${endpoint}`, {
    key: `${endpoint}`,
    baseURL: apiBase,
    headers: {
      'Authorization': `Bearer ${useMainToken().value}`
    },
    transform: transformOptions ? transformOptions.transform : (response) => response,
    onRequest({ request, options }) {
      // Set the request headers
      options.headers.Authorization = `Bearer ${useMainToken().value}`
    }
  })
  
  // Get Add Data By Id (Get Details)
  const GetById = async (endpointWithoutId, id) => useFetch(`${endpointWithoutId}${id}`, {
    key: `${id}`,
    baseURL: apiBase,
    headers: {
      'Authorization': `Bearer ${useMainToken().value}`
    },
    onRequest({ request, options }) {
      // Set the request headers
      options.headers.Authorization = `Bearer ${useMainToken().value}`      
    }
  })

  
  // console.log('run get api again');
  return {
    GetAll,
    GetById
  }
}