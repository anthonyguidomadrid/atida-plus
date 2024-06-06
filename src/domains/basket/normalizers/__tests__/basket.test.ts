import { SprykerBasket } from '~domains/basket/types'
import {
  basket,
  basketWithDiscountedItem,
  basketWithPromotionalItem,
  sprykerBasket,
  sprykerBasketWithDiscountedItem,
  sprykerBasketWithPromotionalItem
} from '~domains/basket/__mocks__/basket'
import { normalizeBasket } from '../basket'

describe(normalizeBasket, () => {
  it('normalizes the data', () => {
    const normalizedData = normalizeBasket(
      (sprykerBasket as unknown) as SprykerBasket
    )

    expect(normalizedData).toEqual(basket)
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeBasket({} as SprykerBasket)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeBasket()
    expect(normalizedData).toEqual({})
  })

  it('normalizes the promotional item if available', () => {
    const normalizedData = normalizeBasket(
      (sprykerBasketWithPromotionalItem as unknown) as SprykerBasket
    )
    expect(normalizedData).toEqual(basketWithPromotionalItem)
  })
  it('normalizes the discounted item if available', () => {
    const normalizedData = normalizeBasket(
      (sprykerBasketWithDiscountedItem as unknown) as SprykerBasket
    )
    expect(normalizedData).toEqual(basketWithDiscountedItem)
  })
})
