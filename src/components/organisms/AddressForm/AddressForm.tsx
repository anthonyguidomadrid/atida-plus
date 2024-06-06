import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Formik, Form, Field } from 'formik'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import {
  getSubdivisionsPerLocale,
  recursiveTrimObjectValues,
  scrollToElement,
  taxReferenceRegexByLocale,
  useDetectOutsideClick,
  zipCodeRegexByLocale
} from '~helpers'
import { useRouter } from 'next/router'
import { Button } from '~components/atoms/Button'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import {
  AddressSuggestionFeatureFlagProps,
  selectIsAnyAddressLoading,
  validateAddressReset,
  validateAddressSelectors,
  validateAddressTrigger,
  ValidatedAddress
} from '~domains/address'
import { Notification } from '~components/atoms/Notification'
import { SPECIAL_TAX_PROVINCES_ES } from '~config/constants/subdivisions-per-locale'
import { MAXIMUM_LENGTH_100 } from '~config/constants/maximum-length'
import { debounce } from 'lodash'
import { getQueryForLookup } from '~helpers/addressLookup'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { DEFAULT_ADDRESS_SUGGESTION_MIN_QUERY_LENGTH } from '~config/constants/address-lookup'
import { normalizeSubdivision } from '~helpers/normalizeSubdivision'
import { SuggestedAddresses } from '~components/atoms/SuggestedAddresses'
import { SelectField, OptionData } from '~components/atoms/SelectField'
import type { SingleValue, ActionMeta } from 'react-select'
import { Checkbox } from '~components/atoms/Checkbox'
import { isSpecialRegionZipCode } from '~helpers/isTaxRegionValidByZipcodes'

export type AddressFormValues = Partial<{
  firstName: string
  lastName: string
  address1: string
  houseNumber: string
  id: string
  reference: string
  addition: string
  zipCode: string
  city: string
  subdivision: string
  country: string
  taxReference: string
  isDefaultShipping: boolean
  isDefaultBilling: boolean
}>

export type AddressFormValuesKeys = keyof Omit<
  AddressFormValues,
  'isDefaultShipping' | 'isDefaultBilling'
>

export type AddressFormProps = {
  isBusinessAccount?: boolean
  anyValidShippingAddress: boolean
  anyValidBillingAddress: boolean
  selectedAddress?: AddressFormValues
  isOpen: boolean
  setIsAddressModalOpen: (isAddressModalOpen: boolean) => void
  onSubmit?: (values: AddressFormValues) => void
  reference?: string
  taxReference?: string
  surcharge?: boolean | null
  firstName?: string
  lastName?: string
}

export type SubdivisionsOption = {
  label: string
  value: string
}

