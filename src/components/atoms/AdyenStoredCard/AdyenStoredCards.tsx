import {
  BaseSyntheticEvent,
  ComponentPropsWithRef,
  FunctionComponent,
  RefObject
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { ReactComponent as Visa } from '~assets/svg/payment-providers/Visa.svg'
import { ReactComponent as Mastercard } from '~assets/svg/payment-providers/Mastercard.svg'
import { ReactComponent as NavDelete } from '~assets/svg/navigation-24px/NavDelete.svg'
import { StoredPaymentMethod } from '~domains/checkout/types'
import { ReactComponent as PlusLarge } from '~assets/svg/navigation-24px/PlusLarge.svg'
import { MOBILE_ADD_NEW_CARD_BUTTON_HEIGHT } from '~config/constants/adyen-stored-cards-add-new-card-button-height'

export type AdyenStoredCardsProps = ComponentPropsWithRef<'div'> & {
  isCardEditActive: boolean
  isClickable: boolean
  storedCardIndex?: number
  isRadioInputAnimation: boolean
  isDeleteIconAnimation: boolean
  isFirstRender: boolean
  isStoredCardsContainerFullOpacity: boolean
  storedCardsListHeight: number
  isSmallScreen?: boolean
  storedPaymentMethods?: StoredPaymentMethod[]
  isStoredCardsListVisible: boolean
  isSwitchingFormsDisabled?: boolean
  isActionRequired: boolean
  isAtidaCashAdding: boolean
  storedCardsComponentRef: RefObject<HTMLDivElement>
  handleStoredCardClick: (index: number) => void
  handleStoredCardBlur: (
    event: BaseSyntheticEvent & { relatedTarget: { id: string } | null }
  ) => void
  handleAddNewCard: () => void
}

export const AdyenStoredCards: FunctionComponent<AdyenStoredCardsProps> = ({
  isCardEditActive,
  isClickable,
  storedCardIndex,
  isRadioInputAnimation,
  isDeleteIconAnimation,
  isFirstRender,
  isStoredCardsContainerFullOpacity,
  storedCardsListHeight,
  isSmallScreen,
  storedPaymentMethods,
  isStoredCardsListVisible,
  isSwitchingFormsDisabled,
  isActionRequired,
  storedCardsComponentRef,
  isAtidaCashAdding,
  handleStoredCardClick,
  handleStoredCardBlur,
  handleAddNewCard
}) => {
  const { t } = useTranslation()

  const isRadioInputInnerSpanFullOpacity =
    !isCardEditActive && isRadioInputAnimation

  const isDeleteIconFullOpacity = isDeleteIconAnimation && isCardEditActive
  const adyenNewCardFormHeight =
    document.getElementById('adyen-scheme-container')?.offsetHeight ?? 0

  return (
    <div
      ref={storedCardsComponentRef}
      data-testid="adyen-stored-cards-container"
      {...(isStoredCardsContainerFullOpacity && {
        style: {
          maxHeight:
            storedCardsListHeight +
            (isSmallScreen ? 88 : MOBILE_ADD_NEW_CARD_BUTTON_HEIGHT)
        }
      })}
      className={classNames('sm:px-3 transition-all duration-500', {
        'opacity-100': isStoredCardsContainerFullOpacity,
        hidden: isAtidaCashAdding,
        'min-h-17 sm:min-h-22.5':
          isStoredCardsContainerFullOpacity &&
          storedPaymentMethods?.length === 1,
        'min-h-27 sm:min-h-34.25':
          isStoredCardsContainerFullOpacity &&
          storedPaymentMethods?.length === 2,
        'min-h-37':
          !isSmallScreen &&
          isStoredCardsContainerFullOpacity &&
          storedPaymentMethods?.length === 3,
        //max height is set for smoother animation as this is the height of the whole new card form coming from adyen - the error fields are also calculated inside
        //when there are two lines of errors the height of the form is 312, we are checking for height to be bigger than 311 just to have 1px margin
        'opacity-0': !isStoredCardsContainerFullOpacity && !isFirstRender,
        'min-h-32 max-h-[256px]':
          !isStoredCardsContainerFullOpacity &&
          !isFirstRender &&
          adyenNewCardFormHeight < 257,
        'min-h-35.5 max-h-[284px]':
          !isStoredCardsContainerFullOpacity &&
          !isFirstRender &&
          adyenNewCardFormHeight >= 257 &&
          adyenNewCardFormHeight <= 311,
        'min-h-39 max-h-[312px]':
          !isStoredCardsContainerFullOpacity &&
          !isFirstRender &&
          adyenNewCardFormHeight > 311
      })}
    >
      {storedPaymentMethods?.map(
        (method: StoredPaymentMethod, index: number) => (
          <div key={index} className="relative">
            <button
              data-testid={`adyen-stored-card-${index}`}
              id={`stored-adyen-card-${index}`}
              className={classNames(
                'text-left pl-2 block w-full leading-10 border-b sm:border-x border-ui-grey-light flex items-center h-10 sm:h-11.75',
                {
                  'pointer-events-none':
                    !isClickable || isSwitchingFormsDisabled
                }
              )}
              onClick={() => handleStoredCardClick(index)}
              onBlur={handleStoredCardBlur}
            >
              {!isCardEditActive || isRadioInputAnimation ? (
                <>
                  <input
                    type="radio"
                    checked={storedCardIndex === index}
                    readOnly
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <span
                    data-testid="adyen-card-input"
                    className={classNames(
                      'flex grow-0 shrink-0 items-center justify-center w-3 h-3 mr-1 md:mx-1 border rounded-full transition duration-500',
                      {
                        'border-ui-grey-light': !(storedCardIndex === index),
                        'border-ui-grey-dark-check-box':
                          storedCardIndex === index,
                        'bg-primary-white': storedCardIndex === index,
                        'bg-ui-grey-neutral': !(storedCardIndex === index),
                        'opacity-100': isRadioInputInnerSpanFullOpacity,
                        'opacity-0':
                          !isRadioInputInnerSpanFullOpacity && !isFirstRender
                      }
                    )}
                  >
                    {storedCardIndex === index && (
                      <span className="block w-1.5 h-1.5 bg-primary-oxford-blue rounded-full" />
                    )}
                  </span>
                </>
              ) : (
                <span className="w-4 md:w-5"></span>
              )}
              <div
                className={classNames(
                  'flex items-center transform duration-500',
                  {
                    '-translate-x-4': isCardEditActive,
                    'translate-x-0': !isCardEditActive
                  }
                )}
              >
                {method.brand === 'visa' ? (
                  <Visa className="w-3 h-3 md:w-5 md:h-5" />
                ) : (
                  <Mastercard className="w-3 h-3 md:w-5 md:h-5" />
                )}
                <span className="ml-2.5 md:ml-2">
                  <span className="block translate-y-1.5">
                    {method.brand === 'visa'
                      ? t('checkout.payment-method.adyen-visa')
                      : t('checkout.payment-method.adyen-mastercard')}
                  </span>
                  <span className="block -translate-y-1">
                    •••• •••• •••• {method.lastFour}
                  </span>
                </span>
              </div>
            </button>
            {(isCardEditActive || isDeleteIconAnimation) && (
              <button
                data-testid="adyen-stored-card-1-remove-button"
                className={classNames(
                  'absolute top-1.75 sm:top-2.75 right-2.5 sm:right-2 p-1.5 rounded sm:hover:bg-ui-grey-lightest transition duration-500',
                  {
                    'opacity-100': isDeleteIconFullOpacity,
                    'opacity-0': !isDeleteIconFullOpacity
                  }
                )}
                //Handle the remove stored card feature with onClick
              >
                <NavDelete className="icon-24" />
              </button>
            )}
          </div>
        )
      )}
      <div
        {...(!isSmallScreen &&
          !isFirstRender &&
          !isStoredCardsContainerFullOpacity &&
          !isActionRequired && {
            style: {
              transform: `translateY(-${storedCardsListHeight}px)`
            }
          })}
        className="sm:pt-2.25 sm:pb-2.75 transition duration-500"
      >
        <button
          data-testid="adyen-stored-card-add-new-card"
          className={classNames(
            'flex w-full justify-center pt-2 pb-1.75 sm:py-1.25 sm:rounded sm:hover:bg-ui-grey-lightest sm:duration-300',
            {
              'hover:bg-ui-grey-lightest duration-300': isStoredCardsListVisible,
              'duration-100': !isStoredCardsListVisible,
              // This is to prevent the user from switching back to the new card form while atida cash is being added
              'pointer-events-none': isSwitchingFormsDisabled
            }
          )}
          onClick={handleAddNewCard}
        >
          <PlusLarge className="icon-16 mt-0.5" />
          <span className="mt-0.25 ml-1">
            {t('checkout.payment.adyen-add-new-card')}
          </span>
        </button>
      </div>
    </div>
  )
}
