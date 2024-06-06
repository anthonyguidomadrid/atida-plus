import type { FunctionComponent } from 'react'
import React from 'react'
import { ReactComponent as Date } from '~assets/svg/navigation-24px/Date.svg'

import { useTranslation } from 'react-i18next'

export type ExpectedDeliveryProps = {
  deliveryText: string
  deliveryDays: { minDeliveryDays?: number; maxDeliveryDays?: number }
}

export const ExpectedDelivery: FunctionComponent<ExpectedDeliveryProps> = ({
  deliveryText,
  deliveryDays
}) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid="expectedDelivery"
      className={
        'pl-2 flex items-center bg-ui-guyabano border-l-4 border-secondary-atomic-tangerine mt-3'
      }
    >
      <div className="py-2.5 md:flex md:py-4">
        <Date className="icon-24" />
      </div>
      <div className="py-2.5 pl-1.5 w-full md:flex md:justify-between md:py-4">
        <p className="font-semibold pb-0.5 md:pb-0 ">
          {t('confirmation.expected-delivery-date')}
        </p>
        <p data-testid="deliveryDate" className="text-sm md:pr-3.625 ">
          {t(`confirmation.expected-delivery-date.${deliveryText}`, {
            minDeliveryDays: deliveryDays.minDeliveryDays,
            maxDeliveryDays: deliveryDays.maxDeliveryDays
          })}
        </p>
      </div>
    </div>
  )
}
