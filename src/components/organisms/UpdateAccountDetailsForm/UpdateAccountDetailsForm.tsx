import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment,
  useMemo
} from 'react'
import { Formik, Form, Field } from 'formik'
import type { FieldProps } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import {
  recursiveTrimObjectValues,
  scrollToElement,
  taxReferenceRegexByLocale
} from '~helpers'
import {
  selectCustomerDetails,
  selectCustomerType,
  selectCustomerTaxReference
} from '~domains/account/selectors/customer'
import { RadioInput } from '~components/atoms/RadioInput'
import { useSelector } from 'react-redux'
import { CustomerAddress } from '~domains/account'
import { selectWasError as selectWasErrorOnUpdate } from '~domains/account/selectors/update-customer-personal-details'
import { selectWasError as selectWasErrorOnCreate } from '~domains/account/selectors/create-new-address'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { CustomerSalutation } from '~domains/checkout/types'
import {
  ACCOUNT_TYPE_BUSINESS,
  ACCOUNT_TYPE_PERSONAL
} from '~config/constants/account-types'
import {
  MAXIMUM_LENGTH_100,
  MAXIMUM_LENGTH_255
} from '~config/constants/maximum-length'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { dateOfBirthInputMask } from '../CreateAccountForm/validationHelpers'

export type UpdateAccountDetailsFormValues = {
  salutation?: CustomerSalutation
  'first-name': string
  'last-name': string
  address: string
  'zip-code': string
  city: string
  'phone-number'?: string
  country: string
  taxReference?: string
  dateOfBirth?: string | null
}

export type UpdateAccountDetailsFormProps = {
  notification?: JSX.Element | boolean
  onSubmit?: (values: UpdateAccountDetailsFormValues) => void
  addressLocale: string
  billingAddress: CustomerAddress | undefined
  shippingAddress: CustomerAddress | undefined
  customerSalutation: CustomerSalutation
}

export const UpdateAccountDetailsForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> &
    UpdateAccountDetailsFormProps
