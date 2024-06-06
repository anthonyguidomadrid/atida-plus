import { ComponentPropsWithoutRef, FunctionComponent, useRef } from 'react'
import type { OrderHistoryItem as OrderItem } from '~domains/account/types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { useFormatPrice } from '~domains/product'
import { ReactComponent as ChevronRight } from '~assets/svg/navigation-24px/ChevronRight.svg'
import { ReactComponent as Box } from '~assets/svg/navigation-24px/Box.svg'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { ReactComponent as CreditCard } from '~assets/svg/navigation-24px/CreditCard.svg'
import { ReactComponent as RoundedCheckmark } from '~assets/svg/navigation-24px/RoundedCheckmark.svg'
import { ReactComponent as Exclamation } from '~assets/svg/navigation-24px/Exclamation.svg'
import { ReactComponent as ShippingBox } from '~assets/svg/shipping-box.svg'
import { ReactComponent as Download } from '~assets/svg/navigation-24px/Download.svg'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { orderStatusIconText } from '~helpers/orderStatusIconText'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { Button } from '~components/atoms/Button'
import { getOrderDetailsStatus } from '~helpers/getOrderDetailsStatus'
import { useDetectOutsideClick } from '~helpers'
import { OrderTrackingModal } from '~components/organisms/OrderTrackingModal'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'

export type OrderHistoryItemProps = OrderItem

export const OrderHistoryItem: FunctionComponent<
  ComponentPropsWithoutRef<'article'> & OrderHistoryItemProps
