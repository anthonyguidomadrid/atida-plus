import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import type { FormikErrors, FormikHelpers } from 'formik'
import { Button } from '~components/atoms/Button'
import { TextField } from '~components/atoms/TextField'
import { FormField } from '~components/molecules/FormField'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCouponTrigger,
  selectCouponWasError,
  selectCouponIsLoading,
  selectCouponError
} from '~domains/basket'
import { BasketCoupon } from '~domains/basket/types'
import { clearLoginMessages } from '~domains/account'

export type RedeemCouponFormValues = {
  coupon?: string
  usedCoupon?: string
}

export type RedeemCouponFormProps = Omit<
  ComponentPropsWithoutRef<'form'>,
  'onSubmit'
> & {
  couponData: BasketCoupon[]
  usedCoupon?: string
  hasPromotionalItemOutOfStock?: boolean
  payButtonRef?: RefObject<HTMLDivElement>
  hasOnlyPrescriptionItems?: boolean
}

export const RedeemCouponForm: FunctionComponent<RedeemCouponFormProps> = ({
  couponData,
  usedCoupon,
  hasPromotionalItemOutOfStock,
  payButtonRef,
  hasOnlyPrescriptionItems,
  ...props
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const error = useSelector(selectCouponWasError)
  const couponIsLoading = useSelector(selectCouponIsLoading)
  const errorMessage = useSelector(selectCouponError)

  // For add coupon button loading state
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (couponIsLoading) {
      setIsAdding(true)
    }

    if (!couponIsLoading) {
      setIsAdding(false)
    }
  }, [dispatch, couponIsLoading])

  // Hackfix to reset the add coupon form
  const [formikApiVals, setFormikApiVals] = useState({
    values: {},
    formikApi: {}
  })

  // Ref needed to watch when coupons are being added/removed
  const couponsRef = useRef(couponData)

  const onCouponRedeem = useCallback(
    (
      values: RedeemCouponFormValues,
      formikApi: FormikHelpers<RedeemCouponFormValues>
    ) => {
      setFormikApiVals({ values, formikApi })
      dispatch(addCouponTrigger(values.coupon?.trim() ?? ''))
      dispatch(clearLoginMessages())
    },
    [dispatch]
  )

  const validate = (values: RedeemCouponFormValues) => {
    const errors: FormikErrors<RedeemCouponFormValues> = {}

    // Potentially add some coupon regex validation if there are any restrictions
    if (!values.coupon || values.coupon === '') {
      errors.coupon = 'coupon.validation-error'
    }

    return errors
  }

  // Reset the coupon form field on successful coupon add
  useEffect(() => {
    if (couponData !== couponsRef.current) {
      couponsRef.current = couponData

      // Hackfix to reset add coupon form
      if (Object.keys(formikApiVals.values).length > 0) {
        // @ts-ignore
        formikApiVals.formikApi.resetForm({
          values: {
            ...formikApiVals.values,
            coupon: ''
          }
        })
      }
    }
  }, [couponData, formikApiVals.formikApi, formikApiVals.values])

  useEffect(() => {
    if (usedCoupon) {
      dispatch(addCouponTrigger(usedCoupon))
    }
  }, [usedCoupon, dispatch])

  return (
    <>
      <Formik<RedeemCouponFormValues>
        initialValues={{ coupon: !!usedCoupon ? usedCoupon : '' }}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onCouponRedeem}
        data-testid="redeemCouponForm"
      >
        {({ errors, touched, values }) => (
          <Form {...props} className="mt-2" data-testid="containerTest">
            <FormField
              inputId="coupon"
              label={t('coupon.input-field-label')}
              data-testid="couponFormField"
            >
              <div data-testid="inputContainer" className="flex">
                <Field
                  component={TextField}
                  type="text"
                  name="coupon"
                  aria-invalid={!!(error || errors['coupon'])}
                  placeholder={t('coupon.input-placeholder')}
                  className="w-full max-w-full mr-1 rounded"
                  data-testid="input"
                  autocomplete="off"
                  disabled={isAdding}
                  onFocus={() => {
                    if (payButtonRef && payButtonRef?.current)
                      payButtonRef?.current.classList.add('hidden')
                  }}
                  onBlur={() => {
                    if (payButtonRef && payButtonRef?.current)
                      payButtonRef?.current.classList.remove('hidden')
                  }}
                />
                <Button
                  variant="primary"
                  disabled={
                    !(values.coupon && values.coupon.length > 0) ||
                    !!hasOnlyPrescriptionItems
                  }
                  type="submit"
                  className="w-full max-w-12 lg:max-w-14"
                  data-testid="redeemCouponFormButton"
                  isLoading={isAdding}
                >
                  {couponData && couponData.length > 0
                    ? t('coupon.add')
                    : t('coupon.redeem')}
                </Button>
              </div>
            </FormField>
            {hasOnlyPrescriptionItems && (
              <span className="text-sm">
                {t('basket.coupon-form.prescription-description')}
              </span>
            )}

            {(hasPromotionalItemOutOfStock ||
              error ||
              (errors['coupon'] && touched['coupon'])) && (
              <div
                role="alert"
                data-testid="alert"
                className="flex mt-2 text-feedback-error lg:max-w-66"
              >
                {hasPromotionalItemOutOfStock
                  ? t('promotional-item.voucher.out-of-stock.error')
                  : errorMessage
                  ? t(`${errorMessage}`)
                  : t('spryker-cart.error.code_cant_be_added')}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}
