import { ZIP_CODES_REGEX } from '~config/constants/zip-code-regex'

export const zipCodeValidation = (zipCode: string, locale: string): boolean => {
  switch (locale) {
    case 'pt-pt':
      return ZIP_CODES_REGEX.PT_FLEXIBLE.test(zipCode)
    case 'es-es':
      return ZIP_CODES_REGEX.ES_FLEXIBLE.test(zipCode)
    case 'de-de':
      return ZIP_CODES_REGEX.DE_FLEXIBLE.test(zipCode)
    default:
      return false
  }
}

export const zipCodeRegexByLocale = (locale: string): RegExp => {
  switch (locale) {
    case 'pt-pt':
      return ZIP_CODES_REGEX.PT_STRICT
    case 'es-es':
      return ZIP_CODES_REGEX.ES_STRICT
    case 'de-de':
      return ZIP_CODES_REGEX.DE_STRICT
    default:
      return ZIP_CODES_REGEX.REJECT_ALL
  }
}
