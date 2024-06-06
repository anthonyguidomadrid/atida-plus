import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { mapIconReferenceToIconComponent } from '~domains/contentful'
import { useTranslation } from 'react-i18next'
import { Button } from '~components/atoms/Button'
import { Link } from '~components/atoms/Link'
import NextLink from 'next/link'
import classNames from 'classnames'
import { Icon } from '~domains/contentful/normalizers/icon'
import { PAYMENT_OPTIONS } from '~config/constants/payments'

export type DeliveryStepsProps = ComponentPropsWithoutRef<'div'> & {
  steps: {
    title?: string
    text?: string
    subText?: string
    icon?: Icon
  }[]
  orderId?: string
  isLoggedIn?: boolean
  paymentMethod?: string
  isAtidaCashSteps?: boolean
  className?: string
}

export const DeliverySteps: FunctionComponent<DeliveryStepsProps> = ({
  steps = [],
  orderId,
  paymentMethod,
  isLoggedIn,
  isAtidaCashSteps,
  className
}) => {
  const { t } = useTranslation()

  return (
    <div className={className} data-testid="deliverySteps">
      {isAtidaCashSteps ? (
        <h2
          data-testid="atidaCashStepsTitle"
          className="font-heading mb-4 lg:text-5xl text-3xl"
        >
          {t('account.atida-cash-steps.title')}
        </h2>
      ) : (
        <h4 data-testid="deliveryStepsTitle">{t('confirmation.whats-next')}</h4>
      )}
      <ul className={classNames('next-steps', { 'my-5': !isAtidaCashSteps })}>
        {steps.map((step, idx) => {
          const Icon = mapIconReferenceToIconComponent(step?.icon)
          const isLastStep = idx === steps.length - 1

          return (
            <li
              key={idx}
              className={classNames(`flex relative`, {
                'min-h-[100px] sm:pb-2': isAtidaCashSteps && !isLastStep,
                'min-h-0': isLastStep,
                'min-h-16': !isAtidaCashSteps && !isLastStep
              })}
            >
              <div className="border border-primary-oxford-blue rounded-full min-w-7 h-7 flex items-center justify-center">
                {isAtidaCashSteps ? (
                  <span className="font-semibold text-lg">{idx + 1}</span>
                ) : (
                  <Icon role="presentation" className="icon-24" />
                )}
              </div>

              <div className="ml-4">
                <p className="font-semibold">{step?.text}</p>
                <p className="pb-3">{step?.subText}</p>
              </div>
              <div
                className={classNames(
                  'absolute left-3.625 border-r border-primary-oxford-blue',
                  {
                    'bottom-2 top-9  inset-y-1/4':
                      !isLastStep && !isAtidaCashSteps,
                    'bottom-1 top-8 ': isAtidaCashSteps && !isLastStep
                  }
                )}
              ></div>
            </li>
          )
        })}
      </ul>
      {!isAtidaCashSteps &&
        paymentMethod !== PAYMENT_OPTIONS.SIBS_MULTIBANCO &&
        paymentMethod !== PAYMENT_OPTIONS.SIBS_MBWAY &&
        isLoggedIn && (
          <NextLink
            passHref
            href={`/account/order-history/${orderId ?? ''}`}
            prefetch={false}
          >
            <Link className="w-full mt-2 sm:max-w-27 no-underline justify-center ">
              <Button
                data-testid="confirmationViewOrder"
                aria-label={t('confirmation.view-your-order')}
                variant="primary"
                className="w-full sm:w-auto"
              >
                {t('confirmation.view-your-order')}
              </Button>
            </Link>
          </NextLink>
        )}
    </div>
  )
}
