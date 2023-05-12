export default defineNuxtPlugin(async nuxtApp => {
  const { apiBase, api } = useRuntimeConfig();
  const { $awn } = useNuxtApp();

  // if (typeof window !== 'undefined') {
  if (process.client) {
    // Get Main Site Token
    const mainToken = localStorage.getItem('mainToken')    
    // Store Main Site Token
    useMainToken().value = mainToken
    // Get Refresh Token for Main Token
    const refreshMainToken = localStorage.getItem('refreshMainToken');    
    // Store Refresh Token for Main Token In State
    useRefreshMainToken().value = refreshMainToken
    // Get User Token
    const token = localStorage.getItem('token')
    // Get User Info
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // make global isAuthenticated state true
    useAuth().value.isAuthenticated = token ? true : false
    // store Token in the store
    useToken().value = token
    // store userinfo in the store
    useUserInfo().value = userInfo
    // get account type from localstorage
    const accountType = localStorage.getItem('accountType')
    // Store account type in store
    useAccountType().value = accountType

    // Get Main Site Token
    if (!mainToken) {
        const data = await $fetch(`${api.AuthLoginApi}`, {
          baseURL: apiBase,
          method: 'POST',
          body: {
            email: 'admin@qaflah.com',
            password: '123Pa$$word!'
          }
        })
        // Store token if there is not any error
        if (data.data.token) {
          localStorage.setItem('mainToken', data.data.token);
          useMainToken().value = data.data.token
        }
        if (!data.data.token) {
          $awn.alert('Server Error, Please Try Again Later', { durations: { global: 5000 } })
        }
      }
      if (!token) {
        useAuth().value.isAuthenticated = false 
      }
      //    const data = await $fetch(`${api.AuthRefreshTokenApi}`, {
      //   baseURL: apiBase,
      //   method: 'POST',
      //     body: {
      //       "token": "string",
      //       "refreshToken": "string"
      //     }
      // })
      // // Store token if there is not any error
      // if (data.value.token) {
      //   localStorage.setItem('mainToken', data.value.token);
      //   localStorage.setItem('refreshMainToken', data.value.refreshToken);
      //   useMainToken().value = data.value.token
      //   useRefreshMainToken().value = data.value.refreshToken
      // }
      // if (!data.value.token) {
      //   $awn.alert('Server Error, Please Try Again Later', { durations: { global: 5000 } })
      // }
    



    const menuQuery = `${api.MenusGetByCategoryApi}?CategoryId=2`
    const { error, execute } = await useDefaultCurrency().getCurrency();
    const { data: menu, error: errorMenu, execute: executeMenu } = await useGetSiteApi().GetAll(menuQuery)
    if ((error.value && error.value.statusCode == 401) || (errorMenu.value && errorMenu.value.statusCode == 401)) {
      await useReauthorization().reAuthorize()
      execute();
      executeMenu();
    }
    if (menu.value) {
      useMenus().value = menu.value
    }
  }
})