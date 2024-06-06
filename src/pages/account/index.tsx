import type { GetServerSideProps, NextPage } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import { pageContentTrigger, pageContentFulfill } from '~domains/page'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { ReactComponent as NavUser } from '~assets/svg/navigation-24px/NavUser.svg'
import { ReactComponent as Coins } from '~assets/svg/navigation-24px/Coins.svg'
import { ReactComponent as Box } from '~assets/svg/navigation-24px/Box.svg'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { PreferencePanel } from '~components/atoms/PreferencePanel'
import {
  selectCustomerDetails,
  selectDefaultBillingAddress
} from '~domains/account/selectors/customer'
import { CustomerAddress, getCashBalanceTrigger } from '~domains/account'
import { triggerReportPageViewed } from '~domains/analytics'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { selectCashBalanceAmount } from '~domains/account/selectors/cash-balance'
import { useFormatPrice } from '~domains/product'
import { getCurrency } from '~helpers/get-currency'
import classNames from 'classnames'

const AccountOverview: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const customerDetails = useSelector(selectCustomerDetails)
  const address = useSelector(selectDefaultBillingAddress)
  const cashBalance = useSelector(selectCashBalanceAmount)
  const [customerInfo, setCustomerInfo] = useState<
    Partial<CustomerAddress> & { email?: string }
  >({
    firstName: customerDetails?.firstName ?? '',
    lastName: customerDetails?.lastName ?? '',
    email: customerDetails?.email ?? '',
    address1: address?.address1 ?? '',
    houseNumber: address?.houseNumber ?? '',
    addition: address?.addition ?? '',
    zipCode: address?.zipCode ?? '',
    city: address?.city ?? ''
  })

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  useEffect(() => {
    if (isLoyaltyAtidaCashEnabled) dispatch(getCashBalanceTrigger())
  }, [dispatch, isLoyaltyAtidaCashEnabled])

  useEffect(() => {
    setCustomerInfo({
      firstName: customerDetails?.firstName ?? '',
      lastName: customerDetails?.lastName ?? '',
      email: customerDetails?.email ?? '',
      company: customerDetails?.company ?? '',
      address1: address?.address1 ?? '',
      houseNumber: address?.houseNumber ?? '',
      addition: address?.addition ?? '',
      zipCode: address?.zipCode ?? '',
      iso2Code: address?.iso2Code ?? '',
      city: address?.city ?? '',
      province: address?.province ?? '',
      district: address?.district ?? '',
      phone: address?.phone ?? ''
    })
  }, [customerDetails, address])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Account Overview', pageType: 'account' })
    )
  }, [dispatch])

  return (
    <>
      <MetaData title={t('seo.titles.account')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('account', locale)} />
      <div className="mx-2 sm:mx-0">
        <h1 className="truncate">
          {t('account.greetings-with-name', {
            name: customerInfo.firstName
          })}
        </h1>
      </div>
      <div className="mt-6 border-b border-ui-grey-light relative">
        <ul>
          <PreferencePanel
            title={t('account.account-details')}
            href={'/account/details'}
            isBold={false}
            isFullWidth={false}
            icon={<NavUser role="figure" className="w-2.5 h-2.5" />}
            data-testid="preferencePanelAccountDetails"
          >
            <>
              {customerInfo.company && (
                <p className="truncate font-semibold mt-2">
                  {customerInfo.company}
                </p>
              )}
              {(customerInfo.firstName || customerInfo.lastName) && (
                <span>
                  <p
                    className={classNames('truncate', {
                      'font-semibold mt-2': !customerInfo.company
                    })}
                  >
                    {customerInfo.firstName ?? ''} {customerInfo.lastName ?? ''}
                  </p>
                </span>
              )}
              {customerInfo.email && <span>{customerInfo.email}</span>}
              {customerInfo.phone && <span>{`${customerInfo.phone}`}</span>}
            </>
          </PreferencePanel>
          <PreferencePanel
            title={t('account.order-history')}
            href={'/account/order-history'}
            isBold={false}
            isFullWidth={false}
            icon={<Box role="figure" className="w-2.5 h-2.5" />}
            data-testid="preferencePanelAccountOrderHistory"
          />
          {isLoyaltyAtidaCashEnabled && (
            <PreferencePanel
              title={t('account.my-atida-cash')}
              href={'/account/my-atida-cash'}
              isBold={false}
              isFullWidth={false}
              icon={<Coins role="figure" className="w-2.5 h-2.5" />}
              data-testid="preferencePanelAccountMyAtidaCash"
              tag={
                <span
                  data-testid="navigationItemIsNewTag"
                  className="h-2.5 ml-1 mb-0.25 pt-0.125 px-0.75 flex rounded-sm justify-center self-center text-primary-white text-xs bg-primary-caribbean-green"
                >
                  {t('shared.new')}
                </span>
              }
              cashBalance={
                formatPrice(cashBalance, getCurrency(locale)).withCurrency
              }
            />
          )}
        </ul>
      </div>
    </>
  )
}

AccountOverview.Layout = (page: JSX.Element) => (
  <AccountPageLayout>{page}</AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale)

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

export default AccountOverview
