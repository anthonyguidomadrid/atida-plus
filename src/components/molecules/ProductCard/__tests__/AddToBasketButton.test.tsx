import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { AddToBasketButton, AddToBasketButtonProps } from '../AddToBasketButton'
import { product } from '../ProductCard.mock'

const defaultProps: AddToBasketButtonProps = {
  product,
  basketQuantity: 0,
  addToBasket: jest.fn(),
  isLoading: false,
  maxQuantity: 10
}
describe(AddToBasketButton, () => {
  const setup = (props: Partial<AddToBasketButtonProps> = {}, ff = true) => {
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <AddToBasketButton {...defaultProps} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.PRODUCT_QUANTITY_SELECTOR]: ff
        }
      }
    )
    return renderedComponent
  }
  it('Shows the quantity selector when the feature flag is on', () => {
    setup({ basketQuantity: 1 }, true)
    expect(screen.getByTestId('quantitySelector')).toBeInTheDocument()
    expect(screen.queryByTestId('addToBasketButton')).toBeNull()
  })

  it('Shows the button when the quantity selector feature flag is on but the product is not on the basket', () => {
    setup()
    expect(screen.getByTestId('addToBasketButton')).toBeInTheDocument()
  })

  it('Shows the button when the quantity selector feature flag is off', () => {
    setup({}, false)
    expect(screen.getByTestId('addToBasketButton')).toBeInTheDocument()
  })

  it('addToBasket is called when the add to basket button is clicked', () => {
    const addToBasket = jest.fn()
    const { container } = setup({
      addToBasket
    })
    expect(container).toBeInTheDocument()
    expect(addToBasket).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('addToBasketButton'))
    expect(addToBasket).toHaveBeenCalledTimes(1)
  })

  it('add to basket button is disabled when a product is out of stock', () => {
    const { container } = setup({
      product: {
        ...product,
        availability: 'NOT_AVAILABLE'
      }
    })
    expect(container).toBeInTheDocument()
    expect(screen.getByTestId('addToBasketButton')).toBeDisabled()
  })

  it('addToBasket is NOT called when the add to basket button is disabled', () => {
    const addToBasket = jest.fn()
    const { container } = setup({
      addToBasket,
      product: {
        ...product,
        availability: 'NOT_AVAILABLE'
      }
    })
    expect(container).toBeInTheDocument()
    expect(addToBasket).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('addToBasketButton'))
    expect(addToBasket).toHaveBeenCalledTimes(0)
  })
})
