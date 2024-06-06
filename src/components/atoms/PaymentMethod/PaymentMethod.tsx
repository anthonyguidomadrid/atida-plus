import {
  ChangeEventHandler,
  FunctionComponentElement,
  ReactNode,
  SVGAttributes,
  useState
} from 'react'
import classNames from 'classnames'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  selectAdyenDetails,
  selectMultiplePaymentsDetailsAdyen,
  selectAdyenPaymentDetailsIsLoading,
  selectAdyenPaymentDetailsData
} from '~domains/checkout'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type PaymentMethodType = {
  name?: string
  disabled: boolean
  icon?: FunctionComponentElement<SVGAttributes<'svg'>> | null
  inputName?: string
  inputValue?: string
  isChecked?: boolean
  id?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export type PaymentMethodProps = PaymentMethodType & { children?: ReactNode }

export const PaymentMethod = ({
  name,
  disabled,
  icon,
  inputName,
  inputValue,
  isChecked = false,
  onChange,
  id,
  children
}: PaymentMethodProps) => {
  const { t } = useTranslation()

  const [isFocused, setIsFocused] = useState(false)

  const adyenPaymentDetails = useSelector(selectAdyenDetails)
  const multiplePaymentsDetailsAdyen = useSelector(
    selectMultiplePaymentsDetailsAdyen
  )
  const adyenPaymentDetailsIsLoading = useSelector(
    selectAdyenPaymentDetailsIsLoading
  )
  const adyenPaymentDetailsData = useSelector(selectAdyenPaymentDetailsData)

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isAdyenCardDisabled =
    inputValue !== PAYMENT_OPTIONS.ADYEN_CARD ||
    !isChecked ||
    adyenPaymentDetailsIsLoading ||
    adyenPaymentDetailsData ||
    (isLoyaltyAtidaCashEnabled
      ? !multiplePaymentsDetailsAdyen ||
        multiplePaymentsDetailsAdyen?.resultCode === 'Authorised'
      : !adyenPaymentDetails ||
        adyenPaymentDetails?.resultCode === 'Authorised')

  return (
    <div
      data-testid={`checkoutPaymentMethod-${inputValue}`}
      id={`checkoutPaymentMethod-${inputValue}`}
      className={classNames(
        'border',
        {
          'opacity-50': disabled && isAdyenCardDisabled,
          opacity: !disabled,
          'pointer-events-none': disabled && isAdyenCardDisabled
        },
        'border-ui-grey-light',
        'my-3',
        {
          ring: isFocused
        }
      )}
    >
      <label
        className={classNames(
          'flex items-center py-2 px-2 md:px-3 cursor-pointer',
          {
            'border-b border-ui-grey-light':
              isChecked && inputValue !== 'multibanco'
          }
        )}
      >
        <input
          data-testid={`paymentMethodCheckBox-${inputValue}`}
          type="radio"
          name={inputName}
          value={inputValue}
          checked={isChecked}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute opacity-0 cursor-pointer"
        />
        <span
          className={classNames(
            'flex grow-0 shrink-0 items-center justify-center w-3 h-3 mr-1 md:mr-2 border rounded-full',
            {
              'border-ui-grey-light': !isChecked,
              'border-ui-grey-dark-check-box': isChecked,
              'bg-primary-white': isChecked,
              'bg-ui-grey-neutral': !isChecked
            }
          )}
        >
          {isChecked && (
            <span className="block w-1.5 h-1.5 bg-primary-oxford-blue rounded-full" />
          )}
        </span>
        <span>
          <span className="block font-semibold text-xs md:text-base">
            {name && t(name)}
          </span>
        </span>
        <span
          className={classNames('flex ml-auto', {
            'flex-col items-end':
              id !== PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD &&
              id !== PAYMENT_OPTIONS.ADYEN_CARD,
            hidden: false
          })}
        >
          {icon}
        </span>
      </label>
      {isChecked && (
        <div
          data-testid="checkedPaymentMethod"
          className={classNames(
            'border-ui-grey-light',
            {
              'p-3':
                inputValue !== PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY &&
                inputValue !== PAYMENT_OPTIONS.ADYEN_APPLE_PAY &&
                inputValue !== PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME &&
                inputValue !== PAYMENT_OPTIONS.ADYEN_MULTIBANCO &&
                inputValue !== PAYMENT_OPTIONS.ADYEN_CARD,
              'bg-primary-white':
                inputValue === PAYMENT_OPTIONS.STRIPE_MULTIBANCO ||
                inputValue === PAYMENT_OPTIONS.SIBS_MULTIBANCO ||
                inputValue === PAYMENT_OPTIONS.SIBS_MBWAY,
              hidden:
                inputValue === PAYMENT_OPTIONS.ADYEN_CARD &&
                (adyenPaymentDetailsData?.resultCode === 'Authorised' ||
                  adyenPaymentDetailsIsLoading)
            },
            'min-w-full'
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
