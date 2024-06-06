import { screen, waitFor } from '@testing-library/react'
import { renderWithStoreAndFeatureFlags, setWindowSize } from '~test-helpers'
import { OrderHistoryItem, OrderHistoryItemProps } from './'
import { orderHistoryWithMixedStatuses } from '~domains/account/__mocks__/order-history'
import { FeatureFlag } from '~config/constants/feature-flags'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe(OrderHistoryItem, () => {
  const defaultProps = orderHistoryWithMixedStatuses[0].orderHistory[0]

  const setup = (
    props: Partial<OrderHistoryItemProps> = {},
    isOrderHistoryTrackingEnabled = false,
    isDownloadInvoiceEnabled = false,
    width?: number
  ) => {
    setWindowSize({ width })
    const component = renderWithStoreAndFeatureFlags(
      <OrderHistoryItem {...defaultProps} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.ORDER_HISTORY_TRACKING]: isOrderHistoryTrackingEnabled,
          [FeatureFlag.ACCOUNT_DOWNLOAD_INVOICE]: isDownloadInvoiceEnabled
        }
      }
    )
    return component
  }

  it('renders OrderHistoryItem component', async () => {
    setup()
    expect(screen.getByTestId('orderHistoryItem')).toBeInTheDocument()
  })

  it('renders order tracking button when the FF is enabled', async () => {
    setup({}, true)
    expect(screen.getByTestId('orderHistoryItem')).toBeInTheDocument()
  })

  it('displays the correct number of product images - Mobile', async () => {
    setup({ ...defaultProps }, true, false, 375)
    waitFor(() =>
      expect(screen.queryAllByTestId('orderItemImage')).toHaveLength(3)
    )
  })

  it('displays the correct number of product images - SM', async () => {
    setup({ ...defaultProps }, true, false, 800)
    waitFor(() =>
      expect(screen.queryAllByTestId('orderItemImage')).toHaveLength(7)
    )
  })

  it('displays the correct number of product images - MD', async () => {
    setup({ ...defaultProps }, true, false, 1100)
    waitFor(() =>
      expect(screen.queryAllByTestId('orderItemImage')).toHaveLength(6)
    )
  })

  it('displays the correct number of product images - LG', async () => {
    setup({ ...defaultProps }, true, false, 1500)
    waitFor(() =>
      expect(screen.queryAllByTestId('orderItemImage')).toHaveLength(7)
    )
  })

  it('displays excessiveProductsItem tile when needed', async () => {
    setup({}, true, false, 1100)
    waitFor(() =>
      expect(screen.queryAllByTestId('excessiveProductsItem')).toHaveLength(1)
    )
  })

  it('hides the excessiveProductsItem tile when needed', async () => {
    setup(
      {
        ...defaultProps,
        attributes: {
          ...defaultProps.attributes,
          items: defaultProps.attributes.items.splice(0, 1)
        }
      },
      true,
      false,
      375
    )
    waitFor(() =>
      expect(screen.queryAllByTestId('excessiveProductsItem')).toHaveLength(0)
    )
  })

  it('displays download invoice button', async () => {
    setup({}, true, true)
    expect(screen.getByTestId('downloadInvoiceButton')).toBeInTheDocument()
  })
})
