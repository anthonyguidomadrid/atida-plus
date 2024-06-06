import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import {
  FeatureFlagValue,
  useFeatureFlag
} from '~components/helpers/FeatureFlags/hooks'
import {
  STEP_PERSONAL_DETAILS,
  STEP_ADDRESS_DETAILS
} from '~config/constants/account-creation'
import { ACCOUNT_CREATION_REGEX } from '~config/constants/accout-creation-regex'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  MAXIMUM_LENGTH_100,
  MAXIMUM_LENGTH_72,
  MAXIMUM_LENGTH_255
} from '~config/constants/maximum-length'
import {
  zipCodeRegexByLocale,
  taxReferenceRegexByLocale,
  getSubdivisionsPerLocale
} from '~helpers'
import { isTaxRegionValidByProvinces } from '~helpers/isTaxRegionValidByProvinces'
import { isTaxRegionValidByZipcodes } from '~helpers/isTaxRegionValidByZipcodes'
import { CreateAccountFormValues } from './CreateAccountForm'
import { customPhoneValidation } from './validationHelpers'

interface IUseValidationSchema {
  isBusinessAccount: boolean
  isPhoneNumberOptional: FeatureFlagValue
  currentFormStep: number
  isBillingSameAsShipping: boolean
  isSpecialTaxProvince: (type: string) => boolean
  setValidTaxRegionsZipCode: React.Dispatch<React.SetStateAction<boolean>>
  setValidTaxRegionsProvince: React.Dispatch<React.SetStateAction<boolean>>
  formValues: CreateAccountFormValues
  isMultipleTaxRegionsValidationEnabled: boolean
}

export const useValidationSchema = ({
  isBusinessAccount,
  isPhoneNumberOptional,
  currentFormStep,
  isBillingSameAsShipping,
  isSpecialTaxProvince,
  setValidTaxRegionsZipCode,
  setValidTaxRegionsProvince,
  formValues,
  isMultipleTaxRegionsValidationEnabled
}: IUseValidationSchema) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const isAdditionalCIFFormatValidationEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_ADDITIONAL_CIF_FORMAT_VALIDATION
  )

  const isDateOfBirthEnabled = useFeatureFlag(FeatureFlag.ACCOUNT_DATE_OF_BIRTH)

  const subdivisionsPerLocale = getSubdivisionsPerLocale(locale ?? '')
  const subdivisionRegex = new RegExp(
    subdivisionsPerLocale.map(subdivision => subdivision.label).join('|')
  )

  const getValidationSchema = () => {
    switch (currentFormStep) {
      default:
      case STEP_PERSONAL_DETAILS:
        return multiStepPersonalStepValidationSchema

      case STEP_ADDRESS_DETAILS:
        return isBillingSameAsShipping
          ? multiStepAddressStepValidationSchema
          : multiStepAddressStepWithBillingValidationSchema
    }
  }

  const addressDataValidationSchema = {
    address1: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(
        ACCOUNT_CREATION_REGEX.address1Regex,
        t('account.address-form.city-format')
      )
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
            setValidTaxRegionsZipCode?.(isValid)
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
      .matches(
        ACCOUNT_CREATION_REGEX.cityRegex,
        t('account.address-form.city-format')
      )
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
              setValidTaxRegionsProvince?.(isValid)
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
      .matches(
        ACCOUNT_CREATION_REGEX.houseNumberRegex,
        t('account.address-form.house-number-format')
      )
      .required(t('account.address-form.house-number-required')),
    addition: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(
        ACCOUNT_CREATION_REGEX.additionRegex,
        t('account.address-form.appendix-format')
      ),
    country: Yup.string().required(t('account.address-form.country-required')),
    ...(!isBusinessAccount &&
      (isSpecialTaxProvince('shipping') || isSpecialTaxProvince('billing')) && {
        taxReference: Yup.string()
          .matches(
            taxReferenceRegexByLocale(locale ?? '', true),
            t('account.address-form.tax-reference-format')
          )
          .required(t('account.address-form.tax-reference-required'))
      })
  }

  const personalDataValidationSchema = {
    salutation: Yup.string().required(t('create-account.salutation.required')),
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
      .matches(
        ACCOUNT_CREATION_REGEX.firstNameRegex,
        t('account.address-form.first-name-format')
      )
      .required(t('account.address-form.first-name-required')),
    lastName: Yup.string()
      .trim()
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(
        ACCOUNT_CREATION_REGEX.lastNameRegex,
        t('account.address-form.last-name-format')
      )
      .required(t('account.address-form.last-name-required')),
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
      }),
    password: Yup.string()
      .required(t('create-account.password.required'))
      .max(
        MAXIMUM_LENGTH_72,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_72
        })
      )
      .matches(
        ACCOUNT_CREATION_REGEX.passwordValidationRegex,
        t('create-account.password-format')
      )
  }

  const optionalDataValidationSchema = {
    phoneNumber: isPhoneNumberOptional
      ? Yup.string()
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
      : Yup.string()
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

  const multiStepPersonalStepValidationSchema = Yup.object({
    ...personalDataValidationSchema
  })

  const multiStepAddressStepValidationSchema = Yup.object({
    shipping: Yup.object(addressDataValidationSchema),
    ...optionalDataValidationSchema,
    ...(isBusinessAccount &&
      currentFormStep === STEP_ADDRESS_DETAILS && {
        company: Yup.string()
          .trim()
          .max(
            MAXIMUM_LENGTH_100,
            t('shared.max-length', {
              maxLength: MAXIMUM_LENGTH_100
            })
          )
          .matches(
            ACCOUNT_CREATION_REGEX.companyRegex,
            t('create-account.company-format')
          )
          .required(t('create-account.company.required')),
        taxReferenceBusiness: Yup.string()
          .trim()
          .matches(
            taxReferenceRegexByLocale(
              locale ?? '',
              false,
              isAdditionalCIFFormatValidationEnabled
            ),
            t('create-account.tax-reference-business-format')
          )
          .required(t('account.address-form.tax-reference-required'))
      })
  })

  const multiStepAddressStepWithBillingValidationSchema = Yup.object({
    shipping: Yup.object(addressDataValidationSchema),
    billing: Yup.object(addressDataValidationSchema),
    ...optionalDataValidationSchema,
    ...(isBusinessAccount &&
      currentFormStep === STEP_ADDRESS_DETAILS && {
        company: Yup.string()
          .trim()
          .matches(
            ACCOUNT_CREATION_REGEX.companyRegex,
            t('create-account.company-format')
          )
          .required(t('create-account.company.required')),
        taxReferenceBusiness: Yup.string()
          .trim()
          .matches(
            taxReferenceRegexByLocale(
              locale ?? '',
              false,
              isAdditionalCIFFormatValidationEnabled
            ),
            t('create-account.tax-reference-business-format')
          )
          .required(t('account.address-form.tax-reference-required'))
      })
  })

  return {
    getValidationSchema
  }
}
