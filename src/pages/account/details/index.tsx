import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { BusinessDetails } from '~components/molecules/BusinessDetails'
import { PersonalDetails } from '~components/molecules/PersonalDetails'
import { PrivacySection } from '~components/molecules/PrivacySection'
import { getAlternateLinks } from '~domains/translated-routes'
import { triggerReportPageViewed } from '~domains/analytics'
import { createReduxStore } from '~domains/redux'
import { pageContentFulfill, pageContentTrigger } from '~domains/page'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import {
  customerSelectors,
  updatePasswordSelectors,
  updatePersonalDetailsSelectors,
  updateCustomerPasswordHideNotificationTrigger,
  updateCustomerPersonalDetailsHideNotificationTrigger
} from '~domains/account'
import { Notification } from '~components/atoms/Notification/Notification'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { selectIsBasketEmpty } from '~domains/basket'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'
import { setDataClear } from '~domains/checkout'
import { ACCOUNT_TYPE_BUSINESS } from '~config/constants/account-types'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { Link } from '~components/atoms/Link'
import NextLink from 'next/link'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

const AccountDetails: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const customer = useSelector(customerSelectors.selectCustomerDetails)
  const customerWasFetched = useSelector(customerSelectors.selectWasSuccess)
  const defaultBillingAddress = useSelector(
    customerSelectors.selectDefaultBillingAddress
  )
  const isBasketEmpty = useSelector(selectIsBasketEmpty)

  const updatePersonalDetailsShowNotification = useSelector(
    updatePersonalDetailsSelectors.selectShowNotification
  )
  const updatePasswordShowNotification = useSelector(
    updatePasswordSelectors.selectShowNotification
  )

  const isPhoneNumberAgainstCustomerEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL
  )

  const isDateOfBirthEnabled = useFeatureFlag(FeatureFlag.ACCOUNT_DATE_OF_BIRTH)

  const phoneNumber = isPhoneNumberAgainstCustomerEnabled
    ? customer?.phoneNumber
    : defaultBillingAddress?.phone

  // TODO: Remove the following line when email preferences are brought back
  const emailPreferencesWasUpdated = false

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Account Details', pageType: 'account' })
    )
    dispatch(setDataClear())
  }, [dispatch])

  // Clear the notifications when navigating away from account details
  useEffect(() => {
    if (router.events) {
      const handleNavigation = (url: string) => {
        // remove the leading slash and locale, '/es-es/'
        const path = url.split('/').slice(2).join('/')

        if (path !== 'account/details') {
          if (updatePersonalDetailsShowNotification) {
            dispatch(updateCustomerPersonalDetailsHideNotificationTrigger())
          }
          if (updatePasswordShowNotification) {
            dispatch(updateCustomerPasswordHideNotificationTrigger())
          }
        }
      }

      router.events.on('routeChangeComplete', handleNavigation)

      return () => {
        router.events.off('routeChangeComplete', handleNavigation)
      }
    }
  }, [
    router,
    dispatch,
    updatePersonalDetailsShowNotification,
    updatePasswordShowNotification
  ])

  return (
    <>
      <MetaData title={t('seo.titles.account-details')} indexation="noindex" />
      <AlternateLinks
        links={getAlternateLinks('account/details', router.locale)}
      />
      <div className="px-2 sm:px-0">
        <h1 className="mb-3 md:mb-4 lg:mb-5">
          {t('account.account-details.label')}
        </h1>
        {(updatePersonalDetailsShowNotification ||
          updatePasswordShowNotification) &&
          !emailPreferencesWasUpdated && (
            <Notification
              className="mb-3"
              type="success"
              role="alert"
              title={
                updatePersonalDetailsShowNotification
                  ? t('update-account.personal-details-success')
                  : t('account.change-password.success')
              }
            >
              {!isBasketEmpty && !updatePasswordShowNotification && (
                <NextLink href="/checkout" passHref prefetch={false}>
                  <Link data-testid="navigationItemLink">
                    {t('update-account.take-me-to-the-checkout')}
                  </Link>
                </NextLink>
              )}
            </Notification>
          )}
        {customerWasFetched &&
          customer?.accountType === ACCOUNT_TYPE_BUSINESS && (
            <BusinessDetails
              companyName={customer?.company}
              equivalenceSurcharge={customer.surcharge}
              taxReference={customer?.taxReference}
              className="mb-6 mt-3"
            />
          )}
        {customerWasFetched && (
          <PersonalDetails
            email={customer?.email}
            name={`${customer?.firstName} ${customer?.lastName}`}
            phone={phoneNumber}
            taxReference={customer?.taxReference}
            accountType={customer?.accountType}
            {...(router.locale === 'de-de' &&
              isDateOfBirthEnabled && {
                dateOfBirth: customer?.dateOfBirth
              })}
            className="mb-6 mt-3"
          />
        )}
        <PrivacySection className="my-6" />
      </div>
    </>
  )
}

AccountDetails.Layout = (page: JSX.Element) => (
  <AccountPageLayout>{page}</AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL,
    FeatureFlag.ACCOUNT_DATE_OF_BIRTH
  ])

  store.dispatch(pageContentTrigger({ slug: getPageUrlSlug(context) }))

  await store.dispatch({
    type: 'page-content',
    [WAIT_FOR_ACTION]: pageContentFulfill().type
  })

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default AccountDetails
