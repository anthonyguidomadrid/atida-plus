import { getDefaultLocale } from './getDefaultLocale.mjs'

export const getLocaleFromCountryTag = countryTag => {
  switch (countryTag) {
    case 'country-pt':
      return 'pt-PT'
    case 'country-es':
      return 'es-ES'
    case 'country-fr':
      return 'fr-FR'
    case 'country-it':
      return 'it-IT'
    case 'country-de':
      return 'de-DE'
    case 'country-at':
      return 'de-AT'
    default:
      return getDefaultLocale()
  }
}
