import {
  getCanonicalLink,
  getAlternateLinks,
  getPageSlug
} from '../static-routes'

describe(getCanonicalLink, () => {
  describe('when the route has no parameters', () => {
    it('returns the correct translated route', () => {
      expect(getCanonicalLink('basket', 'de')).toBe('/de/korb')
    })
  })

  describe('when the route has a parameter at the end', () => {
    it('returns the correct translated route', () => {
      expect(
        getCanonicalLink('product/:sku', 'de', { sku: 'some-product' })
      ).toBe('/de/produkt/some-product')
    })
  })

  describe('when the route has a parameter in the middle', () => {
    it('returns the correct translated route', () => {
      expect(
        getCanonicalLink('product/:sku/add', 'de', { sku: 'some-product' })
      ).toBe('/de/produkt/some-product/hinzufugen')
    })
  })

  describe('when the route has multiple parameters', () => {
    it('returns the correct translated route', () => {
      expect(
        getCanonicalLink(':id/:name/user', 'de', { id: '7', name: 'someone' })
      ).toBe('/de/7/someone/nutzer')
    })
  })
})

describe(getAlternateLinks, () => {
  describe('when the route has no parameters', () => {
    it('returns the correct translated alternate routes', () => {
      expect(getAlternateLinks('basket', 'de')).toEqual([
        { href: '/basket', hrefLang: 'en-gb' },
        { href: '/es/cesta', hrefLang: 'es' }
      ])
    })
  })

  describe('when the route has some parameters', () => {
    it('returns the correct translated alternate routes', () => {
      expect(
        getAlternateLinks('product/:sku', 'de', { sku: 'some-product' })
      ).toEqual([
        { href: '/product/some-product', hrefLang: 'en-gb' },
        { href: '/es/producto/some-product', hrefLang: 'es' }
      ])
    })
  })

  describe('when the route has no locale', () => {
    it('returns undefined when no locale argument is sent', () => {
      expect(
        getCanonicalLink('product/:sku', '', { sku: 'some-product' })
      ).toEqual(undefined)
    })
  })
})

describe(getPageSlug, () => {
  describe('when there is a route but no locale', () => {
    it('returns undefined when no locale argument is sent', () => {
      expect(getPageSlug('basket')).toEqual(undefined)
    })
  })

  describe('when there is a route and a locale', () => {
    it('returns the correct slug', () => {
      expect(getPageSlug('basket', 'en-gb')).toEqual('basket')
    })
  })
})
