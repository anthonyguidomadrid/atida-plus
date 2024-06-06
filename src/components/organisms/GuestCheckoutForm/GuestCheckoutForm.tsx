import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, getIn, Field } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { Notification } from '~components/atoms/Notification'
import { TextField } from '~components/atoms/TextField'
import * as Yup from 'yup'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { Trans, useTranslation } from 'react-i18next'
import {
  zipCodeRegexByLocale,
  taxReferenceRegexByLocale,
  removeEmailTypos,
  getSubdivisionsPerLocale,
  recursiveTrimObjectValues,
  useDetectOutsideClick,
  scrollToElement
} from '~helpers'
import { useRouter } from 'next/router'
import { SPECIAL_TAX_PROVINCES_ES } from '~config/constants/subdivisions-per-locale'
import {
  MAXIMUM_LENGTH_100,
  MAXIMUM_LENGTH_255
} from '~config/constants/maximum-length'
import { Checkbox } from '~components/atoms/Checkbox'
import { updateNestedValue } from '~helpers/updateNestedValue'
import { selectWasLoading } from '~domains/checkout'
import classNames from 'classnames'
import { Address } from '~domains/checkout/types'
import { selectCouponIsLoading } from '~domains/basket'
import debounce from 'lodash/debounce'
import { getQueryForLookup } from '~helpers/addressLookup'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  AddressSuggestionFeatureFlagProps,
  selectIsAnyAddressLoading,
  validateAddressSelectors,
  validateAddressTrigger,
  ValidatedAddress
} from '~domains/address'
import { normalizeSubdivision } from '~helpers/normalizeSubdivision'
import { DEFAULT_ADDRESS_SUGGESTION_MIN_QUERY_LENGTH } from '~config/constants/address-lookup'
import { SuggestedAddresses } from '~components/atoms/SuggestedAddresses'
import { selectCustomerDetails } from '~domains/account/selectors/customer'
import { Customer, CustomerAddress } from '~domains/account'
import type { TFunction } from 'i18next'
import { isTaxRegionValidByProvinces } from '~helpers/isTaxRegionValidByProvinces'
import { isTaxRegionValidByZipcodes } from '~helpers/isTaxRegionValidByZipcodes'
import { Link } from '~components/atoms/Link'
import { triggerReportEmailSubscription } from '~domains/analytics'
import type { ActionMeta, SingleValue } from 'react-select'
import { SubdivisionsOption } from '../AddressForm'
import { OptionData, SelectField } from '~components/atoms/SelectField'

// Common field types for shipping and billing
export type GuestCheckoutFormAddressValues = {
  address1: string
  houseNumber?: string
  addition?: string
  zipCode: string
  city: string
  subdivision?: string
  country: string
  taxReference?: string
}

export type GuestCheckoutFormValues = {
  firstName: string
  lastName: string
  email: string
  newsletter?: boolean
  phoneNumber: string
  shipping: GuestCheckoutFormAddressValues
  billing?: GuestCheckoutFormAddressValues
  isBillingSameAsShipping: boolean
}

export type GuestCheckoutFormProps = {
  isGuest: boolean
  taxReference?: string
  initialShipping?: Address | CustomerAddress
  initialBilling?: Address | CustomerAddress
  billingSameAsShipping?: boolean
  newsletter?: boolean
  notification?: JSX.Element
  onSubmit?: (values: GuestCheckoutFormValues) => void
}

const getInitialFormValues = ({
  initialShipping,
  initialBilling,
  taxReference,
  customerDetails,
  isBillingSameAsShipping,
  subscribeToNewsletter,
  t
}: {
  t: TFunction
  initialShipping?: Address | CustomerAddress
  initialBilling?: Address | CustomerAddress
  taxReference?: string
  customerDetails?: Partial<Customer>
  isBillingSameAsShipping: boolean
  subscribeToNewsletter: boolean
}) => {
  return {
    firstName: initialShipping?.firstName ?? customerDetails?.firstName ?? '',
    lastName: initialShipping?.lastName ?? customerDetails?.lastName ?? '',
    email: (initialShipping as Address)?.email ?? customerDetails?.email ?? '',
    subscribeToNewsletter,
    phoneNumber: initialShipping?.phone ?? '',
    isBillingSameAsShipping,
    shipping: {
      address1: initialShipping?.address1 ?? '',
      zipCode: initialShipping?.zipCode ?? '',
      city: initialShipping?.city ?? '',
      subdivision: initialShipping?.province ?? initialShipping?.district ?? '',
      houseNumber: initialShipping?.houseNumber ?? '',
      addition: initialShipping?.addition ?? '',
      country: t('create-account.prefilled-country'),
      taxReference: taxReference ?? ''
    },
    billing: {
      address1: isBillingSameAsShipping ? '' : initialBilling?.address1 ?? '',
      zipCode: isBillingSameAsShipping ? '' : initialBilling?.zipCode ?? '',
      city: isBillingSameAsShipping ? '' : initialBilling?.city ?? '',
      subdivision: isBillingSameAsShipping
        ? ''
        : initialBilling?.province ?? initialBilling?.district ?? '',
      houseNumber: isBillingSameAsShipping
        ? ''
        : initialBilling?.houseNumber ?? '',
      addition: isBillingSameAsShipping ? '' : initialBilling?.addition ?? '',
      country: t('create-account.prefilled-country'),
      taxReference: taxReference ?? ''
    }
  }
}

