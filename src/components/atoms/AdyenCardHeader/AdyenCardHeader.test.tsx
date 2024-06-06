import { AdyenCardHeader, AdyenCardHeaderProps } from './AdyenCardHeader'
import { render, screen } from '@testing-library/react'

const handleStoredCardHeaderButtonClick = jest.fn()

const defaultProps = {
  isNewCardFormVisible: false,
  isStoredCardsListVisible: true,
  isCardEditActive: false,
  isRadioInputAnimation: true,
  isDeleteIconAnimation: false,
  isNewCardFormAnimation: false,
  isStoredCardsListAnimation: true,
  isSavedPaymentOptionsTextFullOpacity: true,
  isAddANewCardTextFullOpacity: false,
  isSwitchingFormsDisabled: false,
  isFirstRender: false,
  handleStoredCardHeaderButtonClick
}

describe(AdyenCardHeader, () => {
  const setup = (props: Partial<AdyenCardHeaderProps> = {}) =>
    render(<AdyenCardHeader {...defaultProps} {...props} />)

  it('renders the component', () => {
    setup()
    expect(screen.getByTestId('adyen-card-header')).toBeInTheDocument()
  })

  it('does not render the adyen-card-header-saved-payment-options when isStoredCardsListAnimation is false and isStoredCardsListVisible is true', () => {
    setup({
      isStoredCardsListAnimation: false,
      isStoredCardsListVisible: false
    })
    expect(
      screen.queryByTestId('adyen-card-header-saved-payment-options')
    ).not.toBeInTheDocument()
  })

  it('sets the correct opacity to adyen-card-header-saved-payment-options when isSavedPaymentOptionsTextFullOpacity is false', () => {
    setup({
      isSavedPaymentOptionsTextFullOpacity: false
    })
    expect(
      screen.getByTestId('adyen-card-header-saved-payment-options')
    ).toHaveClass('opacity-0')
  })

  it('renders the correct span', () => {
    setup({ isNewCardFormVisible: true, isNewCardFormAnimation: true })
    expect(
      screen.getByTestId('adyen-card-header-add-a-new-card')
    ).toBeInTheDocument()
  })

  it('adds the correct classNames to adyen-card-header-edit', () => {
    setup({
      isCardEditActive: true
    })
    expect(screen.getByTestId('adyen-card-header-edit')).toHaveClass(
      'opacity-0'
    )
  })

  it('adds the correct classNames to adyen-card-header-cancel', () => {
    setup({
      isDeleteIconAnimation: true
    })
    expect(screen.getByTestId('adyen-card-header-cancel')).toHaveClass(
      'opacity-0'
    )
  })

  it('adds the correct classNames to adyen-card-header-button when it is prevented from clicking', () => {
    setup({
      isSwitchingFormsDisabled: true,
      isNewCardFormVisible: true
    })
    expect(screen.getByTestId('adyen-card-header-button')).toHaveClass(
      'pointer-events-none'
    )
  })
})
