import { getAlternateLinksInPdp } from '../dinamic-routes'
import { useRouter } from 'next/router'

describe(getAlternateLinksInPdp, () => {
  const { locale } = useRouter()
  const alternativeUrls = {
    'pt-pt': 'url-pt',
    'es-es': 'url-es',
    'en-gb': 'url-en'
  }

  describe('when the route has some parameters', () => {
    it('returns the correct translated alternate routes for Products', () => {
      expect(getAlternateLinksInPdp(locale, alternativeUrls)).toEqual([
        { href: '/pt-pt/url-pt', hrefLang: 'pt-pt' },
        { href: '/es-es/url-es', hrefLang: 'es-es' },
        { href: '/en-gb/url-en', hrefLang: 'en-gb' }
      ])
    })
  })
})
