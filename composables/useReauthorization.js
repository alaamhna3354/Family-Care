export const useReauthorization = () => {
  const { apiBase, api } = useRuntimeConfig()
  const mainToken = useMainToken().value
  const refreshMainToken = useRefreshMainToken().value

  const reAuthorize = async () => useFetch(`${api.AuthRefreshTokenApi}`, {
    baseURL: apiBase,
    method: 'POST',
    body: {
      token: mainToken,
      refreshToken: refreshMainToken
    },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response._data.successed) {
        localStorage.removeItem('mainToken')
        localStorage.removeItem('refreshMainToken')
        localStorage.setItem('mainToken', response._data.token)
        localStorage.setItem('refreshMainToken', response._data.refreshToken);
        useMainToken().value = response._data.token
        useRefreshMainToken().value = response._data.refreshToken
      }
      return response._data
    }
  })

  
  // const reAuthorize = async () => useFetch(`${api.}`, {
  //   baseURL: apiBase,
  //   method: 'POST',
  //   body: {
  //     email: 'Admin@app.com',
  //     password: 'Admin@123'
  //   },
  //   onResponse({ request, response, options }) {
  //     // Process the response data
  //     if (response._data.successed) {
  //       localStorage.removeItem('mainToken')
  //       localStorage.setItem('mainToken', response._data.token)
  //       useMainToken().value = response._data.token
  //     }
  //     return response._data
  //   }
  // })

  return {
    reAuthorize
  }
}