import { useRestrictedZipCode } from '../useRestrictedZipCode'

describe(useRestrictedZipCode, () => {
  it('returns a restricted Zip Code if Portuguese Zip is between 9000 and 9999', () => {
    expect(useRestrictedZipCode('9150', 'pt-pt')).toEqual(true)
  })
  it('does not return a restricted Zip Code if Portuguese Zip is lower to 9000', () => {
    expect(useRestrictedZipCode('8000', 'pt-pt')).toEqual(false)
  })
  it('does not return a restricted Zip Code if Portuguese Zip is higher to 1050', () => {
    expect(useRestrictedZipCode('1050', 'pt-pt')).toEqual(false)
  })
  it('returns false if there is no rules regarding to the locale', () => {
    expect(useRestrictedZipCode('1050', 'es-es')).toEqual(false)
  })
})
