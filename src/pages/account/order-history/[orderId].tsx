import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { createReduxStore } from '~domains/redux'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import {
  selectOrderDetails,
  selectOrderDetailsIsLoading,
  selectOrderDetailsIsTaxExempt,
  selectErpShipping
} from '~domains/account/selectors/order-details'
import {
  OrderDetailsAddressAttribute,
  orderDetailsTrigger
} from '~domains/account'
import { OrderDetailsItem } from '~components/molecules/OrderDetailsItem'
import { DateTimeFormat } from '~helpers/types'
import { triggerReportPageViewed } from '~domains/analytics'
import { useFormatPrice } from '~domains/product'
import { useTranslation } from 'react-i18next'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import type { TFunction } from 'i18next'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getCountryFromIso2Code, useDetectOutsideClick } from '~helpers'
import { selectCustomerDetails } from '~domains/account/selectors/customer'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { FeatureFlag } from '~config/constants/feature-flags'
import { Button } from '~components/atoms/Button'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { getOrderDetailsStatus } from '~helpers/getOrderDetailsStatus'
import { ReactComponent as ShippingBox } from '~assets/svg/shipping-box.svg'
import { ReactComponent as Download } from '~assets/svg/navigation-24px/Download.svg'
import { orderStatusIconText } from '~helpers/orderStatusIconText'
import { useBreakpoint, breakpoints } from '~domains/breakpoints'
import { OrderTrackingModal } from '~components/organisms/OrderTrackingModal'
import { Link } from '~components/atoms/Link'

