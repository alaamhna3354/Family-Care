export const useHttpForUserApi = () => {
  const { apiBase } = useRuntimeConfig();
  
  // Post Data
  const post = async (endpoint, data) => useFetch(() => `${endpoint}`, {
    key: `${endpoint}`,
    baseURL: apiBase,
    method: 'post',
    body: data,
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
  

  // Put Data
  const put = async (endpoint, data) => useFetch(() => `${endpoint}`, {
    key: `${endpoint}`,
    baseURL: apiBase,
    method: 'put',
    body: data,
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
  
  
  return {
    post,
    put
  }
}