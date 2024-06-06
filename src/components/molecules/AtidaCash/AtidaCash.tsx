import { ReactComponent as AtidaCoins } from '~assets/svg/navigation-24px/AtidaCoins.svg'
import { Button } from '~components/atoms/Button'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { ReactComponent as PlusLarge } from '~assets/svg/navigation-24px/PlusLarge.svg'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import type { FormikErrors, FormikHelpers } from 'formik'
import { FormField } from '~components/molecules/FormField'
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FunctionComponent,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { TextField } from '~components/atoms/TextField'
import classNames from 'classnames'
import { useFormatPrice } from '~domains/product'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { useDispatch } from 'react-redux'
import { setDataTrigger } from '~domains/checkout'
import {
  Address,
  PaymentMethods,
  SetCheckoutDataPayload
} from '~domains/checkout/types'

export type RedeemAtidaCashValues = {
  cash?: string
}

export type RedeemAtidaCashFormProps = Omit<
  ComponentPropsWithoutRef<'form'>,
  'onSubmit'
> & {
  atidaCashUsed?: number
  payButtonRef?: RefObject<HTMLDivElement>
  totalBalance?: number
  currency?: string
  rewardTotal?: number
  paymentMethod?: string
  checkoutDataPaymentMethods?: PaymentMethods[]
  orderGrandTotal?: number
  checkoutDataPayload?: SetCheckoutDataPayload
  deliveryMethod?: string
  deliveryAddress?: Address
  billingAddress?: Address
}

