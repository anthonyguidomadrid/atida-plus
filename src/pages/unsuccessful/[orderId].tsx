import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AnyQuestions } from '~components/atoms/AnyQuestions'
import { OrderMessage } from '~components/atoms/OrderMessage'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { MetaData } from '~components/meta/MetaData'
import {
  selectCustomerDetails,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import {
  selectOrderDetails as selectAccountOrderDetails,
  selectOrderDetailsWasError,
  selectOrderDetailsFirstName,
  selectOrderDetailsWasSuccess
} from '~domains/account/selectors/order-details'
import { getAlternateLinks } from '~domains/translated-routes'
import { Button } from '~components/atoms/Button'
import {
  createOrderSetOrderId,
  createPaymentMethodSetMethodCode,
  getOrderTrigger,
  selectPaymentMethodCode,
  cancelOrderTrigger,
  reOrderTrigger,
  selectReOrderWasSuccess,
  selectReOrderWasError,
  selectReOrderLoading,
  cancelOrderFulfill
} from '~domains/checkout'
import {
  getGuestName,
  orderDetailsTrigger,
  orderHistoryTrigger
} from '~domains/account'
import { cookieStorageMechanism, getClientCookiesDomain } from '~helpers'
import { createReduxStore } from '~domains/redux'
import { pageContentFulfill, pageContentTrigger } from '~domains/page'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { triggerReportPageViewed } from '~domains/analytics'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { getOrderPaymentsData } from '~domains/checkout/helpers'

const Unsuccessful: NextPage = () => {
  const { t } = useTranslation()
  const { locale, query, push } = useRouter()
  const dispatch = useDispatch()

  const orderPaymentsDataString = cookieStorageMechanism().get(
    getOrderPaymentsData()
  )

  const orderIdError = useSelector(selectOrderDetailsWasError)
  const orderDetailsWasSuccess = useSelector(selectOrderDetailsWasSuccess)
  const customerDetails = useSelector(selectCustomerDetails)
  const orderDetails = useSelector(selectAccountOrderDetails)
  const paymentMethodCode = useSelector(selectPaymentMethodCode)
  const orderDetailsFirstName = useSelector(selectOrderDetailsFirstName)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const reOrderWasSuccessful = useSelector(selectReOrderWasSuccess)
  const reOrderWasError = useSelector(selectReOrderWasError)
  const isReOrderLoading = useSelector(selectReOrderLoading)

  const { orderId } = query

  const isCancelOrderEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_UNSUCCESSFUL_CANCEL_ORDER
  )

  useEffect(() => {
    if (!orderDetails || orderDetails.id !== orderId) {
      dispatch(createOrderSetOrderId({ orderId: orderId?.toString() }))
      dispatch(getOrderTrigger({ orderId: orderId?.toString() }))
      dispatch(
        orderDetailsTrigger({
          orderId: orderId?.toString()
        })
      )
      isLoggedIn && dispatch(orderHistoryTrigger({ page: 1 }))
    }
  }, [dispatch, isLoggedIn, orderDetails, orderId])

  useEffect(() => {
    cookieStorageMechanism().remove(getOrderPaymentsData())
    cookieStorageMechanism().remove(getGuestName(), {
      domain: getClientCookiesDomain(window?.location?.hostname)
    })
    if (orderPaymentsDataString && !paymentMethodCode) {
      const orderPaymentDataObject = JSON.parse(orderPaymentsDataString)
      dispatch(
        createPaymentMethodSetMethodCode({
          methodCode: orderPaymentDataObject?.method_code
        })
      )
    }
  }, [dispatch, orderPaymentsDataString, paymentMethodCode])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({
        page: 'Order Unsuccessful',
        pageType: 'checkout'
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (reOrderWasSuccessful && !reOrderWasError) push('/basket')
  }, [push, reOrderWasError, reOrderWasSuccessful])

  const handleReOrder = useCallback(async () => {
    if (isCancelOrderEnabled) {
      dispatch(cancelOrderTrigger({ orderId: orderId?.toString() }))
      await dispatch({
        type: 'checkout',
        [WAIT_FOR_ACTION]: cancelOrderFulfill().type
      })
    }
    dispatch(
      reOrderTrigger({
        orderId: orderId?.toString()
      })
    )
  }, [dispatch, isCancelOrderEnabled, orderId])

  return (
    <AuthGuard
      renderConfirmationPage={!orderIdError}
      isPaymentCompletedRoute={true}
    >
      <MetaData title={t('seo.titles.unsuccessful')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('checkout', locale)} />
      {orderDetailsWasSuccess && !orderIdError ? (
        <>
          <OrderMessage
            name={customerDetails?.firstName ?? orderDetailsFirstName}
            success={false}
            reOrderError={reOrderWasError}
            children={
              <Button
                data-testid="unsuccessfulReOrder"
                aria-label={t('unsuccessful.re-order-button')}
                variant="secondary"
                className="w-full sm:max-w-27"
                isLoading={isReOrderLoading}
                onClick={() => handleReOrder()}
              >
                {t('unsuccessful.re-order-button')}
              </Button>
            }
          />
        </>
      ) : (
        <section className="h-40 flex justify-center mt-2 mb-9 mx-2 sm:mx-12 sm:mt-4 md:mx-8 md:mt-8 lg:mx-20 lg:mt-10">
          <LoadingSpinner />
        </section>
      )}
      <div className="sm:mx-5 md:mx-8 md:mt-8 lg:mx-22">
        <AnyQuestions />
      </div>
    </AuthGuard>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.CHECKOUT_UNSUCCESSFUL_CANCEL_ORDER
  ])

  store.dispatch(pageContentTrigger({ slug: getPageUrlSlug(context) }))

  await Promise.all([
    store.dispatch({
      type: 'page-content',
      [WAIT_FOR_ACTION]: pageContentFulfill().type
    })
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default Unsuccessful
