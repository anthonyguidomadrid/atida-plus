import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuantitySelector, QuantitySelectorProps } from '.'

describe('QuantitySelector', () => {
  const setup = (props: Partial<QuantitySelectorProps> = {}) => {
    const removeFromBasket = jest.fn()
    const increaseQuantity = jest.fn()
    const decreaseQuantity = jest.fn()
    const onQuantityChange = jest.fn()
    const setPromotionalItem = jest.fn()

    const renderedComponent = render(
      <QuantitySelector
        quantity={1}
        showRemoveButton={false}
        disableIncreaseButton={false}
        removeFromBasket={removeFromBasket}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        onQuantityChange={onQuantityChange}
        setPromotionalItem={setPromotionalItem}
        {...props}
      />
    )
    return renderedComponent
  }

  it('renders QuantitySelector component', () => {
    setup()
    expect(screen.getByTestId('quantitySelector')).toBeInTheDocument()
  })

  it('renders removeProductButton', () => {
    setup()
    expect(screen.getByTestId('removeProductButton')).toBeInTheDocument()
  })

  it('renders decreaseQuantityButton', () => {
    setup()
    expect(screen.getByTestId('decreaseQuantityButton')).toBeInTheDocument()
  })

  it('renders increaseQuantityButton', () => {
    setup()
    expect(screen.getByTestId('increaseQuantityButton')).toBeInTheDocument()
  })

  it('renders quantityInput and calls onQuantityChange when user types', async () => {
    const onQuantityChange = jest.fn()
    setup({ onQuantityChange })
    userEvent.type(screen.getByTestId('quantityInput'), '2')
    await waitFor(() => expect(onQuantityChange).toHaveBeenCalledTimes(1))
    expect(screen.getByTestId('quantityInput')).toBeInTheDocument()
  })

  it('should call the setHasProductPromotionalItem function when increase quantity button is clicked', async () => {
    const setPromotionalItem = jest.fn()
    setup({
      setPromotionalItem,
      promotionalItem: {
        handleQuantityChange: true,
        handleRemoval: true,
        parentSku: '100000001'
      }
    })
    await userEvent.click(screen.getByTestId('increaseQuantityButton'))
    expect(setPromotionalItem).toHaveBeenCalledTimes(1)
  })

  describe('when remove button should be shown', () => {
    it('does not apply "hidden" class to the remove button', () => {
      setup({ showRemoveButton: undefined })
      expect(
        screen.getByRole('button', { name: 'basket.item-remove' })
      ).not.toHaveClass('hidden')
    })

    it('applies "hidden" class to the decrease button', () => {
      setup({ showRemoveButton: undefined })
      expect(
        screen.getByRole('button', { name: 'basket.decrease-quantity.label' })
      ).toHaveClass('hidden')
    })
  })
})
