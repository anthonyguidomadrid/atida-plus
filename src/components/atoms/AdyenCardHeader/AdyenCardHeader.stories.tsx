import { AdyenCardHeader, AdyenCardHeaderProps } from '.'

export default {
  component: AdyenCardHeader,
  title: 'atoms/AdyenCardHeader',
  argTypes: {
    handleStoredCardHeaderButtonClick: {
      action: 'handleStoredCardHeaderButtonClick'
    }
  },
  args: {
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
    isFirstRender: false
  }
}

export const Basic = (args: AdyenCardHeaderProps): JSX.Element => (
  <AdyenCardHeader {...args} />
)
