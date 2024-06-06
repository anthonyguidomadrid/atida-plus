import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReduxStore } from '~domains/redux'
import classNames from 'classnames'
import { getAlternateLinks } from '~domains/translated-routes'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import { AuthGuard } from '~components/helpers/AuthGuard'
import {
  selectOrderId,
  createOrderSetOrderId,
  getOrderTrigger,
  createPaymentMethodSetMethodCode
} from '~domains/checkout'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { cookieStorageMechanism } from '~helpers'
import { orderHistoryTrigger } from '~domains/account'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { getOrderPaymentsData } from '~domains/checkout/helpers'

const HandleMultibanco: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { locale, push, query } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const storeOrderId = useSelector(selectOrderId)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { orderId, redirect_status } = query

  const orderSuccessful = redirect_status !== 'canceled' && orderId
  const orderUnsuccessful = redirect_status === 'canceled'

  const orderPaymentsDataString = cookieStorageMechanism().get(
    getOrderPaymentsData()
  )
  const orderPaymentsData =
    orderPaymentsDataString && JSON.parse(orderPaymentsDataString)

  const confirmationPage = `/confirmation/${orderId}`
  const unsuccessfulPage = `/unsuccessful/${orderId}`

  useEffect(() => {
    if (!orderPaymentsDataString || orderUnsuccessful) {
      push(unsuccessfulPage)
    }
  }, [orderPaymentsDataString, orderUnsuccessful, push, unsuccessfulPage])

  useEffect(() => {
    if (orderSuccessful && !storeOrderId) {
      dispatch(createOrderSetOrderId({ orderId: orderId?.toString() }))
      dispatch(getOrderTrigger({ orderId: orderId?.toString() }))
      dispatch(
        createPaymentMethodSetMethodCode({
          methodCode: orderPaymentsData?.method_code
        })
      )
      isLoggedIn && dispatch(orderHistoryTrigger({ page: 1 }))
    }
  }, [
    dispatch,
    isLoggedIn,
    orderId,
    orderPaymentsData?.method_code,
    orderSuccessful,
    storeOrderId
  ])

  useEffect(() => {
    if (orderSuccessful) {
      setTimeout(() => push(confirmationPage), 1000)
    }
  })

  return orderPaymentsDataString ? (
    <>
      <MetaData
        title={t('seo.titles.multibanco-status')}
        indexation="noindex"
      />
      <AlternateLinks links={getAlternateLinks('checkout', locale)} />

      <main
        className={classNames(
          'container container-fixed',
          'mx-auto',
          'sm:mt-5',
          'md:mt-8'
        )}
      >
        <div className="text-center">
          {orderSuccessful && (
            <>
              <p>{t('checkout.multibanco-status.order-successful')}</p>
              <p>
                {t('checkout.multibanco-status.confirmation-redirect-text')}
              </p>
              <p>
                {t('checkout.multibanco-status.no-redirect-text')}{' '}
                <NextLink href={confirmationPage} passHref prefetch={false}>
                  <Link>
                    {t(
                      'checkout.multibanco-status.no-redirect-text.click-here'
                    )}
                  </Link>
                </NextLink>
              </p>
            </>
          )}

          {orderUnsuccessful && (
            <>
              <p>{t('checkout.multibanco-status.unsuccessful.text')}</p>

              <NextLink href="/" passHref prefetch={false}>
                <Link>
                  {t('checkout.multibanco-status.unsuccessful.text.home-link')}{' '}
                  &rarr;
                </Link>
              </NextLink>
            </>
          )}
        </div>
      </main>
    </>
  ) : null
}

HandleMultibanco.Layout = (page: JSX.Element) => (
  <AuthGuard isPaymentCompletedRoute={true}>
    <MinimalPageLayout>{page}</MinimalPageLayout>
  </AuthGuard>
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

export default HandleMultibanco
