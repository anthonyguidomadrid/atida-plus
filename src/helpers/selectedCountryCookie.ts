import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { cookieStorageMechanism } from '~helpers'

export const getLocaleFromBrowserPreferencesCookie = (): string | undefined => {
  const currentCookie = cookieStorageMechanism().get(
    'localeFromBrowserPreferences'
  )
  return currentCookie ?? undefined
}

export const getCountrySelectorCookie = (): {
  selectedCountry?: string
  languageSwitched?: boolean
} => {
  const currentCookie = cookieStorageMechanism().get(
    'countrySelectorHeaderData'
  )
  const parsedCurrentCookie: { selectedCountry: string } = currentCookie
    ? JSON.parse(currentCookie)
    : {}
  return parsedCurrentCookie
}

export const setSelectedCountryCookie = (
  locale: string,
  languageSwitched = false,
  expirationTime: number = COOKIES_EXPIRATION_TIME.oneYear
): void => {
  if (!locale) return

  const currentCookie = getCountrySelectorCookie()
  if (!!currentCookie)
    cookieStorageMechanism().remove('countrySelectorHeaderData')

  cookieStorageMechanism().set(
    'countrySelectorHeaderData',
    JSON.stringify({
      selectedCountry: locale,
      languageSwitched
    }),
    {
      expires: new Date(Date.now() + expirationTime)
    }
  )
}
