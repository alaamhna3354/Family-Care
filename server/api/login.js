// export default defineEventHandler(async (event) => {
//   const { serverApiBase, serverApi } = useRuntimeConfig();

//   const data = await $fetch(`${serverApi.AuthLoginApi}`, {
//     baseURL: serverApiBase,
//     method: 'POST',
//     body: {
//       email: 'admin@qaflah.com',
//       password: '123Pa$$word!'
//     }
//   })

//   return data
// });		