const OrderDetails: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const { orderId } = query
  const orderDetails = useSelector(selectOrderDetails)
  const isLoading = useSelector(selectOrderDetailsIsLoading)
  const isTaxExempt = useSelector(selectOrderDetailsIsTaxExempt)
  const customerDetails = useSelector(selectCustomerDetails)
  const erpShipment = useSelector(selectErpShipping)
  const isDesktopScreen = useBreakpoint(breakpoints.sm)
  const formatPrice = useFormatPrice()
  const isOrderHistoryTrackingEnabled = useFeatureFlag(
    FeatureFlag.ORDER_HISTORY_TRACKING
  )
  const isDownloadInvoiceEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_DOWNLOAD_INVOICE
  )
  const welcomeAtidaCashDiscountKey = useFeatureFlag(
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY
  ) as string
  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!orderDetails || orderDetails.id !== orderId) {
      dispatch(orderDetailsTrigger({ orderId: orderId }))
    }
  }, [dispatch, orderDetails, orderId])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Order Details', pageType: 'account' })
    )
  }, [dispatch])

  const openTrackingModalHandler = () => {
    setNotificationModalOpen(true)
  }

  const [
    notificationModalOpen,
    setNotificationModalOpen
  ] = useDetectOutsideClick(modalRef, false)

  const {
    erpTrackingReference,
    erpTrackingUrl,
    erpShipmentStatus
  } = erpShipment

  const detailsDateTimeConfig: DateTimeFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  if (orderDetails && !isLoading) {
    const {
      attributes: {
        createdAt,
        items,
        status,
        totals,
        shippingAddress,
        billingAddress,
        shipments,
        currencyIsoCode,
        expenses,
        productDiscounts
      }
    } = orderDetails

    const subdivisionPerIso2Code = (
      iso2Code: string,
      type: 'shipping' | 'billing'
    ): string => {
      switch (iso2Code) {
        case 'ES':
          if (type === 'shipping') return shippingAddress.province ?? ''
          if (type === 'billing') return billingAddress.province ?? ''
        case 'PT':
          if (type === 'shipping') return shippingAddress.district ?? ''
          if (type === 'billing') return billingAddress.district ?? ''
        default:
          return ''
      }
    }

    // Safari requires ECMA format, createdAt has space in thats not a valid format
    const createdAtECMA = createdAt.replace(' ', 'T')

    const orderGrandTotalPrice =
      totals.amountPaidByRealPayment ?? totals.grandTotal

    const { asOne: atidaCashSpent } = formatPrice(
      totals?.loyaltySpent,
      currencyIsoCode
    )
    const { asOne: atidaCashEarned } = formatPrice(
      totals?.rewardTotal,
      currencyIsoCode
    )
    const discountSubtotal = Object.values(productDiscounts).reduce(
      (accumulator, currentValue) => {
        if (
          isLoyaltyAtidaCashEnabled &&
          currentValue?.discountKey?.includes(welcomeAtidaCashDiscountKey)
        ) {
          return accumulator
        }
        return accumulator + currentValue.sumAmount
      },
      0
    )

    const discountTotal = Object.values(productDiscounts).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.sumAmount
      },
      0
    )

    const welcomeCashDiscount = Object.values(productDiscounts).find(discount =>
      discount?.discountKey?.includes(welcomeAtidaCashDiscountKey)
    )

    const { asOne: totalOrderPrice } = formatPrice(
      orderGrandTotalPrice,
      currencyIsoCode
    )

    const { asOne: shippingPrice } = formatPrice(
      expenses[0].sumPriceToPayAggregation,
      currencyIsoCode
    )

    const { asOne: subTotal } = formatPrice(totals.subtotal, currencyIsoCode)
    const { asOne: subtotalAfterDiscounts } = formatPrice(
      totals?.subtotal - discountTotal,
      currencyIsoCode
    )

    const orderDetailsStatus = getOrderDetailsStatus(
      status[Object.keys(status)[0]]?.displayName,
      erpShipmentStatus,
      isOrderHistoryTrackingEnabled as boolean
    )

    const paymentStatus = orderStatusIconText(
      status[Object.keys(status)[0]]?.displayName
    )

    return (
      <>
        <MetaData
          title={t('seo.titles.order-details', { orderId })}
          indexation="noindex"
        />
        <AlternateLinks
          links={getAlternateLinks('account/order-history', locale)}
        />
        <div
          className={classNames(
            'col-start-1 col-end-13 px-2',
            'md:col-start-4 md:col-end-13 sm:px-0',
            'lg:col-end-12'
          )}
        >
          <article data-testid="orderDetailsId">
            <header>
              <h1 className="font-light mb-3">{t('order-details.title')}</h1>
            </header>

            <main>
              {(isOrderHistoryTrackingEnabled || isDownloadInvoiceEnabled) && (
                <div className="flex flex-wrap mb-3 gap-2">
                  {isOrderHistoryTrackingEnabled && (
                    <>
                      <Button
                        icon={<ShippingBox className="w-3 h-3 text-inherit" />}
                        disabled={!erpTrackingReference || !erpTrackingUrl}
                        onClick={openTrackingModalHandler}
                        className="w-full sm:w-auto"
                      >
                        {t('account.order-history.track-order-button')}
                      </Button>
                      <OrderTrackingModal
                        isTrackingModalOpen={notificationModalOpen}
                        modalRef={modalRef}
                        isDesktopScreen={isDesktopScreen}
                        erpTrackingReference={erpTrackingReference ?? ''}
                        erpTrackingUrl={erpTrackingUrl ?? ''}
                      />
                    </>
                  )}
                  {isDownloadInvoiceEnabled && (
                    <Button
                      variant="tertiary"
                      icon={<Download className="w-3 text-inherit" />}
                      className="w-full sm:w-auto"
                    >
                      <Link href={'mockedInvoiceUrl'} className="no-underline">
                        {t('account.download-invoice.button-label')}
                      </Link>
                    </Button>
                  )}
                </div>
              )}
              <section className="mb-3">
                <div className="bg-ui-guyabano p-3 sm:px-4">
                  <div className="flex flex-col sm:flex-row justify-start sm:gap-x-3">
                    <div className="flex-1">
                      <section className="mb-3">
                        <h5 className="text-base font-bold">
                          {t('account.order-history.date')}
                        </h5>
                        <p>
                          {Intl.DateTimeFormat(
                            locale,
                            detailsDateTimeConfig
                          ).format(new Date(createdAtECMA))}
                        </p>
                      </section>
                      <section className="mb-3">
                        <h5 className="text-base font-bold">
                          {t('order-details.order-number')}
                        </h5>
                        <p>{orderId}</p>
                      </section>
                      {isOrderHistoryTrackingEnabled && (
                        <div className=" mb-2">
                          <h5 className="text-base font-bold">
                            {t('order-details.order-status')}
                          </h5>
                          <p
                            className={classNames(
                              'leading-2.75  font-normal',
                              orderDetailsStatus.data.colorClassName
                            )}
                          >
                            {isOrderHistoryTrackingEnabled &&
                              t(orderDetailsStatus.data.translationSlug)}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <section className="mb-3">
                        <h5 className="text-base font-bold">
                          {t('order-details.delivery-type')}
                        </h5>
                        <p>{t(shipments[0]?.shipmentMethodName ?? '')}</p>
                      </section>
                      <div className="mb-2">
                        <h5 className="text-base font-bold">
                          {t('order-details.payment-status')}
                        </h5>
                        <span
                          className={classNames(
                            'leading-2.75  font-normal',
                            paymentStatus.colorClassName
                          )}
                        >
                          {t(paymentStatus.translationSlug)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <section
                        className="mb-3"
                        data-testid="deliveryAddressSectionId"
                      >
                        <h5 className="text-base font-bold">
                          {t('order-details.delivery-address')}
                        </h5>
                        <p>
                          {customerDetails?.company && (
                            <>
                              <span className="font-semibold truncate">
                                {customerDetails.company}
                              </span>
                              <br />
                            </>
                          )}
                          {shippingAddress.firstName} {shippingAddress.lastName}
                          <br />
                          {shippingAddress.address1}{' '}
                          {shippingAddress.houseNumber}
                          {!!shippingAddress.addition && <br />}
                          {shippingAddress.addition}
                          <br />
                          {shippingAddress.zipCode} {shippingAddress.city}
                          <br />
                          <div className="flex">
                            {(shippingAddress.province ||
                              shippingAddress.district) && (
                              <p className="truncate">
                                {subdivisionPerIso2Code(
                                  shippingAddress.iso2Code,
                                  'shipping'
                                )}
                                ,&nbsp;
                              </p>
                            )}
                            {shippingAddress.iso2Code && (
                              <p className="truncate">
                                {getCountryFromIso2Code(
                                  shippingAddress.iso2Code
                                )}
                              </p>
                            )}
                          </div>
                        </p>
                      </section>
                      <section
                        className="mb-3"
                        data-testid="billingAddressSectionId"
                      >
                        <h5 className="text-base font-bold">
                          {t('order-details.billing-address')}
                        </h5>
                        <div>
                          {checkIfShipBillAddressAreSame(
                            shippingAddress,
                            billingAddress
                          ) ? (
                            <p>{t('order-details.billing-address-same')}</p>
                          ) : (
                            <>
                              {customerDetails?.company && (
                                <>
                                  <span className="font-semibold truncate">
                                    {customerDetails.company}
                                  </span>
                                  <br />
                                </>
                              )}
                              {billingAddress.firstName}{' '}
                              {billingAddress.lastName}
                              <br />
                              {billingAddress.address1}{' '}
                              {billingAddress.houseNumber}
                              {!!billingAddress.addition && <br />}
                              {billingAddress.addition}
                              <br />
                              {billingAddress.zipCode} {billingAddress.city}
                              <br />
                              <div className="flex">
                                {(billingAddress.province ||
                                  billingAddress.district) && (
                                  <p className="truncate">
                                    {subdivisionPerIso2Code(
                                      billingAddress.iso2Code,
                                      'billing'
                                    )}
                                    ,&nbsp;
                                  </p>
                                )}
                                {billingAddress.iso2Code && (
                                  <p className="truncate">
                                    {getCountryFromIso2Code(
                                      billingAddress.iso2Code
                                    )}
                                  </p>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </section>
                    </div>
                  </div>

                  <hr className="border-ui-grey-lightest mb-3" />

                  <div data-testid="costsSectionId">
                    <div>
                      <h5 className="text-base font-bold mb-2">
                        {t('order-details.order-summary')}
                      </h5>
                      <div className="flex justify-between text-base">
                        <div>
                          {t('order-details.total-products', {
                            products: items?.length
                          })}
                        </div>
                        <div>{subTotal}</div>
                      </div>
                      {discountSubtotal > 0 && (
                        <div
                          className="flex justify-between text-base mt-0.5"
                          data-testid="discountSubtotal"
                        >
                          <p className="relative">{t('basket.discount')}</p>
                          <span className="text-feedback-success text-base font-semibold">
                            -{' '}
                            {
                              formatPrice(discountSubtotal, currencyIsoCode)
                                .asOne
                            }
                          </span>
                        </div>
                      )}
                      {isLoyaltyAtidaCashEnabled &&
                        welcomeCashDiscount &&
                        welcomeCashDiscount?.sumAmount > 0 && (
                          <div
                            className="flex justify-between text-base mt-0.5"
                            data-testid="discountWelcomeCash"
                          >
                            <p className="relative">
                              {t('order-details.welcome-cash-discount')}
                            </p>
                            <span className="text-feedback-success text-base font-semibold">
                              -{' '}
                              {
                                formatPrice(
                                  welcomeCashDiscount?.sumAmount,
                                  currencyIsoCode
                                ).asOne
                              }
                            </span>
                          </div>
                        )}
                    </div>

                    <hr className="border-ui-black-10 my-2" />

                    <div>
                      <div className="flex justify-between text-base">
                        <h5 className="text-base font-bold">
                          {t('order-details.subtotal')}
                        </h5>
                        <span className="text-base font-bold">
                          {subtotalAfterDiscounts}
                        </span>
                      </div>

                      {!!totals.surchargeTotal && !isTaxExempt && (
                        <div className="flex justify-between text-base mt-0.5">
                          <span>{t('basket.surcharge-total')}</span>
                          <span>
                            +
                            {
                              formatPrice(
                                totals.surchargeTotal,
                                currencyIsoCode
                              ).asOne
                            }
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-base mt-0.5">
                        <div>{t('order-details.shipping')}</div>
                        <div>{getShippingPriceText(shippingPrice, t)}</div>
                      </div>

                      {isLoyaltyAtidaCashEnabled &&
                        typeof totals?.loyaltySpent === 'number' &&
                        totals?.loyaltySpent > 0 && (
                          <div className="flex justify-between text-base mt-0.5">
                            <div>{t('order-details.loyalty-spent')}</div>
                            <div className="text-feedback-success text-base font-semibold">
                              - {atidaCashSpent}
                            </div>
                          </div>
                        )}
                    </div>

                    <hr className="border-primary-oxford-blue my-2" />

                    <div
                      className="flex justify-between text-lg font-semibold"
                      data-testid="subtotalPriceId"
                    >
                      <div>{t('order-details.total')}</div>
                      <div>
                        {priceCurrencyFormatter(
                          totalOrderPrice,
                          currencyIsoCode
                        )}
                      </div>
                    </div>
                  </div>

                  {isLoyaltyAtidaCashEnabled &&
                    typeof totals?.rewardTotal === 'number' &&
                    totals.rewardTotal > 0 && (
                      <>
                        <hr className="border-ui-black-10 my-2" />
                        <div className="flex justify-between text-sm-base">
                          <div>{t('order-details.loyalty-earned')}</div>
                          <div>
                            {priceCurrencyFormatter(
                              atidaCashEarned,
                              currencyIsoCode
                            )}
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </section>

              <section className="-mx-2 sm:mx-0 -mb-4 sm:-mb-1">
                {items.map((item, idx) => (
                  <OrderDetailsItem key={item.id} {...item} idx={idx} />
                ))}
              </section>
              {/* This is hidden as it is out of scope for now */}
              {/* <section>
                <h4>{t('order-details.invoice')}</h4>

                <div className="border border-ui-grey-light divide-y divide-ui-grey-light p-3">
                  <div className="flex justify-evenly pb-2">
                    <div className="flex-1">
                      <h5 className="mb-1">
                        {Intl.DateTimeFormat(
                          locale,
                          invoiceDateTimeConfig
                        ).format(new Date(createdAtECMA))}
                      </h5>
                      <p className="text-feedback-success font-semibold">
                         TODO: Handle payment status when backend is complete
                        {t('order-details.invoice.paid')}
                      </p>
                    </div>
                    <div className="flex-1">
                      <h5 className="mb-1">
                        {priceCurrencyFormatter(
                          totalOrderPrice,
                          currencyIsoCode
                        )}
                      </h5>
                       TODO: Handle payment provider when backend is complete
                      <p>PayPal</p>
                    </div>
                    <Paypal className="my-auto mr-15 ml-5 w-5" />
                    <ChevronRight className="my-auto icon-24" />
                  </div>
                  <div className="flex pt-2">
                    <Button
                      icon={<Download className="icon-24" />}
                      iconPosition="before"
                      variant="secondary"
                      className="ml-auto mr-auto w-1/2"
                    >
                      {t('order-details.download-invoice')}
                    </Button>
                  </div>
                </div>
              </section>
              **/}
            </main>
          </article>
        </div>
      </>
    )
  } else {
    return (
      <>
        <header>
          <h1 className="font-light mb-7">{t('order-details.title')}</h1>
        </header>
        <LoadingSpinner className="min-h-30" />
      </>
    )
  }
}

OrderDetails.Layout = (page: JSX.Element) => (
  <AccountPageLayout>{page}</AccountPageLayout>
)

const getShippingPriceText = (
  shippingPrice: string | undefined,
  translate: TFunction
) => {
  if (shippingPrice === '0,00') {
    return (
      <span className="text-feedback-success">
        {translate('order-details.shipping.free') as string}
      </span>
    )
  }

  return <>{shippingPrice}</>
}

const checkIfShipBillAddressAreSame = (
  shippingAddress: OrderDetailsAddressAttribute,
  billingAddress: OrderDetailsAddressAttribute
) => {
  const namesAreTheSame =
    shippingAddress.firstName === billingAddress.firstName &&
    shippingAddress.lastName === billingAddress.lastName
  const addressIsTheSame = shippingAddress.address1 === billingAddress.address1
  const zipIsTheSame = shippingAddress.zipCode === billingAddress.zipCode
  const cityIsTheSame = shippingAddress.city === billingAddress.city
  const countryIsTheSame = shippingAddress.country === billingAddress.country
  const houseNumberIsTheSame =
    shippingAddress.houseNumber === billingAddress.houseNumber
  const additionIsTheSame = shippingAddress.addition === billingAddress.addition
  const provinceIsTheSame = shippingAddress.province === billingAddress.province
  return (
    namesAreTheSame &&
    addressIsTheSame &&
    houseNumberIsTheSame &&
    additionIsTheSame &&
    zipIsTheSame &&
    cityIsTheSame &&
    provinceIsTheSame &&
    countryIsTheSame
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.BASKET_PROMOTIONAL_ITEMS_PRICE_ZERO,
    FeatureFlag.ORDER_HISTORY_TRACKING,
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default OrderDetails
