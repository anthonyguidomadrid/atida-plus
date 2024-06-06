import getConfig from 'next/config'

const routes = getConfig()?.publicRuntimeConfig?.routes ?? []

export type AlternateLink = { hrefLang: string; href: string }

type TranslatedRoutes = {
  route: string
  translations: Record<string, string>
}[]

const injectParametersIntoRoute = (
  route: string,
  parameters: Record<string, string>
) =>
  Object.keys(parameters).reduce(
    (compiledRoute, parameterName) =>
      compiledRoute.replace(`:${parameterName}`, parameters[parameterName]),
    route
  )

export const getCanonicalLink = (
  route: string,
  locale?: string,
  parameters?: Record<string, string>
): string | undefined => {
  if (!locale) return undefined

  const url = (routes as TranslatedRoutes).find(x => x.route === route)
    ?.translations[locale]

  if (!parameters || !url) return url

  return injectParametersIntoRoute(url, parameters)
}

export const getAlternateLinks = (
  route: string,
  locale?: string,
  parameters?: Record<string, string>
): AlternateLink[] => {
  const availableTranslations =
    (routes as TranslatedRoutes).find(x => x.route === route)?.translations ??
    {}
  const alternateUrls = Object.keys(availableTranslations)
    .map(translation => ({
      hrefLang: translation,
      href: availableTranslations[translation]
    }))
    .filter(({ hrefLang }) => hrefLang !== locale)

  if (!parameters) return alternateUrls

  return alternateUrls.map(alternateUrl => ({
    ...alternateUrl,
    href: injectParametersIntoRoute(alternateUrl.href, parameters)
  }))
}

export const getPageSlug = (
  route: string,
  locale?: string
): string | undefined => {
  if (!locale) return undefined

  const canonicalLink = getCanonicalLink(route, locale)

  if (canonicalLink?.includes(locale)) return canonicalLink.substring(7)
  return canonicalLink?.substring(1)
}
