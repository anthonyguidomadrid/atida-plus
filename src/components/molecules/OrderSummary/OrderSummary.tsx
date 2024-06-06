import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useState,
  useEffect,
  RefObject
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { OrderTotals } from '~components/atoms/OrderTotals'
import { BasketCoupon, BasketItem } from '~domains/basket/types'
import { Product, useFormatPrice } from '~domains/product'
import { ReactComponent as ChevronUp } from '~assets/svg/navigation-16px/ChevronUp.svg'
import { ReactComponent as ChevronDown } from '~assets/svg/navigation-16px/ChevronDown.svg'
import { OrderSummaryProductList } from '~components/molecules/OrderSummaryProductList'
import { isFeatureEnabled } from '~helpers/is-feature-enabled'
import { OrderDetailsSingleItem } from '~domains/account'
import { mapIconReferenceToIconComponent } from '~domains/contentful'
import { useSelector } from 'react-redux'
import { selectFooter } from '~domains/page'
import type { Dropin as DropInInstance } from 'braintree-web-drop-in'
import { CheckoutPayNowButton } from '~components/atoms/CheckoutPayNowButton'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { Address } from '~domains/checkout/types'
import { Customer } from '~domains/account/types'
import { StickyMobileCTA } from '~components/atoms/StickyMobileCTA'

export type OrderSummaryProps = ComponentPropsWithoutRef<'div'> & {
  numberOfItems: number
  currency?: string
  subTotalPrice: number
  totalProducts?: number
  surchargeTotal?: number
  shipping?: number
  grandTotal: number
  itemTotal?: number
  rewardTotal?: number
  amountPaidByRealPayment?: number
  atidaCashUsed?: number
  rrpDiscountTotal?: number
  discountTotal?: number
  basketDiscounts?: number
  couponDiscounts?: number
  welcomeAtidaCashDiscount?: number
  basketCouponData?: BasketCoupon[]
  handleOpenOrderDetails?: () => void
  openOrderDetails?: boolean
  loadMore?: boolean
  handleLoadMore?: () => void
  items: ((BasketItem & OrderDetailsSingleItem) & {
    product: Omit<Partial<Product>, 'sku' | 'price'>
  })[]
  paymentOrdered?: boolean
  activeStep?: number
  guestStep?: number
  isPaymentStepActive?: boolean
  isDeliveryStepActive?: boolean
  preservedGrandTotalValue?: number
  preservedGrandTotalCurrency?: string
  braintreeDropInInstance?: DropInInstance | null
  braintreeShowButton?: boolean
  setIsLoading?: (isLoading: boolean) => void
  deliveryAddress?: Address
  billingAddress?: Address
  customerDetails?: Partial<Customer>
  createOrderWasError?: boolean
  createOrderIsLoading?: boolean
  wasAnyPaymentErrors?: boolean
  checkoutDataWasSuccess?: boolean
  isLoggedIn?: boolean
  customerReference?: string
  guestReference?: string
  payButtonRef?: RefObject<HTMLDivElement>
  isLoggedInWithAddress?: boolean
  handlePaymentProceed?: () => void
  isToPaymentButtonDisabled?: boolean
  isToPaymentEventNotClickable?: boolean
}

