import { createI18n, useI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const lang = useCookie('lang').value ?? 'en';
  useLang().value = lang;
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    locale: lang,
    messages: {
      en,
      ar
    }
  })

  vueApp.use(i18n)
return;
  // return {
  //   provide: {
  //     i18n: useI18n
  //   }
  // }
})
