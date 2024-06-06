import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReduxStore } from '~domains/redux'
import { getAlternateLinks } from '~domains/translated-routes'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import { AuthGuard } from '~components/helpers/AuthGuard'
import {
  selectOrderId,
  createOrderSetOrderId,
  getOrderTrigger,
  createPaymentMethodSetMethodCode,
  adyenPaymentDetailsTrigger
} from '~domains/checkout'
import { cookieStorageMechanism } from '~helpers'
import { orderHistoryTrigger } from '~domains/account'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import {
  selectAdyenPaymentDetailsData,
  selectAdyenPaymentDetailsWasError
} from '~domains/checkout/selectors/adyen-payment-details'
import { triggerReportPageViewed } from '~domains/analytics'
import { getOrderPaymentsData } from '~domains/checkout/helpers'

const HandleAdyenPayments: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { locale, push, query } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const storeOrderId = useSelector(selectOrderId)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const adyenPaymentDetailsData = useSelector(selectAdyenPaymentDetailsData)
  const adyenPaymentDetailsWasError = useSelector(
    selectAdyenPaymentDetailsWasError
  )
  const [isPaymentDetailsDispatched, setPaymentDetailsDispatched] = useState(
    false
  )

  const { orderId, redirectResult, threeDSResult } = query

  const orderPaymentsDataString = cookieStorageMechanism().get(
    getOrderPaymentsData()
  )
  const orderPaymentsData =
    orderPaymentsDataString && JSON.parse(orderPaymentsDataString)

  const confirmationPage = `/confirmation/${orderId}`
  const unsuccessfulPage = `/unsuccessful/${orderId}`
  const homePage = '/'

  useEffect(() => {
    if (!storeOrderId) {
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
    storeOrderId
  ])

  useEffect(() => {
    if (!isPaymentDetailsDispatched && orderPaymentsData) {
      dispatch(
        adyenPaymentDetailsTrigger({
          details: {
            threeDSResult: threeDSResult?.toString(),
            redirectResult: redirectResult?.toString()
          },
          customer: orderPaymentsData?.customer
        })
      )
      dispatch(
        triggerReportPageViewed({
          page: 'Order Pending',
          pageType: 'checkout',
          paymentMethod: orderPaymentsData?.method_code
        })
      )
      setPaymentDetailsDispatched(true)
    }
  }, [
    dispatch,
    isPaymentDetailsDispatched,
    orderPaymentsData,
    redirectResult,
    threeDSResult
  ])

  useEffect(() => {
    if (!orderPaymentsData || !orderId || (!redirectResult && !threeDSResult)) {
      setTimeout(() => push(homePage), 1000)
    }
  })

  useEffect(() => {
    if (adyenPaymentDetailsData) {
      if (adyenPaymentDetailsData.resultCode === 'Authorised') {
        setTimeout(() => push(confirmationPage), 1000)
      } else {
        setTimeout(() => push(unsuccessfulPage), 1000)
      }
    }
  }, [adyenPaymentDetailsData, confirmationPage, push, unsuccessfulPage])

  useEffect(() => {
    if (adyenPaymentDetailsWasError) {
      setTimeout(() => push(unsuccessfulPage), 1000)
    }
  }, [adyenPaymentDetailsWasError, push, unsuccessfulPage])

  return (
    <>
      <MetaData title={t('seo.titles.adyen-status')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('checkout', locale)} />
      <section className="h-40 flex justify-center mt-2 mb-9 mx-2 sm:mx-12 sm:mt-4 md:mx-8 md:mt-8 lg:mx-20 lg:mt-10">
        <LoadingSpinner />
      </section>
    </>
  )
}

HandleAdyenPayments.Layout = (page: JSX.Element) => (
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

export default HandleAdyenPayments
