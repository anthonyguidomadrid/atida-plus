import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { DeliverySteps } from '~components/molecules/DeliverySteps'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { OrderMessage } from '~components/atoms/OrderMessage'
import { AnyQuestions } from '~components/atoms/AnyQuestions'
import { ExpectedDelivery } from '~components/atoms/ExpectedDelivery'
import { getAlternateLinks } from '~domains/translated-routes'
import {
  triggerReportCheckoutStepCompleted,
  triggerReportPageViewed,
  triggerReportProductOrdered,
  triggerReportOrderCompleted
} from '~domains/analytics'
import { createReduxStore } from '~domains/redux'
import { pageContentFulfill, pageContentTrigger } from '~domains/page'
import { cookieStorageMechanism, getClientCookiesDomain } from '~helpers'
import { useEffect, useState } from 'react'
import {
  selectSIBSMultibancoPaymentAmount,
  selectSIBSMultibancoPaymentEntity,
  selectSIBSMultibancoPaymentRef,
  selectMBWayPaymentRef,
  selectOrderDetails,
  selectSIBSMultibancoExpirationDate,
  createOrderSetOrderId,
  selectOrderId,
  getOrderTrigger,
  createPaymentMethodSetMethodCode,
  selectPaymentMethodCode,
  selectAdyenMultibancoExpirationDate,
  selectAdyenMultibancoPaymentEntity,
  selectAdyenMultibancoPaymentAmount,
  selectAdyenMultibancoPaymentRef,
  selectMultiplePaymentsDetailsAdyenMultibancoPaymentRef,
  selectMultiplePaymentsDetailsAdyenMultibancoPaymentAmount,
  selectMultiplePaymentsDetailsAdyenMultibancoPaymentEntity,
  selectMultiplePaymentsDetailsAdyenMultibancoExpirationDate,
  selectIsPaymentPending,
  resetActiveReachedSteps
} from '~domains/checkout'
import { AuthGuard } from '~components/helpers/AuthGuard'
import {
  selectCustomerDetails,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import {
  getMultibancoCookie,
  getMultibancoExpirationDate,
  getOrderPaymentsData
} from '~domains/checkout/helpers'
import { useTranslation } from 'react-i18next'
import { useFormatPrice, Product } from '~domains/product'
import { Action } from '~components/atoms/Action'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { getCurrency } from '~helpers/get-currency'
import {
  selectOrderDetailsIsLoading,
  selectOrderDetailsWasSuccess,
  selectOrderDetails as selectAccountOrderDetails,
  selectOrderDetailsWasError,
  selectOrderDetailsItems,
  selectOrderDetailsDiscountTotal,
  selectOrderDetailsNumberOfItems,
  selectOrderDetailsCurrency,
  selectOrderDetailsTotals,
  selectOrderDetailsShippingTotal,
  selectDeliveryDays,
  selectOrderDetailsFirstName,
  selectOrderDiscounts
} from '~domains/account/selectors/order-details'
import {
  orderDetailsTrigger,
  orderHistoryTrigger,
  OrderDetailsSingleItem,
  getGuestName
} from '~domains/account'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { OrderSummary } from '~components/molecules/OrderSummary'
import { BasketItem } from '~domains/basket/types'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { Webloyalty } from '~components/atoms/Webloyalty/Webloyalty'
import {
  getWebloyalty,
  pushToWindowProdIDAArray
} from '~domains/checkout/config/get-webloyalty'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { WebloyaltyScript } from '~components/meta/MetaData/WebloyaltyScript'
import { ReactComponent as AtidaCoins } from '~assets/svg/navigation-24px/AtidaCoins.svg'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { selectAdyenPaymentDetailsData } from '~domains/checkout/selectors/adyen-payment-details'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'

const Confirmation: NextPage = () => {
  const customerDetails = useSelector(selectCustomerDetails)
  const getOrderData = useSelector(selectOrderDetails)
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const orderPaymentsDataString = cookieStorageMechanism().get(
    getOrderPaymentsData()
  )
  const multibancoCookie = cookieStorageMechanism().get(getMultibancoCookie())
  const parsedMultibancoCookie =
    multibancoCookie && JSON.parse(multibancoCookie)
  const [paymentMethod, setPaymentMethod] = useState('')
  const mbWayPaymentRef = useSelector(selectMBWayPaymentRef)
  const sibsMultibancoPaymentRef = useSelector(selectSIBSMultibancoPaymentRef)
  const sibsMultibancoPaymentAmount = useSelector(
    selectSIBSMultibancoPaymentAmount
  )
  const sibsMultibancoPaymentEntity = useSelector(
    selectSIBSMultibancoPaymentEntity
  )
  const sibsMultibancoExpirationDate = useSelector(
    selectSIBSMultibancoExpirationDate
  )

  const multiplePaymentsDetailsAdyenMultibancoPaymentRef = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoPaymentRef
  )
  const multiplePaymentsDetailsAdyenMultibancoPaymentAmount = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoPaymentAmount
  )
  const multiplePaymentsDetailsAdyenMultibancoPaymentEntity = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoPaymentEntity
  )
  const multiplePaymentsDetailsAdyenMultibancoExpirationDate = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoExpirationDate
  )

  const adyenMultibancoPaymentRef = useSelector(selectAdyenMultibancoPaymentRef)
  const adyenMultibancoPaymentAmount = useSelector(
    selectAdyenMultibancoPaymentAmount
  )
  const adyenMultibancoPaymentEntity = useSelector(
    selectAdyenMultibancoPaymentEntity
  )
  const adyenMultibancoExpirationDate = useSelector(
    selectAdyenMultibancoExpirationDate
  )
  const multibancoPaymentEntity =
    multiplePaymentsDetailsAdyenMultibancoPaymentEntity ??
    adyenMultibancoPaymentEntity ??
    sibsMultibancoPaymentEntity
  const multibancoPaymentRef =
    multiplePaymentsDetailsAdyenMultibancoPaymentRef ??
    adyenMultibancoPaymentRef ??
    sibsMultibancoPaymentRef

  const multibancoTotalAmount =
    (!!multiplePaymentsDetailsAdyenMultibancoPaymentAmount ||
      !!sibsMultibancoPaymentAmount ||
      !!adyenMultibancoPaymentAmount) &&
    priceCurrencyFormatter(
      formatPrice(
        multiplePaymentsDetailsAdyenMultibancoPaymentAmount?.value ??
          adyenMultibancoPaymentAmount?.value ??
          sibsMultibancoPaymentAmount,
        getCurrency(locale)
      ).asOne,
      getCurrency(locale)
    )
  const multibancoExpirationDateFormatted =
    (!!multiplePaymentsDetailsAdyenMultibancoExpirationDate ||
      !!sibsMultibancoExpirationDate ||
      !!adyenMultibancoExpirationDate) &&
    locale &&
    getMultibancoExpirationDate(
      multiplePaymentsDetailsAdyenMultibancoExpirationDate ??
        adyenMultibancoExpirationDate ??
        sibsMultibancoExpirationDate,
      locale
    )

  const { orderId } = query
  const orderDetailsIsLoading = useSelector(selectOrderDetailsIsLoading)
  const orderDetailsWasSuccess = useSelector(selectOrderDetailsWasSuccess)
  const orderDetails = useSelector(selectAccountOrderDetails)
  const orderIdError = useSelector(selectOrderDetailsWasError)
  const storeOrderId = useSelector(selectOrderId)
  const paymentMethodCode = useSelector(selectPaymentMethodCode)
  const items = useSelector(selectOrderDetailsItems)
  const productDiscounts = useSelector(selectOrderDetailsDiscountTotal)
  const numberOfItems = useSelector(selectOrderDetailsNumberOfItems)
  const currency = useSelector(selectOrderDetailsCurrency)
  const totals = useSelector(selectOrderDetailsTotals)
  const shippingTotal = useSelector(selectOrderDetailsShippingTotal)
  const deliveryDays = useSelector(selectDeliveryDays)
  const orderDetailsFirstName = useSelector(selectOrderDetailsFirstName)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const adyenPaymentDetailsData = useSelector(selectAdyenPaymentDetailsData)
  const isPaymentPending = useSelector(selectIsPaymentPending)
  const rewardTotalFormatted = formatPrice(totals.rewardTotal, currency).asOne
  const orderDiscounts = useSelector(selectOrderDiscounts)
  const isLargeScreen = useBreakpoint(breakpoints.md)

  const [openOrderDetails, setOpenOrderDetails] = useState(false)
  const [loadMore, setLoadMore] = useState(false)

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const atidaWelcomeCashDiscount = useFeatureFlag(
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY
  ) as string

  const atidaCashWelcomeDiscount =
    orderDiscounts &&
    Object.values(orderDiscounts).find(discount =>
      discount?.discountKey?.includes(atidaWelcomeCashDiscount)
    )

  const discountTotal =
    productDiscounts &&
    Object.values(productDiscounts)
      ?.filter(
        discounts => !discounts.discountKey?.includes(atidaWelcomeCashDiscount)
      )
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sumAmount
      }, 0)

  const deliverySteps = (paymentMethod: string) => {
    const defaultSteps = [
      {
        text: t('order-confirmation.step1-title'),
        subText: t('order-confirmation.step1-description'),
        icon: 'Checkmark'
      },
      {
        text: t('order-confirmation.step2-title'),
        subText: t('order-confirmation.step2-description'),
        icon: 'Parcel24'
      },
      {
        text: t('order-confirmation.step3-title'),
        subText: t('order-confirmation.step3-description'),
        icon: 'Pin24'
      }
    ]
    if (
      paymentMethod === PAYMENT_OPTIONS.SIBS_MULTIBANCO ||
      paymentMethod === PAYMENT_OPTIONS.ADYEN_MULTIBANCO ||
      paymentMethod === PAYMENT_OPTIONS.SIBS_MBWAY
    ) {
      defaultSteps.unshift({
        text: t('order-confirmation.step0-title'),
        subText: t('order-confirmation.step0-description'),
        icon: 'Checkmark'
      })
      defaultSteps[1].icon = 'Mail24'
      return defaultSteps
    } else {
      return defaultSteps
    }
  }

  useEffect(() => {
    if (
      orderPaymentsDataString &&
      orderDetailsIsLoading &&
      orderDetailsWasSuccess
    ) {
      // Data is no longer needed in storage, remove it from there
      cookieStorageMechanism().remove(getOrderPaymentsData())
      cookieStorageMechanism().remove(getGuestName(), {
        domain: getClientCookiesDomain(window?.location?.hostname)
      })
      dispatch(resetActiveReachedSteps())

      const orderPaymentDataObject = JSON.parse(orderPaymentsDataString)
      setPaymentMethod(orderPaymentDataObject?.method_code)
      if (!orderPaymentDataObject?.is_redirected) {
        dispatch(
          triggerReportProductOrdered({
            payment_method: orderPaymentDataObject.method_code,
            is_redirected: false
          })
        )
        dispatch(
          triggerReportOrderCompleted({
            payment_method: orderPaymentDataObject.method_code,
            is_redirected: false
          })
        )
      }
      if (!paymentMethodCode) {
        dispatch(
          createPaymentMethodSetMethodCode({
            methodCode: orderPaymentDataObject?.method_code
          })
        )
      }
      dispatch(
        triggerReportCheckoutStepCompleted({
          payment_method: orderPaymentDataObject?.method_code
        })
      )
    }
  }, [
    dispatch,
    orderPaymentsDataString,
    getOrderData,
    paymentMethodCode,
    orderDetailsIsLoading,
    orderDetailsWasSuccess
  ])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Confirmation', pageType: 'checkout' })
    )
  }, [dispatch])

  useEffect(() => {
    if (!orderDetails || orderDetails?.id !== orderId) {
      dispatch(createOrderSetOrderId({ orderId: orderId?.toString() }))
      dispatch(getOrderTrigger({ orderId: orderId?.toString() }))
      dispatch(
        orderDetailsTrigger({
          orderId: orderId?.toString(),
          isCheckoutComplete: true
        })
      )
      isLoggedIn && dispatch(orderHistoryTrigger({ page: 1 }))
    }
  }, [dispatch, isLoggedIn, orderDetails, orderId])

  const deliveryText =
    paymentMethod === PAYMENT_OPTIONS.SIBS_MULTIBANCO ||
    paymentMethod === PAYMENT_OPTIONS.SIBS_MBWAY
      ? 'sibs'
      : 'other'

  const handleOpenOrderDetails = () => {
    setOpenOrderDetails(!openOrderDetails)
  }

  const handleLoadMore = () => {
    setLoadMore(true)
  }

  return (
    <AuthGuard
      renderConfirmationPage={!orderIdError}
      isPaymentCompletedRoute={true}
    >
      <MetaData title={t('seo.titles.confirmation')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('checkout', locale)} />
      <WebloyaltyScript />
      {orderDetailsWasSuccess && !orderIdError ? (
        <>
          <OrderMessage
            name={customerDetails?.firstName ?? orderDetailsFirstName}
            success={true}
          />
          {locale === 'es-es' && (
            <Webloyalty
              hash="3633839eb5a848a52e1c495be4b5f92a"
              ckw=""
              windowProdIDA={window?.prodID?.a}
              getWebloyalty={getWebloyalty}
              pushToWindowProdIDAArray={pushToWindowProdIDAArray}
            />
          )}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mt-2 mb-9 mx-2 sm:mx-12 sm:mt-4 md:mx-8 md:mt-8 lg:mx-20 lg:mt-10">
            <div>
              {((multibancoPaymentRef &&
                multibancoTotalAmount &&
                multibancoPaymentEntity &&
                multibancoExpirationDateFormatted) ||
                (parsedMultibancoCookie &&
                  parsedMultibancoCookie.order_id === storeOrderId &&
                  parsedMultibancoCookie.payment_ref &&
                  parsedMultibancoCookie.total_amount &&
                  parsedMultibancoCookie.payment_entity &&
                  parsedMultibancoCookie.expiration_date_formatted)) && (
                <Action
                  testId="sibs-multibanco"
                  className="mb-2 pl-2 flex items-center bg-secondary-champagne-pink border-l-4 border-secondary-atomic-tangerine sm:mb-3"
                >
                  <div className="py-2.5 pl-1.5 w-full">
                    <h5>
                      {t(
                        'order-confirmation.sibs-multibanco.notification.title'
                      )}
                    </h5>
                    <p>
                      {t(
                        'order-confirmation.sibs-multibanco.notification.transfer-to'
                      )}
                    </p>
                    <ul className="list-disc ml-3">
                      <li>
                        {t(
                          'order-confirmation.multibanco.notification.payment-ref',
                          {
                            multibancoPaymentRef:
                              multibancoPaymentRef ||
                              parsedMultibancoCookie.payment_ref
                          }
                        )}
                      </li>
                      <li>
                        {t(
                          'order-confirmation.multibanco.notification.payment-entity',
                          {
                            multibancoPaymentEntity:
                              multibancoPaymentEntity ||
                              parsedMultibancoCookie.payment_entity
                          }
                        )}
                      </li>
                      <li>
                        {t(
                          'order-confirmation.multibanco.notification.payment-amount',
                          {
                            multibancoTotalAmount:
                              multibancoTotalAmount ||
                              parsedMultibancoCookie.total_amount
                          }
                        )}
                      </li>
                      <li>
                        {t(
                          'order-confirmation.multibanco.notification.expiration-date',
                          {
                            multibancoExpirationDateFormatted:
                              multibancoExpirationDateFormatted ||
                              parsedMultibancoCookie.expiration_date_formatted
                          }
                        )}
                      </li>
                    </ul>
                    <p>
                      {t(
                        'order-confirmation.sibs-multibanco.notification.email'
                      )}
                    </p>
                  </div>
                </Action>
              )}
              {paymentMethod === PAYMENT_OPTIONS.ADYEN_MB_WAY &&
                (adyenPaymentDetailsData?.resultCode === 'Pending' ||
                  adyenPaymentDetailsData?.resultCode === 'Received' ||
                  isPaymentPending) && (
                  <Action
                    testId="adyen-mbway-pending"
                    className={
                      'mb-3 px-2 bg-secondary-champagne-pink border-l-4 border-secondary-atomic-tangerine'
                    }
                  >
                    <div className="py-2.5 pl-1.5 w-full">
                      <h5>{t('checkout.confirmation.pending-mb-way.title')}</h5>
                      <p>{t('checkout.confirmation.pending-mb-way.body')}</p>
                    </div>
                  </Action>
                )}
              {items && (
                <OrderSummary
                  openOrderDetails={openOrderDetails}
                  handleOpenOrderDetails={handleOpenOrderDetails}
                  basketDiscounts={discountTotal}
                  numberOfItems={numberOfItems}
                  currency={currency}
                  totalProducts={totals.grandTotal}
                  subTotalPrice={totals.subTotal}
                  surchargeTotal={totals.surchargeTotal}
                  shipping={shippingTotal}
                  grandTotal={totals.grandTotal}
                  itemTotal={totals.itemTotal}
                  loadMore={loadMore}
                  handleLoadMore={handleLoadMore}
                  welcomeAtidaCashDiscount={atidaCashWelcomeDiscount?.sumAmount}
                  rrpDiscountTotal={totals.rrpDiscountTotal}
                  amountPaidByRealPayment={totals.amountPaidByRealPayment}
                  atidaCashUsed={totals.loyaltySpent}
                  items={
                    items as ((BasketItem & OrderDetailsSingleItem) & {
                      product: Omit<Partial<Product>, 'sku' | 'price'>
                    })[]
                  }
                  paymentOrdered={true}
                />
              )}
              {isLoyaltyAtidaCashEnabled && !!totals.rewardTotal && isLoggedIn && (
                <div className="border border-ui-grey-lightest p-3 flex items-center">
                  <AtidaCoins className="icon-24 mr-1" />
                  <span className="text-base font-semibold">
                    {t('order-confirmation.atida-cash-earned', {
                      rewardTotal: priceCurrencyFormatter(
                        rewardTotalFormatted,
                        currency,
                        true
                      )
                    })}
                  </span>
                </div>
              )}
              <ExpectedDelivery
                deliveryText={deliveryText}
                deliveryDays={deliveryDays}
              />
              {isLargeScreen &&
                isLoyaltyAtidaCashEnabled &&
                !!totals.rewardTotal &&
                isLoggedIn && (
                  <span className="mt-4 inline-block text-sm text-ui-grey-dark">
                    {t('order-confirmation.atida-cash.information')}
                  </span>
                )}
              {mbWayPaymentRef && (
                <Action
                  testId="mbway"
                  className="mt-2 pl-2 flex items-center bg-secondary-champagne-pink border-l-4 border-secondary-atomic-tangerine sm:mt-3"
                >
                  <div className="py-2.5 pl-1.5 w-full">
                    <h5>{t('order-confirmation.mbway.notification.title')}</h5>
                    <p>
                      {t(
                        'order-confirmation.mbway.notification.four-minutes-to-pay'
                      )}
                    </p>
                  </div>
                </Action>
              )}
            </div>
            <div>
              {storeOrderId && (
                <DeliverySteps
                  steps={deliverySteps(paymentMethod)}
                  orderId={storeOrderId}
                  paymentMethod={paymentMethod}
                  isLoggedIn={isLoggedIn}
                />
              )}
            </div>
            {!isLargeScreen &&
              isLoyaltyAtidaCashEnabled &&
              !!totals.rewardTotal &&
              isLoggedIn && (
                <span className="mt-4 inline-block text-sm text-ui-grey-dark">
                  {t('order-confirmation.atida-cash.information')}
                </span>
              )}
          </section>
        </>
      ) : (
        <section className="h-40 flex justify-center mt-2 mb-9 mx-2 sm:mx-12 sm:mt-4 md:mx-8 md:mt-8 lg:mx-20 lg:mt-10">
          <LoadingSpinner />
        </section>
      )}
      <div className="sm:mx-5 md:mx-8 lg:mx-22">
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
    FeatureFlag.BASKET_PROMOTIONAL_ITEMS_PRICE_ZERO,
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH,
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY
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

export default Confirmation
