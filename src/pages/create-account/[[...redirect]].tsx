import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import {
  CreateAccountForm,
  CreateAccountFormValues
} from '~components/organisms/CreateAccountForm'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import { getAlternateLinks } from '~domains/translated-routes'
import {
  triggerReportAccountCreatedFailed,
  triggerReportEmailSubscription,
  triggerReportPageViewed
} from '~domains/analytics'
import { createReduxStore } from '~domains/redux'
import {
  AccountType,
  createCustomerClear,
  createCustomerTrigger,
  parseDateOfBirthFormat,
  selectError,
  selectWasError
} from '~domains/account'
import { Notification } from '~components/atoms/Notification'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { transformLocaleToUppercase } from '~helpers'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
// TODO: Remove once implementation is proved on all environments
import { FeatureFlag } from '~config/constants/feature-flags'
import { ACCOUNT_TYPE_PERSONAL } from '~config/constants/account-types'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

const CreateAccount: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { locale, query } = useRouter()
  const dispatch = useDispatch()
  const wasError = useSelector(selectWasError)
  const error = useSelector(selectError)
  const { t } = useTranslation()
  const isPhoneNumberAgainstCustomerEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL
  )
  const isRequestingInvoicesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_REQUEST_INVOICE
  )

  const isDateOfBirthEnabled = useFeatureFlag(FeatureFlag.ACCOUNT_DATE_OF_BIRTH)

  const [accountType, setAccountType] = useState<AccountType['accountType']>(
    ACCOUNT_TYPE_PERSONAL
  )

  const redirect = Array.isArray(query.redirect)
    ? `/${query.redirect.join('/')}`
    : undefined

  const handleCreatAccountOnSubmit = useCallback(
    (values: CreateAccountFormValues) => {
      setAccountType(values.accountType)
      const addresses = [
        {
          salutation: values.salutation,
          firstName: values.firstName,
          lastName: values.lastName,
          ...(!isPhoneNumberAgainstCustomerEnabled && {
            phone: values.phoneNumber
          }),
          address1: values.shipping.address1,
          houseNumber: values.shipping.houseNumber,
          addition: values.shipping.addition,
          zipCode: values.shipping.zipCode,
          city: values.shipping.city,
          ...(locale === 'es-es' && {
            province: values.shipping.subdivision
          }),
          ...(locale === 'pt-pt' && {
            district: values.shipping.subdivision
          }),
          iso2Code: transformLocaleToUppercase(locale).split('-')[1],
          isDefaultShipping: true,
          isDefaultBilling: values.isBillingSameAsShipping
        }
      ]

      if (values?.billing?.address1 && !values.isBillingSameAsShipping) {
        addresses.push({
          salutation: values.salutation,
          firstName: values.firstName,
          lastName: values.lastName,
          ...(!isPhoneNumberAgainstCustomerEnabled && {
            phone: values.phoneNumber
          }),
          address1: values.billing.address1,
          houseNumber: values.billing.houseNumber,
          addition: values.billing.addition,
          zipCode: values.billing.zipCode,
          city: values.billing.city,
          ...(locale === 'es-es' && {
            province: values.billing.subdivision
          }),
          ...(locale === 'pt-pt' && {
            district: values.billing.subdivision
          }),
          iso2Code: transformLocaleToUppercase(locale).split('-')[1],
          isDefaultShipping: false,
          isDefaultBilling: true
        })
      }

      dispatch(
        createCustomerTrigger({
          redirect: redirect,
          firstName: values.firstName,
          lastName: values.lastName,
          ...(locale === 'de-de' &&
            isDateOfBirthEnabled && {
              dateOfBirth: parseDateOfBirthFormat(values.dateOfBirth)
            }),
          salutation: values.salutation,
          email: values.email,
          password: values.password,
          confirmPassword: values.password,
          acceptedTerms: true,
          emailNotification: values.notified,
          ...(isPhoneNumberAgainstCustomerEnabled
            ? { phone: values.phoneNumber }
            : {}),
          taxReference:
            values.accountType === ACCOUNT_TYPE_PERSONAL
              ? values.shipping.taxReference ?? values?.billing?.taxReference
              : values.taxReferenceBusiness,
          accountType: values.accountType,
          company: values.company ?? null,
          surcharge: values.equivalenceSurcharge ?? null,
          addresses: {
            addresses
          },
          ...(isRequestingInvoicesEnabled && {
            invoiceRequired:
              !!values.shipping.taxReference ||
              !!values.billing?.taxReference ||
              !!values.taxReferenceBusiness
          })
        })
      )

      if (values.notified === true) {
        dispatch(
          triggerReportEmailSubscription({
            email: values.email,
            subscribed_from: 'account_creation',
            email_list: 'newsletter'
          })
        )
      }
    },
    [
      dispatch,
      isDateOfBirthEnabled,
      isPhoneNumberAgainstCustomerEnabled,
      isRequestingInvoicesEnabled,
      locale,
      redirect
    ]
  )

  useEffect(() => {
    wasError &&
      dispatch(
        triggerReportAccountCreatedFailed({
          error_key: error,
          error_message: t(error as string),
          account_type: accountType
        })
      )
  }, [dispatch, wasError, error, t, accountType])

  useEffect(() => {
    dispatch(createCustomerClear())
    dispatch(
      triggerReportPageViewed({ page: 'Create Account', pageType: 'account' })
    )
  }, [dispatch])

  return (
    <>
      <MetaData title={t('seo.titles.create-account')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('create-account', locale)} />

      <main className="h-full flex flex-col items-center justify-between">
        <CreateAccountForm
          redirect={redirect}
          notification={
            wasError ? (
              <Notification
                type="error"
                role="alert"
                title={t('create-account.error')}
                content={error}
              />
            ) : undefined
          }
          onSubmit={handleCreatAccountOnSubmit}
        />
      </main>
    </>
  )
}

CreateAccount.Layout = (page: JSX.Element) => {
  return (
    <AuthGuard isAuthPage>
      <MinimalPageLayout reducedVerticalMargin withBackButton>
        {page}
      </MinimalPageLayout>
    </AuthGuard>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_MARKETING_OPTION,
    FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL,
    FeatureFlag.ACCOUNT_SALUTATION_FIELD,
    FeatureFlag.ACCOUNT_CUSTOMER_CHECK,
    FeatureFlag.ACCOUNT_ADDRESS_VALIDATION,
    FeatureFlag.ACCOUNT_ADDRESS_SUGGESTION_SIGNUP,
    FeatureFlag.ACCOUNT_SIGNUP_PROGRESS_BAR,
    FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL,
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION,
    FeatureFlag.ACCOUNT_REQUEST_INVOICE,
    FeatureFlag.ACCOUNT_DATE_OF_BIRTH
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default CreateAccount
