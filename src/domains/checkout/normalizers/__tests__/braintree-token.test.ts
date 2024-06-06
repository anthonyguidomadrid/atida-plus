import { ClientTokenData } from '~domains/checkout/types'
import {
  clientTokenData,
  braintreeData
} from '~domains/checkout/__mocks__/braintree-data'
import { normalizeClientTokenData } from '../braintree-token'

describe(normalizeClientTokenData, () => {
  it('normalizes the data', () => {
    const normalizedData = normalizeClientTokenData(
      (clientTokenData.data as unknown) as ClientTokenData
    )

    expect(normalizedData).toEqual(braintreeData)
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeClientTokenData({} as ClientTokenData)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeClientTokenData()
    expect(normalizedData).toEqual({})
  })
})
