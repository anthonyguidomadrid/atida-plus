import type { i18n } from 'i18next'

export const loadNamespaces = (
  i18nInstance: i18n,
  locale: string,
  namespaces: string[]
): Promise<void[]> =>
  Promise.all(
    namespaces
      .filter(ns => !i18nInstance.hasResourceBundle(locale, ns))
      .map(ns => i18nInstance.reloadResources(locale, ns))
  )
