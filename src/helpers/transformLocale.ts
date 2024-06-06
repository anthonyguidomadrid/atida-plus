import {
  PROVINCES_ES,
  DISTRICTS_PT
} from '~config/constants/subdivisions-per-locale'
import { Address } from '~domains/checkout/types'

export const transformLocaleToUppercase = (locale?: string): string => {
  switch (locale) {
    case 'en-gb':
    case 'en-GB':
      return 'en-GB'
    case 'pt-pt':
    case 'pt-PT':
      return 'pt-PT'
    case 'es-es':
    case 'es-ES':
      return 'es-ES'
    case 'de-de':
    case 'de-DE':
      return 'de-DE'
    case 'de-at':
    case 'de-AT':
      return 'de-AT'
    case 'it-it':
    case 'it-IT':
      return 'it-IT'
    case 'fr-fr':
    case 'fr-FR':
      return 'fr-FR'
    default:
      return ''
  }
}

export const transformLocaleToUppercaseAndUnderscore = (
  locale?: string
): string => {
  switch (locale) {
    case 'en-gb':
      return 'en_GB'
    case 'pt-pt':
      return 'pt_PT'
    case 'es-es':
      return 'es_ES'
    case 'de-de':
      return 'de_DE'
    case 'de-at':
      return 'de_AT'
    case 'it-it':
      return 'it_IT'
    case 'fr-fr':
      return 'fr_FR'
    default:
      return ''
  }
}

export const getCountryTagFromLocale = (locale?: string): string => {
  return `country-${locale?.split('-')[1]}`.toLowerCase()
}

export const getLanguageFromLocale = (locale?: string): string => {
  if (!locale) return 'en'
  return locale.toLocaleLowerCase().split('-')[0]
}

export const getLanguagesFromLocales = (locales: string[]): string[] =>
  locales.map(locale => getLanguageFromLocale(locale))

export const getIso2CodeFromLocale = (locale?: string): string => {
  switch (locale) {
    case 'en-gb':
      return 'GB'
    case 'pt-pt':
      return 'PT'
    case 'es-es':
      return 'ES'
    case 'de-de':
      return 'DE'
    case 'de-at':
      return 'AT'
    case 'it-it':
      return 'IT'
    case 'fr-fr':
      return 'FR'
    default:
      return ''
  }
}

export const getCountryFromLocale = (locale?: string): string => {
  switch (locale) {
    case 'pt-pt':
      return 'Portugal'
    case 'es-es':
      return 'Spain'
    case 'de-de':
      return 'Germany'
    case 'de-at':
      return 'Austria'
    case 'it-it':
      return 'Italy'
    case 'fr-fr':
      return 'France'
    default:
      return ''
  }
}

export const getLocaleFromCountry = (country?: string): string => {
  switch (country) {
    default:
    case 'Portugal':
      return 'pt-pt'
    case 'Spain':
      return 'es-es'
    case 'Germany':
      return 'de-de'
    case 'Austria':
      return 'de-at'
    case 'Italy':
      return 'it-it'
    case 'France':
      return 'fr-fr'
  }
}

export const getCountryFromIso2Code = (iso2Code?: string): string => {
  switch (iso2Code) {
    case 'PT':
      return 'Portugal'
    case 'ES':
      return 'España'
    case 'DE':
      return 'Deutschland'
    case 'AT':
      return 'Österreich'
    case 'IT':
      return 'Italia'
    case 'FR':
      return 'France'
    default:
      return ''
  }
}

export const getSubdivisionsPerLocale = (
  locale: string
): { id: string; label: string }[] => {
  switch (locale) {
    case 'es-es':
      return PROVINCES_ES
    case 'pt-pt':
      return DISTRICTS_PT
    case 'de-de':
    default:
      return []
  }
}
export const getSubdivisionPerLocale = (
  locale: string,
  address?: Partial<Address>
): string => {
  switch (locale) {
    case 'es-es':
      return address?.province ?? ''
    case 'pt-pt':
      return address?.district ?? ''
    default:
      return ''
  }
}

export const getSubdivisionPerIso2Code = (
  iso2Code: string,
  address?: Partial<Address>
): string => {
  switch (iso2Code) {
    case 'ES':
      return address?.province ?? ''
    case 'PT':
      return address?.district ?? ''
    default:
      return ''
  }
}

export const getGeocodeISOFromLocale = (locale?: string): string => {
  switch (locale) {
    case 'pt-pt':
      return 'PRT'
    case 'es-es':
      return 'ESP'
    case 'de-de':
      return 'DEU'
    case 'de-at':
      return 'AUT'
    case 'it-it':
      return 'ITA'
    case 'fr-fr':
      return 'FRA'
    default:
      return ''
  }
}
