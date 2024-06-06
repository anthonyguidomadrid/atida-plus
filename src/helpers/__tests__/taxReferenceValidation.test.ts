import { taxReferenceRegexByLocale } from '~helpers'
import { TAX_REFERENCE_REGEX } from '~config/constants/tax-reference-regex'

describe(taxReferenceRegexByLocale, () => {
  it('returns the DNI/NIE regex when is a personal account for es-es', () => {
    expect(taxReferenceRegexByLocale('es-es', true)).toEqual(
      TAX_REFERENCE_REGEX.ES_DNI_NIE
    )
  })
  it('returns the CIF/NIF/NIE regex when is a business account for es-es', () => {
    expect(taxReferenceRegexByLocale('es-es', false)).toEqual(
      TAX_REFERENCE_REGEX.ES_NIF_CIF_NIE
    )
  })
  it('returns the VAT regex when is a business account for pt-pt', () => {
    expect(taxReferenceRegexByLocale('pt-pt', false)).toEqual(
      TAX_REFERENCE_REGEX.PT_VAT
    )
  })
  it('rejects all when there is no locale', () => {
    expect(taxReferenceRegexByLocale('', false)).toEqual(
      TAX_REFERENCE_REGEX.REJECT_ALL
    )
  })
})
