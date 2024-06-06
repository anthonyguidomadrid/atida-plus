import type { FunctionComponent } from 'react'
import React from 'react'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { Notification } from '~components/atoms/Notification'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectReOrderErrorMesssage } from '~domains/checkout'

export type OrderMessageProps = {
  name?: string
  success: boolean
  reOrderError?: boolean
  children?: React.ReactNode
}

export const OrderMessage: FunctionComponent<OrderMessageProps> = ({
  name,
  success,
  reOrderError,
  children
}) => {
  const { t } = useTranslation()
  const reOrderErrorMessage = useSelector(selectReOrderErrorMesssage)
  return (
    <div data-testid="orderMessage" className="container bg-ui-guyabano w-full">
      <div className="text-center pt-7 pb-5 sm:py-6 md:pt-9 md:pb-8 lg:pt-11 lg:pb-9">
        <div className="mb-1">
          <h1 data-testid="orderMsg" className="text-3xl lg:text-5xl">
            {success ? (
              <Checkmark className="mr-1.5 p-0.5 align-top inline h-4 w-4 lg:h-6 lg:w-6 bg-primary-caribbean-green text-primary-white rounded-full" />
            ) : (
              <Cross
                data-testid="redCross"
                className="mr-1.5 align-top inline h-4 w-4 lg:h-5 lg:w-5 bg-feedback-error-light text-feedback-error rounded-full"
              />
            )}
            <span>
              {success
                ? t('confirmation.thank-you', { name })
                : t('unsuccessful.title')}
            </span>
          </h1>
        </div>
        <p data-testid="confirmMsg" className="sm:px-13">
          {success
            ? t('confirmation.successful-order')
            : t('unsuccessful.subtitle')}
        </p>
        {children && <div className="my-3">{children}</div>}
        {reOrderError && reOrderErrorMessage && (
          <div className="w-full flex justify-center">
            <Notification type="error" title={t(reOrderErrorMessage)} />
          </div>
        )}
      </div>
    </div>
  )
}
