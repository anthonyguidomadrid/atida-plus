import { screen } from '@testing-library/react'
import { OrderTotals, OrderTotalsProps } from '.'
import { coupons } from '~components/molecules/Coupons/Coupons.mock'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { renderWithStore, renderWithStoreAndFeatureFlags } from '~test-helpers'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { FeatureFlag } from '~config/constants/feature-flags'

const store = createStore(rootReducer, {})

const defaultProps = {
  numberOfItems: 3,
  currency: 'EUR',
  numberOfProducts: 2,
  subTotalPrice: 1598,
  surchargeTotal: 123,
  discounts: [
    {
      displayName: 'Some discount',
      amount: 291
    }
  ],
  totalProducts: 1307,
  shipping: 495,
  grandTotal: 1802,
  itemTotal: 648,
  basketLink: true,
  coupons: [
    {
      displayName: 'total-20-percent',
      amount: 10,
      code: 'total-20-percent'
    },
    {
      displayName: 'total-20-percent',
      amount: 10,
      code: 'total-20-percent'
    }
  ],
  rrpDiscountTotal: 123,
  couponDiscount: 100,
  rewardTotal: 50,
  isPaymentStepActive: true,
  grandTotalText: 'basket.total'
}

describe('OrderTotals', () => {
  describe('order totals', () => {
    const handlePaymentProceed = jest.fn()
    const setup = (props: Partial<OrderTotalsProps> = {}) =>
      renderWithStoreAndFeatureFlags(
        <Provider store={store}>
          <OrderTotals
            {...defaultProps}
            {...props}
            handlePaymentProceed={handlePaymentProceed}
          />
        </Provider>,
        {
          featureFlags: {
            [FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH]: true
          }
        }
      )

    it('renders order totals', () => {
      setup()
      expect(screen.getByTestId('orderTotals')).toBeInTheDocument()
    })

    it('renders basket back link', () => {
      setup()
      const basketLinkContainer = screen.getByTestId('basket-link-holder')
      expect(basketLinkContainer).toBeInTheDocument()
      expect(basketLinkContainer.childElementCount).toBe(1)
      expect(basketLinkContainer.lastChild).toHaveTextContent(
        'basket.rrp-discount-total'
      )
    })

    it('renders shipping fee', () => {
      setup()
      expect(screen.getByTestId('shipping').lastChild).toHaveTextContent('4.95')
    })

    it('renders "free" if shipping is 0', () => {
      setup({ shipping: 0 })
      expect(screen.getByTestId('shipping').lastChild).toBeInTheDocument()
    })

    it('renders discounts', () => {
      setup()
      expect(screen.queryByTestId('discount')?.lastChild).toHaveTextContent(
        '2.91'
      )
    })

    it('does not error if there are not any discounts', () => {
      setup({ discounts: undefined })
      expect(screen.queryByTestId('discount')).not.toBeInTheDocument()
      setup({ discounts: [] })
      expect(screen.queryByTestId('discount')).not.toBeInTheDocument()
    })

    it('correctly displays basket discounts', async () => {
      setup({ basketDiscounts: 20 })

      const basketDiscount = screen.getByTestId('rrpDiscount')

      expect(basketDiscount).toBeInTheDocument()
      expect(basketDiscount.childElementCount).toBe(2)
      expect(basketDiscount.firstChild).toHaveTextContent('basket.discount')
      expect(basketDiscount.lastChild).toHaveTextContent('- 0.20')
    })

    it('correctly displays coupon discounts', async () => {
      setup({
        coupons: coupons.items
      })
      expect(screen.queryByTestId('coupon')?.lastChild).toHaveTextContent(
        '- 0.10'
      )
    })

    it('shows correct shipping price', async () => {
      setup({ subTotalPrice: 200, currency: 'EUR' })

      const shipping = screen.getByTestId('shipping')

      expect(shipping).toBeInTheDocument()
      expect(shipping.childElementCount).toBe(2)
      expect(shipping.firstChild).toHaveTextContent('basket.shipping')
      expect(shipping.lastChild).toHaveTextContent('4.95')
    })

    it('shows correct shipping free', async () => {
      setup({ subTotalPrice: 9001, currency: 'EUR', shipping: 0 })

      const shipping = screen.getByTestId('shipping')

      expect(shipping).toBeInTheDocument()
      expect(shipping.childElementCount).toBe(2)
      expect(shipping.firstChild).toHaveTextContent('basket.shipping')
      expect(shipping.lastChild).toHaveTextContent('shared.free')
    })

    it('tests memoized with changed quantity', async () => {
      const tester = setup({ numberOfItems: 3 })

      const rrp = screen.getByTestId('rrp')

      expect(rrp).toBeInTheDocument()
      expect(rrp.childElementCount).toBe(2)
      expect(rrp.firstChild).toHaveTextContent('basket.rrp-discount-total')

      tester.rerender(
        <Provider store={store}>
          <OrderTotals
            {...defaultProps}
            numberOfItems={2}
            handlePaymentProceed={handlePaymentProceed}
          />
        </Provider>
      )
      expect(rrp.firstChild).toHaveTextContent('basket.rrp-discount-total')
    })

    it('tests memoized with same basket data', async () => {
      const tester = setup({
        numberOfItems: 2,
        subTotalPrice: 200,
        totalProducts: 2,
        shipping: 20,
        grandTotal: 200,
        priceToPay: '200,00'
      })

      const rrp = screen.getByTestId('rrp')

      expect(rrp).toBeInTheDocument()
      expect(rrp.childElementCount).toBe(2)
      expect(rrp.firstChild).toHaveTextContent('basket.rrp-discount-total')

      const total = screen.getByTestId('total')

      expect(total).toBeInTheDocument()
      expect(total.childElementCount).toBe(2)
      expect(total.firstChild).toHaveTextContent('basket.total')
      expect(total.lastChild).toHaveTextContent('€ 200,00')

      tester.rerender(
        <Provider store={store}>
          <OrderTotals
            {...defaultProps}
            numberOfItems={2}
            subTotalPrice={200}
            totalProducts={2}
            shipping={20}
            grandTotal={200}
            priceToPay={'200,00'}
            handlePaymentProceed={handlePaymentProceed}
          />
        </Provider>
      )
      expect(rrp.firstChild).toHaveTextContent('basket.rrp-discount-total')
      expect(total.lastChild).toHaveTextContent('€ 200,00')
    })

    it('tests memoized with cleared basket (0 values)', async () => {
      const tester = setup({
        numberOfItems: 2,
        grandTotal: 12,
        priceToPay: '12,29',
        currency: 'EUR'
      })

      const rrp = screen.getByTestId('rrp')

      expect(rrp).toBeInTheDocument()
      expect(rrp.childElementCount).toBe(2)
      expect(rrp.firstChild).toHaveTextContent('basket.rrp-discount-total')

      const total = screen.getByTestId('total')

      expect(total).toBeInTheDocument()
      expect(total.childElementCount).toBe(2)
      expect(total.firstChild).toHaveTextContent('basket.total')
      expect(total.lastChild).toHaveTextContent('€ 12,29')

      tester.rerender(
        <Provider store={store}>
          <OrderTotals
            {...defaultProps}
            numberOfItems={0}
            grandTotal={0}
            priceToPay={'0'}
            handlePaymentProceed={handlePaymentProceed}
          />
        </Provider>
      )
      expect(rrp.firstChild).toHaveTextContent('basket.rrp-discount-total')
      expect(total.lastChild).toHaveTextContent('€ 12,29')
    })

    it('does not render the coupons if an empty array of coupons is passed', () => {
      setup({ coupons: [] })
      expect(screen.queryByTestId('coupon')).not.toBeInTheDocument()
    })
  })
})

