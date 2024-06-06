import { serialize } from 'cookie'
import { GetServerSidePropsContext } from 'next'
import { FeatureFlag } from '~config/constants/feature-flags'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { getEnabledLocales } from '~domains/translated-routes'
import {
  checkIfLocaleExistsInBrowserPreferences,
  getLocaleFromBrowserPreferences
} from '~helpers'
import { getHostWithProtocol, checkIsAtidaDotCom } from '~helpers/hosts'
import { loadFeatureFlag } from './featureFlagClient'

type Redirect = {
  redirect: {
    destination: string
    permanent: boolean
  }
}

export const getLocaleRedirect = async (
  context: GetServerSidePropsContext
): Promise<Redirect | undefined> => {
  const [
    isCookieLocaleRedirectionEnabled,
    isLocaleRedirectionBrowserPreferencesEnabled
  ] = await Promise.all([
    loadFeatureFlag(context.locale, FeatureFlag.COOKIE_LOCALE_REDIRECTION),
    loadFeatureFlag(
      context.locale,
      FeatureFlag.LOCALE_REDIRECTION_BROWSER_PREFERENCES
    )
  ])

  if (
    context.locale &&
    getEnabledLocales().includes(context.locale) &&
    isLocaleRedirectionBrowserPreferencesEnabled
  ) {
    const localeExistsInBrowserPreferences = checkIfLocaleExistsInBrowserPreferences(
      context.locale,
      context.req.headers['accept-language']
    )

    if (localeExistsInBrowserPreferences) {
      context.res.setHeader(
        'Set-Cookie',
        serialize(
          'countrySelectorHeaderData',
          JSON.stringify({
            selectedCountry: context.locale,
            languageSwitched: false
          }),
          {
            expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.oneYear)
          }
        )
      )
    }
  }

  if (!context.locale || !getEnabledLocales().includes(context.locale)) {
    let defaultFallbackLocale = getEnabledLocales()[0]
    if (isCookieLocaleRedirectionEnabled && getEnabledLocales().length > 1) {
      defaultFallbackLocale = getEnabledLocales()[1]
    }

    const countrySelectorCookie = context.req.cookies.countrySelectorHeaderData
      ? JSON.parse(context.req.cookies.countrySelectorHeaderData)
      : {}

    const localeFromBrowserPreferences = getLocaleFromBrowserPreferences(
      context.req.headers['accept-language']
    )

    localeFromBrowserPreferences &&
      context.res.setHeader(
        'Set-Cookie',
        serialize(
          'localeFromBrowserPreferences',
          localeFromBrowserPreferences,
          {
            expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.oneYear)
          }
        )
      )

    const targetLocale = countrySelectorCookie.selectedCountry
      ? countrySelectorCookie.selectedCountry
      : isLocaleRedirectionBrowserPreferencesEnabled
      ? localeFromBrowserPreferences || defaultFallbackLocale
      : defaultFallbackLocale

    const targetURL = context.req.headers.host
      ? `${getHostWithProtocol(context.req.headers.host)}${
          checkIsAtidaDotCom(context.req.headers.host)
            ? `/${targetLocale || defaultFallbackLocale}`
            : ''
        }`
      : undefined

    if (!targetURL) return undefined
    return {
      redirect: {
        destination: targetURL,
        permanent: false
      }
    }
  }
}
