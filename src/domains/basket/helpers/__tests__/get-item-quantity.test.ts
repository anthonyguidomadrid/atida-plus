import { getItemQuantity } from '../get-item-quantity'
import { basket } from '../../__mocks__/basket'

describe(getItemQuantity, () => {
  it('returns the correct items quantity when passed correct parameters', () => {
    expect(getItemQuantity(basket.items, '100000001')).toEqual(1)
  })

  it('does not break when missing parameters', () => {
    expect(getItemQuantity(basket.items, undefined)).toEqual(undefined)
  })

  it('does not break when passing a missing sku', () => {
    expect(getItemQuantity(basket.items, 'someMissingSku')).toEqual(undefined)
  })
})
