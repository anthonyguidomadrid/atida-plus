import { screen } from '@testing-library/react'
import { StickyMobileCTA, StickyMobileCTAProps } from './StickyMobileCTA'
import { product } from '~components/molecules/OrderSummaryProductList/OrderSummaryProductList.mock'
import { BasketItem } from '~domains/basket/types'
import { Product } from '~domains/product'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { FeatureFlag } from '~config/constants/feature-flags'

const handleSubmit = jest.fn()

const defaultProps = {
  currency: 'EUR',
  grandTotal: 1802,
  unavailableProducts: (product as unknown) as
    | (BasketItem & {
        product: Omit<Partial<Product>, 'sku' | 'price'>
      })[]
    | undefined,
  handleSubmit,
  isLoading: false,
  hasReachedFreeShipping: true
}

describe('StickyMobileCTA', () => {
  const setup = (
    props: Partial<StickyMobileCTAProps> = {},
    totalSaving: number
  ) =>
    renderWithStoreAndFeatureFlags(
      <RouterContext.Provider value={routerMock}>
        <StickyMobileCTA {...defaultProps} {...props} />
      </RouterContext.Provider>,
      {
        initialState: {
          client: {
            basket: {
              content: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                data: {
                  ...basketWithProducts,
                  totalSaving
                }
              }
            },
            checkout: {
              data: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                details: {
                  atidaCashUsed: 100
                }
              }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH]: true
        }
      }
    )

  it('renders sticky CTA', () => {
    setup(defaultProps, 0)
    expect(screen.getByTestId('stickyMobileCTA')).toBeInTheDocument()
  })

  it('renders total amount', () => {
    setup(defaultProps, 0)
    expect(screen.getByTestId('total').lastChild).toHaveTextContent('18.02')
  })

  it('renders total saving amount', () => {
    setup(defaultProps, 10000)
    expect(screen.getByTestId('basketSavings').lastChild).toHaveTextContent(
      '-100.00'
    )
  })

  it('renders the text "basket.sticky-cta.total-saving"', () => {
    setup(defaultProps, 10000)
    expect(
      screen.getByText('basket.sticky-cta.total-saving')
    ).toBeInTheDocument()
  })

  it('does not render the text "basket.sticky-cta.total-saving" when isCheckoutPage is true', () => {
    setup({ isCheckoutPage: true }, 10000)
    expect(
      screen.queryByTestId('basket.sticky-cta.total-saving')
    ).not.toBeInTheDocument()
  })

  it('should not render the line if the saving amount is under 50 cents', () => {
    setup(defaultProps, 50)
    expect(screen.queryByTestId('basketSavings')).toBeNull()
  })
})
