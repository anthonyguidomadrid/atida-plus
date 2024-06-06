import {
  ChangeEvent,
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  FunctionComponent,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { useSelector, useDispatch } from 'react-redux'
import {
  adyenPaymentDetailsResetState,
  adyenPaymentResetState,
  createPaymentMethodClearDetails,
  selectLastUsedPaymentMethod,
  setSelectedPaymentMethod,
  createMultiplePaymentsResetState
} from '~domains/checkout'
import { FeatureFlagValue } from '~components/helpers/FeatureFlags/hooks'

export type PaymentMethodGroupProps = ComponentPropsWithoutRef<'fieldset'> & {
  onPaymentMethodChange?: (value?: string) => void
  locale?: string
  disabled?: boolean
  isAdyenApplePayEnabled?: FeatureFlagValue
}

export const PaymentMethodGroup: FunctionComponent<PaymentMethodGroupProps> = ({
  onPaymentMethodChange,
  children,
  locale,
  disabled = false,
  isAdyenApplePayEnabled,
  ...props
}) => {
  const dispatch = useDispatch()

  const isBraintreeCardEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_VISA_MASTER
  )

  const isAdyenMBWayEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_MB_WAY
  )

  const isFirstRender = useRef(true)
  const defaultSelectedPaymentMethod = useMemo(() => {
    if (disabled) {
      return ''
    }

    if (locale === 'pt-pt' && isAdyenMBWayEnabled)
      return PAYMENT_OPTIONS.ADYEN_MB_WAY

    if (locale === 'es-es' && isBraintreeCardEnabled)
      return PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD

    return ''
  }, [disabled, locale, isAdyenMBWayEnabled, isBraintreeCardEnabled])
  const lastUsedPaymentMethod = useSelector(selectLastUsedPaymentMethod)

  const validatePaymentMethod = (
    paymentMethod?: string
  ): string | undefined => {
    if (
      paymentMethod === PAYMENT_OPTIONS.ADYEN_APPLE_PAY &&
      !isAdyenApplePayEnabled
    ) {
      if (locale !== 'es-es') {
        return ''
      }
      return PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
    }
    return paymentMethod
  }

  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(
    validatePaymentMethod(lastUsedPaymentMethod) ?? defaultSelectedPaymentMethod
  )
  useEffect(() => {
    dispatch(setSelectedPaymentMethod(paymentMethod ?? ''))
    if (!isFirstRender.current) {
      onPaymentMethodChange?.(paymentMethod)
    }
    isFirstRender.current = false
    dispatch(createMultiplePaymentsResetState())
    dispatch(adyenPaymentResetState())
    dispatch(adyenPaymentDetailsResetState())
    dispatch(createPaymentMethodClearDetails())
  }, [paymentMethod, onPaymentMethodChange, dispatch])

  return (
    <fieldset data-testid="paymentMethods" {...props}>
      {Children.map(children, (child: ReactNode, idx: number) =>
        isValidElement(child)
          ? cloneElement(child, {
              isChecked: paymentMethod === child.props.inputValue,
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.currentTarget.value),
              ...child.props,
              className: classNames(
                { 'mb-2': idx < Children.count(children) - 1 },
                child.props.className
              )
            })
          : child
      )}
    </fieldset>
  )
}
