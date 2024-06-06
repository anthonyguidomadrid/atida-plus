import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export type AdyenCardHeaderProps = ComponentPropsWithoutRef<'div'> & {
  isNewCardFormVisible: boolean
  isStoredCardsListVisible: boolean
  isCardEditActive: boolean
  isRadioInputAnimation: boolean
  isDeleteIconAnimation: boolean
  isNewCardFormAnimation: boolean
  isStoredCardsListAnimation: boolean
  isSavedPaymentOptionsTextFullOpacity: boolean
  isAddANewCardTextFullOpacity: boolean
  isSwitchingFormsDisabled?: boolean
  isFirstRender: boolean
  handleStoredCardHeaderButtonClick: () => void
}

export const AdyenCardHeader: FunctionComponent<AdyenCardHeaderProps> = ({
  isNewCardFormVisible,
  isStoredCardsListVisible,
  isCardEditActive,
  isRadioInputAnimation,
  isDeleteIconAnimation,
  isNewCardFormAnimation,
  isStoredCardsListAnimation,
  isSavedPaymentOptionsTextFullOpacity,
  isAddANewCardTextFullOpacity,
  isSwitchingFormsDisabled,
  isFirstRender,
  handleStoredCardHeaderButtonClick
}) => {
  const { t } = useTranslation()

  const isEditButtonFullOpacity =
    isStoredCardsListVisible &&
    isStoredCardsListAnimation &&
    !isCardEditActive &&
    isRadioInputAnimation

  const isCancelButtonFullOpacity =
    (isNewCardFormVisible && isNewCardFormAnimation) ||
    (isCardEditActive && isDeleteIconAnimation)

  return (
    <div
      className="relative flex justify-between pt-2 pb-1.75 sm:mx-3 px-3 sm:px-0 border-b border-ui-grey-light"
      data-testid="adyen-card-header"
    >
      {(isStoredCardsListVisible || isStoredCardsListAnimation) && (
        <span
          data-testid="adyen-card-header-saved-payment-options"
          className={classNames('transition duration-500', {
            'opacity-100': isSavedPaymentOptionsTextFullOpacity,
            'opacity-0': !isSavedPaymentOptionsTextFullOpacity && !isFirstRender
          })}
        >
          {t('checkout.payment.adyen-card-saved-payment-options')}
        </span>
      )}
      {(isNewCardFormVisible || isNewCardFormAnimation) && !isFirstRender && (
        <span
          data-testid="adyen-card-header-add-a-new-card"
          className={classNames(
            'absolute left-3 sm:left-0 transition duration-500',
            {
              'opacity-100': isAddANewCardTextFullOpacity,
              'opacity-0': !isAddANewCardTextFullOpacity
            }
          )}
        >
          {t('checkout.payment.adyen-add-a-new-card')}
        </span>
      )}
      <button
        data-testid="adyen-card-header-button"
        onClick={handleStoredCardHeaderButtonClick}
        className={classNames('font-semibold underline ml-auto', {
          // This is to prevent the user from switching back to the new card form while atida cash is being added
          'pointer-events-none':
            isSwitchingFormsDisabled && isNewCardFormVisible
        })}
      >
        {(isStoredCardsListVisible || isStoredCardsListAnimation) &&
          (!isCardEditActive || isRadioInputAnimation) && (
            <span
              data-testid="adyen-card-header-edit"
              className={classNames(
                'font-semibold underline absolute top-2 right-3 sm:right-0 transition duration-500',
                {
                  'opacity-100 z-10': isEditButtonFullOpacity,
                  'opacity-0': !isEditButtonFullOpacity && !isFirstRender
                }
              )}
            >
              {t('checkout.payment.adyen-card-edit')}
            </span>
          )}
        {(isNewCardFormVisible ||
          isNewCardFormAnimation ||
          isCardEditActive ||
          isDeleteIconAnimation) &&
          !isFirstRender && (
            <span
              data-testid="adyen-card-header-cancel"
              className={classNames(
                'font-semibold underline ml-auto transition duration-500',
                {
                  'opacity-100': isCancelButtonFullOpacity,
                  'opacity-0': !isCancelButtonFullOpacity
                }
              )}
            >
              {t('shared.cancel')}
            </span>
          )}
      </button>
    </div>
  )
}
