/**
 * @jest-environment node
 */
import { checkDisabledProducts } from '../checkDisabledProducts'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'

describe(checkDisabledProducts, () => {
  it('removes disabled product', async () => {
    expect(
      await checkDisabledProducts(
        {
          ...basketWithProducts,
          items: [
            {
              ...basketWithProducts.items[0],
              product: {
                ...basketWithProducts.items[0].product,
                enabled: false
              }
            }
          ]
        },
        'pt-pt',
        'some-unique-id',
        'some user token'
      )
    ).toEqual({})
  })

  it('returns the correct basket when all products are enabled', async () => {
    expect(
      await checkDisabledProducts(
        basketWithProducts,
        'pt-pt',
        'some-unique-id',
        'some user token'
      )
    ).toEqual(basketWithProducts)
  })
})
