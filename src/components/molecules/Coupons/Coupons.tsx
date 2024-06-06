import type { FunctionComponent } from 'react'
import { BasketCoupon } from '~domains/basket/types'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { useTranslation } from 'react-i18next'
import { Button } from '~components/atoms/Button'

export type CouponsProps = {
  basketCouponData?: BasketCoupon[]
  onCouponRemove: (coupon: {
    displayName?: string
    amount?: number
    code?: string
  }) => void
}

export const Coupons: FunctionComponent<CouponsProps> = ({
  basketCouponData,
  onCouponRemove
}) => {
  const { t } = useTranslation()

  return (
    <>
      {basketCouponData?.map(coupon => {
        return (
          <div
            key={coupon.code}
            data-testid="coupons"
            className="mt-3 py-1.5 px-2 bg-ui-carribean-green-lightest text-primary-oxford-blue"
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex justify-center items-center">
                <Checkmark
                  role="presentation"
                  className="text-ui-oxford-blue icon-24 mr-0.5"
                />
                <span
                  data-testid="coupon"
                  className="text-md pt-0.25 font-semibold block line-clamp-1 xs:max-w-24 sm:w-19 md:w-13 lg:w-30"
                >
                  {coupon.code}
                </span>
              </div>
              <Button
                data-testid="removeCouponButtonText"
                aria-label={t('basket.coupon-remove', { name })}
                variant="tertiary"
                className="border-none underline px-0"
                onClick={() => onCouponRemove(coupon)}
              >
                {t('basket.coupon.remove')}
              </Button>
            </div>
          </div>
        )
      })}
    </>
  )
}
