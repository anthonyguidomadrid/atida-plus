import { describe, it } from 'globalthis/implementation'
import { Product } from '~domains/product'
import { renderWithStore, renderWithStoreAndFeatureFlags } from '~test-helpers'
import { ProductSEO } from '../ProductSEO'

describe(ProductSEO, () => {
  describe('available product', () => {
    it('renders script tag with json-ld data', () => {
      const { container } = renderWithStore(<ProductSEO />, {
        initialState: {
          server: {
            product: {
              content: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                data: {
                  name: 'Some product',
                  largeImage: 'some-product-image.jpg',
                  description: 'Some description of the product',
                  brand: { label: 'Some brand', code: 'some-brand' },
                  categories: { lvl0: ['Some product category'] },
                  gtin: '1234567890123',
                  sku: '1010101',
                  price: { value: 1234, currency: 'EUR' },
                  availability: 'AVAILABLE',
                  url: '/some-product-url'
                } as Product
              }
            }
          }
        }
      })
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('rating', () => {
    it('does not render rating when flag is off', () => {
      const { container } = renderWithStore(<ProductSEO />, {
        initialState: {
          server: {
            product: {
              content: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                data: {
                  name: 'Some product',
                  largeImage: 'some-product-image.jpg',
                  description: 'Some description of the product',
                  brand: { label: 'Some brand', code: 'some-brand' },
                  categories: { lvl0: ['Some product category'] },
                  gtin: '1234567890123',
                  sku: '1010101',
                  price: { value: 1234, currency: 'EUR' },
                  availability: 'AVAILABLE',
                  url: '/some-product-url',
                  rating: {
                    averageRating: 3.5,
                    numberOfReviews: 100
                  }
                } as Product
              }
            }
          }
        }
      })
      expect(container.firstChild).toMatchSnapshot()
    })

    it('renders rating when flag is on', () => {
      const { container } = renderWithStoreAndFeatureFlags(<ProductSEO />, {
        initialState: {
          server: {
            product: {
              content: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                data: {
                  name: 'Some product',
                  largeImage: 'some-product-image.jpg',
                  description: 'Some description of the product',
                  brand: { label: 'Some brand', code: 'some-brand' },
                  categories: { lvl0: ['Some product category'] },
                  gtin: '1234567890123',
                  sku: '1010101',
                  price: { value: 1234, currency: 'EUR' },
                  availability: 'AVAILABLE',
                  url: '/some-product-url',
                  rating: {
                    averageRating: 3.5,
                    numberOfReviews: 100
                  }
                } as Product
              }
            }
          }
        },
        featureFlags: {}
      })

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
