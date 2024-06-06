import { IncomingMessage, ServerResponse } from 'http'
import { redirectTo } from './redirectTo'
import { extractDomainFromHost, getLocalesPerHost } from './hosts'
import { getEnabledLocales } from '~domains/translated-routes'
import { checkBrowserSettingsAndRedirect } from './checkBrowserSettingsAndRedirect'

export const checkAndRedirectToCorrespondentLocale = (
  req: IncomingMessage,
  res: ServerResponse,
  currentLocale: string | undefined,
  domainPerLocale: {
    [key: string]: string
  },
  externalRedirectionConfig: {
    shouldLogCloudfrontViewerCountry?: boolean
    shouldRedirectToExternalLocaleFromBrowserSettings?: boolean
    shouldRedirectToExternalLocaleFromCloudfrontViewerCountry?: boolean
  } = {
    shouldLogCloudfrontViewerCountry: false,
    shouldRedirectToExternalLocaleFromBrowserSettings: false,
    shouldRedirectToExternalLocaleFromCloudfrontViewerCountry: false
  }
): string | null => {
  const localesPerHost = getLocalesPerHost(domainPerLocale)
  const enabledLocales = getEnabledLocales()

  if (currentLocale) {
    if (!enabledLocales.includes(currentLocale)) {
      if (domainPerLocale[currentLocale]) {
        redirectTo(res, domainPerLocale[currentLocale], 308)
        return domainPerLocale[currentLocale]
      } else {
        return checkBrowserSettingsAndRedirect(req, res, domainPerLocale, {
          shouldRedirectToForeignCountry: false,
          ...externalRedirectionConfig
        })
      }
    }
    return null
  } else {
    if (
      localesPerHost[extractDomainFromHost(req.headers.host ?? '')]?.length > 1
    ) {
      return checkBrowserSettingsAndRedirect(req, res, domainPerLocale)
    } else {
      return checkBrowserSettingsAndRedirect(req, res, domainPerLocale, {
        shouldRedirectToForeignCountry: false,
        ...externalRedirectionConfig
      })
    }
  }
}