> = ({ id, attributes, maxProductsIndex }) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const isSM = useBreakpoint(breakpoints.sm)

  const isAlternativeImageFormatsEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_ALLOW_ALTERNATIVE_FORMATS
  )
  const AVIFCompressionRate = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_AVIF_COMPRESSION
  ) as number
  const WEBPCompressionRate = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_WEBP_COMPRESSION
  ) as number

  const isOrderHistoryTrackingEnabled = useFeatureFlag(
    FeatureFlag.ORDER_HISTORY_TRACKING
  )

  const isDownloadInvoiceEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_DOWNLOAD_INVOICE
  )

  const { totals, currencyIsoCode, status, items, shipments } = attributes
  const { erpTrackingReference, erpTrackingUrl, erpShipmentStatus } =
    shipments?.[0] ?? {}

  const mainPrice = formatPrice(totals.grandTotal, currencyIsoCode)

  const openTrackingModalHandler = () => {
    setNotificationModalOpen(true)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  const [
    notificationModalOpen,
    setNotificationModalOpen
  ] = useDetectOutsideClick(modalRef, false)

  const orderDetailsStatus = getOrderDetailsStatus(
    status[0]?.displayName,
    erpShipmentStatus,
    isOrderHistoryTrackingEnabled as boolean
  )

  const paymentStatus = orderStatusIconText(status[0]?.displayName)

  const renderIcon = () => {
    switch (
      orderDetailsStatus.isShipmentStatus
        ? orderDetailsStatus.data.colorClassName
        : paymentStatus.colorClassName
    ) {
      case 'text-feedback-error':
        return <Exclamation className="icon-24 mt-auto mb-auto mr-2" />
      case 'text-feedback-success':
        return <RoundedCheckmark className="icon-24 mt-auto mb-auto mr-2" />
      default:
        return <Delivery className="icon-24 mt-auto mb-auto mr-2" />
    }
  }

  return (
    <>
      <article
        data-testid="orderHistoryItem"
        className="border-ui-grey-lightest border mb-3"
      >
        <NextLink
          href={`/account/order-history/${id}`}
          passHref
          prefetch={false}
        >
          <Link className="no-underline block">
            <header className="flex justify-between py-2 px-3 gap-1 sm:gap-3">
              <div className="flex justify-between flex-col flex-grow sm:flex-row gap-1.5 sm:gap-3 text-sm">
                <div className="flex flex-row sm:flex-shrink sm:basis-4/12">
                  <Box className="icon-24 mt-auto mb-auto mr-2" />
                  <div>
                    <div className="font-bold text-sm-base">
                      {t('account.order-history.order-number')}
                    </div>
                    <div>{id}</div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-shrink sm:basis-4/12">
                  {renderIcon()}
                  <div>
                    <div className="font-bold text-sm-base">
                      {t('order-details.order-status')}
                    </div>
                    <div className="flex">
                      <span
                        className={classNames(
                          orderDetailsStatus.isShipmentStatus
                            ? orderDetailsStatus.data.colorClassName
                            : paymentStatus.colorClassName,
                          'leading-2.75 text-sm font-normal'
                        )}
                      >
                        {orderDetailsStatus.isShipmentStatus
                          ? t(orderDetailsStatus.data.translationSlug)
                          : t(paymentStatus.translationSlug)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-shrink sm:basis-4/12">
                  <CreditCard className="icon-24 mt-auto mb-auto mr-2" />
                  <div>
                    <div className="font-bold text-sm-base">
                      {t('account.order-history.product-count', {
                        count: items?.length
                      })}
                    </div>
                    <div>
                      {priceCurrencyFormatter(mainPrice.asOne, currencyIsoCode)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto mb-auto">
                <ChevronRight className="icon-24" />
              </div>
            </header>
          </Link>
        </NextLink>
        {items.length > 0 && (
          <div className="flex border-ui-grey-lightest px-3 mb-2 gap-1 sm:border-t sm:mb-0 sm:py-2">
            {items.slice(0, maxProductsIndex).map((item, index) => {
              if (
                index === maxProductsIndex - 1 &&
                items.length > maxProductsIndex
              ) {
                return (
                  <span
                    key="excessiveProductsItem"
                    data-testid="excessiveProductsItem"
                    className={classNames(
                      'border border-ui-grey-lightest p-1',
                      'w-9 h-9',
                      'font-semibold',
                      'flex justify-center'
                    )}
                  >
                    <p className="mt-auto mb-auto text-lg">
                      +{items.length - index}
                    </p>
                  </span>
                )
              }

              return isAlternativeImageFormatsEnabled &&
                item?.metadata?.productDatImage ? (
                <span
                  data-testid="orderItemImage"
                  className="flex items-center p-1 w-9 h-9 border border-ui-grey-lightest"
                  key={item?.metadata?.name}
                >
                  <picture className="flex justify-center items-center">
                    <source
                      srcSet={`${item?.metadata?.productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:124,height:124, ${item?.metadata?.productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:186,height:186 1.5x`}
                      type="image/avif"
                    />
                    <source
                      srcSet={`${item?.metadata?.productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:124,height:124, ${item?.metadata?.productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:186,height:186 1.5x`}
                      type="image/webp"
                    />
                    <img
                      data-testid="orderHistoryItemImage"
                      className="object-contain"
                      srcSet={`${item?.metadata?.productDatImage}?format=png&io=transform:extend,width:124,height:124, ${item?.metadata?.productDatImage}?format=png&io=transform:extend,width:186,height:186 1.5x`}
                      src={`${item?.metadata?.productDatImage}?format=png&io=transform:extend,width:124,height:124`}
                      alt={item?.metadata?.name}
                    />
                  </picture>
                </span>
              ) : item.metadata?.mediumImage ? (
                <span
                  data-testid="orderItemImage"
                  className="flex items-center p-1 w-9 h-9 border border-ui-grey-lightest"
                  key={item?.metadata?.name}
                >
                  <img
                    alt={item.metadata.name}
                    src={item.metadata?.mediumImage || ''}
                    className="m-0 p-0"
                  />
                </span>
              ) : (
                <></>
              )
            })}
          </div>
        )}
        <>
          {(isOrderHistoryTrackingEnabled || isDownloadInvoiceEnabled) && (
            <div className="flex flex-wrap my-2 mx-3 justify-center gap-2 sm:justify-start sm:mt-0">
              {isOrderHistoryTrackingEnabled && (
                <>
                  <Button
                    data-testid="trackingOrderButton"
                    icon={<ShippingBox className="w-3 text-inherit" />}
                    disabled={!erpTrackingReference || !erpTrackingUrl}
                    onClick={openTrackingModalHandler}
                    className="w-full sm:w-auto disabled:bg-primary-oxford-blue-20"
                  >
                    {t('account.order-history.track-order-button')}
                  </Button>
                  <OrderTrackingModal
                    erpTrackingReference={erpTrackingReference ?? ''}
                    erpTrackingUrl={erpTrackingUrl ?? ''}
                    isTrackingModalOpen={notificationModalOpen}
                    modalRef={modalRef}
                    isDesktopScreen={isSM}
                  />
                </>
              )}
              {isDownloadInvoiceEnabled && (
                <Button
                  variant="tertiary"
                  icon={<Download className="w-3 text-inherit" />}
                  className="w-full sm:w-auto"
                  data-testid="downloadInvoiceButton"
                >
                  <Link href={'mockedInvoiceUrl'} className="no-underline">
                    {t('account.download-invoice.button-label')}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </>
      </article>
    </>
  )
}
