export const useGetUserApi = () => {
  const { apiBase } = useRuntimeConfig();
  
  // Get All Data (Get All)
  const GetAll = async (endpoint) => useFetch(() => `${endpoint}`, {
    key: `${endpoint}`,
    baseURL: apiBase,
    headers: {
      'Authorization': `Bearer ${useToken().value}`
    },
    onRequest({ request, options }) {
      // Set the request headers
      options.headers.Authorization = `Bearer ${useToken().value}`
      return;
    },
    onResponseError({ request, response, options }) {
      if (response.status == 401) {
        return resetUserAuth();
      }
    }
  })
  
  // Get Add Data By Id (Get Details)
  const GetById = async (endpointWithoutId, id) => useFetch(`${endpointWithoutId}${id}`, {
    key: `${id}`,
    baseURL: apiBase,
    headers: {
      'Authorization': `Bearer ${useToken().value}`
    },
    onRequest({ request, options }) {
      // Set the request headers
      options.headers.Authorization = `Bearer ${useToken().value}`      
    },
    onResponseError({ request, response, options }) {
      if (response.status == 401) {
        return resetUserAuth();
      }
    }
  })
  
  
  const resetUserAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    useToken().value = null;
    useAuth().value.isAuthenticated = false;
    useUserInfo().value = null
    return navigateTo('/auth/login')
  }

  // console.log('run get api again');
  return {
    GetAll,
    GetById
  }
}