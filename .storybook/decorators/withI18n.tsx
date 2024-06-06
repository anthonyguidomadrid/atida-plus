import { useEffect } from 'react'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { i18nConfig } from '../../src/domains/translations'
import translations from '../../src/__mocks__/translations.json'
import {
  defaultLocale,
  availableLocales
} from '../../src/domains/translated-routes'

i18n.init({
  ...i18nConfig,
  backend: undefined,
  fallbackLng: 'en',
  resources: translations as any
})

i18n.use(initReactI18next)

const I18nProvider = props => <I18nextProvider i18n={i18n} {...props} />

export const withI18n = (Story, context) => {
  const {
    globals: { locale }
  } = context

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [i18n.language, locale])

  /* https://github.com/storybookjs/storybook/issues/12255 */
  return <I18nProvider>{Story()}</I18nProvider>
}

export const i18nToolbar = {
  locale: {
    name: 'Locale',
    description: 'Set locale for components',
    defaultValue: defaultLocale,
    toolbar: {
      icon: 'globe',
      items: availableLocales
    }
  }
}
