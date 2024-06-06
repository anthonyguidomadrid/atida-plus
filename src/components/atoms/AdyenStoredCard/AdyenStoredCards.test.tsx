import { AdyenStoredCards, AdyenStoredCardsProps } from './AdyenStoredCards'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { adyenCardStoredPaymentMethod } from '~domains/checkout/__mocks__/create-adyen-payment'
import { createRef } from 'react'

const storedCardsComponentRef = createRef<HTMLDivElement>()
const handleStoredCardClick = jest.fn()
const handleStoredCardBlur = jest.fn()
const handleAddNewCard = jest.fn()

const defaultProps = {
  isCardEditActive: false,
  isClickable: true,
  storedCardIndex: 0,
  isRadioInputAnimation: true,
  isDeleteIconAnimation: false,
  isFirstRender: false,
  isStoredCardsContainerFullOpacity: true,
  storedCardsListHeight: 80,
  isSmallScreen: true,
  storedPaymentMethods: adyenCardStoredPaymentMethod,
  isStoredCardsListVisible: true,
  isSwitchingFormsDisabled: false,
  isActionRequired: false,
  storedCardsComponentRef,
  isAtidaCashAdding: false,
  handleStoredCardClick,
  handleStoredCardBlur,
  handleAddNewCard
}

describe(AdyenStoredCards, () => {
  const setup = (props: Partial<AdyenStoredCardsProps> = {}) =>
    render(<AdyenStoredCards {...defaultProps} {...props} />)

  it('renders the component', () => {
    setup()
    expect(screen.getByTestId('adyen-stored-card-0')).toBeInTheDocument()
  })

  it('renders a different icon if it is not visa', () => {
    setup({
      storedPaymentMethods: [
        { ...adyenCardStoredPaymentMethod[0], brand: 'mastercard' }
      ]
    })
    expect(screen.getByTestId('adyen-stored-card-0')).toBeInTheDocument()
  })

  it('does not render the radio button when isRadioInputAnimation is false and isCardEditActive is true', () => {
    setup({ isRadioInputAnimation: false, isCardEditActive: true })
    expect(screen.queryByTestId('adyen-card-input')).not.toBeInTheDocument()
  })

  it('fires onClick when the user clicks on the button', () => {
    setup()
    expect(handleStoredCardClick).not.toHaveBeenCalled()
    userEvent.click(screen.getByTestId('adyen-stored-card-0'))
    expect(handleStoredCardClick).toHaveBeenCalledTimes(1)
  })

  it('renders the remove icon', () => {
    setup({ isCardEditActive: true, isDeleteIconAnimation: true })
    expect(
      screen.getByTestId('adyen-stored-card-1-remove-button')
    ).toBeInTheDocument()
  })

  it('adds the correct style when isSmallScreen is false', () => {
    setup({ isSmallScreen: false })
    expect(screen.getByTestId('adyen-stored-cards-container')).toHaveStyle({
      maxHeight: '138px'
    })
  })

  it('does not add opacity-0 when isStoredCardsContainerFullOpacity is false', () => {
    setup({ isStoredCardsContainerFullOpacity: false })
    expect(screen.getByTestId('adyen-stored-card-0')).not.toHaveClass(
      'opacity-0'
    )
  })

  it('renders adyen-stored-card-add-new-card button when isStoredCardsContainerFullOpacity is false and isSmallScreen is false', () => {
    setup({ isStoredCardsContainerFullOpacity: false, isSmallScreen: false })
    expect(
      screen.getByTestId('adyen-stored-card-add-new-card')
    ).toBeInTheDocument()
  })
})
