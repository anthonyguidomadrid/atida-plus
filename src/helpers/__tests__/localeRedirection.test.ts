import {
  getLocaleFromBrowserPreferences,
  checkIfLocaleExistsInBrowserPreferences,
  detectUserPreferredLanguage
} from '../localeRedirection'

describe(getLocaleFromBrowserPreferences, () => {
  describe("When there are more than one language in the 'accept-language' header", () => {
    it("Returns the available locale that matches with its corresponding language with a higher 'q' score", () => {
      expect(
        getLocaleFromBrowserPreferences('en,en-GB;q=0.9,es,es-ES;q=0.7')
      ).toEqual('es-es')
      expect(
        getLocaleFromBrowserPreferences('en,en-GB;q=0.9,pt,pt-PT;q=0.7')
      ).toEqual('pt-pt')
      expect(
        getLocaleFromBrowserPreferences('es,es-ES;q=0.9,en,en-GB;q=0.7')
      ).toEqual('es-es')
      expect(
        getLocaleFromBrowserPreferences('es,es-ES;q=0.9,pt,pt-PT;q=0.7')
      ).toEqual('es-es')
      expect(
        getLocaleFromBrowserPreferences('pt,pt-PT;q=0.9,es,es-ES;q=0.7')
      ).toEqual('pt-pt')
    })
  })

  describe("When there is only one language in the 'accept-language' header", () => {
    it('Returns the available locale if it matches with the language in the header', () => {
      expect(getLocaleFromBrowserPreferences('es')).toEqual('es-es')
      expect(getLocaleFromBrowserPreferences('pt')).toEqual('pt-pt')
    })
  })

  describe("When there is only one language in the 'accept-language' header", () => {
    it('Returns undefined if no locale matches with the language in the header', () => {
      expect(getLocaleFromBrowserPreferences('en')).toEqual(undefined)
      expect(getLocaleFromBrowserPreferences('fr')).toEqual(undefined)
      expect(getLocaleFromBrowserPreferences('it')).toEqual(undefined)
    })
  })

  describe("When no 'accept-language' header is passed", () => {
    it('Returns undefined', () => {
      expect(getLocaleFromBrowserPreferences(undefined)).toEqual(undefined)
      expect(getLocaleFromBrowserPreferences('')).toEqual(undefined)
    })
  })
})

describe(checkIfLocaleExistsInBrowserPreferences, () => {
  describe("When there are more than one language in the 'accept-language' header", () => {
    it("Returns true if the locale passed is included in the passed 'accept-language' header", () => {
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'es-es',
          'en,en-GB;q=0.9,es,es-ES;q=0.7'
        )
      ).toEqual(true)
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'pt-pt',
          'en,en-GB;q=0.9,pt,pt-PT;q=0.7'
        )
      ).toEqual(true)
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'es-es',
          'es,es-ES;q=0.9,en,en-GB;q=0.7'
        )
      ).toEqual(true)
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'es-es',
          'es,es-ES;q=0.9,pt,pt-PT;q=0.7'
        )
      ).toEqual(true)
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'pt-pt',
          'pt,pt-PT;q=0.9,es,es-ES;q=0.7'
        )
      ).toEqual(true)
    })
    it("Returns false if the locale passed is not included in the passed 'accept-language' header", () => {
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'pt-pt',
          'en,en-GB;q=0.9,es,es-ES;q=0.7'
        )
      ).toEqual(false)
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'es-es',
          'en,en-GB;q=0.9,pt,pt-PT;q=0.7'
        )
      ).toEqual(false)
      expect(
        checkIfLocaleExistsInBrowserPreferences(
          'pt-pt',
          'es,es-ES;q=0.9,en,en-GB;q=0.7'
        )
      ).toEqual(false)
    })
  })

  describe("When there is only one language in the 'accept-language' header", () => {
    it("Returns the correct value if the locale passed is included in the passed 'accept-language' header", () => {
      expect(checkIfLocaleExistsInBrowserPreferences('es-es', 'es')).toEqual(
        true
      )
      expect(checkIfLocaleExistsInBrowserPreferences('es-es', 'pt')).toEqual(
        false
      )
      expect(checkIfLocaleExistsInBrowserPreferences('pt-pt', 'es')).toEqual(
        false
      )
      expect(checkIfLocaleExistsInBrowserPreferences('pt-pt', 'pt')).toEqual(
        true
      )
      expect(checkIfLocaleExistsInBrowserPreferences('es-es', 'en')).toEqual(
        false
      )
      expect(checkIfLocaleExistsInBrowserPreferences('pt-pt', 'en')).toEqual(
        false
      )
    })
  })
})

describe('detectUserPreferredLanguage. Detects correct language when ', () => {
  it('a single redirect language provided', () => {
    expect(detectUserPreferredLanguage('fr;q=0.9')).toEqual('fr')
  })
  it('a few similar redirect languages provided', () => {
    expect(detectUserPreferredLanguage('fr,fr-FR;q=0.9')).toEqual('fr')
  })
  it('a few similar redirect languages provided in a reverse order', () => {
    expect(detectUserPreferredLanguage('fr-FR,fr;q=0.9')).toEqual('fr')
  })
  it('a single enabled language provided', () => {
    expect(detectUserPreferredLanguage('es-ES;q=0.9')).toEqual('es')
  })
  it('a single enabled language provided as a locale', () => {
    expect(detectUserPreferredLanguage('pt;q=0.9')).toEqual('pt')
  })
  it('multiple enabled languages provided', () => {
    expect(detectUserPreferredLanguage('pt-PT;q=0.9,es-ES;q=0.8')).toEqual('pt')
  })
  it('a redirect language provided after a set of unrelated languages', () => {
    expect(
      detectUserPreferredLanguage('en,en-GB;q=0.9,fr-FR;q=0.8,es-ES,es;q=0.7')
    ).toEqual('fr')
  })
  it('an enabled language provided as prioritised', () => {
    expect(
      detectUserPreferredLanguage(
        'en;q=0.9,pt-PT;q=0.8,fr-FR;q=0.7,es-ES,es;q=0.6'
      )
    ).toEqual('pt')
  })
  it('neither redirect, nor enabled languages provided', () => {
    expect(
      detectUserPreferredLanguage('af;q=0.9,uk;q=0.8,zh;q=0.7,pl;q=0.6')
    ).toEqual('af')
  })
  it('a single default language provided as a locale', () => {
    expect(detectUserPreferredLanguage('en-GB;q=0.9')).toEqual('en')
  })
})
