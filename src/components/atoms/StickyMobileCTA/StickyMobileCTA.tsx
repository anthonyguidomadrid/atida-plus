import { FunctionComponent, RefObject, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button } from '~components/atoms/Button'
import { useTranslation } from 'react-i18next'
import { useFormatPrice } from '~domains/product'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { useSelector } from 'react-redux'
import { selectTotals } from '~domains/basket'
import { selectAtidaCashUsed } from '~domains/checkout'
import { timeout } from '~helpers/timeout'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type StickyMobileCTAProps = {
  grandTotal: number
  currency?: string
  handleSubmit: () => void
  isLoading: boolean
  hasReachedFreeShipping?: boolean
  checkoutPageButtonText?: string
  isDisabled?: boolean
  isCheckoutPage?: boolean
  payButtonRef?: RefObject<HTMLDivElement>
  isToPaymentEventNotClickable?: boolean
}

export const StickyMobileCTA: FunctionComponent<StickyMobileCTAProps> = ({
  grandTotal,
  currency,
  handleSubmit,
  isLoading,
  hasReachedFreeShipping,
  checkoutPageButtonText,
  isDisabled = false,
  isCheckoutPage = false,
  payButtonRef,
  isToPaymentEventNotClickable
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const priceToPay = formatPrice(grandTotal, currency).asOne
  const { totalSaving } = useSelector(selectTotals)
  const atidaCashUsed = useSelector(selectAtidaCashUsed)
  const atidaCashUsedFormatted = formatPrice(atidaCashUsed, currency).asOne
  const [updatedPriceToPay, setUpdatedPriceToPay] = useState(priceToPay)
  const [isAnimationSlidingOut, setIsAnimationSlidingOut] = useState(false)
  const [isAtidaCashUsedDisplayable, setIsAtidaCashUsedDisplayable] = useState(
    false
  )

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  useEffect(() => {
    if (isCheckoutPage && isLoyaltyAtidaCashEnabled) {
      const updatePrice = async () => {
        if (priceToPay && updatedPriceToPay && priceToPay < updatedPriceToPay) {
          setIsAtidaCashUsedDisplayable(true)
          await timeout(1650)
        }
        setUpdatedPriceToPay(priceToPay)
        setIsAnimationSlidingOut(true)
      }
      setIsAnimationSlidingOut(false)
      updatePrice()
    }
  }, [isCheckoutPage, isLoyaltyAtidaCashEnabled, priceToPay, updatedPriceToPay])

  return (
    <div
      className={classNames(
        'fixed bg-primary-white z-10 bottom-0 w-full shadow-sm-reverse',
        {
          'left-0 grid grid-cols-12 grid-flow-row-dense sm:container md:hidden': isCheckoutPage,
          'sm:hidden': !isCheckoutPage
        }
      )}
      data-testid="stickyMobileCTA"
      ref={payButtonRef}
    >
      <div
        className={classNames('flex justify-between font-semibold', {
          'm-2 text-lg': !isCheckoutPage,
          'px-3 sm:px-0 col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 mt-2 mb-1.5': isCheckoutPage
        })}
        data-testid="total"
      >
        <div>
          <span>{t('basket.total')}</span>
          {hasReachedFreeShipping && (
            <span className="bg-ui-carribean-green-lightest text-labels-campaign-green text-sm ml-1 p-0.5">
              {t('basket.sticky-cta.free-delivery')}
            </span>
          )}
        </div>
        <span className="flex">
          {isCheckoutPage &&
            isLoyaltyAtidaCashEnabled &&
            isAtidaCashUsedDisplayable &&
            !!atidaCashUsed && (
              <span className="mr-1 animate-slide-in-2000 text-base font-semibold">
                {isAnimationSlidingOut
                  ? priceCurrencyFormatter(updatedPriceToPay, currency)
                  : `-${atidaCashUsedFormatted}`}
              </span>
            )}
          <span
            className={classNames({
              'animate-slide-out-2000':
                atidaCashUsed &&
                isCheckoutPage &&
                isLoyaltyAtidaCashEnabled &&
                isAtidaCashUsedDisplayable
            })}
          >
            {priceCurrencyFormatter(
              isCheckoutPage && isLoyaltyAtidaCashEnabled && updatedPriceToPay
                ? updatedPriceToPay
                : priceToPay,
              currency
            )}
          </span>
        </span>
      </div>
      {!isCheckoutPage && totalSaving > 50 && (
        <ul>
          <li
            className="flex justify-between my-1 px-2 text-feedback-success text-base"
            data-testid="basketSavings"
          >
            <div data-testid="basket-link-holder">
              <span className="mr-1.75">
                {t('basket.sticky-cta.total-saving')}
              </span>
            </div>
            <span>-{formatPrice(totalSaving, currency).asOne}</span>
          </li>
        </ul>
      )}
      <div
        className={classNames({
          'm-2': !isCheckoutPage,
          'px-3 sm:px-0 col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 mb-2': isCheckoutPage
        })}
      >
        <Button
          data-testid="stickyMobileCTABtn"
          disabled={isDisabled}
          {...(isCheckoutPage && { id: 'unique-sticky-pay-now-button' })}
          type="button"
          variant="secondary"
          aria-label={t('basket.order')}
          className={classNames('w-full', {
            'h-6': isCheckoutPage,
            'pointer-events-none': isToPaymentEventNotClickable
          })}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          {isCheckoutPage ? checkoutPageButtonText : t('basket.order')}
        </Button>
      </div>
    </div>
  )
}