describe('OrderTotals', () => {
  const setup = (isTaxExempt: boolean) => {
    const handlePaymentProceed = jest.fn()

    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <OrderTotals
          {...defaultProps}
          handlePaymentProceed={handlePaymentProceed}
        />
      </RouterContext.Provider>,
      {
        initialState: {
          client: {
            account: {
              customer: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                showNotification: false,
                reference: 'ES--8691',
                addresses: [
                  {
                    salutation: 'Mr',
                    firstName: 'John',
                    lastName: 'Doe',
                    address1: 'Avenue',
                    address2: '',
                    address3: '',
                    zipCode: '28000',
                    city: 'Madrid',
                    country: 'Spain',
                    iso2Code: 'GB',
                    company: '',
                    phone: '63736800',
                    createdAt: '2021-12-27 14:52:50.392774',
                    updatedAt: '2021-12-27 14:52:50.392774',
                    isDefaultShipping: true,
                    isDefaultBilling: true,
                    isTaxExempt: isTaxExempt,
                    id: '23420f45-b80b-5d47-ae12-e7bf819cf35a'
                  }
                ]
              }
            }
          }
        }
      }
    )
  }
  it('says that the price includes taxes if the customer is not tax exempted and tax exempt region feature is enabled', () => {
    setup(false)
    const taxText = screen.queryByTestId('tax-text')
    expect(taxText).toHaveTextContent('order.including-taxes')
  })
  it('says that the prices excludes taxes if the customer is tax exempted and tax exempt region feature is enabled', () => {
    setup(true)
    const taxText = screen.queryByTestId('tax-text')
    expect(taxText).toHaveTextContent('order.excluding-taxes')
  })
})
