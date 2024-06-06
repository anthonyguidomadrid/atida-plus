import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  LegacyRef,
  RefObject,
  useCallback,
  useEffect,
  useState
} from 'react'
import classNames from 'classnames'
import { AccordionPanel } from '~components/atoms/AccordionPanel'
import { RedeemCouponForm } from '~components/organisms/RedeemCouponForm'
import { useTranslation } from 'react-i18next'
import { OrderTotals } from '~components/atoms/OrderTotals'
import { BasketCoupon, BasketItem } from '~domains/basket/types'
import { useFormatPrice, Product } from '~domains/product'
import { Button } from '~components/atoms/Button'
import { Coupons } from '~components/molecules/Coupons'
import { useDispatch, useSelector } from 'react-redux'
import { removeCouponTrigger, resetCoupon } from '~domains/basket'
import { triggerReportCouponRemoval } from '~domains/analytics'
import { isFeatureEnabled } from '~helpers/is-feature-enabled'
import { clearLoginMessages } from '~domains/account'
import { USP } from '~components/atoms/USP/USP'
import { selectFooter } from '~domains/page'
import { mapIconReferenceToIconComponent } from '~domains/contentful'

export type BasketSummaryProps = ComponentPropsWithoutRef<'div'> & {
  numberOfItems: number
  currency?: string
  subTotalPrice: number
  itemTotal?: number
  discounts?: {
    displayName: string
    amount: number
  }[]
  totalProducts: number
  shipping?: number
  grandTotal: number
  rrpDiscountTotal?: number
  surchargeTotal?: number
  rewardTotal?: number
  basketDiscounts?: number
  couponDiscounts?: number
  welcomeAtidaCashDiscount?: number
  basketCouponData?: BasketCoupon[]
  cartCoupons?: BasketCoupon[]
  unavailableProducts?:
    | (BasketItem & {
        product: Omit<Partial<Product>, 'sku' | 'price'>
      })[]
    | undefined
  onOrderClick: () => void
  isLoading: boolean
  usedCoupon?: string
  hasPromotionalItemOutOfStock?: boolean
  couponAccordionRef?: LegacyRef<HTMLDetailsElement> | undefined
  payButtonRef?: RefObject<HTMLDivElement>
  hasOnlyPrescriptionItems?: boolean
  priceChannel?: string
}

export const BasketSummary: FunctionComponent<BasketSummaryProps> = ({
  numberOfItems,
  currency,
  subTotalPrice,
  discounts = [],
  totalProducts,
  shipping,
  grandTotal,
  itemTotal,
  rewardTotal,
  className,
  basketDiscounts,
  basketCouponData,
  couponDiscounts,
  cartCoupons,
  unavailableProducts,
  onOrderClick,
  isLoading,
  usedCoupon,
  surchargeTotal,
  hasPromotionalItemOutOfStock,
  rrpDiscountTotal,
  couponAccordionRef,
  payButtonRef,
  welcomeAtidaCashDiscount,
  hasOnlyPrescriptionItems,
  priceChannel,
  ...props
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const priceToPay = formatPrice(grandTotal, currency)
  const dispatch = useDispatch()
  const multipleVouchersFlag = isFeatureEnabled('FEATURE_MULTIPLE_VOUCHERS')
  const [isOpen, setIsOpen] = useState(false)
  const footer = useSelector(selectFooter)
  const icons = footer?.providerBlocks?.[0]?.icons

  const onCouponRemove = useCallback(
    (coupon: BasketCoupon) => {
      dispatch(removeCouponTrigger(coupon.code ?? ''))
      dispatch(
        triggerReportCouponRemoval({
          discount: coupon.amount,
          couponName: coupon.displayName,
          couponId: coupon.code
        })
      )
      dispatch(clearLoginMessages())
      dispatch(resetCoupon())
    },
    [dispatch]
  )

  const couponData = !!cartCoupons?.length
    ? cartCoupons
    : basketCouponData ?? []

  useEffect(() => {
    if (usedCoupon || couponData.length > 0) setIsOpen(true)
  }, [couponData.length, usedCoupon])

  return (
    <div
      className={classNames(
        'bg-secondary-champagne-pink px-2 py-2 sm:p-3 md:px-2 md:py-2 flex flex-col flex-wrap sm:flex-row md:flex-col items-start',
        className
      )}
      data-testid="basketSummary"
      {...props}
    >
      <div className="flex-1 w-full">
        <h2 className="font-body text-lg mb-2.5">{t('order.your-order')}</h2>
        <OrderTotals
          priceToPay={priceToPay.asOne}
          basketDiscounts={basketDiscounts}
          welcomeAtidaCashDiscount={welcomeAtidaCashDiscount}
          numberOfItems={numberOfItems}
          currency={currency}
          subTotalPrice={subTotalPrice}
          surchargeTotal={surchargeTotal}
          discounts={discounts}
          totalProducts={totalProducts}
          shipping={shipping}
          grandTotal={grandTotal}
          itemTotal={itemTotal}
          coupons={basketCouponData}
          couponDiscounts={couponDiscounts}
          rrpDiscountTotal={rrpDiscountTotal}
          rewardTotal={rewardTotal}
          grandTotalText="basket.total"
        />
        <Button
          disabled={unavailableProducts && unavailableProducts.length > 0}
          type="button"
          variant="secondary"
          data-testid="basketSummaryOrderButton"
          aria-label={t('basket.order')}
          className="w-full"
          onClick={onOrderClick}
          isLoading={isLoading}
        >
          {t('basket.order')}
        </Button>
      </div>

      <div className="flex-1 w-full sm:flex md:block sm:ml-3 md:ml-0 sm:flex-col-reverse">
        {!priceChannel && (
          <AccordionPanel
            isBadge={true}
            open={isOpen}
            badge={couponData?.length}
            data-testid="dropdownWithContent"
            heading={t('coupon.redeem-coupon-code')}
            className="bg-primary-white p-2 mt-2 sm:mt-3 md:mt-2"
            couponAccordionRef={couponAccordionRef}
            isUsedForCoupon={true}
          >
            {multipleVouchersFlag ? (
              <RedeemCouponForm couponData={couponData} />
            ) : (
              couponData?.length === 0 && (
                <RedeemCouponForm
                  couponData={couponData}
                  usedCoupon={usedCoupon}
                  payButtonRef={payButtonRef}
                  hasPromotionalItemOutOfStock={hasPromotionalItemOutOfStock}
                  hasOnlyPrescriptionItems={hasOnlyPrescriptionItems}
                />
              )
            )}
            {couponData?.length > 0 && (
              <Coupons
                onCouponRemove={coupon => onCouponRemove(coupon)}
                basketCouponData={couponData}
              />
            )}
          </AccordionPanel>
        )}
        <div data-testid="usps" className="mt-3 sm:mt-0 md:mt-3">
          <USP hideBorder />
          <div
            className="flex items-center justify-left pt-3 pb-0"
            data-testid="basketAvailablePaymentMethods"
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
        </div>
      </div>
    </div>
  )
}
