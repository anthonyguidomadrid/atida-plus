import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useRef,
  useState,
  useEffect,
  Fragment,
  useCallback
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, getIn, Field, useFormikContext } from 'formik'
import type { FieldProps, FormikProps } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { Notification } from '~components/atoms/Notification'
import { TextField } from '~components/atoms/TextField'
import { PasswordStrengthIndicator } from '~components/molecules/PasswordStrengthIndicator'
import { ReactComponent as AtidaCoins } from '~assets/svg/navigation-24px/AtidaCoins.svg'
import { RadioInput } from '~components/atoms/RadioInput'
import {
  triggerReportAccountCreatedAttempted,
  triggerReportAccountCreationStepCompleted
} from '~domains/analytics'
import {
  AccountType,
  customerCheckTrigger,
  selectIsLoading,
  customerCheckSelectors,
  createCustomerProgressSelectors,
  setCurrentStep
} from '~domains/account'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import classNames from 'classnames'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { Trans, useTranslation } from 'react-i18next'
import {
  scrollToElement,
  zipCodeRegexByLocale,
  removeEmailTypos,
  getSubdivisionsPerLocale,
  recursiveTrimObjectValues,
  useDetectOutsideClick,
  GetPasswordStrength,
  SECURITY_LEVEL_STRONG
} from '~helpers'
import { Link } from '../../atoms/Link'
import { useRouter } from 'next/router'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { SPECIAL_TAX_PROVINCES_ES } from '~config/constants/subdivisions-per-locale'
import { Checkbox } from '~components/atoms/Checkbox'
import {
  ACCOUNT_TYPE_BUSINESS,
  ACCOUNT_TYPE_PERSONAL
} from '~config/constants/account-types'
import {
  validateAddressSelectors,
  validateAddressTrigger,
  validateAddressReset,
  ValidatedAddress,
  AddressSuggestionFeatureFlagProps
} from '~domains/address'
import {
  getQualifiedQueryForLookup,
  getQueryForLookup
} from '~helpers/addressLookup'
import { updateNestedValue } from '~helpers/updateNestedValue'
import { normalizeSubdivision } from '~helpers/normalizeSubdivision'
import debounce from 'lodash/debounce'
import { DEFAULT_ADDRESS_SUGGESTION_MIN_QUERY_LENGTH } from '~config/constants/address-lookup'
import { SuggestedAddresses } from '~components/atoms/SuggestedAddresses'
import {
  STEP_PERSONAL_DETAILS,
  STEP_ADDRESS_DETAILS,
  EMAIL_NOT_AVAILABLE_LOGIN_NOTIFICATION_KEY,
  EMAIL_NOT_AVAILABLE_RESET_PASSWORD_NOTIFICATION_KEY,
  PASSWORD_FIELD_SCROLL_MULTIPLIER,
  PRIVACY_POLICY_NOTIFICATION_KEY
} from '~config/constants/account-creation'
import { ACCOUNT_CREATION_REGEX } from '~config/constants/accout-creation-regex'
import {
  dateOfBirthInputMask,
  scrollToError,
  trimWhitespaces
} from './validationHelpers'
import { useValidationSchema } from './useValidationSchema'
import { getDefaultLocale } from '~domains/translated-routes'
import { isSpecialRegionZipCode } from '~helpers/isTaxRegionValidByZipcodes'
import { OptionData, SelectField } from '~components/atoms/SelectField'
import type { SingleValue, ActionMeta } from 'react-select'
import { SubdivisionsOption } from '../AddressForm'

type AddressValidationFeatureFlagProps = {
  threshold?: number
  maxValidations?: number
}

// Common field types for shipping and billing
export type CreateAccountFormAddressValues = {
  address1: string
  houseNumber?: string
  addition?: string
  zipCode: string
  city: string
  subdivision?: string
  country: string
  taxReference?: string
}

export type CreateAccountFormValues = AccountType & {
  salutation: string
  firstName: string
  lastName: string
  dateOfBirth?: string | null
  email: string
  phoneNumber: string
  taxReferenceBusiness?: string
  company?: string
  isBillingSameAsShipping: boolean
  password: string
  notified: boolean
  shipping: CreateAccountFormAddressValues
  billing?: CreateAccountFormAddressValues
  equivalenceSurcharge?: boolean
}

export type CreateAccountFormProps = AccountType & {
  redirect?: string
  notification?: JSX.Element
  onSubmit?: (values: CreateAccountFormValues) => void
  formStep?: number
}

