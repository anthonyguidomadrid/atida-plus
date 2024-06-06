import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState
} from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import { FormField } from '~components/molecules/FormField'
import * as Yup from 'yup'
import { TextField } from '~components/atoms/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomerEmail } from '~domains/account/selectors/customer'
import { Button } from '~components/atoms/Button'
import { ReactComponent as Mail } from '~assets/svg/navigation-24px/Mail.svg'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { getCustomerTrigger, customerSelectors } from '~domains/account'

export type BackInStockFormValues = {
  email: string
}

export const BackInStockSubscription: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>
> = ({}) => {
  const dispatch = useDispatch()
  const reference = useSelector(customerSelectors.selectCustomerReference)
  const customerEmail = useSelector(selectCustomerEmail)
  const { t } = useTranslation()
  const [userEmail, setUserEmail] = useState({
    email: customerEmail ? customerEmail : ''
  })
  const isSubmittingForm = false // TODO: SHOULD BE BASED ON THE ACTUAL SELECTOR THAT PROCESSES THE FORM
  const [backInStockFormSubmitted, setBackInStockFormSubmitted] = useState(
    false
  )

  const BackInStockEmailValidationSchema = {
    email: Yup.string()
      .lowercase()
      .email(t('product.subscribe-add-to-cart-invalid-email'))
      .required(t('product.subscribe-add-to-cart-email-required'))
  }

  const validationSchema = Yup.object({
    ...BackInStockEmailValidationSchema
  })

  const handleOnChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined
  ) => {
    if (e) {
      setUserEmail({ ...userEmail, [e.target.name]: e.target.value })
    }
  }

  const handleOnSubmit = (_values: BackInStockFormValues) => {
    // NEXT LINE IS FOR FUNCTIONALITY/DEMO PURPOSES, WILL BE COMMITTED REGARDLESS BECAUSE BACKEND IS NOT FINISHED YET
    setBackInStockFormSubmitted(true)
  }

  useEffect(() => {
    if (reference && customerEmail != '') {
      dispatch(getCustomerTrigger({ customerReference: reference }))
    }
    if (customerEmail) setUserEmail({ email: customerEmail })
  }, [dispatch, reference, customerEmail])

  return (
    <>
      {backInStockFormSubmitted && (
        <div
          className="flex flex-row mb-2 bg-secondary-green-100 text-primary-black p-3 border-1 border-primary-caribbean-green-dark border-solid"
          data-testid="backInStockSubscriptionConfirmation"
        >
          <div className="w-3 h-3 rounded-full flex items-center justify-center bg-primary-caribbean-green-dark">
            <Checkmark className="icon-24 bg-transparent text-primary-white" />
          </div>
          <div className={`flex flex-col ml-2`}>
            <span className="font-semibold mb-1">
              {t('product.subscribe-add-to-cart-title')}
            </span>
            <span>
              <Trans
                i18nKey="product.subscribe-add-to-cart-description"
                values={{ email: userEmail['email'] }}
                components={{
                  b: <b />
                }}
              />
            </span>
          </div>
        </div>
      )}

      {!backInStockFormSubmitted && (
        <Formik<BackInStockFormValues>
          initialValues={userEmail}
          onSubmit={values => {
            handleOnSubmit(values)
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldError }) => (
            <Form data-testid="backInStockSubscriptionForm">
              <FormField
                label={t('product.add-to-cart-email-me')}
                inputId="email"
                data-test-id="productSubscribeToBackInStockField"
                error={touched.email && errors.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  values.email = e.target.value
                }}
              >
                <Field
                  component={TextField}
                  type="email"
                  name="email"
                  placeholder={t('product.add-to-cart-placeholder')}
                  data-testid="backInStockSubscriptionField"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChangeField(e)
                    setFieldError(e.target.name, undefined)
                  }}
                />
              </FormField>

              <Button
                data-testid="backInStockFormSubmitButton"
                className="w-full"
                type="submit"
                isLoading={isSubmittingForm}
                icon={<Mail className="w-3" />}
              >
                {t('product.subscribe-add-to-cart-button')}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}