> = ({
  notification,
  onSubmit,
  addressLocale,
  billingAddress,
  shippingAddress,
  customerSalutation,
  ...props
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const scrollingElement = useRef<HTMLDivElement>(null)
  const phoneRegex = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
  const firstNameRegex = /^.{1,100}$/
  const lastNameRegex = /^.{1,100}$/
  const customerType = useSelector(selectCustomerType)
  const customerTaxReference = useSelector(selectCustomerTaxReference)
  const customerDetails = useSelector(selectCustomerDetails)
  const wasErrorOnUpdate = useSelector(selectWasErrorOnUpdate)
  const wasErrorOnCreate = useSelector(selectWasErrorOnCreate)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSalutationFieldEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_SALUTATION_FIELD
  )
  const isPhoneNumberOptional = useFeatureFlag(
    FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL
  )
  const isPhoneNumberAgainstCustomerEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL
  )

  const isDateOfBirthEnabled = useFeatureFlag(FeatureFlag.ACCOUNT_DATE_OF_BIRTH)

  const phoneNumber = useMemo(() => {
    if (isPhoneNumberAgainstCustomerEnabled) {
      return customerDetails?.phoneNumber ?? ''
    }

    return shippingAddress?.phone ?? ''
  }, [
    customerDetails?.phoneNumber,
    isPhoneNumberAgainstCustomerEnabled,
    shippingAddress?.phone
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(() => setIsSubmitting(false), [
    wasErrorOnCreate,
    wasErrorOnUpdate
  ])

  const [initialValues, setInitialValues] = useState<{
    salutation?: CustomerSalutation
    'first-name': string
    'last-name': string
    address: string
    'zip-code': string
    city: string
    'phone-number': string | undefined
    country: string
    taxReference?: string
    dateOfBirth?: string | null
  }>({
    salutation: undefined,
    'first-name': '',
    'last-name': '',
    address: '',
    'zip-code': '',
    city: '',
    'phone-number': '',
    country: t('create-account.prefilled-country'),
    taxReference: undefined,
    dateOfBirth: ''
  })

  const UpdateAccountValidationSchema = Yup.object({
    salutation: Yup.string().required(t('create-account.salutation.required')),
    ...(shippingAddress &&
      billingAddress && {
        'phone-number': Yup.string()
          .trim()
          .matches(
            phoneRegex,
            t('account.change-personal-details.phone-number-format')
          )
          .when({
            is: () => !isPhoneNumberOptional,
            then: Yup.string()
              .required(
                t('account.change-personal-details.phone-number.required')
              )
              .max(
                MAXIMUM_LENGTH_255,
                t('shared.max-length', {
                  maxLength: MAXIMUM_LENGTH_255
                })
              ),
            otherwise: Yup.string().max(
              MAXIMUM_LENGTH_255,
              t('shared.max-length', {
                maxLength: MAXIMUM_LENGTH_255
              })
            )
          })
      }),
    ...(customerTaxReference &&
      customerDetails?.accountType === ACCOUNT_TYPE_PERSONAL &&
      locale === 'es-es' && {
        taxReference: Yup.string()
          .trim()
          .matches(
            taxReferenceRegexByLocale(locale ?? '', true),
            t('account.address-form.tax-reference-format')
          )
          .required(t('account.address-form.tax-reference-required'))
      }),
    'first-name': Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(
        firstNameRegex,
        t('account.change-personal-details.first-name-format')
      )
      .required(t('account.change-personal-details.first-name.required')),
    'last-name': Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(
        lastNameRegex,
        t('account.change-personal-details.last-name-format')
      )
      .required(t('account.change-personal-details.last-name.required')),
    ...(locale === 'de-de' &&
      isDateOfBirthEnabled && {
        dateOfBirth: Yup.string()
          .required(t('account.form-field.date-of-birth-required'))
          .matches(
            /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/,
            t('account.form-field.date-of-birth-format')
          )
          .test(
            'Birth date Validation',
            t('account.form-field.date-of-birth-format'),
            value => {
              if (value) {
                const [birthDay, birthMonth, birthYear] = value.split('-')
                if (
                  isNaN(Date.parse(`${birthMonth}-${birthDay}-${birthYear}`))
                ) {
                  return false
                }

                if (+birthMonth < 1 || +birthMonth > 12) {
                  return false
                }

                if (+birthDay < 1 || +birthDay > 31) {
                  return false
                }

                if (
                  +birthYear > new Date().getFullYear() ||
                  +birthYear < 1902
                ) {
                  return false
                }
              }
              return true
            }
          )
          .test(
            'Birth date Validation',
            t('form.field.birth-date.sub-label'),
            value => {
              if (value) {
                const [birthDay, birthMonth, birthYear] = value.split('-')
                const dateString = `${birthYear}-${birthMonth}-${birthDay}`
                const birthDate = +new Date(dateString)
                const eighTeenYearsAgo = +new Date().setFullYear(
                  new Date().getFullYear() - 18
                )
                return birthDate <= eighTeenYearsAgo
              }
              return false
            }
          )
      })
  })

  useEffect(() => {
    if (customerDetails) {
      setInitialValues({
        salutation: (customerSalutation as CustomerSalutation) ?? 'Ms',
        'first-name': customerDetails?.firstName ?? '',
        'last-name': customerDetails?.lastName ?? '',
        address: '',
        'zip-code': '',
        city: '',
        'phone-number': phoneNumber,
        country: '',
        taxReference: customerTaxReference ?? undefined,
        dateOfBirth: customerDetails.dateOfBirth ?? ''
      })
    }
  }, [
    shippingAddress,
    customerSalutation,
    customerTaxReference,
    phoneNumber,
    customerDetails
  ])

  useEffect(() => {
    locale === 'de-de' && isDateOfBirthEnabled && dateOfBirthInputMask()
  }, [isDateOfBirthEnabled, locale])

  return (
    <div data-testid="UpdateAccountDetailsForm">
      <div className="mb-2">{notification}</div>
      <Formik<UpdateAccountDetailsFormValues>
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => {
          setIsSubmitting(true)
          values.salutation =
            values.salutation === 'Mrs' ? 'Ms' : values.salutation
          recursiveTrimObjectValues(values)
          onSubmit?.(values)
          scrollToElement(scrollingElement.current)
        }}
        data-testid="UpdateAccountDetailsForm"
        validationSchema={UpdateAccountValidationSchema}
      >
        {({ errors, touched, setFieldError, setFieldValue }) => (
          <Form {...props}>
            {isSalutationFieldEnabled && (
              <FormField
                inputId="salutation"
                label={t('form.field.salutation.label')}
                data-testid="UpdateAccountFormSalutation"
                error={touched['salutation'] && errors['salutation']}
              >
                <div className="flex">
                  <Field name="salutation">
                    {({ field }: FieldProps) => {
                      return (
                        <Fragment>
                          <RadioInput
                            id="Ms"
                            value="Ms"
                            label={t('create-account.salutation-ms')}
                            isChecked={
                              field.value === 'Mrs' || field.value === 'Ms'
                            }
                            field={field}
                          />
                          <RadioInput
                            data-testId="salutation-mr"
                            id="Mr"
                            value="Mr"
                            label={t('create-account.salutation-mr')}
                            isChecked={field.value === 'Mr'}
                            field={field}
                          />
                        </Fragment>
                      )
                    }}
                  </Field>
                </div>
              </FormField>
            )}
            <FormField
              required
              inputId="first-name"
              label={t('form.field.first-name.label')}
              data-testid="UpdateAccountDetailsFormFirstName"
              error={touched['first-name'] && errors['first-name']}
            >
              <Field
                data-testid="UpdateAccountDetailsFormFirstNameField"
                component={TextField}
                type="text"
                name="first-name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldError(e.target.name, undefined)
                  setFieldValue(e.target.name, e.target.value)
                }}
              />
            </FormField>
            <FormField
              required
              inputId="last-name"
              label={t('form.field.last-name.label')}
              data-testid="UpdateAccountDetailsFormLastName"
              error={touched['last-name'] && errors['last-name']}
            >
              <Field
                data-testid="UpdateAccountDetailsFormLastNameField"
                component={TextField}
                type="text"
                name="last-name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldError(e.target.name, undefined)
                  setFieldValue(e.target.name, e.target.value)
                }}
              />
            </FormField>
            {locale === 'de-de' && isDateOfBirthEnabled && (
              <FormField
                inputId="dateOfBirth"
                label={t('form.field.birth-date.label')}
                className="mb-2 sm:col-span-2"
                data-testid="createAccountFormBirthDate"
                required
                error={touched['dateOfBirth'] && errors['dateOfBirth']}
              >
                <Field
                  placeholder={t(
                    'account.form-field.date-of-birth-placeholder'
                  )}
                  component={TextField}
                  type="text"
                  name="dateOfBirth"
                  className="de-date-of-birth relative"
                  data-testid="createAccountFormBirthDateField"
                  onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldError(e.target.name, undefined)
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(e.target.name, e.target.value)
                    setFieldError(e.target.name, undefined)
                  }}
                />
                <div
                  data-testid="minimumAgeMessage"
                  className={classNames('mt-1 text-ui-grey-dark', {
                    hidden: errors.dateOfBirth,
                    block:
                      !errors.dateOfBirth ||
                      (errors.dateOfBirth &&
                        errors.dateOfBirth !==
                          'form.field.birth-date.sub-label')
                  })}
                >
                  <p>{t('form.field.birth-date.sub-label')}</p>
                </div>
              </FormField>
            )}
            {shippingAddress && billingAddress && (
              <FormField
                required
                inputId="phone-number"
                label={t('form.field.phone-number.label')}
                data-testid="UpdateAccountDetailsFormPhoneNumber"
                error={touched['phone-number'] && errors['phone-number']}
              >
                <Field
                  data-testid="UpdateAccountDetailsFormPhoneNumberField"
                  component={TextField}
                  type="tel"
                  name="phone-number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldError(e.target.name, undefined)
                    setFieldValue(e.target.name, e.target.value)
                  }}
                />
                <p className="text-sm mt-0.5">
                  {t('account.change-personal-details.phone-number-hint')}
                </p>
              </FormField>
            )}
            {customerTaxReference &&
              customerType !== ACCOUNT_TYPE_BUSINESS &&
              locale === 'es-es' && (
                <FormField
                  required
                  inputId="taxReference"
                  label={t('form.field.tax-reference.label')}
                  data-testid="UpdateAccountDetailsFormTaxReference"
                  error={touched['taxReference'] && errors['taxReference']}
                >
                  <Field
                    data-testid="UpdateAccountDetailsFormTaxReferenceField"
                    component={TextField}
                    type="text"
                    name="taxReference"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldError(e.target.name, undefined)
                      setFieldValue(e.target.name, e.target.value)
                    }}
                  />
                </FormField>
              )}
            {/* The country field is disabled as customers will not be able to change it for now */}
            <Button
              type="submit"
              className="w-full mt-4"
              isLoading={isSubmitting}
              data-testid="UpdateAccountDetailsFormButton"
            >
              {t('account.change-personal-details.confirm-changes')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
