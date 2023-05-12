import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
export default defineNuxtConfig({
  ssr: false,       // must use this ssr: false with form vee-validate
  nitro: {
    prerender: {
      routes: [
        '/our-product/custom-card', 
        '/our-product/dual-card', 
        '/our-product/digital-business-credit-card', 
        '/our-product/6', 
        '/our-product/5', 
        '/our-product/4'
      ]
    }
  },  
  modules: ['nuxt-swiper', 'nuxt-icons'],
  css: [
    "@/assets/styles/scss/custom.scss",
    '@fortawesome/fontawesome-svg-core/styles.css',
    'awesome-notifications/dist/style.css'
  ],
  app: {
    head: {
      title: 'Family-Care',
      htmlAttrs: {
        lang: "en"
      },
      meta: [
          { charset: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "description", content: "Ecommerce Site" }
        ],
        link: [
          {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          },
          {
            rel: "stylesheet",
            href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          },
          { 
            rel: 'icon', 
            href: '/icons/sm-white-logo.png', 
            type: "image/x-icon" 
          }
        ],
        script: [        
          { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" },
          {src:"https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"}
        ]
    }
  },
  runtimeConfig: {
    serverApiBase: 'http://admin.mfconline.me/',
    serverApi: {
      AuthLoginApi: '/api/identity/token'
    },
    public: {
      apiBase: 'http://admin.mfconline.me',
      api: {
        AuthLoginApi: '/api/identity/token',
        AuthRegisterApi: '/Auth/RegisterRequest',
        AuthRefreshTokenApi: '/api/identity/token/refresh',
        BlocksGetAllApi: '/api/Blocks/GetAll',
        BlocksGetAllWithAttachmentsApi: '/api/Blocks/GetAllWithAttachments',
        BlocksGetByCategoryApi: '/api/Blocks/GetByCategory',
        BlocksGetByIdApi: '/api/Blocks/',
        BlocksGetByIdWithAttachmentsApi: '/api/Blocks/GetWithAttachments/',
        BordersGetAllApi: '/api/Borders/GetAll',
        CardTypesGetAllApi: '/api/CardTypes/GetAll',
        CompanyClientsApi: '/api/CompanyClients',
        ClientOrdersApi: '/api/Products/GetForCurrentClient',
        CitiesGetAllApi: '/api/Cities/GetAll',
        CitiesByCountryApi: '/api/Cities/GetByCountry/',
        CurrenciesGetAllApi: '/api/Currencies/GetAll',
        CountriesGetAllApi: '/api/Countries/GetAll',
        LogoGetReadyApi: '/api/Logos/GetReady',
        LogoGetAllApi: '/api/Logos/GetAll',
        GalleryGetPaginationsApi: '/api/Gallery',
        GetCurrentPersonInfoApi: '/api/PersonClients/GetCurrentPersonInfo',
        GetCurrentCompanyInfoApi: '/api/CompanyClients/GetCurrentCompanyInfo',
        MetalsGetByProductCategoryApi: '/api/Metals/GetByProductCategory/',
        MenusGetByCategoryApi: '/api/Menus/GetByCategory',
        NationalitiesGetAllApi: '/api/Nationalities/GetAll',        
        PagesGetByIdApi: '/api/Pages/',
        PagesGetAllApi: '/api/Pages/GetAll',
        PricesGetAllApi: '/api/Prices/GetAll',
        ProductsApi: '/api/Products',
        ProductsCategoryApi: '/api/ProductCategories/GetAll',
        PersonClientsApi: '/api/PersonClients',        
        RearsGetAllApi: '/api/Rears/GetAll'
      }
    }
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  }
})
