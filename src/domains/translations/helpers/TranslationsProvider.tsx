import type { Resource } from 'i18next'
import { useRouter } from 'next/router'
import { memo, useMemo, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useStore } from 'react-redux'
import isEqual from 'react-fast-compare'
import { createI18nInstance } from './i18n'

type TranslationsProviderProps = {
  store: Resource
  children?: ReactNode
}

export const TranslationsProvider = memo(function TranslationsProvider({
  store,
  children,
  ...props
}: TranslationsProviderProps) {
  const { locale } = useRouter()
  const reduxStore = useStore()

  const { instance } = useMemo(
    () =>
      createI18nInstance({
        resources: store,
        lng: locale,
        backend: { reduxStore }
      }),
    [store, locale, reduxStore]
  )

  return (
    <I18nextProvider i18n={instance} {...props}>
      {children}
    </I18nextProvider>
  )
},
isEqual)
