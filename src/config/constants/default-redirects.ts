export const DEFAULT_LOGIN_REDIRECT = '/'
export const DEFAULT_LOGOUT_REDIRECT = '/'

export const DEFAULT_FOREIGN_COUNTRY_REDIRECT: Record<string, string> = {
  fr: 'https://www.atida.fr/'
}

export const DEFAULT_SUPPORT_REQUEST_FORM: Record<string, string> = {
  'es-es': 'https://support.atida.com/hc/es/requests/new',
  'pt-pt': 'https://support.atida.com/hc/pt/requests/new',
  'de-de': 'https://support.atida.com/hc/de/requests/new',
  // 'de-at': 'https://support.atida.com/hc/at/requests/new',
  // 'it-it': 'https://support.atida.com/hc/it/requests/new',
  // 'fr-fr': 'https://support.atida.com/hc/fr/requests/new',
  'en-gb': 'https://support.atida.com/hc/en/requests/new'
}
