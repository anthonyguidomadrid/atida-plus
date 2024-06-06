import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useState
} from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button } from '~components/atoms/Button'
import { Field, Form, Formik } from 'formik'
import { TextField } from '~components/atoms/TextField'
import { FormField } from '~components/molecules/FormField'
import { usePhoneNumberValidation } from '~helpers/usePhoneNumberValidation'
import {
  COUNTRY_CODES,
  COUNTRY_LABELS
} from '~config/constants/phone-country-prefixes'
import ReactFlagsSelect from 'react-flags-select'
import { triggerReportAddPaymentInfo } from '~domains/analytics'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { useDispatch } from 'react-redux'

export type PhoneNumberFormValues = {
  number: string
  country: string
}
export type PhoneNumberType = {
  number: string
  country: string
}

export type PhoneNumberFormType = ComponentPropsWithoutRef<'span'> & {
  handleSubmit: () => void
  isSubmitting: boolean
  phoneNumber: { country: string; number: string }
  setPhoneNumber: Dispatch<SetStateAction<{ country: string; number: string }>>
}
export type PhoneNumberFormProps = PhoneNumberFormType

export const PhoneNumberForm: FunctionComponent<PhoneNumberFormProps> = ({
  handleSubmit,
  isSubmitting,
  phoneNumber,
  setPhoneNumber
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const initialValues = {
    number: '',
    country: COUNTRY_CODES.PT
  }
  const { phoneNumberValidation } = usePhoneNumberValidation()
  const [countryCode, setCountryCode] = useState(COUNTRY_LABELS.PT)
  const countries = [COUNTRY_LABELS.PT, COUNTRY_LABELS.ES]

  return (
    <Formik<PhoneNumberFormValues>
      initialValues={initialValues}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={values => {
        setPhoneNumber({
          ...phoneNumber,
          number: values.number
        })
        handleSubmit()
      }}
      data-testid="PhoneNumberFormik"
      validationSchema={phoneNumberValidation(phoneNumber.country)}
    >
      {({ errors, touched, values, setErrors }) => (
        <Form
          className="mt-3"
          data-testid="PhoneNumberForm"
          onChange={e => {
            setPhoneNumber({
              ...phoneNumber,
              number: (e.target as HTMLFormElement).value
            })
          }}
          onBlur={e => {
            if (touched.number && e?.target?.value !== '') {
              dispatch(
                triggerReportAddPaymentInfo({
                  payment_method: PAYMENT_OPTIONS.SIBS_MBWAY,
                  error_message: errors && errors.number,
                  success: errors.number ? false : true
                })
              )
            }
          }}
        >
          <FormField
            inputId="number"
            label={t('form.field.phone-number.label')}
            data-testid="PhoneNumberFormField"
            error={touched.number && errors.number}
          >
            <div className="relative flex w-full text-sm bg-ui-grey-neutral border border-ui-grey-light">
              <ReactFlagsSelect
                countries={countries}
                showSelectedLabel={false}
                selected={countryCode}
                onSelect={code => {
                  setErrors({})
                  setCountryCode(code)
                  code === COUNTRY_LABELS.PT &&
                    setPhoneNumber({
                      ...phoneNumber,
                      country: COUNTRY_CODES.PT
                    })
                  code === COUNTRY_LABELS.ES &&
                    setPhoneNumber({
                      ...phoneNumber,
                      country: COUNTRY_CODES.ES
                    })
                }}
                selectedSize={18}
                optionsSize={14}
                customLabels={{
                  PT: `+${COUNTRY_CODES.PT}`,
                  ES: `+${COUNTRY_CODES.ES}`
                }}
                className="p-0.5"
                selectButtonClassName="no-border"
              />
              <span className="flex items-center left-11.25 text-sm sm:px-2">
                {`(+${phoneNumber.country})`}
              </span>
              <Field
                component={TextField}
                data-testid="NumberField"
                type="tel"
                name="number"
                placeholder={t('form.field.phone-number.placeholder')}
                className="w-full bg-ui-grey-neutral border-none rounded"
              />
            </div>
          </FormField>
          <Button
            variant="secondary"
            type="submit"
            data-testid="MBWay-payment-button"
            className={classNames('w-full sm:w-35 my-3 mx-auto')}
            disabled={
              (touched['number'] && typeof errors['number'] === 'string') ||
              !values['number']
            }
            isLoading={isSubmitting}
          >
            {t('checkout.pay-now')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