export const OrderSummary: FunctionComponent<OrderSummaryProps> = ({
  numberOfItems,
  currency,
  subTotalPrice,
  totalProducts,
  shipping,
  grandTotal,
  itemTotal,
  surchargeTotal,
  discountTotal,
  className,
  basketDiscounts,
  basketCouponData,
  checkoutDataWasSuccess,
  couponDiscounts,
  handleOpenOrderDetails,
  openOrderDetails,
  loadMore,
  handleLoadMore,
  items,
  paymentOrdered,
  rrpDiscountTotal,
  rewardTotal,
  amountPaidByRealPayment,
  activeStep,
  guestStep,
  isPaymentStepActive,
  isDeliveryStepActive,
  preservedGrandTotalValue,
  preservedGrandTotalCurrency,
  braintreeDropInInstance,
  braintreeShowButton,
  setIsLoading,
  atidaCashUsed,
  deliveryAddress,
  billingAddress,
  customerDetails,
  createOrderWasError,
  createOrderIsLoading,
  wasAnyPaymentErrors,
  welcomeAtidaCashDiscount,
  isLoggedIn,
  customerReference,
  guestReference,
  payButtonRef,
  isLoggedInWithAddress,
  handlePaymentProceed,
  isToPaymentButtonDisabled,
  isToPaymentEventNotClickable,
  ...props
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const priceToPay = formatPrice(grandTotal, currency)
  const showLoadMoreButton = !!isFeatureEnabled(
    'FEATURE_LOAD_MORE_BUTTON_ON_CHECKOUT'
  )
  const footer = useSelector(selectFooter)
  const icons = footer?.providerBlocks?.[0]?.icons
  const [preservedRewardTotal, setPreservedRewardTotal] = useState(0)

  const isAuthCart = isLoggedIn && activeStep === 0
  const isGuestCart = !isLoggedIn && (guestStep === 0 || guestStep === 1)

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isDeliveryStickyCTAEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_DELIVERY_STICKY_CTA_BUTTON
  )

  useEffect(() => {
    if (rewardTotal) {
      setPreservedRewardTotal(rewardTotal)
    }
  }, [rewardTotal])

  return (
    <div
      data-testid="orderSummary"
      className={classNames(
        'bg-secondary-champagne-pink',
        paymentOrdered && 'border border-ui-grey-lightest',
        className
      )}
      {...props}
    >
      <div
        data-testid="yourOrderDiv"
        className={classNames(
          'flex items-center justify-between py-2 px-2 lg:py-3',
          paymentOrdered && 'bg-primary-white focus:outline-none'
        )}
        {...(paymentOrdered && {
          onClick: () => {
            handleOpenOrderDetails?.()
            document.getElementById('expand-list-button')?.focus()
          },
          role: 'button',
          onKeyDown: undefined,
          tabIndex: 0
        })}
      >
        <div>
          <h2 className="font-body text-lg lg:text-xl">
            {t('order.your-order')}
          </h2>
          {paymentOrdered && (
            <p>{t('basket.products', { count: numberOfItems })}</p>
          )}
        </div>
        <div className="relative">
          <button
            id="expand-list-button"
            className="mr-3 text-base font-light focus:outline-none"
            {...(!paymentOrdered ? { onClick: handleOpenOrderDetails } : {})}
          >
            {openOrderDetails
              ? !paymentOrdered && t('checkout.close-order-details')
              : paymentOrdered
              ? formatPrice(grandTotal, currency).asOne
              : t('checkout.open-order-details')}
            <span className="absolute top-1.25 right-0 -translate-y-1/2 transform pl-1">
              {openOrderDetails ? (
                <ChevronUp className="icon-16" />
              ) : (
                <ChevronDown className="icon-16" />
              )}
            </span>
          </button>
        </div>
      </div>
      {openOrderDetails && (
        <OrderSummaryProductList
          data-testid="orderSummaryProductList"
          loadMore={loadMore}
          handleLoadMore={handleLoadMore}
          items={items}
          currency={currency}
          showLoadMoreButton={showLoadMoreButton}
          paymentOrdered={paymentOrdered}
        />
      )}
      <div className="px-3">
        {(!paymentOrdered || (paymentOrdered && openOrderDetails)) && (
          <OrderTotals
            coupons={basketCouponData}
            basketLink
            totalProducts={totalProducts}
            priceToPay={priceToPay.asOne}
            basketDiscounts={basketDiscounts}
            welcomeAtidaCashDiscount={welcomeAtidaCashDiscount}
            numberOfItems={numberOfItems}
            currency={currency}
            subTotalPrice={subTotalPrice}
            shipping={shipping}
            surchargeTotal={surchargeTotal}
            grandTotal={grandTotal}
            itemTotal={itemTotal}
            couponDiscounts={couponDiscounts}
            paymentOrdered={paymentOrdered}
            rrpDiscountTotal={rrpDiscountTotal}
            rewardTotal={rewardTotal}
            isPaymentStepActive={isPaymentStepActive}
            atidaCashUsed={atidaCashUsed}
            amountPaidByRealPayment={amountPaidByRealPayment}
            grandTotalText="checkout.payment-total"
            isLoggedInWithAddress={isLoggedInWithAddress}
            isDeliveryStepActive={isDeliveryStepActive}
            checkoutDataWasSuccess={checkoutDataWasSuccess}
            handlePaymentProceed={handlePaymentProceed}
            isToPaymentButtonDisabled={isToPaymentButtonDisabled}
            isToPaymentEventNotClickable={isToPaymentEventNotClickable}
          />
        )}
        {isDeliveryStickyCTAEnabled && isDeliveryStepActive && (
          <StickyMobileCTA
            handleSubmit={() => handlePaymentProceed && handlePaymentProceed()}
            isDisabled={isToPaymentButtonDisabled}
            isLoading={false}
            grandTotal={grandTotal}
            checkoutPageButtonText={t('checkout.cta-button-text')}
            isCheckoutPage
            payButtonRef={payButtonRef}
            currency={currency}
            isToPaymentEventNotClickable={isToPaymentEventNotClickable}
          />
        )}
        {isPaymentStepActive && setIsLoading && (
          <div className="h-0">
            <CheckoutPayNowButton
              className={`${
                isLoyaltyAtidaCashEnabled &&
                !!preservedRewardTotal &&
                isLoggedIn
                  ? '-top-16.5'
                  : '-top-10'
              }`}
              preservedGrandTotalValue={preservedGrandTotalValue}
              preservedGrandTotalCurrency={preservedGrandTotalCurrency}
              braintreeDropInInstance={braintreeDropInInstance}
              braintreeShowButton={braintreeShowButton}
              setIsLoading={setIsLoading}
              deliveryAddress={deliveryAddress}
              customerDetails={customerDetails}
              billingAddress={billingAddress}
              createOrderWasError={createOrderWasError}
              createOrderIsLoading={createOrderIsLoading}
              wasAnyPaymentErrors={wasAnyPaymentErrors}
              isLoggedIn={isLoggedIn}
              customerReference={customerReference}
              guestReference={guestReference}
              payButtonRef={payButtonRef}
            />
          </div>
        )}
      </div>
      {(isAuthCart || isGuestCart) && (
        <div
          className="flex items-center justify-left pb-2 pl-3"
          data-testid="availablePaymentMethods"
        >
          {icons?.map((icon, idx) => {
            const Icon = mapIconReferenceToIconComponent(icon)
            return (
              <Icon
                className="icon-48 rounded mr-1"
                key={idx}
                data-testid="usp-payment-method-icon"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
