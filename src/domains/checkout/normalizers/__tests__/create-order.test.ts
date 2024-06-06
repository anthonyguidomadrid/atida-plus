import { SprykerCheckout } from '~domains/checkout/types'
import { sprykerCheckoutData } from '~domains/checkout/__mocks__/checkout-data'
import { createOrderData } from '~domains/checkout/__mocks__/create-order'
import { normalizeCreatedOrder } from '../create-order'

describe(normalizeCreatedOrder, () => {
  it('normalizes the data recieved after creating an order (orderId and payments)', () => {
    const normalizedData = normalizeCreatedOrder(
      (sprykerCheckoutData as unknown) as SprykerCheckout
    )

    expect(normalizedData).toEqual(createOrderData)
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeCreatedOrder({} as SprykerCheckout)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeCreatedOrder()
    expect(normalizedData).toEqual({})
  })
})
