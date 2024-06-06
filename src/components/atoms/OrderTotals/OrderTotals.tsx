import React, { ComponentPropsWithoutRef, FunctionComponent, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormatPrice } from '~domains/product'
import classNames from 'classnames'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { BasketCoupon } from '~domains/basket/types'
import { useSelector } from 'react-redux'
import {
  selectDefaultShippingAddressIsoCode,
  selectDefaultShippingAddressIsTaxExempt,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { useRouter } from 'next/router'
import { getIso2CodeFromLocale } from '~helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { Button } from '../Button'

export type OrderTotalsProps = ComponentPropsWithoutRef<'div'> & {
  numberOfItems: number
  currency?: string
  subTotalPrice: number
  discounts?: {
    displayName: string
    amount: number
  }[]
  totalProducts?: number
  shipping?: number
  grandTotal: number
  itemTotal?: number
  surchargeTotal?: number
  rewardTotal?: number
  amountPaidByRealPayment?: number
  atidaCashUsed?: number
  rrpDiscountTotal?: number
  basketDiscounts?: number
  welcomeAtidaCashDiscount?: number
  priceToPay?: string
  couponDiscounts?: number
  coupons?: BasketCoupon[]
  basketLink?: boolean
  paymentOrdered?: boolean
  isPaymentStepActive?: boolean
  grandTotalText: string
  isLoggedInWithAddress?: boolean
  checkoutDataWasSuccess?: boolean
  isDeliveryStepActive?: boolean
  handlePaymentProceed?: () => void
  isToPaymentButtonDisabled?: boolean
  isToPaymentEventNotClickable?: boolean
}

const OrderTotalsComponent: FunctionComponent<OrderTotalsProps> = ({
  numberOfItems,
  currency,
  subTotalPrice,
  discounts = [],
  totalProducts,
  shipping,
  grandTotal,
  itemTotal,
  basketDiscounts,
  className,
  priceToPay,
  couponDiscounts,
  coupons,
  basketLink,
  paymentOrdered,
  surchargeTotal,
  rewardTotal,
  amountPaidByRealPayment,
  rrpDiscountTotal,
  isPaymentStepActive,
  atidaCashUsed,
  grandTotalText,
  welcomeAtidaCashDiscount,
  isLoggedInWithAddress,
  checkoutDataWasSuccess,
  isDeliveryStepActive,
  handlePaymentProceed,
  isToPaymentButtonDisabled,
  isToPaymentEventNotClickable,
  ...props
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const formatPrice = useFormatPrice()
  const isTaxExempt = useSelector(selectDefaultShippingAddressIsTaxExempt)
  const isoCode = useSelector(selectDefaultShippingAddressIsoCode)

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isDeliveryStickyCTAEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_DELIVERY_STICKY_CTA_BUTTON
  )

  const rewardTotalFormated = formatPrice(rewardTotal, currency).asOne
  const amountPaidByRealPaymentFormatted = formatPrice(
    amountPaidByRealPayment,
    currency
  ).asOne
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <div
      data-testid="orderTotals"
      {...props}
      className={classNames('bg-secondary-champagne-pink pb-1', className)}
    >
      <ul>
        <div className="border-b border-primary-oxford-blue-20">
          {!!rrpDiscountTotal && (
            <li className="flex justify-between my-1" data-testid="rrp">
              <div data-testid="basket-link-holder">
                <span className="mr-1.75">
                  {t('basket.rrp-discount-total')}
                </span>
              </div>
              <span className="text-feedback-success text-base font-semibold">
                - {formatPrice(rrpDiscountTotal, currency).asOne}
              </span>
            </li>
          )}
          {(basketDiscounts ?? 0) > 0 && (
            <li className="flex justify-between my-1" data-testid="rrpDiscount">
              <p>{t('basket.discount')}</p>
              <span className="text-feedback-success text-base font-semibold">
                - {formatPrice(basketDiscounts, currency).asOne}
              </span>
            </li>
          )}
          {isLoggedIn && !!welcomeAtidaCashDiscount && (
            <li className="flex justify-between my-1" data-testid="rrpDiscount">
              <p>{t('basket.loyalty-welcome-atida-cash')}</p>
              <span className="text-feedback-success text-base font-semibold">
                - {formatPrice(welcomeAtidaCashDiscount, currency).asOne}
              </span>
            </li>
          )}
        </div>
        {coupons?.length
          ? coupons?.map(coupon => {
              return (
                <li data-testid="coupon" className="flex justify-between my-1">
                  <p>
                    {t('basket.coupon-code')} {t(`(${coupon.code})`)}
                  </p>
                  <span className="text-feedback-success text-base font-semibold">
                    - {formatPrice(coupon.amount, currency).asOne}
                  </span>
                </li>
              )
            })
          : null}

        {discounts &&
          discounts?.length > 0 &&
          discounts?.map(item => (
            <li
              key={item.displayName}
              className="flex justify-between my-1"
              data-testid="discount"
            >
              <span>{item.displayName}</span>
              <span className="text-secondary-portland-orange font-semibold">
                - {formatPrice(item.amount, currency).asOne}
              </span>
            </li>
          ))}
        {totalProducts && (
          <li
            className="flex justify-between my-1 font-semibold"
            data-testid="total-products"
          >
            <span>{t('basket.total-products')}</span>
            <span>{formatPrice(itemTotal, currency).asOne}</span>
          </li>
        )}

        <li className="flex justify-between" data-testid="shipping">
          <span>{t('basket.shipping')}</span>
          {!!shipping ? (
            <span>{formatPrice(shipping, currency).asOne}</span>
          ) : (
            <span className="text-feedback-success text-base font-semibold">
              {t('shared.free')}
            </span>
          )}
        </li>

        {!!atidaCashUsed && (
          <li className="flex justify-between my-1" data-testid="atidaCashUsed">
            <span>{t('checkout.order-summary.atida-cash-used')}</span>
            <span className="text-feedback-success text-base font-semibold">
              -{formatPrice(atidaCashUsed, currency).asOne}
            </span>
          </li>
        )}

        {!!surchargeTotal && !isTaxExempt && (
          <li
            className="flex justify-between my-1"
            data-testid="surcharge-total"
          >
            <span>{t('basket.surcharge-total')}</span>
            <span>+{formatPrice(surchargeTotal, currency).asOne}</span>
          </li>
        )}
        <li
          className={classNames(
            'flex justify-between font-semibold text-lg border-t border-primary-oxford-blue pt-2 mt-2'
          )}
          data-testid="total"
        >
          <span>{t(grandTotalText)}</span>
          <span>
            {amountPaidByRealPayment
              ? priceCurrencyFormatter(
                  amountPaidByRealPaymentFormatted,
                  currency
                )
              : priceCurrencyFormatter(priceToPay, currency)}
          </span>
        </li>
        <li
          className={classNames(
            'text-primary-oxford-blue text-sm opacity-60 my-2',
            {
              'pb-9':
                isPaymentStepActive &&
                (isTaxExempt === false ||
                  (isTaxExempt && isoCode === getIso2CodeFromLocale(locale))),
              'pb-7':
                isPaymentStepActive &&
                !(
                  isTaxExempt === false ||
                  (isTaxExempt && isoCode === getIso2CodeFromLocale(locale))
                )
            }
          )}
        >
          <span data-testid="tax-text">
            {isTaxExempt &&
              isoCode === getIso2CodeFromLocale(locale) &&
              t('order.excluding-taxes')}
            {isTaxExempt === false && t('order.including-taxes')}
          </span>
        </li>

        {isDeliveryStickyCTAEnabled && isDeliveryStepActive && (
          <Button
            variant="secondary"
            aria-label={t('checkout.cta-button-text')}
            data-testid="toPaymentButton"
            className={classNames('w-full px-7 mb-1', {
              'pointer-events-none': isToPaymentEventNotClickable
            })}
            disabled={isToPaymentButtonDisabled}
            onClick={handlePaymentProceed}
          >
            {t('checkout.cta-button-text')}
          </Button>
        )}
        {isLoyaltyAtidaCashEnabled && isLoggedIn && !!rewardTotal && (
          <li
            className="flex justify-between text-sm mt-2 mb-2 border-t pt-3 border-primary-oxford-blue-20"
            data-testid="reward-total"
          >
            <span>{t('order.atida-cash-reward')}</span>
            <span>{priceCurrencyFormatter(rewardTotalFormated, currency)}</span>
          </li>
        )}
      </ul>
    </div>
  )
}

