import { IncomingMessage, ServerResponse } from 'http'
import { detectUserPreferredLanguage } from './localeRedirection'
import { redirectTo } from './redirectTo'
import { logger } from './logger'
import { DEFAULT_FOREIGN_COUNTRY_REDIRECT } from '~config/constants/default-redirects'

export const checkBrowserSettingsAndRedirect = (
  req: IncomingMessage,
  res: ServerResponse,
  domainPerLocale: {
    [key: string]: string
  },
  config: {
    shouldRedirectToForeignCountry?: boolean
    shouldLogCloudfrontViewerCountry?: boolean
    shouldRedirectToExternalLocaleFromBrowserSettings?: boolean
    shouldRedirectToExternalLocaleFromCloudfrontViewerCountry?: boolean
  } = {
    shouldRedirectToForeignCountry: true,
    shouldLogCloudfrontViewerCountry: false,
    shouldRedirectToExternalLocaleFromBrowserSettings: false,
    shouldRedirectToExternalLocaleFromCloudfrontViewerCountry: false
  }
): string => {
  const {
    shouldRedirectToForeignCountry,
    shouldLogCloudfrontViewerCountry,
    shouldRedirectToExternalLocaleFromBrowserSettings,
    shouldRedirectToExternalLocaleFromCloudfrontViewerCountry
  } = config

  const userPreferredLanguage = detectUserPreferredLanguage(
    req.headers['accept-language']
  )

  const cloudfrontViewerCountry = (
    (req.headers['cloudfront-viewer-country'] as string) ?? ''
  ).toLowerCase()
  shouldLogCloudfrontViewerCountry &&
    logger.info({
      'cloudfront-viewer-country': cloudfrontViewerCountry
    })

  if (userPreferredLanguage) {
    // Redirect to foreign country host
    if (
      shouldRedirectToForeignCountry &&
      shouldRedirectToExternalLocaleFromBrowserSettings &&
      Object.keys(DEFAULT_FOREIGN_COUNTRY_REDIRECT).includes(
        userPreferredLanguage
      )
    ) {
      // Redirect to a foreign country host if the user has a preferred language
      // in their browser settings that matches with one of our foreign country hosts
      redirectTo(res, DEFAULT_FOREIGN_COUNTRY_REDIRECT[userPreferredLanguage])
      return DEFAULT_FOREIGN_COUNTRY_REDIRECT[userPreferredLanguage]
    } else if (
      shouldRedirectToForeignCountry &&
      shouldRedirectToExternalLocaleFromCloudfrontViewerCountry &&
      Object.keys(DEFAULT_FOREIGN_COUNTRY_REDIRECT).includes(
        cloudfrontViewerCountry
      )
    ) {
      // Redirect to a foreign country host if the 'cloudfront-viewer-country' header
      // is present and it matches with one of our foreign country hosts
      redirectTo(res, DEFAULT_FOREIGN_COUNTRY_REDIRECT[cloudfrontViewerCountry])
      return DEFAULT_FOREIGN_COUNTRY_REDIRECT[cloudfrontViewerCountry]
    } else if (
      typeof domainPerLocale[
        `${userPreferredLanguage}-${userPreferredLanguage}`
      ] !== 'undefined'
    ) {
      // Redirect to user preferred language host/locale
      redirectTo(
        res,
        domainPerLocale[`${userPreferredLanguage}-${userPreferredLanguage}`]
      )
      return domainPerLocale[
        `${userPreferredLanguage}-${userPreferredLanguage}`
      ]
    } else {
      // Redirect to fallback
      redirectTo(res, domainPerLocale[Object.keys(domainPerLocale)[0]])
      return domainPerLocale[Object.keys(domainPerLocale)[0]]
    }
  } else {
    // Redirect to fallback
    redirectTo(res, domainPerLocale[Object.keys(domainPerLocale)[0]])
    return domainPerLocale[Object.keys(domainPerLocale)[0]]
  }
}
