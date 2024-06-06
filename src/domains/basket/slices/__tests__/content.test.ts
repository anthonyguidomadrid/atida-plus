import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { contentSlice } from '../content'
import { itemStatesSlice } from '../item-states'
import { clearStateErrors } from '~domains/redux/actions'
import { productModal } from '~domains/product/__mocks__/product'

describe(contentSlice.name, () => {
  describe(contentSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.success(basketWithProducts)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        data: basketWithProducts
      })
    })
  })

  describe(contentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(contentSlice.actions.cancel.toString(), () => {
    it('does nothing on cancel', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.cancel()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          contentSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.triggerBasketModal.toString(), () => {
    it('trigger basket modal and add product', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          contentSlice.actions.triggerBasketModal(productModal)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        basketModalProduct: productModal
      })
    })
  })

  describe(contentSlice.actions.reset.toString(), () => {
    it('resets the basket status and content', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true
          },
          contentSlice.actions.reset()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        data: undefined
      })
    })
  })

  describe(contentSlice.actions.resetError.toString(), () => {
    it('resets wasError', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true
          },
          contentSlice.actions.resetError()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears all errors in the state', async () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error'
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(itemStatesSlice.actions.removeFromBasketSuccess.toString(), () => {
    it('sets wasSuccess to true, removes the item from the basket and updates basket totals', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            data: {
              id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
              currency: 'EUR',
              coupons: [],
              discounts: [],
              items: [
                {
                  id: '100000001',
                  sku: '100000001',
                  quantity: 1,
                  unitPrice: 10,
                  subtotal: 10,
                  product: {
                    name:
                      'Vagisil Cuidado Incontinencia Toallitas Íntimas 12Uds',
                    brand: { code: 'atida', label: 'Atida' },
                    format: { code: 'shampooCode', label: 'Shampoo' },
                    productDatImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    thumbnailImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    mediumImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                    largeImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                    productTileImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                    productTileRetinaImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                    metaTitle: 'meta title PT test 3',
                    metaKeywords: 'meta keywords PT test 3',
                    metaDescription: 'meta description PT test 3',
                    pricePerUnit: {
                      value: 15498,
                      currency: 'EUR',
                      unit: '100 ml'
                    },
                    rrp: { value: 15498, currency: 'EUR' }
                  }
                },
                {
                  id: '100000002',
                  sku: '100000002',
                  quantity: 2,
                  unitPrice: 20,
                  subtotal: 40,
                  product: {
                    name:
                      'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
                    brand: { code: 'atida', label: 'Atida' },
                    format: { code: 'shampooCode', label: 'Shampoo' },
                    productDatImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    thumbnailImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    mediumImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                    largeImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                    productTileImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                    productTileRetinaImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                    metaTitle: 'meta title PT test 1',
                    metaKeywords: 'meta keywords PT test 1',
                    metaDescription: 'meta description PT test 1',
                    unitVolume: {
                      unit: 'MILLILITER',
                      amount: 100,
                      unitLabel: 'ml'
                    },
                    pricePerUnit: {
                      value: 15498,
                      currency: 'EUR',
                      unit: '100 ml'
                    },
                    rrp: { value: 15498, currency: 'EUR' }
                  }
                }
              ],
              subTotal: 50,
              shippingTotal: 0,
              grandTotal: 50,
              rrpTotal: 50
            }
          },
          itemStatesSlice.actions.removeFromBasketSuccess({
            id: '100000001',
            sku: '100000001',
            data: {
              id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
              currency: 'EUR',
              coupons: [],
              discounts: [],
              items: [
                {
                  id: '100000002',
                  sku: '100000002',
                  quantity: 2,
                  unitPrice: 20,
                  subtotal: 40
                }
              ],
              subTotal: 40,
              shippingTotal: 0,
              grandTotal: 40,
              rrpTotal: 40
            }
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        data: {
          id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
          currency: 'EUR',
          coupons: [],
          discounts: [],
          items: [
            {
              id: '100000002',
              sku: '100000002',
              quantity: 2,
              unitPrice: 20,
              subtotal: 40,
              product: {
                name:
                  'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
                brand: { code: 'atida', label: 'Atida' },
                format: { code: 'shampooCode', label: 'Shampoo' },
                productDatImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                thumbnailImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                mediumImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                largeImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                productTileImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                productTileRetinaImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                metaTitle: 'meta title PT test 1',
                metaKeywords: 'meta keywords PT test 1',
                metaDescription: 'meta description PT test 1',
                unitVolume: {
                  unit: 'MILLILITER',
                  amount: 100,
                  unitLabel: 'ml'
                },
                pricePerUnit: {
                  value: 15498,
                  currency: 'EUR',
                  unit: '100 ml'
                },
                rrp: { value: 15498, currency: 'EUR' }
              }
            }
          ],
          subTotal: 40,
          shippingTotal: 0,
          grandTotal: 40,
          rrpTotal: 40
        }
      })
    })

    it('does not error and sets basket items to empty array on removal of only item in the basket', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            data: {
              id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
              currency: 'EUR',
              coupons: [],
              discounts: [],
              items: [
                {
                  sku: '100000001',
                  quantity: 1,
                  unitPrice: 10,
                  subtotal: 10,
                  product: {
                    name:
                      'Vagisil Cuidado Incontinencia Toallitas Íntimas 12Uds',
                    brand: { code: 'atida', label: 'Atida' },
                    format: { code: 'shampooCode', label: 'Shampoo' },
                    productDatImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    thumbnailImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    mediumImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                    largeImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                    productTileImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                    productTileRetinaImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                    metaTitle: 'meta title PT test 3',
                    metaKeywords: 'meta keywords PT test 3',
                    metaDescription: 'meta description PT test 3',
                    pricePerUnit: {
                      value: 15498,
                      currency: 'EUR',
                      unit: '100 ml'
                    },
                    rrp: { value: 15498, currency: 'EUR' }
                  }
                }
              ],
              subTotal: 10,
              shippingTotal: 0,
              grandTotal: 10,
              rrpTotal: 10
            }
          },
          itemStatesSlice.actions.removeFromBasketSuccess({
            sku: '100000001',
            data: {
              id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
              currency: 'EUR',
              coupons: [],
              discounts: [],
              subTotal: 0,
              shippingTotal: 0,
              grandTotal: 0,
              rrpTotal: 0,
              items: []
            }
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        data: {
          id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
          currency: 'EUR',
          coupons: [],
          discounts: [],
          items: [],
          subTotal: 0,
          shippingTotal: 0,
          grandTotal: 0,
          rrpTotal: 0
        }
      })
    })
  })

  describe(itemStatesSlice.actions.changeItemQuantitySuccess.toString(), () => {
    it('sets wasSuccess to true, updates the items quantity and basket totals', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            data: {
              id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
              currency: 'EUR',
              coupons: [],
              discounts: [],
              items: [
                {
                  id: '100000001',
                  sku: '100000001',
                  quantity: 1,
                  unitPrice: 10,
                  subtotal: 10,
                  product: {
                    name:
                      'Vagisil Cuidado Incontinencia Toallitas Íntimas 12Uds',
                    brand: { code: 'atida', label: 'Atida' },
                    format: { code: 'shampooCode', label: 'Shampoo' },
                    productDatImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    thumbnailImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    mediumImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                    largeImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                    productTileImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                    productTileRetinaImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                    metaTitle: 'meta title PT test 3',
                    metaKeywords: 'meta keywords PT test 3',
                    metaDescription: 'meta description PT test 3',
                    pricePerUnit: {
                      value: 15498,
                      currency: 'EUR',
                      unit: '100 ml'
                    },
                    rrp: { value: 15498, currency: 'EUR' }
                  }
                },
                {
                  id: '100000002',
                  sku: '100000002',
                  quantity: 2,
                  unitPrice: 20,
                  subtotal: 40,
                  product: {
                    name:
                      'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
                    brand: { code: 'atida', label: 'Atida' },
                    format: { code: 'shampooCode', label: 'Shampoo' },
                    productDatImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    thumbnailImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                    mediumImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                    largeImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                    productTileImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                    productTileRetinaImage:
                      'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                    metaTitle: 'meta title PT test 1',
                    metaKeywords: 'meta keywords PT test 1',
                    metaDescription: 'meta description PT test 1',
                    unitVolume: {
                      unit: 'MILLILITER',
                      amount: 100,
                      unitLabel: 'ml'
                    },
                    pricePerUnit: {
                      value: 15498,
                      currency: 'EUR',
                      unit: '100 ml'
                    },
                    rrp: { value: 15498, currency: 'EUR' }
                  }
                }
              ],
              subTotal: 50,
              shippingTotal: 0,
              grandTotal: 50,
              rrpTotal: 50
            }
          },
          itemStatesSlice.actions.changeItemQuantitySuccess({
            sku: '100000001',
            quantity: 2,
            data: {
              id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
              currency: 'EUR',
              coupons: [],
              discounts: [],
              items: [
                {
                  id: '100000001',
                  sku: '100000001',
                  quantity: 2,
                  unitPrice: 10,
                  subtotal: 20
                },
                {
                  id: '100000002',
                  sku: '100000002',
                  quantity: 2,
                  unitPrice: 20,
                  subtotal: 40
                }
              ],
              subTotal: 60,
              shippingTotal: 0,
              grandTotal: 60,
              rrpTotal: 60
            }
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        data: {
          id: 'eae5719b-af93-519d-8bb5-0348c6ba76c0',
          currency: 'EUR',
          coupons: [],
          discounts: [],
          items: [
            {
              id: '100000001',
              sku: '100000001',
              quantity: 2,
              unitPrice: 10,
              subtotal: 20,
              product: {
                name: 'Vagisil Cuidado Incontinencia Toallitas Íntimas 12Uds',
                brand: { code: 'atida', label: 'Atida' },
                format: { code: 'shampooCode', label: 'Shampoo' },
                productDatImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                thumbnailImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                mediumImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                largeImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                productTileImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                productTileRetinaImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                metaTitle: 'meta title PT test 3',
                metaKeywords: 'meta keywords PT test 3',
                metaDescription: 'meta description PT test 3',
                pricePerUnit: {
                  value: 15498,
                  currency: 'EUR',
                  unit: '100 ml'
                },
                rrp: { value: 15498, currency: 'EUR' }
              }
            },
            {
              id: '100000002',
              sku: '100000002',
              quantity: 2,
              unitPrice: 20,
              subtotal: 40,
              product: {
                name:
                  'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
                brand: { code: 'atida', label: 'Atida' },
                format: { code: 'shampooCode', label: 'Shampoo' },
                productDatImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                thumbnailImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_1.jpg',
                mediumImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_2.jpg',
                largeImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_3.jpg',
                productTileImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_4.jpg',
                productTileRetinaImage:
                  'https://www.mifarma.es/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/1/8/180671_5.jpg',
                metaTitle: 'meta title PT test 1',
                metaKeywords: 'meta keywords PT test 1',
                metaDescription: 'meta description PT test 1',
                unitVolume: {
                  unit: 'MILLILITER',
                  amount: 100,
                  unitLabel: 'ml'
                },
                pricePerUnit: {
                  value: 15498,
                  currency: 'EUR',
                  unit: '100 ml'
                },
                rrp: { value: 15498, currency: 'EUR' }
              }
            }
          ],
          subTotal: 60,
          shippingTotal: 0,
          grandTotal: 60,
          rrpTotal: 60
        }
      })
    })
  })
})