// Memoize the component to save some unnecessary re-renders and
// fix totals being set to 0 visually when paying during the checkout process
export const OrderTotals = memo(
  OrderTotalsComponent,
  (prevProps, nextProps) => {
    const {
      numberOfItems,
      subTotalPrice,
      totalProducts,
      shipping,
      grandTotal,
      priceToPay,
      surchargeTotal,
      rrpDiscountTotal,
      isPaymentStepActive,
      atidaCashUsed,
      amountPaidByRealPayment,
      welcomeAtidaCashDiscount,
      isToPaymentButtonDisabled,
      isDeliveryStepActive,
      isToPaymentEventNotClickable,
      checkoutDataWasSuccess
    } = nextProps

    const priceToPayNum = !!priceToPay ? parseInt(priceToPay) : 0

    const hasClearedBasket =
      numberOfItems === 0 && grandTotal === 0 && priceToPayNum === 0

    // DO NOT re-render if:
    // - the basket has been cleared by Spryker, meaning the number of items,
    //   the grand total and the price to pay are 0
    // - the props haven't changed
    if (
      hasClearedBasket ||
      (prevProps.numberOfItems === numberOfItems &&
        prevProps.subTotalPrice === subTotalPrice &&
        prevProps.totalProducts === totalProducts &&
        prevProps.shipping === shipping &&
        prevProps.grandTotal === grandTotal &&
        prevProps.priceToPay === priceToPay &&
        prevProps.surchargeTotal === surchargeTotal &&
        prevProps.rrpDiscountTotal === rrpDiscountTotal &&
        prevProps.isPaymentStepActive === isPaymentStepActive &&
        prevProps.atidaCashUsed === atidaCashUsed &&
        prevProps.amountPaidByRealPayment === amountPaidByRealPayment &&
        prevProps.welcomeAtidaCashDiscount === welcomeAtidaCashDiscount &&
        prevProps.isToPaymentButtonDisabled === isToPaymentButtonDisabled &&
        prevProps.isDeliveryStepActive === isDeliveryStepActive &&
        prevProps.isToPaymentEventNotClickable ===
          isToPaymentEventNotClickable &&
        prevProps.checkoutDataWasSuccess === checkoutDataWasSuccess)
    ) {
      return true
    }

    return false
  }
)
