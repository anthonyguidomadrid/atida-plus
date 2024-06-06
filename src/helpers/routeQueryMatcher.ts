import type { ParsedUrlQuery } from 'querystring'

type routeQueryMatcherProps = {
  route?: string
  query?: ParsedUrlQuery
  locale?: string
}

export const routeQueryMatcher = ({
  route,
  query,
  locale
}: routeQueryMatcherProps): string | undefined => {
  let actualRoute = route ?? ''

  if (actualRoute?.match(/\[.+\]/gi)) {
    const queryParam = getQueryParamFromRoute(actualRoute)

    if (!!query?.[queryParam]) {
      actualRoute = actualRoute.replace(
        /\[+(\.{1,3})?[a-zA-Z0-9]+\]+/gi,
        getQueryParamValueAsString(query, queryParam)
      )
    } else {
      actualRoute = actualRoute.replace(/\/\[+(\.{1,3})?[a-zA-Z0-9]+\]+/gi, '')
    }
  }

  if (!!query?.search) {
    actualRoute += `?search=${query.search}`
  }

  if (!!locale && actualRoute.startsWith(`/${locale}`)) {
    actualRoute = actualRoute.substring(locale.length + 1)
  }

  return actualRoute
}

// Gets the query parameter from the URL
// Example:
//    route: /[[..redirect]]
//    returns: redirect
export const getQueryParamFromRoute = (route: string): string => {
  if (!route.length) return ''

  return (
    route
      .match(/\[\[?(\.{1,3})?[a-zA-Z0-9]+\]?\]/gi)?.[0]
      .replace(/\[|\]|\.{1,3}/gi, '')
      .toString() ?? ''
  )
}

// Converts the query parameter value, if the parameter exists,
// to a string.
// If it's an array, it joins all values with a "/"
// Returns an empty string if the query is empty or the queryParam is not valid
export const getQueryParamValueAsString = (
  query: ParsedUrlQuery | undefined,
  queryParam: string
): string => {
  if (!query || !queryParam) return ''

  const paramInQuery = query[queryParam]

  return Array.isArray(paramInQuery)
    ? paramInQuery.join('/')
    : paramInQuery ?? ''
}
