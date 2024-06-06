import { screen, waitFor } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { OrdersList, OrdersListProps } from '.'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import {
  orderHistoryWithMixedStatuses,
  orderHistoryOnlyPending
} from '~domains/account/__mocks__/order-history'
import { useRouter } from 'next/router'
import { FeatureFlag } from '~config/constants/feature-flags'
import userEvent from '@testing-library/user-event'

describe(OrdersList, () => {
  const defaultProps: OrdersListProps = {
    orders: orderHistoryWithMixedStatuses,
    ordersLoaded: true,
    totalPages: 1
  }
  const setup = (
    props = defaultProps,
    isLargeFormat = false,
    isRequestInvoiceEnabled = false,
    taxRef: string | undefined = undefined
  ) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: undefined,
      locale: 'es-es',
      query: 'page=1'
    }))
    const { reset } = setupMatchMediaMock(isLargeFormat)
    renderWithStoreAndFeatureFlags(<OrdersList {...props} />, {
      initialState: {
        client: {
          account: {
            customer: {
              wasSuccess: true,
              wasError: false,
              isLoading: false,
              reference: 'some-ref',
              showNotification: false,
              details: { taxReference: taxRef }
            }
          }
        }
      },
      featureFlags: {
        [FeatureFlag.ACCOUNT_REQUEST_INVOICE]: isRequestInvoiceEnabled
      }
    })
    reset()
  }

  it('renders as an accessible element', () => {
    setup()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the orders history header', () => {
    setup()
    expect(screen.getByText('account.order-history')).toBeInTheDocument()
  })

  it('renders a loading spinner if orders are still loading', () => {
    setup({ ...defaultProps, ordersLoaded: false })
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument()
  })

  it('renders a "no orders" message if there are no orders', () => {
    setup({ ...defaultProps, orders: [] })
    expect(screen.getByText('order-history.no-orders')).toBeInTheDocument()
  })

  it('renders a list of mixed orders', () => {
    setup()

    const ordersList = screen.getAllByRole('article')
    expect(ordersList).toHaveLength(3)
  })

  it('renders a single pending order', () => {
    setup({ ...defaultProps, orders: orderHistoryOnlyPending })

    const ordersList = screen.getAllByRole('article')
    expect(ordersList).toHaveLength(1)
  })

  it('renders with request invoice section', () => {
    setup(
      {
        ...defaultProps,
        orders: orderHistoryOnlyPending
      },
      false,
      true
    )

    const requestInvoiceSection = screen.getByTestId('requestInvoice')
    expect(requestInvoiceSection).toBeInTheDocument()
  })

  it('does not shows the invoice modal when the tax reference is not missing', async () => {
    setup(
      {
        ...defaultProps
      },
      true,
      true,
      'tax-ref'
    )
    await waitFor(() =>
      userEvent.click(screen.getByTestId('toggleSwitchButton'))
    )
    expect(
      screen.queryByTestId('notificationModalLayout')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('taxReferenceForm')).not.toBeInTheDocument()
  })
  it('shows the invoice modal when the tax refernce is missing', async () => {
    setup(
      {
        ...defaultProps
      },
      true,
      true
    )
    expect(
      screen.queryByTestId('notificationModalLayout')
    ).not.toBeInTheDocument()
    await waitFor(() =>
      userEvent.click(screen.getByTestId('toggleSwitchButton'))
    )
    expect(screen.getByTestId('notificationModalLayout')).toBeInTheDocument()
    expect(screen.queryByTestId('taxReferenceForm')).toBeInTheDocument()
  })
})
