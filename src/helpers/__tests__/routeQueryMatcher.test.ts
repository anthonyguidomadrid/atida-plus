import {
  getQueryParamFromRoute,
  getQueryParamValueAsString,
  routeQueryMatcher
} from '~helpers/routeQueryMatcher'

describe(routeQueryMatcher, () => {
  it('parses a dynamic URL correctly', async () => {
    const route = '/login/[[...redirect]]'
    const query = { redirect: 'account' }

    const actualRoute = routeQueryMatcher({ route, query })

    expect(actualRoute).toEqual('/login/account')
  })

  it('parses a URL with query params', async () => {
    const route = '/login'
    const query = { search: 'niceitem' }

    const actualRoute = routeQueryMatcher({ route, query })

    expect(actualRoute).toEqual('/login?search=niceitem')
  })

  it('parses a URL with query params and starting with a locale', async () => {
    const route = '/pt-pt?search=product'
    const query = {}
    const locale = 'pt-pt'

    const actualRoute = routeQueryMatcher({ route, query, locale })

    expect(actualRoute).toEqual('?search=product')
  })

  it('returns an empty string when no route is passed', async () => {
    const route = undefined
    const query = undefined

    const actualRoute = routeQueryMatcher({ route, query })

    expect(actualRoute).toEqual('')
  })

  it('returns a normalized route with a missing dynamic param', async () => {
    const route = '/login/[[...all]]'
    const query = {}

    const actualRoute = routeQueryMatcher({ route, query })

    expect(actualRoute).toEqual('/login')
  })

  it('returns an empty string with a missing dynamic param and no other URL parts', async () => {
    const route = '/[[...all]]'
    const query = {}

    const actualRoute = routeQueryMatcher({ route, query })

    expect(actualRoute).toEqual('')
  })

  describe('getting query param from route', () => {
    it('with a valid route', async () => {
      const route = '/login/[[...all]]'

      expect(getQueryParamFromRoute(route)).toBe('all')
    })

    it('with a non-dynamic route', async () => {
      const route = '/login'

      expect(getQueryParamFromRoute(route)).toBe('')
    })

    it('with an empty route', async () => {
      expect(getQueryParamFromRoute('')).toBe('')
    })
  })

  describe('getting query param value as string', () => {
    it('with a single string value', async () => {
      const query = { redirect: 'account' }
      const queryParam = 'redirect'

      expect(getQueryParamValueAsString(query, queryParam)).toBe('account')
    })

    it('with an array value', async () => {
      const query = { all: ['vitamins', 'babies'] }
      const queryParam = 'all'

      expect(getQueryParamValueAsString(query, queryParam)).toBe(
        'vitamins/babies'
      )
    })

    it('with no such param in the query object', async () => {
      const query = { redirect: 'cool' }
      const queryParam = 'all'

      expect(getQueryParamValueAsString(query, queryParam)).toBe('')
    })

    it('with no valid value', async () => {
      const query = {}
      const queryParam = ''

      expect(getQueryParamValueAsString(query, queryParam)).toBe('')
    })
  })
})
