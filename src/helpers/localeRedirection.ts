import {
  getAllEnabledLocales,
  getForeignRedirectionLocales
} from '~domains/translated-routes'
import { getLanguagesFromLocales } from '~helpers'

const convertLanguageToLocale = (lang: string): string =>
  // TODO: update for locales where country code differs from
  // the language code (e.g. 'de-AT') and for language codes
  // without a country code (e.g. 'de')
  `${lang.substring(0, 2)}-${lang.substring(0, 2)}`

const userBrowserLocales = (acceptLanguageHeader: string | undefined) =>
  acceptLanguageHeader?.split(',').map(str => str.split(';')[0])

export const getLocaleFromBrowserPreferences = (
  acceptLanguageHeader: string | undefined
): string | undefined => {
  if (!acceptLanguageHeader) return undefined

  const matchingLanguage = userBrowserLocales(
    acceptLanguageHeader
  )?.find(language =>
    getAllEnabledLocales().some(
      (lang: string) => lang === convertLanguageToLocale(language)
    )
  )

  return matchingLanguage
    ? convertLanguageToLocale(matchingLanguage)
    : undefined
}

export const checkIfLocaleExistsInBrowserPreferences = (
  locale: string,
  acceptLanguageHeader: string | undefined
): boolean | undefined => {
  if (!locale || !acceptLanguageHeader) return undefined

  return userBrowserLocales(acceptLanguageHeader)?.some(
    language => locale === convertLanguageToLocale(language)
  )
}

/**
 * Detects the best suitable locale from available on the site
 * and from the locales used to redirect the user to another
 * friendly site like www.atida.fr
 * @param acceptLanguageHeader - the user's browser's accept-language header
 */
export const detectUserPreferredLanguage = (
  acceptLanguageHeader: string | undefined
): string | undefined => {
  const defaultPreferredLocale = userBrowserLocales(acceptLanguageHeader)?.[0]
  const enabledAndForeignRedirectionLanguages = [
    ...getLanguagesFromLocales(getAllEnabledLocales()),
    ...getLanguagesFromLocales(getForeignRedirectionLocales())
  ]

  let preferredLocale = defaultPreferredLocale
  for (const locale of userBrowserLocales(acceptLanguageHeader) ?? []) {
    const language = locale.split('-')[0]
    if (enabledAndForeignRedirectionLanguages.includes(language)) {
      preferredLocale = language
      break
    }
  }

  return preferredLocale?.split('-')[0]
}
