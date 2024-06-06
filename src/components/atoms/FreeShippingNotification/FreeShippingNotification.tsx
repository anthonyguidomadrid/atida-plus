import {
  FunctionComponent,
  FunctionComponentElement,
  SVGAttributes
} from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type FreeShippingNotificationProps = {
  hasReachedFreeShipping: boolean
  isDiscountedItem?: boolean
  className?: string
  icon?: FunctionComponentElement<SVGAttributes<'svg'>>
}

export const FreeShippingNotification: FunctionComponent<FreeShippingNotificationProps> = ({
  hasReachedFreeShipping,
  isDiscountedItem,
  className,
  icon
}) => {
  const { t } = useTranslation()
  const getFreeShippingNotificationMessage = () => {
    if (hasReachedFreeShipping) return t(`basket.free-shipping.reached`)
    if (isDiscountedItem) return t('basket.third-rank.add-product')
    return t(`basket.free-shipping.progress`)
  }

  return (
    <div
      className={classNames(
        'flex md:bg-ui-carribean-green-lightest p-2 items-center',
        className
      )}
      data-testid="freeShippingNotification"
    >
      {icon}
      <p
        className="text-labels-campaign-green font-semibold"
        data-testid="freeShippingText"
      >
        {getFreeShippingNotificationMessage()}
      </p>
    </div>
  )
}