export const GuestCheckoutForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & GuestCheckoutFormProps
> = ({
  isGuest,
  initialShipping,
  initialBilling,
  taxReference,
  billingSameAsShipping = true,
  newsletter = false,
  notification,
  onSubmit,
  className,
  ...props
}) => {
  const addressDataRef = useRef({
    billing: initialBilling,
    shipping: initialShipping,
    taxReference
  })
  const { locale } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isLargerThanPhone = useBreakpoint(breakpoints.xs)
  const subdivisionsPerLocale = getSubdivisionsPerLocale(locale ?? '')
  const addressAndHouseNumberRow = useRef<HTMLDivElement>(null)
  const addressFieldAndDropdown = useRef<HTMLDivElement>(null)

  const isAddressSuggestionEnabled: AddressSuggestionFeatureFlagProps = useFeatureFlag(
    FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION
  ) as AddressSuggestionFeatureFlagProps

  const isMultipleTaxRegionsValidationEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION
  )

  const selectDataIsLoading = useSelector(selectWasLoading)
  const couponIsLoading = useSelector(selectCouponIsLoading)
  const suggestedAddresses = useSelector(
    validateAddressSelectors.selectSuggestedAddresses
  )
  const customerDetails = useSelector(selectCustomerDetails)
  const isAddressUpdating = useSelector(selectIsAnyAddressLoading)

  const firstNameRegex = /^.{1,100}$/
  const lastNameRegex = /^.{1,100}$/
  const phoneRegex = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
  const address1Regex = /^.{1,100}$/
  const houseNumberRegex = /^.{1,100}$/
  const additionRegex = /^.{1,100}$/
  const subdivisionRegex = new RegExp(
    subdivisionsPerLocale.map(subdivision => subdivision.label).join('|')
  )
  const cityRegex = /^.{2,100}$/
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(
    billingSameAsShipping
  )
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(newsletter)
  const [showEmailWarning, setShowEmailWarning] = useState(false)
  const [emailWithoutTypos, setEmailWithoutTypos] = useState<
    string | undefined
  >(undefined)
  const [
    selectedShippingSubdivision,
    setSelectedShippingSubdivision
  ] = useState(initialShipping?.province ?? initialShipping?.district ?? '')
  const [selectedBillingSubdivision, setSelectedBillingSubdivision] = useState(
    billingSameAsShipping
      ? ''
      : initialBilling?.province ?? initialBilling?.district ?? ''
  )
  const [validTaxRegionsZipCode, setValidTaxRegionsZipCode] = useState(true)
  const [validTaxRegionsProvince, setValidTaxRegionsProvince] = useState(true)
  const initialFormValues = getInitialFormValues({
    initialBilling,
    initialShipping,
    taxReference,
    isBillingSameAsShipping,
    customerDetails,
    subscribeToNewsletter: subscribeToNewsletter,
    t
  })

  const [formValues, setFormValues] = useState<GuestCheckoutFormValues>(
    initialFormValues
  )
  const [
    showSuggestedAddresses,
    setShowSuggestedAddresses
  ] = useDetectOutsideClick(addressFieldAndDropdown, false)
  const [selectedAddress, setSelectedAddress] = useState<ValidatedAddress>({})

  const subdivisionsPerLocaleOptions = subdivisionsPerLocale.map(
    ({ label }) => ({ label, value: label })
  )

  const addressSuggestionMinQueryLength =
    isAddressSuggestionEnabled.minQueryLength ??
    DEFAULT_ADDRESS_SUGGESTION_MIN_QUERY_LENGTH

  const isSpecialTaxProvince = (type = 'shipping'): boolean =>
    SPECIAL_TAX_PROVINCES_ES.some(
      province =>
        province.label ===
        (type === 'shipping'
          ? selectedShippingSubdivision
          : selectedBillingSubdivision)
    )

  const trimWhitespaces = (data: string) => {
    return data.replace(/\s*/g, '')
  }

  const customPhoneValidation = (data: string | undefined): boolean => {
    if (!data) {
      return true
    }

    const value = trimWhitespaces(data)
    const matches = value.match(phoneRegex)

    return matches ? matches.length > 0 : false
  }
  const handleOnChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    values: GuestCheckoutFormValues
  ) => {
    const updatedValues = updateNestedValue(
      e.target.name,
      values,
      e.target.value
    )
    setFormValues(updatedValues as GuestCheckoutFormValues)
  }

  const handleAddressUpdateFromProps = useCallback(() => {
    if (
      !isGuest &&
      (initialBilling !== addressDataRef.current.billing ||
        initialShipping !== addressDataRef.current.shipping)
    ) {
      addressDataRef.current.billing = initialBilling
      addressDataRef.current.shipping = initialShipping

      setFormValues(initialFormValues)
      return
    }
  }, [initialBilling, initialFormValues, initialShipping, isGuest])

  const handleSuggestAddresses = useCallback(
    debounce(
      (values: GuestCheckoutFormAddressValues) => {
        const query = getQueryForLookup(values)
        const shouldValidate =
          Object.keys(isAddressSuggestionEnabled).length > 0 &&
          values?.address1?.match(address1Regex)

        if (shouldValidate) {
          dispatch(
            validateAddressTrigger({
              query
            })
          )
        }
      },
      isAddressSuggestionEnabled.debounceMs ?? 200,
      {
        leading: false,
        trailing: true
      }
    ),
    []
  )

  const addressDataValidationSchema = {
    address1: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(address1Regex, t('account.address-form.city-format'))
      .required(t('account.address-form.address-required')),
    zipCode: Yup.string()
      .trim()
      .matches(
        zipCodeRegexByLocale(locale ?? ''),
        t('account.address-form.zip-code-format')
      )
      .required(t('account.address-form.zip-code-required'))
      .test(
        'Tax Region Validation - ZipCode',
        t('account.address-form.zip-code-format'),
        (value, field) => {
          const isBilling = field.path === 'billing.zipCode'
          const isValid = isTaxRegionValidByZipcodes(
            formValues.shipping.zipCode,
            value ?? ''
          )
          if (
            isMultipleTaxRegionsValidationEnabled &&
            isBilling &&
            locale === 'es-es'
          ) {
            setValidTaxRegionsZipCode(isValid)
            return isValid
          }
          return true
        }
      ),
    city: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(cityRegex, t('account.address-form.city-format'))
      .required(t('account.address-form.city-required')),
    ...(locale !== 'de-de' && {
      subdivision: Yup.string()
        .matches(subdivisionRegex, t('account.address-form.subdivision-format'))
        .required(t('account.address-form.subdivision-required'))
        .test(
          'Tax Region Validation - Subdivision',
          t('account.address-form.subdivision-format'),
          (value, field) => {
            const isBilling = field.path === 'billing.subdivision'
            const isValid = isTaxRegionValidByProvinces(
              formValues.shipping.subdivision ?? '',
              value ?? ''
            )
            if (
              isMultipleTaxRegionsValidationEnabled &&
              isBilling &&
              locale === 'es-es'
            ) {
              setValidTaxRegionsProvince(isValid)
              return isValid
            }
            return true
          }
        )
    }),
    houseNumber: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(houseNumberRegex, t('account.address-form.house-number-format'))
      .required(t('account.address-form.house-number-required')),
    addition: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(additionRegex, t('account.address-form.appendix-format')),
    country: Yup.string().required(t('account.address-form.country-required'))
  }

  const personalDataValidationSchema = {
    email: Yup.string()
      .lowercase()
      .email(t('create-account.invalid-email-format'))
      .required(t('create-account.email.required')),
    firstName: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(firstNameRegex, t('account.address-form.first-name-format'))
      .required(t('account.address-form.first-name-required')),
    lastName: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(lastNameRegex, t('account.address-form.last-name-format'))
      .required(t('account.address-form.last-name-required')),
    phoneNumber: Yup.string()
      .max(
        MAXIMUM_LENGTH_255,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_255
        })
      )
      .test(
        'customPhoneValidation',
        t('create-account.phone-number-format'),
        value => customPhoneValidation(value)
      )
      .required(t('create-account.phone-number.required'))
  }

  const validationSchema = Yup.object({
    ...personalDataValidationSchema,
    shipping: Yup.object({
      ...addressDataValidationSchema,
      ...(isSpecialTaxProvince('shipping') && {
        taxReference: Yup.string()
          .matches(
            taxReferenceRegexByLocale(locale ?? '', true),
            t('account.address-form.tax-reference-format')
          )
          .required(t('account.address-form.tax-reference-required'))
      })
    }),
    ...(!isBillingSameAsShipping && {
      billing: Yup.object({
        ...addressDataValidationSchema,
        ...(isSpecialTaxProvince('billing') && {
          taxReference: Yup.string()
            .matches(
              taxReferenceRegexByLocale(locale ?? '', true),
              t('account.address-form.tax-reference-format')
            )
            .required(t('account.address-form.tax-reference-required'))
        })
      })
    })
  })

  useEffect(() => {
    if (notification || !validTaxRegionsZipCode || !validTaxRegionsProvince)
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [notification, validTaxRegionsZipCode, validTaxRegionsProvince])

  useEffect(() => {
    if (Object.keys(selectedAddress).length > 0) {
      const formatedSubdivision = normalizeSubdivision(
        selectedAddress?.address?.county,
        locale
      )
      const isValidSubdivision = subdivisionsPerLocale
        .map(subdivision => subdivision.label)
        .includes(formatedSubdivision)
      isValidSubdivision && setSelectedShippingSubdivision(formatedSubdivision)
      setFormValues({
        ...formValues,
        shipping: {
          ...formValues.shipping,
          address1: selectedAddress.address?.street ?? '',
          zipCode: selectedAddress.address?.postalCode ?? '',
          city: selectedAddress?.address?.city ?? '',
          ...(isValidSubdivision && {
            subdivision: formatedSubdivision
          })
        }
      })
      setShowSuggestedAddresses(false)
      document
        .getElementById('shipping.houseNumber')
        ?.focus({ preventScroll: true })
      scrollToElement(addressAndHouseNumberRow.current)
    }
  }, [selectedAddress])

  useEffect(() => {
    customerDetails &&
      setFormValues({
        ...formValues,
        firstName: customerDetails?.firstName ?? '',
        lastName: customerDetails?.lastName ?? '',
        email: customerDetails?.email ?? ''
      })
  }, [customerDetails])

  useEffect(() => {
    handleAddressUpdateFromProps()
  }, [handleAddressUpdateFromProps])

  return (
    <section
      data-testid="guestCheckoutForm"
      className={classNames(className, 'w-full')}
    >
      {notification}
      {!(validTaxRegionsZipCode && validTaxRegionsProvince) && (
        <Notification
          className="w-full mb-3 -mt-1"
          type="warning"
          title={t('checkout.notification.invalid-tax-regions.title')}
          content={t('checkout.notification.invalid-tax-regions.body')}
        />
      )}
      <Formik<GuestCheckoutFormValues>
        enableReinitialize={true}
        initialValues={formValues}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => {
          values.isBillingSameAsShipping = isBillingSameAsShipping
          values.newsletter = subscribeToNewsletter
          if (!isSpecialTaxProvince('shipping'))
            values.shipping.taxReference = undefined

          if (values.billing && !isSpecialTaxProvince('billing')) {
            values.billing.taxReference = undefined
          }
          recursiveTrimObjectValues(values)
          if (values?.phoneNumber) {
            values.phoneNumber = trimWhitespaces(values.phoneNumber)
          }
          onSubmit?.(values)

          if (values?.newsletter && values?.email) {
            dispatch(
              triggerReportEmailSubscription({
                email: values?.email,
                subscribed_from: 'guest_checkout',
                email_list: 'newsletter'
              })
            )
          }
        }}
        data-testid="guestCheckoutForm"
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, setFieldError }) => {
          return (
            <Form className="w-full" noValidate {...props}>
              <>
                <div className={'sm:grid sm:grid-cols-4 sm:gap-1'}>
                  <FormField
                    inputId="firstName"
                    label={t('form.field.first-name.label')}
                    className="mb-2 sm:col-span-2"
                    data-testid="guestCheckoutFormFirstName"
                    error={touched.firstName && errors.firstName}
                  >
                    <Field
                      component={TextField}
                      type="text"
                      name="firstName"
                      data-testid="guestCheckoutFormFirstNameField"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        setFieldError(e.target.name, undefined)
                      }}
                    />
                  </FormField>
                  <FormField
                    inputId="lastName"
                    label={t('form.field.last-name.label')}
                    className="mb-2 sm:col-span-2"
                    data-testid="guestCheckoutFormLastName"
                    error={touched.lastName && errors.lastName}
                  >
                    <Field
                      component={TextField}
                      type="text"
                      name="lastName"
                      data-testid="guestCheckoutFormLastNameField"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        setFieldError(e.target.name, undefined)
                      }}
                    />
                  </FormField>
                </div>
                {isGuest && (
                  <FormField
                    inputId="email"
                    label={t('form.field.email.label')}
                    data-testid="guestCheckoutFormEmail"
                    error={touched.email && errors.email}
                    onBlur={() => {
                      setShowEmailWarning(!!emailWithoutTypos)
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      values.email = e.target.value
                      setEmailWithoutTypos(removeEmailTypos(e.target.value))
                    }}
                  >
                    <Field
                      component={TextField}
                      type="email"
                      name="email"
                      data-testid="guestCheckoutFormEmailField"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        setFieldError(e.target.name, undefined)
                      }}
                    />
                    {!errors.email && showEmailWarning && emailWithoutTypos && (
                      <Trans
                        data-testid="checkoutEmailWarningMessage"
                        i18nKey="checkout.guest-checkout.email-suggestion"
                        values={{
                          emailWithoutTypos: emailWithoutTypos
                        }}
                        components={{
                          button: (
                            <button
                              className="flex underline text-left text-primary-caribbean-green-dark"
                              onClick={() => {
                                setEmailWithoutTypos(
                                  removeEmailTypos(
                                    emailWithoutTypos ?? values.email
                                  )
                                )
                                setShowEmailWarning(false)
                                setFormValues({
                                  ...formValues,
                                  email: emailWithoutTypos
                                })
                              }}
                            />
                          ),
                          span: (
                            <span className="flex flex-row gap-0.5 mt-1 text-sm-base" />
                          )
                        }}
                      />
                    )}
                  </FormField>
                )}
                <div
                  ref={addressAndHouseNumberRow}
                  className="grid grid-cols-4 gap-1 xs-only:relative"
                >
                  <div
                    className="col-span-3 sm:relative"
                    ref={addressFieldAndDropdown}
                  >
                    <FormField
                      inputId="shipping.address1"
                      label={t('form.field.address1.label')}
                      className="mb-2 col-span-3"
                      data-testid="ShippingAddressFormAddress1"
                      error={
                        getIn(touched, 'shipping.address1') &&
                        getIn(errors, 'shipping.address1')
                      }
                    >
                      <Field
                        data-testid="ShippingAddressFormAddress1Field"
                        component={TextField}
                        type="text"
                        name="shipping.address1"
                        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldError(e.target.name, undefined)
                          setShowSuggestedAddresses(
                            e.target.value.length >
                              addressSuggestionMinQueryLength
                          )
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleOnChangeField(e, values)
                          setFieldError(e.target.name, undefined)
                          e.target.value.length >
                            addressSuggestionMinQueryLength &&
                            handleSuggestAddresses(values.shipping)

                          setShowSuggestedAddresses(
                            e.target.value.length >
                              addressSuggestionMinQueryLength
                          )
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) =>
                          e.shiftKey &&
                          e.key === 'Tab' &&
                          setShowSuggestedAddresses(false)
                        }
                      />
                    </FormField>
                    <SuggestedAddresses
                      setSelectedAddress={setSelectedAddress}
                      showSuggestedAddresses={showSuggestedAddresses}
                      suggestedAddresses={suggestedAddresses}
                    />
                  </div>
                  <FormField
                    inputId="shipping.houseNumber"
                    label={t('form.field.house-number.label')}
                    data-testid="ShippingAddressFormHouseNumber"
                    error={
                      getIn(touched, 'shipping.houseNumber') &&
                      getIn(errors, 'shipping.houseNumber')
                    }
                  >
                    <Field
                      data-testid="ShippingAddressFormHouseNumberField"
                      component={TextField}
                      type="text"
                      name="shipping.houseNumber"
                      onFocus={() => setShowSuggestedAddresses(false)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        setFieldError(e.target.name, undefined)
                      }}
                    />
                  </FormField>
                </div>
                <FormField
                  inputId="shipping.addition"
                  label={t('form.field.addition.label')}
                  data-testid="ShippingAddressFormAddition"
                  error={
                    getIn(touched, 'shipping.addition') &&
                    getIn(errors, 'shipping.addition')
                  }
                >
                  <Field
                    placeholder={t('account.address-form.addition-placeholder')}
                    data-testid="ShippingAddressFormAdditionField"
                    component={TextField}
                    type="text"
                    name="shipping.addition"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleOnChangeField(e, values)
                      setFieldError(e.target.name, undefined)
                    }}
                  />
                </FormField>
                <div
                  className={`grid ${
                    isLargerThanPhone ? 'grid-cols-8' : 'grid-rows-2'
                  } gap-1`}
                >
                  <FormField
                    inputId="shipping.zipCode"
                    label={t('form.field.zip-code.label')}
                    data-testid="ShipppingAddressFormZipCode"
                    className={`mb-2 ${
                      isLargerThanPhone ? 'col-span-3' : 'col-span-4'
                    }`}
                    error={
                      getIn(touched, 'shipping.zipCode') &&
                      getIn(errors, 'shipping.zipCode')
                    }
                  >
                    <Field
                      data-testid="ShippingAddressFormZipCodeField"
                      component={TextField}
                      type="text"
                      name="shipping.zipCode"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        setFieldError(e.target.name, undefined)
                      }}
                    />
                  </FormField>
                  <FormField
                    inputId="shipping.city"
                    label={t('form.field.city.label')}
                    data-testid="ShippingAddressFormCity"
                    className={`mb-2 ${
                      isLargerThanPhone ? 'col-span-5' : 'col-span-4'
                    }`}
                    error={
                      getIn(touched, 'shipping.city') &&
                      getIn(errors, 'shipping.city')
                    }
                  >
                    <Field
                      data-testid="ShippingAddressFormCityField"
                      component={TextField}
                      type="text"
                      name="shipping.city"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        setFieldError(e.target.name, undefined)
                      }}
                    />
                  </FormField>
                </div>
                {locale !== 'de-de' && (
                  <FormField
                    required
                    inputId="shippingSubdivision"
                    label={t('form.field.subdivision.label')}
                    data-testid="AddressFormSubdivision"
                    error={
                      getIn(touched, 'shipping.subdivision') &&
                      getIn(errors, 'shipping.subdivision')
                    }
                  >
                    <Field
                      inputId="subdivision"
                      name="shipping.subdivision"
                      component={SelectField}
                      value={formValues.shipping.subdivision}
                      options={subdivisionsPerLocaleOptions}
                      placeholder={t('shared.select')}
                      onSelect={(
                        option: SingleValue<SubdivisionsOption>,
                        actionMeta: ActionMeta<OptionData<SubdivisionsOption>>
                      ) => {
                        setFieldError(actionMeta.name as string, undefined)
                        if (!option) return
                        handleOnChangeField(
                          {
                            target: {
                              value: option.value,
                              name: actionMeta.name as string
                            }
                          } as React.ChangeEvent<
                            HTMLInputElement | HTMLSelectElement
                          >,
                          values
                        )
                        setSelectedShippingSubdivision(option.value)
                      }}
                    />
                  </FormField>
                )}
                {isSpecialTaxProvince('shipping') && (
                  <Notification
                    data-testid="taxRecalculationNotification"
                    className="mb-2"
                    type="info"
                    title={t(
                      'checkout.guest-checkout.special-region-tax.content'
                    )}
                  />
                )}
                {/* The country field is disabled as customers will not be able to change it for now */}
                <FormField
                  className="pointer-events-none mb-2"
                  inputId="shipping.country"
                  label={t('form.field.country.label')}
                  data-testid="AddressFormCountry"
                  error={
                    getIn(touched, 'shipping.country') &&
                    getIn(errors, 'shipping.country')
                  }
                >
                  <Field
                    data-testid="ShippingAddressFormCountryField"
                    component={TextField}
                    type="text"
                    name="shipping.country"
                    className="disabled:bg-primary-white disabled:text-ui-grey-default-alt disabled:pointer-events-none"
                    onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldError(e.target.name, undefined)
                    }}
                    disabled
                  />
                </FormField>
                {isSpecialTaxProvince('shipping') && (
                  <div className="bg-ui-guyabano p-2 mb-2">
                    <FormField
                      inputId="shipping.taxReference"
                      label={t('form.field.tax-reference.label')}
                      data-testid="ShippingAddressFormTaxReference"
                      error={getIn(errors, 'shipping.taxReference')}
                    >
                      <Field
                        data-testid="ShippingAddressFormTaxReferenceField"
                        component={TextField}
                        type="text"
                        name="shipping.taxReference"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (values?.billing)
                            values.billing.taxReference = e.target.value
                          handleOnChangeField(e, values)
                          setFieldError(e.target.name, undefined)
                        }}
                      />
                      <p className="mt-1 text-sm">
                        {t('account.address-form.tax-reference-hint')}
                      </p>
                    </FormField>
                  </div>
                )}

                <FormField
                  inputId="phoneNumber"
                  label={t('form.field.phone-number.label')}
                  data-testid="guestCheckoutFormPhoneNumber"
                  error={touched.phoneNumber && errors.phoneNumber}
                >
                  <Field
                    component={TextField}
                    type="tel"
                    name="phoneNumber"
                    data-testid="guestCheckoutFormPhoneNumberField"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleOnChangeField(e, values)
                      setFieldError(e.target.name, undefined)
                    }}
                  />
                  <p className="text-sm mt-0.5 text-ui-grey-dark">
                    {t('create-account.phone-number-hint')}
                  </p>
                </FormField>

                {/* Billing Address Form */}
                <>
                  <Checkbox
                    label={t('account.billing-same-as-delivery.label')}
                    id={t('account.billing-same-as-delivery.label')}
                    isChecked={isBillingSameAsShipping}
                    onChange={() =>
                      setIsBillingSameAsShipping(!isBillingSameAsShipping)
                    }
                    className="pt-1 mb-3"
                    data-testid="BillingSameAsDeliveryCheckbox"
                    variant="primary"
                    isFilter
                  />
                  {isBillingSameAsShipping && (
                    <Checkbox
                      label={
                        <Trans
                          i18nKey={
                            'checkout.guest-checkout.subscribe-newsletter'
                          }
                          components={{
                            a: <Link target="_blank" />
                          }}
                        />
                      }
                      id={t(
                        'checkout.guest-checkout.subscribe-newsletter.label'
                      )}
                      isChecked={subscribeToNewsletter}
                      onChange={() =>
                        setSubscribeToNewsletter(!subscribeToNewsletter)
                      }
                      className="mb-3 sm:mb-4"
                      data-testid="IsNewsletterSubscribed"
                      variant="primary"
                      isFilter
                      isCheckboxCentered={false}
                    />
                  )}
                  {!isBillingSameAsShipping && (
                    <>
                      <div className="grid grid-cols-4 gap-1">
                        <FormField
                          inputId="billing.address1"
                          label={t('form.field.address1.label')}
                          className="mb-2 col-span-3"
                          data-testid="BillingAddressFormAddress1"
                          error={
                            getIn(touched, 'billing.address1') &&
                            getIn(errors, 'billing.address1')
                          }
                        >
                          <Field
                            data-testid="BillingAddressFormAddress1Field"
                            component={TextField}
                            type="text"
                            name="billing.address1"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleOnChangeField(e, values)
                              setFieldError(e.target.name, undefined)
                            }}
                          />
                        </FormField>
                        <FormField
                          inputId="billing.houseNumber"
                          label={t('form.field.house-number.label')}
                          data-testid="BillingAddressFormHouseNumber"
                          error={
                            getIn(touched, 'billing.houseNumber') &&
                            getIn(errors, 'billing.houseNumber')
                          }
                        >
                          <Field
                            data-testid="BillingAddressFormHouseNumberField"
                            component={TextField}
                            type="text"
                            name="billing.houseNumber"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleOnChangeField(e, values)
                              setFieldError(e.target.name, undefined)
                            }}
                          />
                        </FormField>
                      </div>
                      <FormField
                        inputId="billing.addition"
                        label={t('form.field.addition.label')}
                        data-testid="BillingAddressFormAddition"
                        error={
                          getIn(touched, 'billing.addition') &&
                          getIn(errors, 'billing.addition')
                        }
                      >
                        <Field
                          placeholder={t(
                            'account.address-form.addition-placeholder'
                          )}
                          data-testid="BillingAddressFormAdditionField"
                          component={TextField}
                          type="text"
                          name="billing.addition"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleOnChangeField(e, values)
                            setFieldError(e.target.name, undefined)
                          }}
                        />
                      </FormField>
                      <div
                        className={`grid ${
                          isLargerThanPhone ? 'grid-cols-8' : 'grid-rows-2'
                        } gap-1`}
                      >
                        <FormField
                          inputId="billing.zipCode"
                          label={t('form.field.zip-code.label')}
                          data-testid="BillingAddressFormZipCode"
                          className={`mb-2 ${
                            isLargerThanPhone ? 'col-span-3' : 'col-span-4'
                          }`}
                          error={
                            getIn(touched, 'billing.zipCode') &&
                            getIn(errors, 'billing.zipCode')
                          }
                        >
                          <Field
                            data-testid="BillingAddressFormZipCodeField"
                            component={TextField}
                            type="text"
                            name="billing.zipCode"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleOnChangeField(e, values)
                              setFieldError(e.target.name, undefined)
                            }}
                          />
                        </FormField>
                        <FormField
                          inputId="billing.city"
                          label={t('form.field.city.label')}
                          data-testid="BillingAddressFormCity"
                          className={`mb-2 ${
                            isLargerThanPhone ? 'col-span-5' : 'col-span-4'
                          }`}
                          error={
                            getIn(touched, 'billing.city') &&
                            getIn(errors, 'billing.city')
                          }
                        >
                          <Field
                            data-testid="BillingAddressFormCityField"
                            component={TextField}
                            type="text"
                            name="billing.city"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleOnChangeField(e, values)
                              setFieldError(e.target.name, undefined)
                            }}
                          />
                        </FormField>
                      </div>
                      {locale !== 'de-de' && (
                        <FormField
                          required
                          inputId="billingSubdivision"
                          label={t('form.field.subdivision.label')}
                          data-testid="AddressFormSubdivision"
                          error={
                            getIn(touched, 'billing.subdivision') &&
                            getIn(errors, 'billing.subdivision')
                          }
                        >
                          <Field
                            inputId="subdivision"
                            name="billing.subdivision"
                            component={SelectField}
                            value={formValues?.billing?.subdivision}
                            options={subdivisionsPerLocaleOptions}
                            placeholder={t('shared.select')}
                            onSelect={(
                              option: SingleValue<SubdivisionsOption>,
                              actionMeta: ActionMeta<
                                OptionData<SubdivisionsOption>
                              >
                            ) => {
                              setFieldError(
                                actionMeta.name as string,
                                undefined
                              )
                              if (!option) return
                              handleOnChangeField(
                                {
                                  target: {
                                    value: option.value,
                                    name: actionMeta.name as string
                                  }
                                } as React.ChangeEvent<
                                  HTMLInputElement | HTMLSelectElement
                                >,
                                values
                              )
                              setSelectedBillingSubdivision(option.value)
                            }}
                          />
                        </FormField>
                      )}
                      <FormField
                        className={classNames('pointer-events-none mb-2', {
                          'mb-3': !isSpecialTaxProvince('billing')
                        })}
                        inputId="billingCountry"
                        label={t('form.field.country.label')}
                        data-testid="BillingAddressFormCountry"
                        error={
                          getIn(touched, 'billing.country') &&
                          getIn(errors, 'billing.country')
                        }
                      >
                        <Field
                          data-testid="BillingAddressFormCountryField"
                          component={TextField}
                          type="text"
                          name="billing.country"
                          className="disabled:bg-primary-white disabled:text-ui-grey-default-alt pointer-events-none"
                          onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldError(e.target.name, undefined)
                          }}
                          disabled
                        />
                      </FormField>
                      {isSpecialTaxProvince('billing') &&
                        !isSpecialTaxProvince('shipping') && (
                          <div className="bg-ui-guyabano p-2 mb-3">
                            <FormField
                              inputId="billing.taxReference"
                              label={t('form.field.tax-reference.label')}
                              className="mb-0"
                              data-testid="BillingAddressFormTaxReference"
                              error={getIn(errors, 'billing.taxReference')}
                            >
                              <Field
                                data-testid="BillingAddressFormTaxReferenceField"
                                component={TextField}
                                type="text"
                                name="billing.taxReference"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  values.shipping.taxReference = e.target.value
                                  handleOnChangeField(e, values)
                                  setFieldError(e.target.name, undefined)
                                }}
                              />
                              <p className="mt-1 text-sm">
                                {t('account.address-form.tax-reference-hint')}
                              </p>
                            </FormField>
                          </div>
                        )}
                      <Checkbox
                        label={
                          <Trans
                            i18nKey={
                              'checkout.guest-checkout.subscribe-newsletter'
                            }
                            components={{
                              a: <Link target="_blank" />
                            }}
                          />
                        }
                        id={t(
                          'checkout.guest-checkout.subscribe-newsletter.label'
                        )}
                        isChecked={subscribeToNewsletter}
                        onChange={() =>
                          setSubscribeToNewsletter(!subscribeToNewsletter)
                        }
                        className="mb-3 sm:mb-4"
                        data-testid="IsNewsletterSubscribed"
                        variant="primary"
                        isFilter
                        isCheckboxCentered={false}
                      />
                    </>
                  )}
                </>
              </>
              <Button
                type="submit"
                className="w-full"
                data-testid="guestCheckoutFormButton"
                isLoading={
                  selectDataIsLoading || couponIsLoading || isAddressUpdating
                }
                variant="secondary"
              >
                {t('checkout.guest-checkout-form.continue-to-shipping-method')}
              </Button>
            </Form>
          )
        }}
      </Formik>
    </section>
  )
}
