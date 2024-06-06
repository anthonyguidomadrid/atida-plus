import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState
} from 'react'
import { Formik, Form, Field } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { taxReferenceRegexByLocale } from '~helpers/taxReferenceValidation'
import classNames from 'classnames'
import { updateusinessDetailsSelectors } from '~domains/account/selectors'
import { useSelector } from 'react-redux'
import { AccountType } from '~domains/account/types'
import {
  ACCOUNT_TYPE_BUSINESS,
  ACCOUNT_TYPE_PERSONAL
} from '~config/constants/account-types'
import { MAXIMUM_LENGTH_100 } from '~config/constants/maximum-length'
import { recursiveTrimObjectValues } from '~helpers'
import { Checkbox } from '~components/atoms/Checkbox'

export type UpdateBusinessDetailsFormValues = {
  companyName: string
  taxReference: string
  hasEquivalenceSurcharge: boolean
}

export type UpdateBusinessDetailsFormProps = UpdateBusinessDetailsFormValues &
  AccountType & {
    notification?: JSX.Element | boolean
    onSubmit?: (values: UpdateBusinessDetailsFormValues) => void
    locale?: string
    isSpecialTaxRegion: boolean
  }

export const UpdateBusinessDetailsForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> &
    UpdateBusinessDetailsFormProps
> = ({
  notification,
  onSubmit,
  locale,
  isSpecialTaxRegion,
  accountType = ACCOUNT_TYPE_PERSONAL,
  hasEquivalenceSurcharge,
  companyName,
  taxReference,
  ...props
}) => {
  const { t } = useTranslation()
  const companyNameRegex = /^.{1,100}$/
  const wasErrorOnUpdate = useSelector(
    updateusinessDetailsSelectors.selectWasError
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [equivalenceSurcharge, setEquivalenceSurcharge] = useState(
    hasEquivalenceSurcharge
  )
  const initialValues = {
    ...(accountType === ACCOUNT_TYPE_BUSINESS
      ? {
          companyName: companyName ?? '',
          taxReference: taxReference ?? '',
          hasEquivalenceSurcharge: hasEquivalenceSurcharge ?? false
        }
      : { companyName: '', taxReference: '', hasEquivalenceSurcharge: false })
  }

  const UpdateBusinessDetailsValidationSchema = Yup.object({
    companyName: Yup.string()
      .trim()
      .required(t('account.change-business-details.company-name.required'))
      .max(
        MAXIMUM_LENGTH_100,
        t('shared.max-length', {
          maxLength: MAXIMUM_LENGTH_100
        })
      )
      .matches(
        companyNameRegex,
        t('account.change-business-details.company-name-format')
      ),
    taxReference: Yup.string()
      .trim()
      .required(t('account.change-business-details.tax-reference.required'))
      .matches(
        taxReferenceRegexByLocale(locale ?? '', false),
        t('account.change-business-details.tax-reference-format')
      )
  })

  useEffect(() => {
    setIsSubmitting(false)
  }, [wasErrorOnUpdate])

  return (
    <div data-testid="UpdateBusinessDetailsForm">
      {notification}
      <Formik<UpdateBusinessDetailsFormValues>
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => {
          values.hasEquivalenceSurcharge = equivalenceSurcharge
          setIsSubmitting(true)
          recursiveTrimObjectValues(values)
          onSubmit?.(values)
        }}
        validationSchema={UpdateBusinessDetailsValidationSchema}
      >
        {({ values, errors, touched }) => (
          <Form {...props}>
            <FormField
              inputId="compantName"
              label={t('form.field.company-name.label')}
              data-testid="UpdateBusinessDetailsFormCompanyName"
              className={classNames('mb-1.5', {
                'opacity-50 pointer-events-none mt-2':
                  accountType !== ACCOUNT_TYPE_BUSINESS
              })}
              error={touched.companyName && errors.companyName}
            >
              <Field
                disabled={accountType !== ACCOUNT_TYPE_BUSINESS}
                data-testid="UpdateBusinessDetailsFormCompanyNameField"
                component={TextField}
                type="text"
                name="companyName"
              />
            </FormField>
            <FormField
              inputId="taxReference"
              label={t('form.field.tax-reference-business.label')}
              data-testid="UpdateBusinessDetailsFormTaxReference"
              className={classNames('mb-1.5', {
                'opacity-50 pointer-events-none':
                  accountType !== ACCOUNT_TYPE_BUSINESS
              })}
              error={touched.taxReference && errors.taxReference}
            >
              <Field
                disabled={accountType !== ACCOUNT_TYPE_BUSINESS}
                data-testid="UpdateBusinessDetailsFormTaxReferenceField"
                component={TextField}
                type="text"
                name="taxReference"
              />
            </FormField>
            {locale === 'es-es' && (
              <FormField
                className={classNames('mt-2 mb-2', {
                  'opacity-50 pointer-events-none':
                    isSpecialTaxRegion || accountType !== ACCOUNT_TYPE_BUSINESS
                })}
                inputId="equivalence-surcharge"
                label=""
                data-testid="UpdateBusinessDetailsFormEquivalenceSurcharge"
                error={
                  touched.hasEquivalenceSurcharge &&
                  errors.hasEquivalenceSurcharge
                }
              >
                <Checkbox
                  label={t('form.field.equivalence-surcharge')}
                  id={'equivalenceSurcharge'}
                  isChecked={equivalenceSurcharge}
                  onChange={() => {
                    values.hasEquivalenceSurcharge = !equivalenceSurcharge
                    setEquivalenceSurcharge(!equivalenceSurcharge)
                  }}
                  isFilter
                  data-testid="UpdateBusinessDetailsFormEquivalenceSurchargeCheckbox"
                  variant="primary"
                />
              </FormField>
            )}
            <Button
              type="submit"
              className="w-full mt-4"
              isLoading={isSubmitting}
              data-testid="UpdateBusinessDetailsFormButton"
              disabled={accountType !== ACCOUNT_TYPE_BUSINESS}
            >
              {t('shared.save-details')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
