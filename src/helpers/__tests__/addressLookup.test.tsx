import { address } from '~domains/address/__mocks__/addresses'
import {
  getQualifiedQueryForLookup,
  getQueryForLookup,
  getSuggestedAddressLabel
} from '~helpers/addressLookup'

const values = address

describe(getQualifiedQueryForLookup, () => {
  it('returns the qualified query for Portugal', () => {
    expect(getQualifiedQueryForLookup(values, 'pt-pt')).toEqual(
      '&qq=postalCode=22222;houseNumber=someNumber&q=Carl-Blos-Strass.%202%20update%20es'
    )
  })

  it('returns the qualified query for Spain', () => {
    expect(getQualifiedQueryForLookup(values, 'es-es')).toEqual(
      '&qq=postalCode=22222;houseNumber=someNumber&q=Carl-Blos-Strass.%202%20update%20es'
    )
  })

  it('returns the only the query when locale is empty', () => {
    expect(getQualifiedQueryForLookup(values, '')).toEqual(
      '&q=Carl-Blos-Strass.%202%20update%20es'
    )
  })

  it('returns the only the query when locale is undefined', () => {
    expect(getQualifiedQueryForLookup(values, undefined)).toEqual(
      '&q=Carl-Blos-Strass.%202%20update%20es'
    )
  })
})
describe(getQueryForLookup, () => {
  it('returns the expected query for', () => {
    expect(getQueryForLookup(values)).toEqual(
      '&q=Carl-Blos-Strass.%202%20update%20es'
    )
  })
})

describe(getSuggestedAddressLabel, () => {
  const suggestedAddress = {
    label: 'Calle Tesifón, 04700 El Ejido (Almería), España',
    countryCode: 'ESP',
    countryName: 'España',
    stateCode: 'AN',
    state: 'Andalucía',
    county: 'Almería',
    city: 'El Ejido',
    street: 'Calle Tesifón',
    postalCode: '04700'
  }
  it('returns the expected label when all the fields are provided', () => {
    expect(getSuggestedAddressLabel(suggestedAddress)).toEqual(
      'Calle Tesifón, 04700 El Ejido (Almería), España'
    )
  })

  it('returns the correct label street is missing', () => {
    expect(
      getSuggestedAddressLabel({
        ...suggestedAddress,
        street: undefined
      })
    ).toEqual('04700 El Ejido (Almería), España')
  })

  it('returns the correct label when postalcode is missing', () => {
    expect(
      getSuggestedAddressLabel({
        ...suggestedAddress,
        postalCode: undefined
      })
    ).toEqual('Calle Tesifón, El Ejido (Almería), España')
  })

  it('returns the correct label when the city is missing', () => {
    expect(
      getSuggestedAddressLabel({
        ...suggestedAddress,
        city: undefined
      })
    ).toEqual('Calle Tesifón, 04700  (Almería), España')
  })

  it('returns the correct label when county is missing', () => {
    expect(
      getSuggestedAddressLabel({
        ...suggestedAddress,
        county: undefined
      })
    ).toEqual('Calle Tesifón, 04700 El Ejido, España')
  })

  it('returns the correct label when country is missing', () => {
    expect(
      getSuggestedAddressLabel({
        ...suggestedAddress,
        countryName: undefined
      })
    ).toEqual('Calle Tesifón, 04700 El Ejido (Almería)')
  })
})