export const CreateAccountForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & CreateAccountFormProps
> = ({
  redirect,
  notification,
  onSubmit,
  accountType = ACCOUNT_TYPE_PERSONAL,
  ...props
}) => {
  const { locale, query, replace } = useRouter()
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isLargerThanPhone = useBreakpoint(breakpoints.xs)
  const formContext = useRef<FormikProps<CreateAccountFormValues>>(null)
  const scrollingElementStepOne = useRef<HTMLDivElement>(null)
  const addressAndHouseNumberRow = useRef<HTMLDivElement>(null)
  const addressFieldAndDropdown = useRef<HTMLDivElement>(null)
  const subdivisionsPerLocale = getSubdivisionsPerLocale(locale ?? '')
  const isMultipleTaxRegionsValidationEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION
  ) as boolean
  const isAccountMarketingOptionEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_MARKETING_OPTION
  )
  const isPhoneNumberOptional = useFeatureFlag(
    FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL
  )
  const isSalutationFieldEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_SALUTATION_FIELD
  )
  const isCustomerCheckEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_CUSTOMER_CHECK
  )
  const isAddressValidationEnabled: AddressValidationFeatureFlagProps = useFeatureFlag(
    FeatureFlag.ACCOUNT_ADDRESS_VALIDATION
  ) as AddressValidationFeatureFlagProps
  const isAddressSuggestionEnabled: AddressSuggestionFeatureFlagProps = useFeatureFlag(
    FeatureFlag.ACCOUNT_ADDRESS_SUGGESTION_SIGNUP
  ) as AddressSuggestionFeatureFlagProps
  const isProgressBarEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_SIGNUP_PROGRESS_BAR
  )

  const isDateOfBirthEnabled = useFeatureFlag(FeatureFlag.ACCOUNT_DATE_OF_BIRTH)

  const isAtidaLoyaltyCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isRequestingInvoicesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_REQUEST_INVOICE
  )

  const selectCustomercheckDetails = useSelector(
    customerCheckSelectors.selectCustomerCheckDetails
  )
  const selectCustomerCheckIsLoading = useSelector(
    customerCheckSelectors.selectCustomerCheckIsLoading
  )
  const selectCustomerCheckWasSuccess = useSelector(
    customerCheckSelectors.selectCustomerCheckWasSuccess
  )
  const currentFormStep = useSelector(
    createCustomerProgressSelectors.selectCurrentStep
  )
  const bestSuggestedAddress = useSelector(
    validateAddressSelectors.selectBestAddress
  )

  const suggestedAddresses = useSelector(
    validateAddressSelectors.selectSuggestedAddresses
  )
  const selectValidateAddressWasSuccess = useSelector(
    validateAddressSelectors.selectWasSuccess
  )
  const accountCreationIsLoading = useSelector(selectIsLoading)

  const [passwordShown, setPasswordShown] = useState(false)
  const [disablePasswordBtn, setDisablePasswordBtn] = useState(true)
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true)
  const [validationSchema, setValidationSchema] = useState({})
  const [showEmailWarning, setShowEmailWarning] = useState(false)
  const [emailWithoutTypos, setEmailWithoutTypos] = useState<
    string | undefined
  >(undefined)
  const [equivalenceSurcharge, setEquivalenceSurcharge] = useState(false)
  const [
    selectedShippingSubdivision,
    setSelectedShippingSubdivision
  ] = useState('')
  const [continueForm, setContinueForm] = useState(false)

  const [selectedBillingSubdivision, setSelectedBillingSubdivision] = useState(
    ''
  )
  const [isBusinessAccount, setIsBusinessAccount] = useState(
    accountType === ACCOUNT_TYPE_BUSINESS
  )
  const [
    equivalenceSurchargeVisible,
    setEquivalenceSurchargeVisible
  ] = useState(false)
  const [
    equivalenceSurchargeDisabled,
    setEquivalenceSurchargeDisabled
  ] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [
    showPasswordStrengthIndicator,
    setShowPasswordStrengthIndicator
  ] = useState(false)
  const [showBullets, setShowBullets] = useState(true)
  const [
    lastQualifiedQueryForLookup,
    setLastQualifiedQueryForLookup
  ] = useState('')
  const [formValues, setFormValues] = useState<CreateAccountFormValues>({
    salutation: isSalutationFieldEnabled ? '' : 'Ms',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    accountType: ACCOUNT_TYPE_PERSONAL,
    equivalenceSurcharge: false,
    phoneNumber: '',
    isBillingSameAsShipping: true,
    password: '',
    notified: !!isAccountMarketingOptionEnabled,
    shipping: {
      address1: '',
      zipCode: '',
      city: '',
      subdivision: '',
      houseNumber: '',
      addition: '',
      country: t('create-account.prefilled-country')
    },
    billing: {
      address1: '',
      zipCode: '',
      city: '',
      subdivision: '',
      houseNumber: '',
      addition: '',
      country: t('create-account.prefilled-country')
    }
  })
  const isMobile = !useBreakpoint(breakpoints.sm)
  const { securityLevel } = GetPasswordStrength(formValues.password)
  const [totalCorrectValidations, setTotalCorrectValidations] = useState(0)
  const [
    showSuggestedAddresses,
    setShowSuggestedAddresses
  ] = useDetectOutsideClick(addressFieldAndDropdown, false)
  const [selectedAddress, setSelectedAddress] = useState<ValidatedAddress>({})
  const [isLoyaltyBanner, setIsLoyaltyBanner] = useState(false)

  const isSpecialTaxProvince = useCallback(
    (type = 'shipping'): boolean =>
      SPECIAL_TAX_PROVINCES_ES.some(
        province =>
          province.label ===
          (type === 'shipping'
            ? selectedShippingSubdivision
            : selectedBillingSubdivision)
      ),
    [selectedBillingSubdivision, selectedShippingSubdivision]
  )

  const [validTaxRegionsZipCode, setValidTaxRegionsZipCode] = useState(true)
  const [validTaxRegionsProvince, setValidTaxRegionsProvince] = useState(true)
  const subdivisionsPerLocaleOptions = subdivisionsPerLocale.map(
    ({ label }) => ({ label, value: label })
  )

  const { getValidationSchema } = useValidationSchema({
    isBusinessAccount,
    isPhoneNumberOptional,
    currentFormStep,
    isBillingSameAsShipping,
    isSpecialTaxProvince,
    setValidTaxRegionsZipCode,
    setValidTaxRegionsProvince,
    formValues,
    isMultipleTaxRegionsValidationEnabled
  })

  const handleOnChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    values: CreateAccountFormValues
  ) => {
    const updatedValues = updateNestedValue(
      e.target.name,
      values,
      e.target.value
    )
    setFormValues(updatedValues as CreateAccountFormValues)
  }
  const handleSuggestAddresses = useCallback(
    debounce(
      (values: CreateAccountFormAddressValues) => {
        const query = getQueryForLookup(values)
        const shouldValidate =
          Object.keys(isAddressSuggestionEnabled).length > 0 &&
          values?.address1?.match(ACCOUNT_CREATION_REGEX.address1Regex)

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

  const addressSuggestionMinQueryLength =
    isAddressSuggestionEnabled.minQueryLength ??
    DEFAULT_ADDRESS_SUGGESTION_MIN_QUERY_LENGTH

  const handleValidateAddress = (values: CreateAccountFormAddressValues) => {
    const query = getQualifiedQueryForLookup(values, locale)
    const shouldValidate =
      isAddressValidationEnabled.maxValidations &&
      isAddressValidationEnabled.threshold &&
      totalCorrectValidations < isAddressValidationEnabled.maxValidations &&
      query !== lastQualifiedQueryForLookup &&
      values?.address1?.match(ACCOUNT_CREATION_REGEX.address1Regex) &&
      values?.houseNumber?.match(ACCOUNT_CREATION_REGEX.houseNumberRegex) &&
      values?.zipCode?.match(zipCodeRegexByLocale(locale ?? ''))

    if (shouldValidate) {
      dispatch(
        validateAddressTrigger({
          query
        })
      )
      setLastQualifiedQueryForLookup(query)
    }
  }
  const privacyPolicyHasNotificationContent = () =>
    t(PRIVACY_POLICY_NOTIFICATION_KEY) !== PRIVACY_POLICY_NOTIFICATION_KEY

  const emailNotAvailableHasNotificationContent = () =>
    t(EMAIL_NOT_AVAILABLE_LOGIN_NOTIFICATION_KEY) !==
      EMAIL_NOT_AVAILABLE_LOGIN_NOTIFICATION_KEY &&
    t(EMAIL_NOT_AVAILABLE_RESET_PASSWORD_NOTIFICATION_KEY) !==
      EMAIL_NOT_AVAILABLE_RESET_PASSWORD_NOTIFICATION_KEY

  const shouldCheckEmail = (email: string): boolean => {
    return (
      /^\S+@\S+\.\S+$/.test(email) &&
      selectCustomercheckDetails?.email !== email
    )
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentFormStep])

  useEffect(() => {
    if (
      currentFormStep === STEP_PERSONAL_DETAILS &&
      !selectCustomercheckDetails?.exists &&
      selectCustomerCheckWasSuccess
    ) {
      setShowBullets(false)
    }
    if (
      currentFormStep === STEP_PERSONAL_DETAILS &&
      selectCustomercheckDetails?.exists &&
      selectCustomerCheckWasSuccess
    ) {
      setShowErrorNotification(true)
      window.scrollTo({
        top: (document.getElementById('email') as HTMLInputElement)?.offsetTop,
        behavior: 'smooth'
      })
    }
  }, [
    selectCustomercheckDetails?.exists,
    currentFormStep,
    selectCustomerCheckWasSuccess,
    dispatch
  ])

  useEffect(() => {
    if (
      selectCustomerCheckWasSuccess &&
      continueForm &&
      !selectCustomercheckDetails?.exists
    ) {
      Object.keys(formContext.current?.errors ?? {}).length === 0 &&
        dispatch(setCurrentStep(STEP_ADDRESS_DETAILS))
      setContinueForm(false)
    }
  }, [
    selectCustomerCheckWasSuccess,
    dispatch,
    continueForm,
    selectCustomercheckDetails?.exists
  ])

  useEffect(() => {
    setValidationSchema(getValidationSchema())
    // If getValidationSchema is included in the dependency array it causes infinite loop on the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentFormStep,
    isBillingSameAsShipping,
    selectedShippingSubdivision,
    selectedBillingSubdivision,
    isBusinessAccount
  ])

  useEffect(() => {
    setEquivalenceSurchargeVisible(locale === 'es-es')
    locale === 'de-de' && isDateOfBirthEnabled && dateOfBirthInputMask()
  }, [isDateOfBirthEnabled, locale])

  useEffect(() => {
    if (selectedShippingSubdivision !== '') {
      const disabled = isBusinessAccount && isSpecialTaxProvince('shipping')
      setEquivalenceSurchargeDisabled(disabled)
    }
  }, [
    isBusinessAccount,
    selectedShippingSubdivision,
    equivalenceSurcharge,
    isSpecialTaxProvince
  ])

  useEffect(() => {
    if (
      notification ||
      (isMultipleTaxRegionsValidationEnabled &&
        (!validTaxRegionsZipCode || !validTaxRegionsProvince))
    )
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [
    notification,
    validTaxRegionsZipCode,
    validTaxRegionsProvince,
    isMultipleTaxRegionsValidationEnabled
  ])

  useEffect(() => {
    if (router.events) {
      // Reset the saved form step in Redux when navigating away from the form,
      // So that we can rejoin at the first step
      const handleComplete = () => {
        dispatch(setCurrentStep(STEP_PERSONAL_DETAILS))
      }

      router.events.on('routeChangeComplete', handleComplete)

      return () => {
        router.events.off('routeChangeComplete', handleComplete)
      }
    }
  }, [router, dispatch])

  useEffect(() => {
    if (
      isAddressValidationEnabled.threshold &&
      bestSuggestedAddress &&
      bestSuggestedAddress.scoring?.queryScore &&
      bestSuggestedAddress.scoring?.queryScore >
        isAddressValidationEnabled.threshold
    ) {
      setSelectedShippingSubdivision(
        bestSuggestedAddress?.address?.county ?? ''
      )
      setFormValues({
        ...formValues,
        shipping: {
          ...formValues.shipping,
          city: bestSuggestedAddress?.address?.city ?? '',
          subdivision: normalizeSubdivision(
            bestSuggestedAddress?.address?.county,
            locale
          )
        }
      })
      setTotalCorrectValidations(totalCorrectValidations + 1)
    }
  }, [bestSuggestedAddress, isAddressValidationEnabled.threshold, locale])

  useEffect(() => {
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
  }, [selectedAddress])

  const CheckValidationTag = () => {
    const { errors, isValidating, isSubmitting } = useFormikContext()
    useEffect(() => {
      if (isSubmitting && !isValidating && Object.keys(errors).length > 0) {
        scrollToError(errors)
      }
    }, [errors, isValidating, isSubmitting])
    return null
  }

  useEffect(() => {
    if (currentFormStep === STEP_ADDRESS_DETAILS) {
      dispatch(triggerReportAccountCreationStepCompleted())
    }
  }, [currentFormStep, dispatch])

  useEffect(() => {
    if (query?.loyaltyBanner === 'true') {
      setIsLoyaltyBanner(true)
      delete query.loyaltyBanner
      replace(
        {
          query
        },
        undefined,
        { shallow: true }
      )
    }
  }, [query, replace])

  // Code used for enabling inline validation in optimizly experiment
  const [inlineValidationEnabled, setInlineValidationEnabled] = useState(false)
  const useInlineValidationExperiment = () => {
    setInlineValidationEnabled(true)
  }
  useEffect(() => {
    if (globalThis) {
      ;(globalThis as Record<
        string,
        unknown
      >).useInlineValidationExperiment = useInlineValidationExperiment
    }
  }, [])

  return (
    <>
      <section
        data-testid="CreateAccountForm"
        className="px-2 w-full max-w-45 sm:px-0 sm:max-w-50"
      >
        {currentFormStep === STEP_PERSONAL_DETAILS ? (
          <>
            <span
              className={classNames('text-sm text-ui-grey-dark', {
                'flex mb-1 justify-center': isProgressBarEnabled
              })}
              data-testid="currentStepIndicator"
            >
              {!isProgressBarEnabled &&
                `${t('shared.step')} ${currentFormStep + 1}/2`}
              {isProgressBarEnabled &&
                t('create-account.step', {
                  currentStep: currentFormStep + 1,
                  totalSteps: 2
                })}
            </span>
            {isProgressBarEnabled && (
              <div className="flex mb-3 place-content-evenly">
                <span
                  className={
                    'w-full h-0.5 self-center bg-primary-caribbean-green'
                  }
                />
                <span className="w-full h-0.5 self-center bg-ui-grey-lightest" />
              </div>
            )}
            <h1 ref={scrollingElementStepOne}>
              {isBusinessAccount
                ? t('create-account.title-business')
                : t('create-account.title')}
            </h1>

            <div
              data-testid="atidaCashCreateAccountExtraCopyExperiment"
              className={classNames({
                'bg-ui-guyabano flex p-2 rounded-md items-center mt-2':
                  isAtidaLoyaltyCashEnabled &&
                  (redirect === '/checkout' ||
                    isLoyaltyBanner ||
                    redirect === '/account/my-atida-cash'),
                hidden: !(
                  isAtidaLoyaltyCashEnabled &&
                  (redirect === '/checkout' ||
                    isLoyaltyBanner ||
                    redirect === '/account/my-atida-cash')
                )
              })}
            >
              <AtidaCoins
                className={classNames(
                  'icon-24 flex-none mr-1  text-primary-caribbean-green'
                )}
              />
              <p>{t('account.create-account-from-checkout.loyalty-message')}</p>
            </div>
          </>
        ) : (
          <>
            <span
              className={classNames('text-sm text-ui-grey-dark', {
                'flex mb-1 justify-center': isProgressBarEnabled
              })}
            >
              {!isProgressBarEnabled &&
                `${t('shared.step')} ${currentFormStep + 1}/2`}
              {isProgressBarEnabled &&
                t('create-account.step', {
                  currentStep: currentFormStep + 1,
                  totalSteps: 2
                })}
            </span>
            {isProgressBarEnabled && (
              <span
                className={
                  'flex mb-3 w-full h-0.5 self-center bg-primary-caribbean-green'
                }
              />
            )}
          </>
        )}

        {isCustomerCheckEnabled
          ? notification
          : showErrorNotification && notification}

        <Formik<CreateAccountFormValues>
          innerRef={formContext}
          enableReinitialize={true}
          initialValues={formValues}
          validateOnChange={
            currentFormStep === STEP_PERSONAL_DETAILS
              ? inlineValidationEnabled
              : false
          }
          validateOnBlur={
            currentFormStep === STEP_PERSONAL_DETAILS
              ? inlineValidationEnabled
              : false
          }
          onSubmit={values => {
            if (currentFormStep === STEP_ADDRESS_DETAILS) {
              values.isBillingSameAsShipping = isBillingSameAsShipping
              values.salutation =
                values.salutation === 'Mrs' ? 'Ms' : values.salutation
              if (isBusinessAccount) {
                values.accountType = ACCOUNT_TYPE_BUSINESS
                values.equivalenceSurcharge =
                  equivalenceSurcharge && !equivalenceSurchargeDisabled
              }
              if (!isBusinessAccount) {
                values.accountType = ACCOUNT_TYPE_PERSONAL
                values.company = undefined
                values.taxReferenceBusiness = undefined
              }
              if (
                !isSpecialTaxProvince('shipping') &&
                (isRequestingInvoicesEnabled
                  ? !isSpecialRegionZipCode(values.shipping.zipCode)
                  : true)
              )
                values.shipping.taxReference = undefined
              if (
                values.billing &&
                !isSpecialTaxProvince('shipping') &&
                !isSpecialTaxProvince('billing') &&
                (isRequestingInvoicesEnabled
                  ? !isSpecialRegionZipCode(values.shipping.zipCode) &&
                    !isSpecialRegionZipCode(values.billing?.zipCode ?? '')
                  : true)
              ) {
                values.billing.taxReference = undefined
              }
              recursiveTrimObjectValues(values, { forbiddenKeys: ['password'] })
              if (values?.phoneNumber) {
                values.phoneNumber = trimWhitespaces(values.phoneNumber)
              }
              onSubmit?.(values)
              !isCustomerCheckEnabled && setShowErrorNotification(true)
            }

            if (currentFormStep === STEP_PERSONAL_DETAILS) {
              shouldCheckEmail(values.email) &&
                dispatch(customerCheckTrigger({ email: values.email }))
              if (selectCustomerCheckIsLoading) {
                dispatch(setCurrentStep(STEP_ADDRESS_DETAILS))
                dispatch(
                  triggerReportAccountCreatedAttempted({
                    is_social: false,
                    account_type: formValues.accountType
                  })
                )
              }
            }
          }}
          data-testid="createAccountForm"
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, setFieldError, setTouched }) => (
            <Form
              className={classNames('relative', {
                'mt-3': currentFormStep === STEP_PERSONAL_DETAILS,
                'mt-2': currentFormStep === STEP_ADDRESS_DETAILS
              })}
              noValidate
              {...props}
            >
              {currentFormStep === STEP_PERSONAL_DETAILS ? (
                <>
                  {isSalutationFieldEnabled && (
                    <FormField
                      inputId="salutation"
                      label={t('form.field.salutation.label')}
                      data-testid="createAccountFormSalutation"
                      required
                      onChange={() => {
                        setFieldError('salutation', undefined)
                      }}
                      error={touched['salutation'] && errors['salutation']}
                    >
                      <div className="flex">
                        <Field name="salutation">
                          {({ field }: FieldProps) => {
                            return (
                              <Fragment>
                                <RadioInput
                                  data-testId="salutation-ms"
                                  id="Ms"
                                  value="Ms"
                                  label={t('create-account.salutation-ms')}
                                  isChecked={
                                    field.value === 'Mrs' ||
                                    field.value === 'Ms'
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
                  <div className={'sm:grid sm:grid-cols-4 sm:gap-2'}>
                    <FormField
                      inputId="firstName"
                      label={t('form.field.first-name.label')}
                      className="mb-2 sm:col-span-2"
                      data-testid="createAccountFormFirstName"
                      required
                      error={touched.firstName && errors.firstName}
                    >
                      <Field
                        component={TextField}
                        type="text"
                        name="firstName"
                        placeholder={t(
                          'account.form-field.first-name-placeholder'
                        )}
                        data-testid="createAccountFormFirstNameField"
                        {...(!inlineValidationEnabled && {
                          onFocus: (e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldError(e.target.name, undefined)
                          }
                        })}
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
                      data-testid="createAccountFormLastName"
                      required
                      error={touched.lastName && errors.lastName}
                    >
                      <Field
                        component={TextField}
                        type="text"
                        name="lastName"
                        placeholder={t(
                          'account.form-field.last-name-placeholder'
                        )}
                        data-testid="createAccountFormLastNameField"
                        {...(!inlineValidationEnabled && {
                          onFocus: (e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldError(e.target.name, undefined)
                          }
                        })}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleOnChangeField(e, values)
                          setFieldError(e.target.name, undefined)
                        }}
                      />
                    </FormField>
                  </div>
                  {locale === 'de-de' && isDateOfBirthEnabled && (
                    <FormField
                      inputId="dateOfBirth"
                      label={t('form.field.birth-date.label')}
                      className="mb-2 sm:col-span-2"
                      data-testid="createAccountFormBirthDate"
                      required
                      error={touched.dateOfBirth && errors.dateOfBirth}
                    >
                      <Field
                        placeholder={t(
                          'account.form-field.date-of-birth-placeholder'
                        )}
                        component={TextField}
                        type="text"
                        name="dateOfBirth"
                        required
                        className="de-date-of-birth relative"
                        data-testid="createAccountFormBirthDateField"
                        {...(!inlineValidationEnabled && {
                          onFocus: (e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldError(e.target.name, undefined)
                          }
                        })}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleOnChangeField(e, values)
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
                  <FormField
                    inputId="email"
                    label={t('form.field.email.label')}
                    data-testid="createAccountFormEmail"
                    required
                    error={
                      (touched.email && errors.email) ||
                      (selectCustomercheckDetails?.exists &&
                        showErrorNotification)
                    }
                    onBlur={() => {
                      setShowEmailWarning(!!emailWithoutTypos)
                      !!emailWithoutTypos && setFieldError('email', ' ')
                      shouldCheckEmail(values.email) &&
                        dispatch(customerCheckTrigger({ email: values.email }))
                    }}
                    onKeyDown={e => {
                      if (
                        shouldCheckEmail(values.email) &&
                        e.code === 'Enter'
                      ) {
                        dispatch(customerCheckTrigger({ email: values.email }))
                        setTouched(
                          {
                            firstName: true,
                            lastName: true,
                            email: true,
                            password: true,
                            dateOfBirth: true
                          },
                          true
                        )
                      }
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      values.email = e.target.value
                      setEmailWithoutTypos(removeEmailTypos(e.target.value))
                      ;(notification?.props?.content ===
                        'account.create-customer.existing-email' ||
                        selectCustomercheckDetails?.exists) &&
                        setShowErrorNotification(
                          e.target.value === selectCustomercheckDetails?.email
                        )
                    }}
                  >
                    <Field
                      component={TextField}
                      placeholder={t('account.form-field.email-placeholder')}
                      type="email"
                      name="email"
                      data-testid="createAccountFormEmailField"
                      {...(!inlineValidationEnabled && {
                        onFocus: (e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldError(e.target.name, undefined)
                        }
                      })}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        !inlineValidationEnabled &&
                          setFieldError(e.target.name, undefined)
                      }}
                    />
                    {emailNotAvailableHasNotificationContent() &&
                      selectCustomercheckDetails?.exists &&
                      showErrorNotification && (
                        <Notification
                          className="my-2 p-2"
                          type="info"
                          title={t(
                            'create-account.email-not-available-notification.title'
                          )}
                        >
                          <Trans
                            i18nKey={EMAIL_NOT_AVAILABLE_LOGIN_NOTIFICATION_KEY}
                            components={{
                              a: (
                                <Link
                                  extraParams={`${!redirect ? '' : redirect}${
                                    values.email !== ''
                                      ? `?email=${values.email}`
                                      : ''
                                  }`}
                                />
                              )
                            }}
                          />
                          <Trans
                            i18nKey={
                              EMAIL_NOT_AVAILABLE_RESET_PASSWORD_NOTIFICATION_KEY
                            }
                            components={{
                              a: (
                                <Link
                                  extraParams={
                                    values?.email !== ''
                                      ? `?email=${values.email}`
                                      : ''
                                  }
                                />
                              )
                            }}
                          />
                        </Notification>
                      )}
                    {!showErrorNotification &&
                      showEmailWarning &&
                      emailWithoutTypos && (
                        <Notification
                          data-testid="emailWarningNotification"
                          title={t('shared.your-email')}
                          closeIcon
                          handleClose={() => {
                            setFieldError('email', '')
                            setShowEmailWarning(false)
                          }}
                          type="error"
                          className="mt-2"
                        >
                          <Trans
                            i18nKey="account.create-account.email-suggestion"
                            values={{
                              emailWithoutTypos: emailWithoutTypos
                            }}
                            components={{
                              button: (
                                <button
                                  data-testid="updateEmailWithoutTyposButton"
                                  className="underline text-left font-normal"
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
                                    shouldCheckEmail(emailWithoutTypos) &&
                                      dispatch(
                                        customerCheckTrigger({
                                          email: emailWithoutTypos
                                        })
                                      )
                                  }}
                                />
                              ),
                              span: <span className="gap-0.5 text-sm-base" />
                            }}
                          />
                        </Notification>
                      )}
                  </FormField>
                  <FormField
                    inputId="password"
                    label={t('form.field.password.label')}
                    data-testid="createAccountFormPassword"
                    required
                    onChange={() => setDisablePasswordBtn(false)}
                    error={touched.password && errors.password}
                    onBlur={() => setShowPasswordStrengthIndicator(false)}
                  >
                    <Field
                      placeholder={t('account.form-field.password-placeholder')}
                      data-testid="passwordField"
                      component={TextField}
                      type={passwordShown ? 'text' : 'password'}
                      name="password"
                      className="w-full"
                      onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                        !inlineValidationEnabled &&
                          setFieldError(e.target.name, undefined)
                        setShowBullets(true)
                        setShowPasswordStrengthIndicator(true)
                        if (
                          isMobile &&
                          securityLevel !== SECURITY_LEVEL_STRONG
                        ) {
                          setTimeout(() => {
                            window.scrollTo({
                              top:
                                (document.getElementById(
                                  'password'
                                ) as HTMLInputElement)?.offsetTop *
                                PASSWORD_FIELD_SCROLL_MULTIPLIER,
                              behavior: 'smooth'
                            })
                          }, 100)
                        }
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
                        setFieldError(e.target.name, undefined)
                      }}
                    />
                    <div className="relative flex w-full">
                      <button
                        type="button"
                        data-testid="togglePassword"
                        onClick={() => setPasswordShown(!passwordShown)}
                        className="absolute font-light text-sm right-2 -top-4 disabled:text-ui-grey-light"
                        disabled={disablePasswordBtn}
                      >
                        {t('create-account.password-show')}
                      </button>
                    </div>
                  </FormField>
                  {(values.password.length > 0 ||
                    showPasswordStrengthIndicator) && (
                    <PasswordStrengthIndicator
                      showBullets={showBullets}
                      password={values.password}
                    />
                  )}

                  <FormField
                    inputId="notified"
                    label=""
                    className={classNames('pt-1 mb-2', {
                      hidden:
                        locale !== getDefaultLocale() &&
                        isAccountMarketingOptionEnabled
                    })}
                    data-testid="createAccountFormNotified"
                  >
                    <div className="flex content-center cursor-pointer">
                      <Field
                        data-testid="notificationCheckbox"
                        name="notified"
                        className="absolute opacity-0"
                      >
                        {({ field }: FieldProps) => {
                          return (
                            <>
                              <input
                                id="notificationsCheckbox"
                                type="checkbox"
                                {...field}
                                className="absolute w-3 h-3 opacity-0"
                              />
                              <span
                                className={classNames(
                                  'flex grow-0 shrink-0 items-center justify-center w-3 h-3 border',
                                  {
                                    'border-ui-grey-light bg-ui-grey-neutral':
                                      field.value === false,
                                    'border-primary-oxford-blue bg-primary-oxford-blue':
                                      field.value === true
                                  }
                                )}
                              >
                                {field.value && (
                                  <Checkmark
                                    data-testid="checkIcon"
                                    className="text-primary-white h-3"
                                  />
                                )}
                              </span>
                              <label
                                htmlFor="notificationsCheckbox"
                                className="text-sm pl-1"
                              >
                                {t('create-account.notified-by-email')}
                              </label>
                            </>
                          )
                        }}
                      </Field>
                    </div>
                  </FormField>
                </>
              ) : (
                <>
                  <span className="text-sm text-ui-grey-dark"></span>
                  <h1 className="mb-2">
                    {isBusinessAccount
                      ? t('create-account.your-business-details', {
                          name: values.firstName as string
                        })
                      : t('account.create-account.address-step-greeting', {
                          name: values.firstName as string
                        })}
                  </h1>

                  {isMultipleTaxRegionsValidationEnabled &&
                    !(validTaxRegionsZipCode && validTaxRegionsProvince) && (
                      <Notification
                        className="w-full mb-2.75"
                        type="warning"
                        title={t(
                          'create-account.notification.invalid-tax-regions.title'
                        )}
                        content={t(
                          'create-account.notification.invalid-tax-regions.body'
                        )}
                      />
                    )}

                  {isBusinessAccount && (
                    <>
                      <FormField
                        inputId="company"
                        label={t('form.field.company.label')}
                        data-testid="AddressFormCompany"
                        required
                        error={errors.company}
                      >
                        <Field
                          data-testid="AddressFormCompanyField"
                          component={TextField}
                          type="text"
                          name="company"
                          onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldError(e.target.name, undefined)
                          }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleOnChangeField(e, values)
                            setFieldError(e.target.name, undefined)
                          }}
                        />
                      </FormField>
                      <FormField
                        inputId="taxReferenceBusiness"
                        label={t('form.field.tax-reference-business.label')}
                        data-testid="AddressFormTaxReferenceBusiness"
                        required
                        error={errors.taxReferenceBusiness}
                      >
                        <Field
                          data-testid="AddressFormTaxReferenceBusinessField"
                          component={TextField}
                          type="text"
                          name="taxReferenceBusiness"
                          onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldError(e.target.name, undefined)
                          }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleOnChangeField(e, values)
                            setFieldError(e.target.name, undefined)
                          }}
                        />
                      </FormField>
                      {equivalenceSurchargeVisible && (
                        <FormField
                          inputId="equivalenceSurcharge"
                          label=""
                          className={classNames('mb-3', {
                            'text-ui-grey-default-alt pointer-events-none': equivalenceSurchargeDisabled
                          })}
                          required
                          data-testid="AddressFormEquivalenceSurcharge"
                          error={
                            touched.equivalenceSurcharge &&
                            errors.equivalenceSurcharge
                          }
                        >
                          <Checkbox
                            label={t('form.field.equivalence-surcharge')}
                            id={'equivalenceSurcharge'}
                            isChecked={
                              equivalenceSurcharge &&
                              !equivalenceSurchargeDisabled
                            }
                            onChange={() => {
                              !equivalenceSurchargeDisabled &&
                                setEquivalenceSurcharge(!equivalenceSurcharge)
                            }}
                            disabled={equivalenceSurchargeDisabled}
                            isFilter
                            data-testid="equivalenceSurchargeCheckbox"
                            variant="primary"
                          />
                        </FormField>
                      )}
                    </>
                  )}
                  <div
                    ref={addressAndHouseNumberRow}
                    className="grid grid-cols-4 gap-1 pt-3 border border-b-0 border-l-0 border-r-0 border-t-1 border-ui-grey-lightest"
                  >
                    <div className="col-span-3" ref={addressFieldAndDropdown}>
                      <FormField
                        inputId="shipping.address1"
                        label={t('form.field.address1.label')}
                        className="mb-2"
                        data-testid="ShippingAddressFormAddress1"
                        required
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
                          placeholder={
                            Object.keys(isAddressSuggestionEnabled).length >
                              0 && t('account.address-form.address-placeholder')
                          }
                          onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldError(e.target.name, undefined)
                            setShowSuggestedAddresses(
                              e.target.value.length >
                                addressSuggestionMinQueryLength
                            )
                          }}
                          onBlur={() => handleValidateAddress(values.shipping)}
                          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) =>
                            e.shiftKey &&
                            e.key === 'Tab' &&
                            setShowSuggestedAddresses(false)
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (
                              e.target.value.length <=
                              addressSuggestionMinQueryLength
                            ) {
                              dispatch(validateAddressReset())
                            }

                            setFieldError(e.target.name, undefined)
                            handleOnChangeField(e, values)
                            e.target.value.length >
                              addressSuggestionMinQueryLength &&
                              handleSuggestAddresses(values.shipping)

                            setShowSuggestedAddresses(
                              e.target.value.length >
                                addressSuggestionMinQueryLength
                            )
                          }}
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
                      required
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
                        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldError(e.target.name, undefined)
                          setShowSuggestedAddresses(false)
                        }}
                        onBlur={() => handleValidateAddress(values.shipping)}
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
                      placeholder={t(
                        'account.address-form.addition-placeholder'
                      )}
                      data-testid="ShippingAddressFormAdditionField"
                      component={TextField}
                      type="text"
                      name="shipping.addition"
                      onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldError(e.target.name, undefined)
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOnChangeField(e, values)
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
                      required
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
                        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldError(e.target.name, undefined)
                        }}
                        onBlur={() => handleValidateAddress(values.shipping)}
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
                      required
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
                        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldError(e.target.name, undefined)
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleOnChangeField(e, values)
                          setFieldError(e.target.name, undefined)
                        }}
                      />
                    </FormField>
                  </div>
                  {selectValidateAddressWasSuccess &&
                    isAddressValidationEnabled.threshold &&
                    (!bestSuggestedAddress ||
                      (bestSuggestedAddress.scoring?.queryScore &&
                        bestSuggestedAddress.scoring?.queryScore <
                          isAddressValidationEnabled.threshold)) && (
                      <Notification
                        className="mb-2"
                        title={t('shared.info')}
                        content={t('create-account.failed-address-validation')}
                        type="info"
                      />
                    )}
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
                          setEquivalenceSurchargeDisabled(
                            isSpecialTaxProvince(option.value) &&
                              isBusinessAccount
                          )
                        }}
                      />
                    </FormField>
                  )}
                  {equivalenceSurchargeDisabled && (
                    <Notification
                      data-testid="equivalenceSurchargeNotification"
                      className="mb-2"
                      type="info"
                      title={t(
                        'account.address-form.equivalence-surcharge-disabled.content'
                      )}
                    />
                  )}
                  {/* The country field is disabled as customers will not be able to change it for now */}
                  <FormField
                    className="pointer-events-none mb-3"
                    inputId="shipping.country"
                    label={t('form.field.country.label')}
                    data-testid="AddressFormCountry"
                    required
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
                  {!isBusinessAccount &&
                    (isSpecialTaxProvince('shipping') ||
                      (isRequestingInvoicesEnabled &&
                        isSpecialRegionZipCode(values.shipping.zipCode))) && (
                      <div className="bg-ui-guyabano p-2 mb-3">
                        <FormField
                          inputId="shipping.taxReference"
                          label={t('form.field.tax-reference.label')}
                          data-testid="ShippingAddressFormTaxReference"
                          required
                          error={getIn(errors, 'shipping.taxReference')}
                        >
                          <Field
                            data-testid="ShippingAddressFormTaxReferenceField"
                            component={TextField}
                            type="text"
                            name="shipping.taxReference"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (values?.billing)
                                values.billing.taxReference = e.target.value
                              handleOnChangeField(e, values)
                            }}
                            onFocus={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
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
                    data-testid="createAccountFormPhoneNumber"
                    required={!isPhoneNumberOptional}
                    error={touched.phoneNumber && errors.phoneNumber}
                  >
                    <Field
                      component={TextField}
                      type="tel"
                      name="phoneNumber"
                      data-testid="createAccountFormPhoneNumberField"
                      onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldError(e.target.name, undefined)
                      }}
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
                  <div className="mt-3 pt-3 border-t border-ui-grey-light">
                    <h2 className="mb-2">
                      {t('address-book.billing-address')}
                    </h2>
                    <Checkbox
                      label={t('account.billing-same-as-delivery.label')}
                      id={t('account.billing-same-as-delivery.label')}
                      isChecked={isBillingSameAsShipping}
                      onChange={() =>
                        setIsBillingSameAsShipping(!isBillingSameAsShipping)
                      }
                      className="mb-2"
                      data-testid="BillingSameAsDeliveryCheckbox"
                      variant="primary"
                    />
                    {!isBillingSameAsShipping && (
                      <div>
                        <div className="grid grid-cols-4 gap-2">
                          <FormField
                            inputId="billing.address1"
                            label={t('form.field.address1.label')}
                            className="mb-2 col-span-3"
                            data-testid="BillingAddressFormAddress1"
                            required
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
                              onFocus={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldError(e.target.name, undefined)
                              }}
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
                            required
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
                              onFocus={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldError(e.target.name, undefined)
                              }}
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
                            onFocus={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldError(e.target.name, undefined)
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleOnChangeField(e, values)
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
                            required
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
                              onFocus={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldError(e.target.name, undefined)
                              }}
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
                            required
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
                              onFocus={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldError(e.target.name, undefined)
                              }}
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
                                setEquivalenceSurchargeDisabled(
                                  isSpecialTaxProvince(option.value) &&
                                    isBusinessAccount
                                )
                              }}
                            />
                          </FormField>
                        )}
                        <FormField
                          className="pointer-events-none mb-2"
                          inputId="billingCountry"
                          label={t('form.field.country.label')}
                          data-testid="BillingAddressFormCountry"
                          required
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
                            onFocus={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldError(e.target.name, undefined)
                            }}
                            disabled
                          />
                        </FormField>
                        {(isSpecialTaxProvince('billing') ||
                          (isRequestingInvoicesEnabled &&
                            isSpecialRegionZipCode(
                              values.billing?.zipCode ?? ''
                            ))) &&
                          !isSpecialTaxProvince('shipping') &&
                          !isBusinessAccount &&
                          (isRequestingInvoicesEnabled
                            ? !isSpecialRegionZipCode(values.shipping.zipCode)
                            : true) && (
                            <div className="bg-ui-guyabano p-2">
                              <FormField
                                inputId="billing.taxReference"
                                label={t('form.field.tax-reference.label')}
                                data-testid="BillingAddressFormTaxReference"
                                required
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
                                    values.shipping.taxReference =
                                      e.target.value
                                    handleOnChangeField(e, values)
                                  }}
                                  onFocus={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    setFieldError(e.target.name, undefined)
                                  }}
                                />
                                <p className="mt-1 text-sm">
                                  {t('account.address-form.tax-reference-hint')}
                                </p>
                              </FormField>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </>
              )}
              {currentFormStep === STEP_PERSONAL_DETAILS ? (
                <>
                  <Button
                    isLoading={selectCustomerCheckIsLoading}
                    type="submit"
                    className="w-full mt-1"
                    onMouseDown={() => {
                      setTouched(
                        {
                          firstName: true,
                          lastName: true,
                          email: true,
                          password: true,
                          dateOfBirth: true
                        },
                        true
                      )
                      setTimeout(() => setContinueForm(true))
                    }}
                    data-testid="createAccountFormContinueButton"
                    disabled={
                      values.email === selectCustomercheckDetails?.email &&
                      selectCustomercheckDetails?.exists
                    }
                  >
                    {t('create-account.continue')}
                  </Button>
                  {privacyPolicyHasNotificationContent() && (
                    <div className="text-sm mt-3 text-ui-grey-dark">
                      <Trans
                        i18nKey={PRIVACY_POLICY_NOTIFICATION_KEY}
                        components={{
                          a: (
                            <Link
                              target="_blank"
                              className="text-ui-grey-dark"
                            />
                          )
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <Button
                  type="submit"
                  className="w-full mt-1"
                  data-testid="createAccountFormButton"
                  isLoading={accountCreationIsLoading}
                >
                  {router.asPath.split('/').includes('checkout')
                    ? t('create-account.cta-checkout')
                    : t('create-account.cta')}
                </Button>
              )}
              <CheckValidationTag />
            </Form>
          )}
        </Formik>
      </section>
      <div className="w-full min-h-17 mt-3 sm:mt-5 p-5 pt-4 flex flex-col bg-ui-guyabano items-center">
        <h3 className="mb-2">
          {!isBusinessAccount
            ? t('account.create-account.are-you-business')
            : t('account.create-account.are-you-not-business')}
        </h3>
        <button
          type="button"
          onClick={() => {
            scrollToElement(scrollingElementStepOne.current)
            setIsBusinessAccount(!isBusinessAccount)
          }}
          className="underline"
          data-testid="createAccountFormChangeAccountTypeButton"
        >
          {!isBusinessAccount
            ? t('account.create-account.create-business-account')
            : t('account.create-account.create-personal-account')}
        </button>
      </div>
    </>
  )
}
