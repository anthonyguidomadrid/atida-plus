import {
  DISTRICTS_PT,
  PROVINCES_ES
} from '~config/constants/subdivisions-per-locale'
import { address } from '~domains/address/__mocks__/addresses'
import {
  transformLocaleToUppercase,
  transformLocaleToUppercaseAndUnderscore,
  getCountryTagFromLocale,
  getIso2CodeFromLocale,
  getCountryFromLocale,
  getSubdivisionsPerLocale,
  getGeocodeISOFromLocale,
  getSubdivisionPerIso2Code,
  getSubdivisionPerLocale,
  getLocaleFromCountry,
  getCountryFromIso2Code
} from '~helpers'

describe(transformLocaleToUppercase, () => {
  it('returns pt-PT when pt-pt is called', () => {
    expect(transformLocaleToUppercase('pt-pt')).toEqual('pt-PT')
  })
  it('returns en-GB when en-gb is called', () => {
    expect(transformLocaleToUppercase('en-gb')).toEqual('en-GB')
  })
  it('returns es-Es when es-es is called', () => {
    expect(transformLocaleToUppercase('es-es')).toEqual('es-ES')
  })
  it('returns de-De when de-de is called', () => {
    expect(transformLocaleToUppercase('de-de')).toEqual('de-DE')
  })
  it('returns de-At when de-at is called', () => {
    expect(transformLocaleToUppercase('de-at')).toEqual('de-AT')
  })
  it('returns it-It when de-at is called', () => {
    expect(transformLocaleToUppercase('it-it')).toEqual('it-IT')
  })
  it('returns fr-Fr when de-at is called', () => {
    expect(transformLocaleToUppercase('fr-fr')).toEqual('fr-FR')
  })
  it('returns an empty string by default', () => {
    expect(transformLocaleToUppercase()).toEqual('')
  })
})

describe(transformLocaleToUppercaseAndUnderscore, () => {
  it('returns en_GB when en-gb is called', () => {
    expect(transformLocaleToUppercaseAndUnderscore('en-gb')).toEqual('en_GB')
  })
  it('returns pt_PT when pt-pt is called', () => {
    expect(transformLocaleToUppercaseAndUnderscore('pt-pt')).toEqual('pt_PT')
  })
  it('returns es-ES when es-es is called', () => {
    expect(transformLocaleToUppercaseAndUnderscore('es-es')).toEqual('es_ES')
  })
  it('returns de-DE when de-de is called', () => {
    expect(transformLocaleToUppercaseAndUnderscore('de-de')).toEqual('de_DE')
  })
  it('returns de-AT when de-at is called', () => {
    expect(transformLocaleToUppercaseAndUnderscore('de-at')).toEqual('de_AT')
  })
  it('returns it-IT when de-at is called', () => {
    expect(transformLocaleToUppercaseAndUnderscore('it-it')).toEqual('it_IT')
  })
  it('returns fr-FR when de-at is called', () => {
    expect(transformLocaleToUppercaseAndUnderscore('fr-fr')).toEqual('fr_FR')
  })
  it('returns an empty string by default', () => {
    expect(transformLocaleToUppercaseAndUnderscore()).toEqual('')
  })
})

describe(getCountryTagFromLocale, () => {
  it('returns country-pt when pt-pt is called', () => {
    expect(getCountryTagFromLocale('pt-pt')).toEqual('country-pt')
  })
})

describe(getIso2CodeFromLocale, () => {
  it('returns GB when en-gb is called', () => {
    expect(getIso2CodeFromLocale('en-gb')).toEqual('GB')
  })
  it('returns PT when pt-pt is called', () => {
    expect(getIso2CodeFromLocale('pt-pt')).toEqual('PT')
  })
  it('returns Es when es-es is called', () => {
    expect(getIso2CodeFromLocale('es-es')).toEqual('ES')
  })
  it('returns De when de-de is called', () => {
    expect(getIso2CodeFromLocale('de-de')).toEqual('DE')
  })
  it('returns At when de-at is called', () => {
    expect(getIso2CodeFromLocale('de-at')).toEqual('AT')
  })
  it('returns It when de-at is called', () => {
    expect(getIso2CodeFromLocale('it-it')).toEqual('IT')
  })
  it('returns Fr when de-at is called', () => {
    expect(getIso2CodeFromLocale('fr-fr')).toEqual('FR')
  })
  it('returns an empty string by default', () => {
    expect(getIso2CodeFromLocale()).toEqual('')
  })
})

describe(getCountryFromLocale, () => {
  it('returns Portugal when pt-pt is called', () => {
    expect(getCountryFromLocale('pt-pt')).toEqual('Portugal')
  })
  it('returns Spain when es-es is called', () => {
    expect(getCountryFromLocale('es-es')).toEqual('Spain')
  })
  it('returns Germany when de-de is called', () => {
    expect(getCountryFromLocale('de-de')).toEqual('Germany')
  })
  it('returns Austria when de-at is called', () => {
    expect(getCountryFromLocale('de-at')).toEqual('Austria')
  })
  it('returns Italy when de-at is called', () => {
    expect(getCountryFromLocale('it-it')).toEqual('Italy')
  })
  it('returns France when de-at is called', () => {
    expect(getCountryFromLocale('fr-fr')).toEqual('France')
  })
  it('returns an empty string by default', () => {
    expect(getCountryFromLocale('')).toEqual('')
  })
})

