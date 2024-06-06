import { SprykerCheckoutData } from '~domains/checkout/types'
import { sprykerCheckoutData } from '~domains/checkout/__mocks__/checkout-data'
import { normalizeCheckoutData } from '../checkout-data'

describe(normalizeCheckoutData, () => {
  it('normalizes the data, selects the default address and removes address 2 if empty', () => {
    const normalizedData = normalizeCheckoutData(
      (sprykerCheckoutData as unknown) as SprykerCheckoutData
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeCheckoutData({} as SprykerCheckoutData)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeCheckoutData()
    expect(normalizedData).toEqual({})
  })
})
