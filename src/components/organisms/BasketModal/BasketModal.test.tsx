import { screen } from '@testing-library/react'
import { BasketModal, BasketModalProps } from '.'
import { renderWithStore } from '~test-helpers'

describe(BasketModal, () => {
  const defaultProps = {
    product: null,
    productSku: '12312312312',
    productQuantity: 2,
    isBasketModalOpen: false
  }

  const setup = (props: Partial<BasketModalProps> = {}) =>
    renderWithStore(<BasketModal {...defaultProps} {...props} />)
  // const setup = () => renderWithStore(<BasketModal />)

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('basketModal')).toBeInTheDocument()
  })
  // Basket modal actions
  it('render component', () => {
    setup({ isBasketModalOpen: true })
    expect(screen.getByTestId('basketProductModalActions')).toBeInTheDocument()
  })
  // BasketModal layout
  it('renders component', () => {
    setup({ isBasketModalOpen: true })
    expect(screen.getByTestId('basketModalLayout')).toBeInTheDocument()
  })

  it('renders colourful component', () => {
    setup({ isBasketModalOpen: true })
    expect(screen.getByTestId('basketModalLayout').children[0]).toHaveAttribute(
      'style',
      'background-color: rgba(26, 29, 50, 0.2);'
    )
  })

  it('renders a different text in the success notification if a promotional item is added', () => {
    setup({
      isBasketModalOpen: true,
      hasPromotionalItem: true
    })
    expect(screen.getByTestId('basketModalNotification')).toHaveTextContent(
      'basket.modal-product-gift-added'
    )
  })

  it('renders a different text in the removal notification if a promotional item is added', () => {
    setup({
      isBasketModalOpen: true,
      isRemoved: true,
      hasPromotionalItem: true
    })
    expect(screen.getByTestId('basketModalNotification')).toHaveTextContent(
      'basket.modal-product-gift-removed'
    )
  })

  it('renders the availability warning if the promotional item is out of stock', () => {
    setup({ isBasketModalOpen: true, isPromotionalItemOutofStock: true })
    expect(screen.getByTestId('availabilityWarningBlock')).toBeInTheDocument()
  })
})