const AtidaCashComponent: FunctionComponent<RedeemAtidaCashFormProps> = ({
  atidaCashUsed,
  totalBalance,
  currency,
  rewardTotal,
  paymentMethod,
  checkoutDataPaymentMethods,
  orderGrandTotal,
  payButtonRef,
  checkoutDataPayload,
  deliveryMethod,
  deliveryAddress,
  billingAddress,
  ...props
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isToggleButtonClicked, setIsToggleButtonClicked] = useState(false)
  const formatPrice = useFormatPrice()
  const rewardTotalFormatted = formatPrice(rewardTotal ?? 0, currency).asOne
  const atidaCashUsedConverted = atidaCashUsed
    ? (atidaCashUsed / 100)?.toString()
    : ''
  const atidaCashUsedFormatted = formatPrice(atidaCashUsed, currency).asOne
  const [formikAtidaCash, setFormikAtidaCash] = useState({
    values: {},
    formikApi: {}
  })
  const orderGrandTotalParsed = orderGrandTotal && orderGrandTotal / 100
  const grandTotal = orderGrandTotalParsed ? Number(orderGrandTotalParsed) : 0
  const totalBalanceParsed = totalBalance ? totalBalance / 100 : 0
  const maxAtidaCashToSpent =
    grandTotal > totalBalanceParsed ? totalBalanceParsed : grandTotal - 0.5
  const remainingAtidaCashBalance =
    totalBalance !== null &&
    totalBalance !== undefined &&
    atidaCashUsed !== null &&
    atidaCashUsed !== undefined &&
    totalBalance - atidaCashUsed
  const totalAtidaCashFormatted = formatPrice(
    remainingAtidaCashBalance === 0 || remainingAtidaCashBalance
      ? remainingAtidaCashBalance
      : totalBalance,
    currency
  ).asOne

  const atidaCashRef = useRef(atidaCashUsedConverted)

  const redeemAtidaCash = (atidaCash: number) => {
    const fixedAtidaCashValue = (atidaCash * 100).toFixed(2)
    dispatch(
      setDataTrigger({
        ...checkoutDataPayload,
        payments: [
          {
            paymentSelection: 'atidaPaymentLoyalty',
            paymentMethodName: 'LoyaltySpend',
            paymentProviderName: 'AtidaPayment',
            amount: +fixedAtidaCashValue
          },
          {
            paymentSelection: 'atidaPaymentInternal',
            paymentMethodName: 'Internal',
            paymentProviderName: 'AtidaPayment'
          }
        ]
      })
    )
  }

  const onAtidaCashRedeem = (
    values: RedeemAtidaCashValues,
    formikApi: FormikHelpers<RedeemAtidaCashValues>
  ) => {
    if (values.cash) {
      setFormikAtidaCash({ values, formikApi })
      redeemAtidaCash(+values.cash)
    }
  }

  const handleFormClose = () => {
    setIsToggleButtonClicked(false)
  }

  const handleFormOpen = () => {
    setIsToggleButtonClicked(true)
  }

  const resetAtidaCashForm = useCallback(() => {
    // Reset Atida cash form
    if (Object.keys(formikAtidaCash.values).length > 0) {
      // @ts-ignore
      formikAtidaCash.formikApi.resetForm({
        values: {
          ...formikAtidaCash.values,
          cash: 0
        }
      })
    }
  }, [formikAtidaCash.formikApi, formikAtidaCash.values])

  useEffect(() => {
    if (atidaCashUsedConverted !== atidaCashRef.current) {
      atidaCashRef.current = atidaCashUsedConverted

      resetAtidaCashForm()
    }
  }, [atidaCashUsedConverted, resetAtidaCashForm])

  const validate = (values: RedeemAtidaCashValues) => {
    const errors: FormikErrors<RedeemAtidaCashValues> = {}

    const atidaCashParsed = values.cash ? Number(values.cash) : 0
    if (
      atidaCashParsed &&
      grandTotal &&
      atidaCashParsed > maxAtidaCashToSpent
    ) {
      errors.cash = 'checkout.atida-cash.limitation-error-message'
    }

    if (
      atidaCashParsed &&
      totalBalanceParsed &&
      atidaCashParsed > totalBalanceParsed
    ) {
      errors.cash = 'checkout.atida-cash.error-message'
    }

    if (atidaCashParsed && atidaCashParsed < 0.01) {
      errors.cash = 'checkout.atida-cash.minimum-limit.error-message'
    }

    return errors
  }

  return (
    <div
      className={classNames('flex  flex-col rounded', {
        'bg-ui-carribean-green-lightest text-primary-oxford-blue': !!atidaCashUsed,
        'border border-ui-grey-light': !atidaCashUsed,
        'pb-2': !isToggleButtonClicked && !atidaCashUsed
      })}
      data-testid="atidaCashContainer"
    >
      <div
        className={classNames('flex items-center pt-2 pl-2 pr-2', {
          'border-b border-ui-grey-light pb-2':
            isToggleButtonClicked || !!atidaCashUsed
        })}
      >
        <AtidaCoins
          className={classNames('icon-24 flex-none ml-1 mb-2 mt-1 mr-2', {
            'text-ui-grey': !totalBalance
          })}
        />

        <div className="flex flex-col flex-1">
          <span
            className={classNames('text-base ', {
              'text-ui-grey': !totalBalance
            })}
          >
            {t('checkout.atida-cash.title')}
          </span>
          <span
            className={classNames('text-sm text-ui-grey-dark', {
              'text-ui-grey': !totalBalance
            })}
          >
            {!!totalBalance
              ? atidaCashUsed
                ? t('checkout.atida-cash.remaining-balance', {
                    remainingBalance: priceCurrencyFormatter(
                      totalAtidaCashFormatted,
                      currency,
                      true
                    )
                  })
                : t('checkout.atida-cash.balance', {
                    totalBalance: priceCurrencyFormatter(
                      totalAtidaCashFormatted,
                      currency,
                      true
                    )
                  })
              : t('checkout.atida-cash.balance-after-order', {
                  balance: priceCurrencyFormatter(
                    rewardTotalFormatted,
                    currency,
                    true
                  )
                })}
          </span>
        </div>
        {!!atidaCashUsed ? (
          <Checkmark className="icon-24" data-testid="atidaCashCheckmark" />
        ) : (
          !!totalBalance && (
            <Button
              data-testid="atidaCashToggleButton"
              icon={
                isToggleButtonClicked ? (
                  <Cross className="icon-24" />
                ) : (
                  <PlusLarge className="icon-24" />
                )
              }
              variant="tertiary"
              className="border-none flex-none "
              onClick={isToggleButtonClicked ? handleFormClose : handleFormOpen}
            />
          )
        )}
      </div>
      {!!atidaCashUsed ? (
        <div className="flex justify-between items-center bg-ui-carribean-green-lightest text-primary-oxford-blue pr-2 pl-2 rounded">
          <span className="text-base font-bold">
            {t('checkout.atida-cash.used', {
              atidaCash: priceCurrencyFormatter(
                atidaCashUsedFormatted,
                currency,
                true
              )
            })}
          </span>
          <Button
            data-testid="removeAtidaCash"
            type="submit"
            aria-label="atidaCashRemoveButton"
            variant="tertiary"
            className="border-none underline px-0"
            onClick={() => {
              dispatch(
                setDataTrigger({
                  ...checkoutDataPayload,
                  payments: [
                    {
                      paymentSelection: 'atidaPaymentLoyalty',
                      paymentMethodName: 'LoyaltySpend',
                      paymentProviderName: 'AtidaPayment',
                      amount: 0
                    },
                    {
                      paymentSelection: 'atidaPaymentInternal',
                      paymentMethodName: 'Internal',
                      paymentProviderName: 'AtidaPayment'
                    }
                  ]
                })
              )
              setIsToggleButtonClicked(false)
              resetAtidaCashForm()
            }}
          >
            {t('checkout.atida-cash.remove')}
          </Button>
        </div>
      ) : (
        isToggleButtonClicked && (
          <Formik<RedeemAtidaCashValues>
            initialValues={{
              cash: atidaCashUsed
                ? atidaCashUsedConverted
                : maxAtidaCashToSpent.toString()
            }}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onAtidaCashRedeem}
            data-testid="redeemAtidaCashForm"
          >
            {({ values, errors, touched }) => (
              <Form {...props} noValidate>
                <FormField
                  inputId="cash"
                  label={''}
                  className={classNames('flex mt-3 pl-2 pr-2', {
                    'pb-2': !errors.cash,
                    'pb-1': errors.cash
                  })}
                >
                  <Field
                    component={TextField}
                    type="number"
                    name="cash"
                    aria-invalid={!!errors.cash}
                    placeholder={t('checkout.atida-cash.placeholder')}
                    className="w-full max-w-full mr-1 rounded border-primary-oxford-blue atida-cash-input"
                    data-testid="atidaCashInput"
                    onFocus={() => {
                      if (payButtonRef && payButtonRef?.current)
                        payButtonRef?.current.classList.add('hidden')
                    }}
                    onBlur={() => {
                      if (payButtonRef && payButtonRef?.current)
                        payButtonRef?.current.classList.remove('hidden')
                    }}
                    onWheel={(event: ChangeEvent<HTMLInputElement>) =>
                      event.target.blur()
                    }
                  />

                  <Button
                    className="w-91px h-6"
                    type="submit"
                    aria-label="atidaCashRedeemButton"
                    data-testid="redeemAtidaCashButton"
                    disabled={!(values?.cash && +values.cash > 0)}
                  >
                    {t('checkout.atida-cash.apply-button')}
                  </Button>
                </FormField>
                {errors.cash && touched.cash && (
                  <div
                    role="alert"
                    data-testid="alert"
                    className="flex text-feedback-error text-sm ml-2 mb-2 "
                  >
                    {t(errors.cash, {
                      maxAtidaCashToSpent
                    })}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )
      )}
    </div>
  )
}

export const AtidaCash = memo(AtidaCashComponent, (prevProps, nextProps) => {
  const {
    atidaCashUsed,
    totalBalance,
    rewardTotal,
    orderGrandTotal,
    payButtonRef,
    checkoutDataPayload
  } = nextProps

  if (
    prevProps.atidaCashUsed === atidaCashUsed &&
    prevProps.totalBalance === totalBalance &&
    prevProps.rewardTotal === rewardTotal &&
    prevProps.orderGrandTotal === orderGrandTotal &&
    prevProps.payButtonRef === payButtonRef &&
    prevProps.checkoutDataPayload === checkoutDataPayload
  ) {
    return true
  }

  return false
})
