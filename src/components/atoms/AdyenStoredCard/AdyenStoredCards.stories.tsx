import { AdyenStoredCards, AdyenStoredCardsProps } from '.'
import { adyenCardStoredPaymentMethod } from '~domains/checkout/__mocks__/create-adyen-payment'

export default {
  component: AdyenStoredCards,
  title: 'atoms/AdyenStoredCards',
  argTypes: {
    handleStoredCardClick: { action: 'handleStoredCardClick' },
    handleStoredCardBlur: { action: 'handleStoredCardBlur' },
    handleAddNewCard: { action: 'handleAddNewCard' }
  },
  args: {
    isCardEditActive: false,
    isClickable: false,
    storedCardIndex: 1,
    isRadioInputAnimation: false,
    isDeleteIconAnimation: false,
    isFirstRender: false,
    isStoredCardsContainerFullOpacity: true,
    storedCardsListHeight: 80,
    isSmallScreen: true,
    storedPaymentMethods: adyenCardStoredPaymentMethod,
    isStoredCardsListVisible: true,
    isSwitchingFormsDisabled: false,
    isActionRequired: false,
    storedCardsComponentRef: null,
    isAtidaCashAdding: false
  }
}

export const Basic = (args: AdyenStoredCardsProps): JSX.Element => (
  <AdyenStoredCards {...args} />
)
