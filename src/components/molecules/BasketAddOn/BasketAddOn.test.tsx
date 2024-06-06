import { screen } from '@testing-library/react'
import { mockedProducts } from '../../../__mocks__/pop/productsAndContentBlocks'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { BasketAddOn, BasketAddOnProps } from './BasketAddOn'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { setupMatchMediaMock } from '~domains/breakpoints'
import userEvent from '@testing-library/user-event'

describe(BasketAddOn, () => {
  const defaultProps = {
    product: mockedProducts[0],
    isProductLoading: false,
    discountedPercentage: 0,
    unitVolume: { amount: 1 },
    price: { value: 2990 },
    isDiscountedItem: true,
    setDisplayFreeShippingProduct: jest.fn()
  }

  const setup = (props: Partial<BasketAddOnProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)

    const renderedComponent = renderWithStoreAndFeatureFlags(
      <RouterContext.Provider value={routerMock}>
        <BasketAddOn {...defaultProps} {...props} />
      </RouterContext.Provider>,
      {
        featureFlags: {
          [FeatureFlag.BASKET_FREE_SHIPPING_PRODUCTS]: true
        }
      }
    )

    reset()
    return renderedComponent
  }

  it('renders the component', () => {
    setup()
    expect(screen.getByTestId('basketAddOn')).toBeInTheDocument()
  })

  it('renders the product information and the add-to-cart button', () => {
    setup()
    expect(screen.getByTestId('basketAddOnProductInfo')).toBeInTheDocument()
    expect(screen.getByTestId('basketAddOnProductImage')).toBeInTheDocument()
    expect(screen.getByTestId('basketAddOnProductName')).toBeInTheDocument()
    expect(screen.getByTestId('basketAddOnProductUnit')).toBeInTheDocument()
    expect(screen.getByTestId('basketAddOnProductRrp')).toBeInTheDocument()
    expect(screen.getByTestId('basketAddOnProductPrice')).toBeInTheDocument()
    expect(
      screen.getByTestId('basketAddOnAddToBasketButton')
    ).toBeInTheDocument()
  })

  it('does not render the rrp price if it is egual or inferior to the price', () => {
    setup({ product: mockedProducts[1] })
    expect(
      screen.queryByTestId('basketAddOnProductRrp')
    ).not.toBeInTheDocument()
  })

  it('disable the add-to-cart button when the product is loading', () => {
    setup({ isProductLoading: true })
    expect(screen.getByTestId('basketAddOnAddToBasketButton')).toHaveProperty(
      'disabled'
    )
  })

  it('renders the component when isDiscountedItem is false', () => {
    setup({ isDiscountedItem: false })
    expect(screen.getByTestId('basketAddOn')).toBeInTheDocument()
  })

  it('checks for discountPercentage and for unitVolume', () => {
    setup({
      discountPercentage: 5000,
      product: { ...mockedProducts[0], unitVolume: undefined }
    })
    userEvent.click(screen.getByTestId('basketAddOnAddToBasketButton'))
    expect(screen.getByTestId('basketAddOnProductUnit')).toHaveTextContent('')
    expect(screen.getByTestId('basketAddOnProductPrice')).toHaveTextContent(
      '30'
    )
  })
})
