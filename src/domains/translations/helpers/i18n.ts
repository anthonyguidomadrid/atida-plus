import i18n from 'i18next'
import type { InitOptions, TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { i18nConfig } from '~domains/translations'
import { clientBackend } from './client-backend'

const getBackend = () => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { backend } = require('~domains/translations/services/server-backend')
    return backend
  } else {
    return clientBackend
  }
}

export const createI18nInstance = (
  config: InitOptions = {}
): {
  instance: typeof i18n
  ready: Promise<TFunction>
} => {
  const instance = i18n.createInstance({ ...i18nConfig, ...config })
  let ready: Promise<TFunction>

  if (!instance.isInitialized) {
    const backend = getBackend()

    instance.use(initReactI18next)

    if (backend) {
      instance.use(getBackend())
    }

    ready = instance.init(i18nConfig)
  }

  // @ts-ignore - TODO: figure this error out
  return { instance, ready }
}
