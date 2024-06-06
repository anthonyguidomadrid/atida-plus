import type { GetServerSideProps } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import { Button } from '~components/atoms/Button/Button'
import { useTranslation } from 'react-i18next'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { UpdateBusinessDetailsForm } from '~components/organisms/UpdateBusinessDetailsForm/UpdateBusinessDetailsForm'
import { NextPage } from 'next'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { UpdateBusinessDetailsFormValues } from '~components/organisms/UpdateBusinessDetailsForm'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { Notification } from '~components/atoms/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { updateBusinessDetailsTrigger } from '~domains/account'
import {
  selectCustomerReference,
  selectCustomerDetails,
  selectDefaultShippingAddress
} from '~domains/account/selectors/customer'
import { useEffect, useState } from 'react'
import { SPECIAL_TAX_PROVINCES_ES } from '~config/constants/subdivisions-per-locale'
import { ACCOUNT_TYPE_BUSINESS } from '~config/constants/account-types'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const ChangeBusinessDetails: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale, back } = useRouter()
  const dispatch = useDispatch()
  const customerReference = useSelector(selectCustomerReference)
  const customer = useSelector(selectCustomerDetails)
  const defaultShippingaddress = useSelector(selectDefaultShippingAddress)

  const [initialValues, setInitialValues] = useState({
    companyName: customer?.company,
    taxReference: customer?.taxReference,
    hasEquivalenceSurcharge: customer?.surcharge,
    isSpecialTaxRegion: false
  })

  useEffect(() => {
    setInitialValues({
      companyName: customer?.company,
      taxReference: customer?.taxReference,
      hasEquivalenceSurcharge: customer?.surcharge,
      isSpecialTaxRegion: SPECIAL_TAX_PROVINCES_ES.some(
        province => province.label === defaultShippingaddress?.province
      )
    })
  }, [customer, defaultShippingaddress])

  const handleUpdateAccountOnSubmit = (
    values: UpdateBusinessDetailsFormValues
  ) => {
    if (customerReference)
      dispatch(
        updateBusinessDetailsTrigger({
          reference: customerReference,
          companyName: values.companyName,
          taxReference: values.taxReference,
          equivalenceSurcharge: values.hasEquivalenceSurcharge,
          redirect: '/account/details'
        })
      )
  }

  return (
    <>
      <MetaData
        title={t('seo.titles.change-business-details')}
        indexation="noindex"
      />
      <AlternateLinks
        links={getAlternateLinks(
          'account/details/change-business-details',
          locale
        )}
      />
      <div className="mx-3 sm:mx-0">
        <h1>{t('account.change-business-details.label')}</h1>
      </div>
      <div className="flex flex-col mx-3 mt-3 sm:mt-3.5 sm:mx-0">
        <UpdateBusinessDetailsForm
          locale={locale}
          notification={
            customer?.accountType !== ACCOUNT_TYPE_BUSINESS && (
              <Notification
                content={t(
                  'account.change-business-details.account-type-warning.content'
                )}
                title={t(
                  'account.change-business-details.account-type-warning.title'
                )}
                type="warning"
              />
            )
          }
          accountType={customer?.accountType}
          isSpecialTaxRegion={initialValues.isSpecialTaxRegion}
          companyName={initialValues.companyName ?? ''}
          taxReference={initialValues.taxReference ?? ''}
          hasEquivalenceSurcharge={
            initialValues.hasEquivalenceSurcharge ?? false
          }
          onSubmit={values => {
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

ChangeBusinessDetails.Layout = (page: JSX.Element) => (
  <AccountPageLayout hasAnyQuestionsBlock={false} isForm={true}>
    {page}
  </AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale)

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default ChangeBusinessDetails
