import type { GetServerSideProps } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import { Button } from '~components/atoms/Button/Button'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import {
  UpdateAccountDetailsForm,
  UpdateAccountDetailsFormValues
} from '~components/organisms/UpdateAccountDetailsForm/UpdateAccountDetailsForm'
import { Notification } from '~components/atoms/Notification'
import {
  parseDateOfBirthFormat,
  updateCustomerPersonalDetailsTrigger
} from '~domains/account'
import NextLink from 'next/link'
import {
  selectWasSuccess,
  selectWasError,
  selectAddresses,
  selectCustomerType,
  selectCustomerReference,
  selectCustomerSalutation,
  selectCustomerTaxReference,
  selectDefaultBillingAddress,
  selectDefaultShippingAddress
} from '~domains/account/selectors/customer'
import {
  selectWasError as selectWasErrorOnCreate,
  selectError as selectErrorOnCreate
} from '~domains/account/selectors/create-new-address'
import {
  selectWasError as selectWasErrorOnUpdate,
  selectError as selectErrorOnUpdate
} from '~domains/account/selectors/update-customer-personal-details'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { getLocaleFromCountry } from '~helpers'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
// TODO: Remove once implementation is proved on all environments
import { FeatureFlag } from '~config/constants/feature-flags'
import { ACCOUNT_TYPE_PERSONAL } from '~config/constants/account-types'
import { CustomerSalutation } from '~domains/checkout/types'
import { Link } from '~components/atoms/Link'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

const ChangePersonalDetails: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale, back } = useRouter()
  const dispatch = useDispatch()
  const getCustomerWasSuccess = useSelector(selectWasSuccess)
  const getCustomerWasError = useSelector(selectWasError)
  const wasErrorOnUpdate = useSelector(selectWasErrorOnUpdate)
  const errorOnUpdate = useSelector(selectErrorOnUpdate)
  const wasErrorOnCreate = useSelector(selectWasErrorOnCreate)
  const errorOnCreate = useSelector(selectErrorOnCreate)
  const reference = useSelector(selectCustomerReference)
  const customerTaxReference = useSelector(selectCustomerTaxReference)
  const salutation = useSelector(selectCustomerSalutation) ?? 'Ms'
  const customerAddresses = useSelector(selectAddresses)
  const billingAddress = useSelector(selectDefaultBillingAddress)
  const shippingAddress = useSelector(selectDefaultShippingAddress)
  const address = shippingAddress ?? billingAddress ?? undefined
  const customerType = useSelector(selectCustomerType)
  const [formWasSubmitted, setFormWasSubmitted] = useState(false)

  const isDateOfBirthEnabled = useFeatureFlag(FeatureFlag.ACCOUNT_DATE_OF_BIRTH)

  const getLocale = (): string => {
    return getLocaleFromCountry(address?.country)
  }

  const handleUpdateAccountOnSubmit = useCallback(
    (values: UpdateAccountDetailsFormValues) => {
      dispatch(
        updateCustomerPersonalDetailsTrigger({
          salutation: values.salutation,
          firstName: values['first-name'],
          lastName: values['last-name'],
          ...(locale === 'de-de' &&
            isDateOfBirthEnabled && {
              dateOfBirth: parseDateOfBirthFormat(values.dateOfBirth)
            }),
          customerAddressesIds: customerAddresses.map(address => address.id),
          ...(customerTaxReference &&
            customerType === ACCOUNT_TYPE_PERSONAL &&
            locale === 'es-es' && {
              taxReference: values.taxReference
            }),
          ...(customerAddresses.length > 0 && {
            phone: values['phone-number']
          }),
          reference: reference,
          redirect: '/account/details'
        })
      )
      return
    },
    [
      dispatch,
      locale,
      isDateOfBirthEnabled,
      customerAddresses,
      customerTaxReference,
      customerType,
      reference
    ]
  )

  return (
    <>
      <MetaData
        title={t('seo.titles.change-personal-details')}
        indexation="noindex"
      />
      <AlternateLinks
        links={getAlternateLinks(
          'account/details/change-personal-details',
          locale
        )}
      />
      <div className="mx-3 sm:mx-0">
        <h1>{t('account.change-personal-details.label')}</h1>
      </div>
      <div className="flex flex-col mx-3 mt-3 sm:mt-3.5 sm:mx-0">
        <UpdateAccountDetailsForm
          addressLocale={getLocale()}
          customerSalutation={salutation as CustomerSalutation}
          shippingAddress={shippingAddress}
          billingAddress={billingAddress}
          notification={
            (getCustomerWasSuccess || getCustomerWasError) &&
            (!shippingAddress || !billingAddress) ? (
              <Notification
                type="warning"
                role="alert"
                title={t(
                  'account.change-personal-details.missing-address.title'
                )}
                content={
                  !shippingAddress && !billingAddress
                    ? t(
                        'account.change-personal-details.missing-shipping-and-billing-address.content'
                      )
                    : !shippingAddress
                    ? t(
                        'account.change-personal-details.missing-shipping-address.content'
                      )
                    : t(
                        'account.change-personal-details.missing-billing-address.content'
                      )
                }
              >
                <NextLink
                  href="/account/address-book"
                  passHref
                  prefetch={false}
                >
                  <Link>{t('account.address-book')}</Link>
                </NextLink>
              </Notification>
            ) : (
              wasErrorOnUpdate &&
              wasErrorOnCreate &&
              formWasSubmitted && (
                <Notification
                  type="error"
                  role="alert"
                  title={t('account.change-personal-details.error')}
                  content={errorOnUpdate ?? errorOnCreate}
                />
              )
            )
          }
          onSubmit={values => {
            setFormWasSubmitted(true)
            handleUpdateAccountOnSubmit(values)
          }}
        />
        <Button
          onClick={back}
          className="w-full mt-4"
          variant="tertiary"
          data-testid="cancelUpdateAccountFormButton"
        >
          {t('shared.cancel')}
        </Button>
      </div>
    </>
  )
}

ChangePersonalDetails.Layout = (page: JSX.Element) => (
  <AccountPageLayout hasAnyQuestionsBlock={false} isForm={true}>
    {page}
  </AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_SALUTATION_FIELD,
    FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL,
    FeatureFlag.ACCOUNT_DATE_OF_BIRTH
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default ChangePersonalDetails
