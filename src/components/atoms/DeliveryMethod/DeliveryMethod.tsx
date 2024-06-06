import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FunctionComponent,
  FunctionComponentElement,
  SVGAttributes
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useFormatPrice } from '~domains/product'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { Address } from '~domains/checkout/types'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type DeliveryMethodProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  name: string
  timing: string
  price: number
  currency: string
  icon: FunctionComponentElement<SVGAttributes<'svg'>>
  isChecked?: boolean
  inputName: string
  inputValue: string
  inputDisabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  orderShipping?: number
  deliveryAddress?: Address
  isToPaymentEventNotClickable?: boolean
  setIsMondialRelayModalOpen?: () => void
  mondialRelayStation?: string
  isLoggedInWithAddress?: boolean
  onGuestAddressChange?: () => void
}

export const DeliveryMethod: FunctionComponent<DeliveryMethodProps> = ({
  name,
  inputName,
  inputValue,
  inputDisabled = false,
  onChange,
  timing,
  price,
  currency,
  icon,
  isChecked = false,
  orderShipping,
  className,
  children,
  deliveryAddress,
  isToPaymentEventNotClickable,
  setIsMondialRelayModalOpen,
  mondialRelayStation,
  isLoggedInWithAddress,
  onGuestAddressChange,
  ...props
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const isFreeDelivery = Number.isInteger(orderShipping) && orderShipping === 0

  const isDeliveryStickyCTAEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_DELIVERY_STICKY_CTA_BUTTON
  )

  return (
    <div
      className={classNames(
        'border rounded focus:outline-none',
        {
          'border-ui-grey-lightest': !isChecked,
          'border-primary-oxford-blue': isChecked,
          'opacity-50': inputDisabled
        },
        className
      )}
      {...props}
    >
      <label className={'flex items-center py-2 px-3 cursor-pointer '}>
        <input
          type="radio"
          name={inputName}
          value={inputValue}
          checked={isChecked}
          onChange={onChange}
          disabled={inputDisabled}
          className="absolute opacity-0"
        />
        <span
          className={classNames(
            'flex grow-0 shrink-0 items-center justify-center w-3 h-3 mr-2 border rounded-full',
            {
              'border-ui-grey-light': !isChecked,
              'border-primary-oxford-blue': isChecked
            }
          )}
        >
          {isChecked && (
            <span className="block w-1.5 h-1.5 bg-primary-oxford-blue rounded-full" />
          )}
        </span>
        <div className="py-1">
          <p className="font-semibold">{t(name)}</p>
          <span className="text-sm">{timing}</span>
        </div>
        <span className="flex flex-col items-end ml-auto">
          {icon}
          <span
            className={classNames('block mt-0.5 font-semibold', {
              'text-secondary-portland-orange': !isFreeDelivery,
              'text-feedback-success': isFreeDelivery
            })}
            data-testid="delivery"
          >
            {isFreeDelivery
              ? t('shared.free')
              : formatPrice(price, currency).asOne}
          </span>
        </span>
      </label>

      {isChecked && (
        <div className="border-t border-ui-grey-lightest pt-4 pb-2 px-3">
          {name === 'spain-mondial-relay' ? (
            <span
              className={classNames('block font-semibold', {
                'mb-2': !isDeliveryStickyCTAEnabled,
                'mb-1': isDeliveryStickyCTAEnabled
              })}
            >
              {mondialRelayStation ?? ''}
            </span>
          ) : (
            <div className="flex text-center justify-between">
              <span
                className={classNames('block font-semibold', {
                  'mb-2': !isDeliveryStickyCTAEnabled,
                  'mb-1': isDeliveryStickyCTAEnabled
                })}
              >{`${deliveryAddress?.salutation}. ${deliveryAddress?.firstName} ${deliveryAddress?.lastName}`}</span>
              {isDeliveryStickyCTAEnabled &&
                name !== 'spain-mondial-relay' &&
                isLoggedInWithAddress && (
                  <p className="text-center">
                    <NextLink
                      href={{
                        pathname: '/account/address-book',
                        query: { doEdit: true }
                      }}
                    >
                      <Link
                        href={'/account/address-book'}
                        className={'text-base font-semibold cursor-pointer '}
                      >
                        {t('create-account.edit')}
                      </Link>
                    </NextLink>
                  </p>
                )}
            </div>
          )}
          {children}
        </div>
      )}
      {isDeliveryStickyCTAEnabled &&
        isChecked &&
        (name !== 'spain-mondial-relay' ? (
          !!isLoggedInWithAddress ? (
            <p className="w-full text-center border-t border-ui-grey-lightest py-2">
              <NextLink href={'/account/address-book'}>
                <Link
                  href={'/account/address-book'}
                  className={
                    'font-normal text-center text-base cursor-pointer no-underline	'
                  }
                >
                  {t('checkout.update-customer-address')}
                </Link>
              </NextLink>
            </p>
          ) : (
            <button
              onClick={onGuestAddressChange}
              className={classNames(
                'w-full mt-3 text-center border-t border-ui-grey-lightest py-2 font-normal text-base ',
                {
                  'pointer-events-none': isToPaymentEventNotClickable
                }
              )}
            >
              {t('checkout.update-customer-address')}
            </button>
          )
        ) : (
          name === 'spain-mondial-relay' && (
            <button
              className={classNames(
                'w-full mt-3 text-center border-t border-ui-grey-lightest py-2 font-normal text-base ',
                {
                  'pointer-events-none': isToPaymentEventNotClickable
                }
              )}
              onClick={setIsMondialRelayModalOpen}
            >
              {t('checkout.delivery-method.different-pick-up-point')}
            </button>
          )
        ))}
    </div>
  )
}
