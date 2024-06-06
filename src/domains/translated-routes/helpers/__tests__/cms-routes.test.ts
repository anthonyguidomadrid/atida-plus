import { transformContentSlugsToHreflang } from '../cms-routes'

describe(transformContentSlugsToHreflang, () => {
  describe('with empty slug', () => {
    it('returns hreflang props', () => {
      expect(
        transformContentSlugsToHreflang('es-es', {
          'pt-pt': '',
          'es-es': '',
          'de-de': ''
        })
      ).toEqual([
        {
          hrefLang: 'pt-pt',
          href: '/pt-pt'
        },
        {
          hrefLang: 'es-es',
          href: '/es-es'
        },
        {
          hrefLang: 'de-de',
          href: '/de-de'
        }
      ])
    })
  })

  describe('with slash slug', () => {
    it('returns hreflang props', () => {
      expect(
        transformContentSlugsToHreflang('pt-pt', {
          'pt-pt': '/',
          'es-es': '/',
          'de-de': '/'
        })
      ).toEqual([
        {
          hrefLang: 'pt-pt',
          href: '/pt-pt'
        },
        {
          hrefLang: 'es-es',
          href: '/es-es'
        },
        {
          hrefLang: 'de-de',
          href: '/de-de'
        }
      ])
    })
  })

  describe('with normal slug', () => {
    it('returns hreflang props', () => {
      expect(
        transformContentSlugsToHreflang('pt-pt', {
          'pt-pt': 'some-pt-page',
          'es-es': 'some-es-page',
          'de-de': 'some-de-page'
        })
      ).toEqual([
        {
          hrefLang: 'pt-pt',
          href: '/pt-pt/some-pt-page'
        },
        {
          hrefLang: 'es-es',
          href: '/es-es/some-es-page'
        },
        {
          hrefLang: 'de-de',
          href: '/de-de/some-de-page'
        }
      ])
    })
  })

  describe('with normal slug and slash', () => {
    it('returns hreflang props', () => {
      expect(
        transformContentSlugsToHreflang('pt-pt', {
          'pt-pt': '/some-pt-page/',
          'es-es': '/some-es-page/',
          'de-de': '/some-de-page/'
        })
      ).toEqual([
        {
          hrefLang: 'pt-pt',
          href: '/pt-pt/some-pt-page'
        },
        {
          hrefLang: 'es-es',
          href: '/es-es/some-es-page'
        },
        {
          hrefLang: 'de-de',
          href: '/de-de/some-de-page'
        }
      ])
    })
  })

  describe('with multi-level slug', () => {
    it('returns hreflang props', () => {
      expect(
        transformContentSlugsToHreflang('pt-pt', {
          'pt-pt': 'some-pt-page/subpage',
          'es-es': 'some-es-page/subpage',
          'de-de': 'some-de-page/subpage'
        })
      ).toEqual([
        {
          hrefLang: 'pt-pt',
          href: '/pt-pt/some-pt-page/subpage'
        },
        {
          hrefLang: 'es-es',
          href: '/es-es/some-es-page/subpage'
        },
        {
          hrefLang: 'de-de',
          href: '/de-de/some-de-page/subpage'
        }
      ])
    })
  })

  describe('with multi-level slug and slash', () => {
    it('returns hreflang props', () => {
      expect(
        transformContentSlugsToHreflang('pt-pt', {
          'pt-pt': '/some-pt-page/subpage/',
          'es-es': '/some-es-page/subpage/',
          'de-de': '/some-de-page/subpage/'
        })
      ).toEqual([
        {
          hrefLang: 'pt-pt',
          href: '/pt-pt/some-pt-page/subpage'
        },
        {
          hrefLang: 'es-es',
          href: '/es-es/some-es-page/subpage'
        },
        {
          hrefLang: 'de-de',
          href: '/de-de/some-de-page/subpage'
        }
      ])
    })
  })
})
