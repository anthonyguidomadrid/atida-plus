import { zipCodeValidation, zipCodeRegexByLocale } from '~helpers'
import { ZIP_CODES_REGEX } from '~config/constants/zip-code-regex'

describe(zipCodeValidation, () => {
  it('returns true when a ZIP code has the correct format (pt-pt)', () => {
    expect(zipCodeValidation('2330-148', 'pt-pt')).toEqual(true)
  })
  it('returns true when a ZIP code has the correct format (pt-pt)', () => {
    expect(zipCodeValidation('2330148', 'pt-pt')).toEqual(true)
  })
  it('returns false when a ZIP code does not have the correct format (pt-pt)', () => {
    expect(zipCodeValidation('23301481', 'pt-pt')).toEqual(false)
  })
  it('returns true when a ZIP code has the correct format (es-es)', () => {
    expect(zipCodeValidation('12345', 'es-es')).toEqual(true)
  })
  it('returns true when a ZIP code has the correct format (es-es)', () => {
    expect(zipCodeValidation('1234', 'es-es')).toEqual(true)
  })
  it('returns false when a ZIP code does not have the correct format (es-es)', () => {
    expect(zipCodeValidation('wrongZipCode', 'es-es')).toEqual(false)
  })
  it('returns true when a ZIP code has the correct format (de-de)', () => {
    expect(zipCodeValidation('12345', 'de-de')).toEqual(true)
  })
  it('returns false when a ZIP code has the correct format (de-de)', () => {
    expect(zipCodeValidation('1234', 'de-de')).toEqual(false)
  })
  it('returns false when incorrect locales is pased', () => {
    expect(zipCodeValidation('2330-148', 'wrongLocale')).toEqual(false)
  })
})

describe(zipCodeRegexByLocale, () => {
  it('returns the PT zip code validation when "pt-pt" is passed as locale', () => {
    expect(zipCodeRegexByLocale('pt-pt')).toEqual(ZIP_CODES_REGEX.PT_STRICT)
  })
  it('returns the ES zip code validation when "es-es" is passed as locale', () => {
    expect(zipCodeRegexByLocale('es-es')).toEqual(ZIP_CODES_REGEX.ES_STRICT)
  })
  it('returns the DE zip code validation when "de-de" is passed as locale', () => {
    expect(zipCodeRegexByLocale('de-de')).toEqual(ZIP_CODES_REGEX.DE_STRICT)
  })
  it('rejects all zip codes when the locale passed is wrong', () => {
    expect(zipCodeRegexByLocale('')).toEqual(ZIP_CODES_REGEX.REJECT_ALL)
  })
})
