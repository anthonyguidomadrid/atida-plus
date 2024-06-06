import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import classNames from 'classnames'
import { Trans, useTranslation } from 'react-i18next'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { createReduxStore } from '~domains/redux'
import { pageContentFulfill, pageContentTrigger } from '~domains/page'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderHistoryTrigger } from '~domains/account'
import { triggerReportPageViewed } from '~domains/analytics'
import {
  selectAllOrdersFromHistory,
  selectOrderHistoryTotalPages,
  selectIsLoading
} from '~domains/account/selectors/order-history'
import { selectMagentoCustomerReference } from '~domains/account/selectors/customer'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { Notification } from '~components/atoms/Notification'
import { Link } from '~components/atoms/Link'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { OrdersList } from '~components/organisms/OrdersList/OrdersList'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const NOTIFICATION_KEY =
  'account.order-history.notification-migrated-customers.content'

const OrderHistory: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const dispatch = useDispatch()
  const orderHistoryItems = useSelector(selectAllOrdersFromHistory)
  const totalPages = useSelector(selectOrderHistoryTotalPages)
  const isLoading = useSelector(selectIsLoading)
  const magentoReference = useSelector(selectMagentoCustomerReference)
  const [ordersLoaded, setOrdersLoaded] = useState(false)

  useEffect(() => {
    dispatch(orderHistoryTrigger({}))
  }, [dispatch])

  useEffect(() => {
    if (!ordersLoaded && !isLoading && Array.isArray(orderHistoryItems)) {
      setOrdersLoaded(true)
    }
  }, [isLoading, orderHistoryItems, ordersLoaded])

  useEffect(() => {
    const { page } = query

    if (page) {
      dispatch(orderHistoryTrigger({ page }))
    }
  }, [dispatch, query])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Order History', pageType: 'account' })
    )
  }, [dispatch])

  const hasNotificationContent = () => t(NOTIFICATION_KEY) !== NOTIFICATION_KEY

  return (
    <>
      <MetaData title={t('seo.titles.order-history')} indexation="noindex" />
      <AlternateLinks
        links={getAlternateLinks('account/order-history', locale)}
      />
      <div
        className={classNames(
          'col-start-1 col-end-13',
          'md:col-start-4 md:col-end-13 md:px-0',
          'lg:col-end-12'
        )}
      >
        {magentoReference && hasNotificationContent() && (
          <Notification
            className="mb-2 sm:mb-4"
            type="info"
            title={t(
              'account.order-history.notification-migrated-customers.label'
            )}
          >
            <Trans
              i18nKey={NOTIFICATION_KEY}
              components={{ a: <Link target="_blank" /> }}
            />
          </Notification>
        )}
        <OrdersList
          orders={orderHistoryItems ?? []}
          ordersLoaded={ordersLoaded}
          totalPages={totalPages}
        />
      </div>
    </>
  )
}

OrderHistory.Layout = (page: JSX.Element) => (
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

export default OrderHistory
