export const getCurrency = (locale: string | undefined): string => {
  switch (locale) {
    case 'pt-pt':
    case 'es-es':
    case 'de-de':
    case 'de-at':
    case 'it-it':
    case 'fr-fr':
    default:
      return 'EUR'
  }
}
