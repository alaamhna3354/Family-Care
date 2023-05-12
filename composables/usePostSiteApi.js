export const usePostSiteApi = () => {
  const { apiBase } = useRuntimeConfig();
  
  // Post Data
  const post = async (endpoint, data) => useFetch(() => `${endpoint}`, {
    key: `${endpoint}`,
    baseURL: apiBase,
    method: 'post',
    body: data,
    headers: {
      'Authorization': `Bearer ${useMainToken().value}`
    },
    onRequest({ request, options }) {
      // Set the request headers
      options.headers.Authorization = `Bearer ${useMainToken().value}`
    }
  })
  
  
  return {
    post
  }
}