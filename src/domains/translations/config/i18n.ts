import type { InitOptions } from 'i18next'
import { allAvailableLocales } from '~domains/translated-routes'

export const BASE_NAMESPACE = 'common'

export const i18nConfig: InitOptions = {
  supportedLngs: allAvailableLocales,
  fallbackLng: false,

  ns: [BASE_NAMESPACE],
  defaultNS: BASE_NAMESPACE,
  fallbackNS: BASE_NAMESPACE,

  load: 'currentOnly',
  initImmediate: true,

  // This is required for loading in translations in lowercase
  lowerCaseLng: true,

  interpolation: {
    escapeValue: false
  },

  react: {
    wait: true,
    useSuspense: false
  },

  keySeparator: false,
  debug: false
}