export const AddressForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & AddressFormProps
> = ({
  selectedAddress,
  isOpen,
  anyValidShippingAddress,
  anyValidBillingAddress,
  onSubmit,
  setIsAddressModalOpen,
  isBusinessAccount = false,
  reference,
  taxReference,
  surcharge,
  firstName,
  lastName,
  ...props
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const subdivisionsPerLocale = getSubdivisionsPerLocale(locale ?? '')
  const subdivisionsPerLocaleOptions = subdivisionsPerLocale.map(
    ({ label }) => ({ label, value: label })
  )
  const addressAndHouseNumberRow = useRef<HTMLDivElement>(null)
  const addressFieldAndDropdown = useRef<HTMLDivElement>(null)
  const cityRegex = /^.{2,100}$/
  const subdivisionRegex = new RegExp(
    subdivisionsPerLocale.map(subdivision => subdivision.label).join('|')
  )
  const firstNameRegex = /^.{1,100}$/
  const lastNameRegex = /^.{1,100}$/
  const address1Regex = /^.{1,100}$/
  const houseNumberRegex = /^.{1,100}$/
  const additionRegex = /^.{1,100}$/
  const taxReferenceRegex = taxReferenceRegexByLocale(
    locale ?? '',
    !isBusinessAccount
  )
  const isAddressLoading = useSelector(selectIsAnyAddressLoading)
  const suggestedAddresses = useSelector(
    validateAddressSelectors.selectSuggestedAddresses
  )

  const isAddressSuggestionEnabled: AddressSuggestionFeatureFlagProps = useFeatureFlag(
    FeatureFlag.ACCOUNT_ADDRESS_SUGGESTION_ADDRESS_BOOK
  ) as AddressSuggestionFeatureFlagProps

  const isRequestingInvoicesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_REQUEST_INVOICE
  )

  const [
    showSuggestedAddresses,
    setShowSuggestedAddresses
  ] = useDetectOutsideClick(addressFieldAndDropdown, false)
  const [
    selectedSuggestedAddress,
    setSelectedSuggestedAddress
  ] = useState<ValidatedAddress>({})

  const addressSuggestionMinQueryLength =
    isAddressSuggestionEnabled.minQueryLength ??
    DEFAULT_ADDRESS_SUGGESTION_MIN_QUERY_LENGTH

  /* Helpers */
  const isSpecialTaxProvince = (subdivision: string): boolean => {
    return SPECIAL_TAX_PROVINCES_ES.some(
      province => province.label === subdivision
    )
  }

  const handleOnChangeField = (
    data: { name: string; value: string } | undefined,
    values: AddressFormValues,
    options?: { isShippingCheckbox?: boolean; isBillingCheckbox?: boolean }
  ) => {
    if (data) {
      values[data.name as AddressFormValuesKeys] = data.value
      setFormValues({ ...formValues, [data.name]: data.value })
    } else if (options?.isShippingCheckbox) {
      setFormValues({
        ...formValues,
        isDefaultShipping: !formValues.isDefaultShipping
      })
    } else if (options?.isBillingCheckbox) {
      setFormValues({
        ...formValues,
        isDefaultBilling: !formValues.isDefaultBilling
      })
    }
  }

  const canShowAddressFormatNotification = () => {
    return (
      !selectedAddress?.firstName ||
      !selectedAddress?.lastName ||
      !selectedAddress?.houseNumber ||
      (locale !== 'de-de' && !selectedAddress?.subdivision) ||
      !selectedAddress?.city ||
      !selectedAddress?.zipCode ||
      !selectedAddress?.address1
    )
  }

  const handleSuggestAddresses = useCallback(
    debounce(
      (values: AddressFormValues) => {
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

  /* Form Values */
  const [formValues, setFormValues] = useState({
    firstName: selectedAddress?.firstName ?? firstName ?? '',
    lastName: selectedAddress?.lastName ?? lastName ?? '',
    address1: selectedAddress?.address1 ?? '',
    houseNumber: selectedAddress?.houseNumber ?? '',
    ...(selectedAddress?.id && { addressId: selectedAddress?.id }),
    ...(reference && { reference }),
    addition:
      selectedAddress?.addition === '' || !selectedAddress?.addition
        ? ''
        : selectedAddress?.addition,
    zipCode: selectedAddress?.zipCode ?? '',
    city: selectedAddress?.city ?? '',
    subdivision: selectedAddress?.subdivision ?? '',
    country: t('create-account.prefilled-country'),
    taxReference: taxReference ?? '',
    isDefaultShipping:
      (selectedAddress?.isDefaultShipping || !anyValidShippingAddress) ?? false,
    isDefaultBilling:
      (selectedAddress?.isDefaultBilling || !anyValidBillingAddress) ?? false
  })

  useEffect(() => {
    setFormValues({
      firstName: selectedAddress?.firstName ?? firstName ?? '',
      lastName: selectedAddress?.lastName ?? lastName ?? '',
      address1: selectedAddress?.address1 ?? '',
      houseNumber: selectedAddress?.houseNumber ?? '',
      ...(selectedAddress?.id && { addressId: selectedAddress?.id }),
      ...(reference && { reference }),
      addition:
        selectedAddress?.addition === '' || !selectedAddress?.addition
          ? ''
          : selectedAddress?.addition,
      zipCode: selectedAddress?.zipCode ?? '',
      city: selectedAddress?.city ?? '',
      subdivision: selectedAddress?.subdivision ?? '',
      country: t('create-account.prefilled-country'),
      taxReference: taxReference ?? '',
      isDefaultShipping:
        (selectedAddress?.isDefaultShipping || !anyValidShippingAddress) ??
        false,
      isDefaultBilling:
        (selectedAddress?.isDefaultBilling || !anyValidBillingAddress) ?? false
    })
  }, [selectedAddress, anyValidShippingAddress, isOpen])

  useEffect(() => {
    if (Object.keys(selectedSuggestedAddress).length > 0) {
      const formatedSubdivision = normalizeSubdivision(
        selectedSuggestedAddress?.address?.county,
        locale
      )
      const isValidSubdivision = subdivisionsPerLocale
        .map(subdivision => subdivision.label)
        .includes(formatedSubdivision)
      setFormValues({
        ...formValues,
        address1: selectedSuggestedAddress.address?.street ?? '',
        zipCode: selectedSuggestedAddress.address?.postalCode ?? '',
        city: selectedSuggestedAddress?.address?.city ?? '',
        ...(isValidSubdivision && {
          subdivision: formatedSubdivision
        })
      })
      setShowSuggestedAddresses(false)
      document.getElementById('houseNumber')?.focus({ preventScroll: true })
      scrollToElement(addressAndHouseNumberRow.current)
    }
  }, [selectedSuggestedAddress])

  useEffect(() => {
    dispatch(validateAddressReset())
  }, [selectedAddress, dispatch])

  /* Form Validation */
  const AddressFormValidationSchema = Yup.object({
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
    address1: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(address1Regex, t('account.address-form.address-format'))
      .required(t('account.address-form.address-required')),
    zipCode: Yup.string()
      .trim()
      .matches(
        zipCodeRegexByLocale(locale ?? ''),
        t('account.address-form.zip-code-format')
      )
      .required(t('account.address-form.zip-code-required')),
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
    country: Yup.string().required(t('account.address-form.country-required')),
    ...(isSpecialTaxProvince(formValues.subdivision ?? '') &&
      !taxReference && {
        taxReference: Yup.string()
          .trim()
          .matches(
            taxReferenceRegex,
            t('account.address-form.tax-reference-format')
          )
          .required(t('account.address-form.tax-reference-required'))
      })
  })

  /* Equivalence surcharge*/
  const [
    equivalenceSurchargeDisabled,
    setEquivalenceSurchargeDisabled
  ] = useState(
    formValues.subdivision
      ? isSpecialTaxProvince(formValues.subdivision) && isBusinessAccount
      : false
  )

  useEffect(() => {
    setEquivalenceSurchargeDisabled(
      isSpecialTaxProvince(formValues.subdivision ?? '')
    )
  }, [formValues.subdivision])

  return (
    <>
      <h1 className="mb-3">
        {selectedAddress
          ? t('account.address-form.edit-address.title')
          : t('account.address-form.new-address.title')}
      </h1>
      {typeof selectedAddress !== 'undefined' &&
        canShowAddressFormatNotification() && (
          <Notification
            data-testid="addressFormatNotification"
            className="mb-2"
            type="warning"
            content={t(
              'account.address-form.edit-address.format-warning.content'
            )}
            title={t('account.address-form.edit-address.format-warning.title')}
          />
        )}
      {(!anyValidShippingAddress || !anyValidBillingAddress) && (
        <Notification
          data-testid="notValidAddressesNotification"
          className="mb-2"
          type="info"
          title={
            !anyValidShippingAddress
              ? !anyValidBillingAddress
                ? t('account.address-form.default-address-warning.content')
                : t(
                    'account.address-form.default-shipping-address-warning.content'
                  )
              : t(
                  'account.address-form.default-billing-address-warning.content'
                )
          }
        />
      )}
      <Formik<AddressFormValues>
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => {
          values.isDefaultShipping =
            formValues.isDefaultShipping || !anyValidShippingAddress
          values.isDefaultBilling =
            formValues.isDefaultBilling || !anyValidBillingAddress
          values.subdivision = formValues.subdivision
          if (!isSpecialTaxProvince(formValues.subdivision ?? '')) {
            values.taxReference = undefined
          }
          recursiveTrimObjectValues(values)
          onSubmit?.(values)
        }}
        validationSchema={AddressFormValidationSchema}
        validateOnBlur={false}
      >
        {({ values, errors, touched, setFieldError }) => (
          <Form
            {...props}
            className={classNames({
              'pointer-events-none': isAddressLoading
            })}
            data-testid="AddressForm"
          >
            <FormField
              required
              inputId="firstName"
              label={t('form.field.first-name.label')}
              data-testid="AddressFormFirstName"
              error={touched.firstName && errors.firstName}
            >
              <Field
                data-testid="AddressFormFirstNameField"
                component={TextField}
                type="text"
                name="firstName"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldError(e.target.name, undefined)
                  handleOnChangeField(
                    { name: e.target.name, value: e.target.value },
                    values
                  )
                }}
              />
            </FormField>
            <FormField
              required
              inputId="lastName"
              label={t('form.field.last-name.label')}
              data-testid="AddressFormLastName"
              error={touched.lastName && errors.lastName}
            >
              <Field
                data-testid="AddressFormLastNameField"
                component={TextField}
                type="text"
                name="lastName"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldError(e.target.name, undefined)
                  handleOnChangeField(
                    { name: e.target.name, value: e.target.value },
                    values
                  )
                }}
              />
            </FormField>
            <div
              ref={addressAndHouseNumberRow}
              className="grid grid-cols-4 gap-2 xs-only:relative"
            >
              <div
                className="col-span-3 sm:relative"
                ref={addressFieldAndDropdown}
              >
                <FormField
                  required
                  inputId="address1"
                  label={t('form.field.address1.label')}
                  className="mb-2 col-span-3"
                  data-testid="AddressFormAddress1"
                  error={touched.address1 && errors.address1}
                >
                  <Field
                    data-testid="AddressFormAddress1Field"
                    component={TextField}
                    type="text"
                    name="address1"
                    onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldError(e.target.name, undefined)
                      setShowSuggestedAddresses(
                        e.target.value.length > addressSuggestionMinQueryLength
                      )
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldError(e.target.name, undefined)
                      handleOnChangeField(
                        { name: e.target.name, value: e.target.value },
                        values
                      )
                      e.target.value.length > addressSuggestionMinQueryLength &&
                        handleSuggestAddresses(values)
                      setShowSuggestedAddresses(
                        e.target.value.length > addressSuggestionMinQueryLength
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
                  setSelectedAddress={setSelectedSuggestedAddress}
                  showSuggestedAddresses={showSuggestedAddresses}
                  suggestedAddresses={suggestedAddresses}
                />
              </div>
              <FormField
                required
                inputId="houseNumber"
                label={t('form.field.house-number.label')}
                data-testid="AddressFormHouseNumber"
                error={touched.houseNumber && errors.houseNumber}
              >
                <Field
                  data-testid="AddressFormHouseNumberField"
                  component={TextField}
                  type="text"
                  name="houseNumber"
                  onFocus={() => setShowSuggestedAddresses(false)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldError(e.target.name, undefined)
                    handleOnChangeField(
                      { name: e.target.name, value: e.target.value },
                      values
                    )
                  }}
                />
              </FormField>
            </div>
            <FormField
              inputId="addition"
              label={t('form.field.addition.label')}
              data-testid="AddressFormAddition"
              error={touched.addition && errors.addition}
            >
              <Field
                placeholder={t('account.address-form.addition-placeholder')}
                data-testid="AddressFormAdditionField"
                component={TextField}
                type="text"
                name="addition"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldError(e.target.name, undefined)
                  handleOnChangeField(
                    { name: e.target.name, value: e.target.value },
                    values
                  )
                }}
              />
            </FormField>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                required
                inputId="zipCode"
                label={t('form.field.zip-code.label')}
                data-testid="AddressFormZipCode"
                error={touched.zipCode && errors.zipCode}
              >
                <Field
                  data-testid="AddressFormZipCodeField"
                  component={TextField}
                  type="text"
                  name="zipCode"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldError(e.target.name, undefined)
                    handleOnChangeField(
                      { name: e.target.name, value: e.target.value },
                      values
                    )
                  }}
                />
              </FormField>
              <FormField
                required
                inputId="city"
                label={t('form.field.city.label')}
                data-testid="AddressFormCity"
                className="mb-2 col-span-2"
                error={touched.city && errors.city}
              >
                <Field
                  data-testid="AddressFormCityField"
                  component={TextField}
                  type="text"
                  name="city"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldError(e.target.name, undefined)
                    handleOnChangeField(
                      { name: e.target.name, value: e.target.value },
                      values
                    )
                  }}
                />
              </FormField>
            </div>

            <>
              {locale !== 'de-de' && (
                <FormField
                  required
                  inputId="subdivision"
                  label={t('form.field.subdivision.label')}
                  data-testid="AddressFormSubdivision"
                  error={touched.subdivision && errors.subdivision}
                >
                  <Field
                    inputId="subdivision"
                    name="subdivision"
                    component={SelectField}
                    value={formValues.subdivision}
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
                          value: option.value,
                          name: actionMeta.name as string
                        },
                        values
                      )
                      setEquivalenceSurchargeDisabled(
                        isSpecialTaxProvince(option.value) && isBusinessAccount
                      )
                    }}
                  />
                </FormField>
              )}
              {!surcharge && equivalenceSurchargeDisabled && (
                <Notification
                  data-testid="taxRecalculationNotification"
                  className="mb-2"
                  type="info"
                  title={t(
                    'account.create-account-form.special-region-tax.content'
                  )}
                />
              )}
              {surcharge &&
                isBusinessAccount &&
                equivalenceSurchargeDisabled && (
                  <Notification
                    data-testid="equivalenceSurchargeNotification"
                    className="mb-2"
                    type="info"
                    title={t(
                      'address.book.notfication.surcharge-region-clash.body'
                    )}
                  />
                )}
            </>
            {/* The country field is disabled as customers will not be able to change it for now */}
            <FormField
              className="pointer-events-none mb-3"
              inputId="country"
              label={t('form.field.country.label')}
              data-testid="AddressFormCountry"
              error={touched.country && errors.country}
            >
              <Field
                data-testid="AddressFormCountryField"
                component={TextField}
                type="text"
                name="country"
                className="disabled:bg-primary-white disabled:text-ui-grey-default-alt disabled:pointer-events-none"
                disabled
              />
            </FormField>
            {(isSpecialTaxProvince(formValues.subdivision ?? '') ||
              (isRequestingInvoicesEnabled &&
                isSpecialRegionZipCode(formValues.zipCode))) &&
              !taxReference && (
                <div className="bg-ui-guyabano p-2">
                  <FormField
                    inputId="taxReference"
                    label={t('form.field.tax-reference.label')}
                    data-testid="AddressFormTaxReference"
                    error={touched.taxReference && errors.taxReference}
                  >
                    <Field
                      data-testid="AddressFormTaxReferenceField"
                      component={TextField}
                      type="text"
                      name="taxReference"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldError(e.target.name, undefined)
                        handleOnChangeField(
                          { name: e.target.name, value: e.target.value },
                          values
                        )
                      }}
                    />
                    <p className="mt-1 text-sm">
                      {t('account.address-form.tax-reference-hint')}
                    </p>
                  </FormField>
                </div>
              )}
            <FormField
              className={classNames('mt-1 mb-2', {
                'cursor-pointer': !selectedAddress?.isDefaultShipping,
                'opacity-50 pointer-events-none':
                  selectedAddress?.isDefaultShipping || !anyValidShippingAddress
              })}
              inputId="isDefaultShipping"
              label=""
              data-testid="AddressFormIsDefaultShipping"
              error={touched.isDefaultShipping && errors.isDefaultShipping}
            >
              <Checkbox
                label={t('form.field.default-delivery-address')}
                id={'isDefaultShipping'}
                isChecked={formValues.isDefaultShipping}
                onChange={() => {
                  handleOnChangeField(undefined, values, {
                    isShippingCheckbox: true
                  })
                }}
                isFilter
                data-testid="isDefaultShippingCheckbox"
                variant="primary"
              />
            </FormField>
            <FormField
              className={classNames('mb-3 sm:mb-4 lg:mb-5', {
                'cursor-pointer': !selectedAddress?.isDefaultBilling,
                'opacity-50 pointer-events-none':
                  selectedAddress?.isDefaultBilling || !anyValidBillingAddress
              })}
              inputId="isDefaultBilling"
              label=""
              data-testid="AddressFormIsDefaultBilling"
              error={touched.isDefaultBilling && errors.isDefaultBilling}
            >
              <Checkbox
                label={t('form.field.default-billing-address')}
                id={'isDefaultBilling'}
                isChecked={formValues.isDefaultBilling}
                onChange={() => {
                  handleOnChangeField(undefined, values, {
                    isBillingCheckbox: true
                  })
                }}
                isFilter
                data-testid="isDefaultBillingCheckbox"
                variant="primary"
              />
            </FormField>
            <Button
              data-testid="AddressFormSubmitButton"
              className="w-full"
              type="submit"
              isLoading={isAddressLoading}
            >
              {t('form.save-address')}{' '}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
