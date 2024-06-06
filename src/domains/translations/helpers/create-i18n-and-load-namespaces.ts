import type { i18n } from 'i18next'
import { createReduxStore } from '~domains/redux'
import { createI18nInstance } from './i18n'
import { loadNamespaces } from './load-namespaces'

export const createI18nAndLoadNamespaces = async (
  initialLocale: string | undefined,
  namespaces: string[] = [],
  reduxStore: ReturnType<typeof createReduxStore>
): Promise<i18n> => {
  const { instance, ready } = createI18nInstance({
    backend: {
      reduxStore
    }
  })
  await ready

  if (initialLocale) {
    await instance.changeLanguage(initialLocale)
    await loadNamespaces(instance, initialLocale, namespaces)
  }
  return instance
}
