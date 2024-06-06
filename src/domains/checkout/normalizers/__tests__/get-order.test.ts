import { SprykerOrderResponse } from '~domains/checkout/types'
import {
  sprykerOrderData,
  orderData
} from '~domains/checkout/__mocks__/checkout-data'
import { normalizeGetOrder } from '../get-order'

describe(normalizeGetOrder, () => {
  it('normalizes the data recieved after placing an order', () => {
    const normalizedData = normalizeGetOrder(
      (sprykerOrderData as unknown) as SprykerOrderResponse
    )

    expect(normalizedData).toEqual(orderData)
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeGetOrder({} as SprykerOrderResponse)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeGetOrder()
    expect(normalizedData).toEqual({})
  })
})