describe(getLocaleFromCountry, () => {
  it('returns pt-pt when Portugal is called', () => {
    expect(getLocaleFromCountry('Portugal')).toEqual('pt-pt')
  })
  it('returns es-es when Spain is called', () => {
    expect(getLocaleFromCountry('Spain')).toEqual('es-es')
  })
  it('returns de-de when Germany is called', () => {
    expect(getLocaleFromCountry('Germany')).toEqual('de-de')
  })
  it('returns de-at when Austria is called', () => {
    expect(getLocaleFromCountry('Austria')).toEqual('de-at')
  })
  it('returns it-t when Italy is called', () => {
    expect(getLocaleFromCountry('Italy')).toEqual('it-it')
  })
  it('returns fr-fr when France is called', () => {
    expect(getLocaleFromCountry('France')).toEqual('fr-fr')
  })
  it('returns an empty string by default', () => {
    expect(getLocaleFromCountry('')).toEqual('pt-pt')
  })
})

describe(getSubdivisionsPerLocale, () => {
  it('returns the districts from Portugal on the PT shop', () => {
    expect(getSubdivisionsPerLocale('pt-pt')).toEqual(DISTRICTS_PT)
  })
  it('returns the provinces from Spain on the ES shop', () => {
    expect(getSubdivisionsPerLocale('es-es')).toEqual(PROVINCES_ES)
  })
  it('returns an empry array when no locale is passed', () => {
    expect(getSubdivisionsPerLocale('')).toEqual([])
  })
  it('returns the districts from Portugal in alphabetical order', () => {
    const collator = new Intl.Collator('pt')

    const exp = DISTRICTS_PT.sort(function (x, y) {
      return collator.compare(x.label, y.label)
    })

    expect(getSubdivisionsPerLocale('pt-pt')).toEqual(exp)
  })
  it('returns the provinces from Spain in alphabetical order', () => {
    const collator = new Intl.Collator('es')

    const exp = PROVINCES_ES.sort(function (x, y) {
      return collator.compare(x.label, y.label)
    })

    expect(getSubdivisionsPerLocale('es-es')).toEqual(exp)
  })

  describe(getGeocodeISOFromLocale, () => {
    it('returns PRT when locale is "pt-pt"', () => {
      expect(getGeocodeISOFromLocale('pt-pt')).toEqual('PRT')
    })
    it('returns ESP when locale is "es-es"', () => {
      expect(getGeocodeISOFromLocale('es-es')).toEqual('ESP')
    })
    it('returns DEU when locale is "de-de"', () => {
      expect(getGeocodeISOFromLocale('de-de')).toEqual('DEU')
    })
    it('returns AUT when locale is "de-at"', () => {
      expect(getGeocodeISOFromLocale('de-at')).toEqual('AUT')
    })
    it('returns ITA when locale is "it-it"', () => {
      expect(getGeocodeISOFromLocale('it-it')).toEqual('ITA')
    })
    it('returns FRA when locale is "fr-fr"', () => {
      expect(getGeocodeISOFromLocale('fr-fr')).toEqual('FRA')
    })
    it('returns an empty string by default', () => {
      expect(getGeocodeISOFromLocale()).toEqual('')
    })
  })

  describe(getCountryFromIso2Code, () => {
    it('returns Portugal when PT is called', () => {
      expect(getCountryFromIso2Code('PT')).toEqual('Portugal')
    })
    it('returns España when ES is called', () => {
      expect(getCountryFromIso2Code('ES')).toEqual('España')
    })
    it('returns Deutschland when DE is called', () => {
      expect(getCountryFromIso2Code('DE')).toEqual('Deutschland')
    })
    it('returns Österreich when de-at is called', () => {
      expect(getCountryFromIso2Code('AT')).toEqual('Österreich')
    })
    it('returns Italia when de-at is called', () => {
      expect(getCountryFromIso2Code('IT')).toEqual('Italia')
    })
    it('returns France when de-at is called', () => {
      expect(getCountryFromIso2Code('FR')).toEqual('France')
    })
    it('returns an empty string by default', () => {
      expect(getCountryFromIso2Code('')).toEqual('')
    })
  })

  describe(getSubdivisionPerLocale, () => {
    it('returns the district when locale is "pt-pt"', () => {
      expect(getSubdivisionPerLocale('pt-pt', address)).toEqual('someDistrict')
    })
    it('returns the province when locale is "es-es"', () => {
      expect(getSubdivisionPerLocale('es-es', address)).toEqual('someProvince')
    })
    it('returns an empty string by default', () => {
      expect(getSubdivisionPerLocale('')).toEqual('')
    })
  })

  describe(getSubdivisionPerIso2Code, () => {
    it('returns the district when iso2Code is "PT"', () => {
      expect(getSubdivisionPerIso2Code('PT', address)).toEqual('someDistrict')
    })
    it('returns the province when iso2Code is "ES"', () => {
      expect(getSubdivisionPerIso2Code('ES', address)).toEqual('someProvince')
    })
    it('returns an empty string by default', () => {
      expect(getSubdivisionPerIso2Code('')).toEqual('')
    })
  })
})
