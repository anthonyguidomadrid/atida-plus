import type {
  BaseSyntheticEvent,
  ComponentPropsWithoutRef,
  FunctionComponent
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { Product, useFormatAmount, useFormatPrice } from '~domains/product'
import type { OrderDetailsItem as OrderDetailsItemType } from '~domains/account/types'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import { useDispatch } from 'react-redux'
import { triggerReportProductClicked } from '~domains/analytics'
import { InfoLabel } from '~components/atoms/InfoLabel'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { priceCurrencyFormatter } from '~helpers/price-formatter'

export type OrderDetailsItemProps = OrderDetailsItemType

export const OrderDetailsItem: FunctionComponent<
  ComponentPropsWithoutRef<'article'> & OrderDetailsItemProps
> = ({
  name,
  sku,
  quantity,
  metadata,
  idx,
  unitSubtotalAggregation,
  isPromo,
  isFullyDiscounted,
  unitPriceToPayAggregation
}) => {
  const { t } = useTranslation()

  const formatPrice = useFormatPrice()
  const formatAmount = useFormatAmount()

  const isAlternativeImageFormatsEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_ALLOW_ALTERNATIVE_FORMATS
  ) as boolean
  const AVIFCompressionRate = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_AVIF_COMPRESSION
  ) as number
  const WEBPCompressionRate = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_WEBP_COMPRESSION
  ) as number

  const isPromotionalItemsPriceZeroEnabled = useFeatureFlag(
    FeatureFlag.BASKET_PROMOTIONAL_ITEMS_PRICE_ZERO
  )

  const priceCurrency = metadata?.price?.currency ?? ''

  const volumeAmount = metadata?.unitVolume?.amount ?? 0
  const volumeUnit = metadata?.unitVolume?.unit ?? ''

  const mainPrice = formatPrice(
    isPromotionalItemsPriceZeroEnabled && isPromo && isFullyDiscounted
      ? 0
      : isPromo && !isFullyDiscounted
      ? unitPriceToPayAggregation
      : unitSubtotalAggregation,
    priceCurrency
  )

  const mainVolume = formatAmount(volumeAmount, volumeUnit)

  const unitVolume = metadata?.unitVolume
    ? formatAmount(
        metadata.unitVolume.amount,
        metadata.unitVolume.unit,
        metadata?.unitVolume?.unitLabel
      )
    : null

  const unitVolumeWithContentSizeFactor = formatContentSizeFactor(
    unitVolume,
    metadata?.contentSizeFactor
  )

  const dispatch = useDispatch()

  const handleReportProductClicked = ({ target }: BaseSyntheticEvent) => {
    if (target.nodeName === 'A') {
      dispatch(
        triggerReportProductClicked({
          product: { ...metadata, sku },
          positionInTheList: idx + 1
        })
      )
    }
  }

  return (
    <>
      <article
        data-testid="orderDetailsItem"
        className={classNames(
          'flex flex-row justify-between items-start relative',
          'p-2 sm:p-3  mb-2 last:mb-0',
          'border-t border-ui-grey-light',
          'sm:border-l sm:border-b sm:border-r sm:rounded'
        )}
      >
        <section
          data-testid="testImageLink"
          className="mr-2 w-13 flex justify-center"
          onKeyDown={handleReportProductClicked}
          tabIndex={0}
          role={
            !isPromo ||
            (isPromo && mainPrice?.asOne && parseInt(mainPrice?.asOne) > 0)
              ? 'button'
              : ''
          }
          onClick={handleReportProductClicked}
        >
          {isPromo && isFullyDiscounted && (
            <div className="absolute left-2 top-2">
              <InfoLabel
                className="leading-5.375"
                label={metadata?.labels?.[0].label}
                variant={metadata?.labels?.[0].type}
                data-testid="testInfoLabel"
              />
            </div>
          )}
          {renderImageLink({
            isAlternativeImageFormatsEnabled,
            AVIFCompressionRate,
            WEBPCompressionRate,
            url: metadata?.url,
            productDatImage: metadata.productDatImage,
            image: metadata?.mediumImage,
            name,
            isPromo,
            family: metadata?.family
          })}
        </section>

        <section className="flex-1 flex flex-col self-stretch">
          <header
            className="flex flex-col justify-between h-full"
            onKeyDown={handleReportProductClicked}
            tabIndex={0}
            role={
              !isPromo ||
              (isPromo && mainPrice?.asOne && parseInt(mainPrice?.asOne) > 0)
                ? 'button'
                : ''
            }
            onClick={handleReportProductClicked}
          >
            <div>
              <h5 className="mb-0.5" data-testid="orderDetailsItemTitleUrl">
                {renderProductTitleLink({
                  url: metadata?.url,
                  name,
                  isPromo,
                  family: metadata?.family
                })}
              </h5>

              <h6 className="text-sm leading-5.375 text-ui-grey mb-2">
                {t('product.pzn', { pzn: sku })}
                {metadata?.format?.label && ` - ${metadata?.format?.label}`}
                {mainVolume && Number(mainVolume) > 0 && ` - ${mainVolume}`}
              </h6>
            </div>

            <div className="flex justify-between gap-x-2 w-full order-2 items-end">
              <div>
                <section className="text-sm leading-5.375">
                  {t('order-details.qty')}: {quantity}
                </section>
                {metadata?.unitVolume &&
                  !unitVolumeWithContentSizeFactor?.includes('undefined') && (
                    <section className="text-sm text-ui-grey">
                      {unitVolumeWithContentSizeFactor}
                    </section>
                  )}
              </div>

              <span className={classNames('font-semibold text-base')}>
                {priceCurrencyFormatter(mainPrice?.asOne, priceCurrency)}
              </span>
            </div>
          </header>

          {/*<div className="mt-7">
            <section className="flex flex-col sm:flex-row">
               <Button
                icon={<NavAdvice className="icon-24" />}
                iconPosition="before"
                variant="secondary"
                className="mr-0 sm:mr-2 mb-1 sm:mb-0"
              >
                <h5>{t('order-details.ask-question')}</h5>
              </Button>
              <Button
                icon={<Review className="icon-24" />}
                iconPosition="before"
                variant="secondary"
              >
                <h5>{t('order-details.write-review')}</h5>
              </Button> 
            </section>
          </div>*/}
        </section>
      </article>
    </>
  )
}

const renderImageLink = ({
  isAlternativeImageFormatsEnabled,
  AVIFCompressionRate,
  WEBPCompressionRate,
  url,
  productDatImage,
  image,
  name,
  isPromo,
  family
}: {
  isAlternativeImageFormatsEnabled: boolean
  AVIFCompressionRate: number
  WEBPCompressionRate: number
  url?: string
  productDatImage?: string
  image?: Product['mediumImage']
  name: string
  isPromo?: boolean
  family?: string
}) => {
  const ProductImage =
    isAlternativeImageFormatsEnabled && productDatImage ? (
      <picture className="flex justify-center items-center">
        <source
          srcSet={`${productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:152,height:152, ${productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:228,height:228 1.5x`}
          type="image/avif"
        />
        <source
          srcSet={`${productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:152,height:152, ${productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:228,height:228 1.5x`}
          type="image/webp"
        />
        <img
          data-testid="orderDetailsItemImage"
          className="object-contain"
          srcSet={`${productDatImage}?format=png&io=transform:extend,width:152,height:152, ${productDatImage}?format=png&io=transform:extend,width:228,height:228 1.5x`}
          src={`${productDatImage}?format=png&io=transform:extend,width:152,height:152`}
          alt={name}
        />
      </picture>
    ) : (
      <img
        src={image ?? ''}
        alt={name}
        className={classNames('mb-auto inline', {
          'mt-4': isPromo,
          'mt-auto': !isPromo
        })}
        data-testid="orderDetailsItemImage"
        loading="lazy"
      />
    )
  if (!url || family === 'not_for_sale') {
    return ProductImage
  }
  return (
    <NextLink href={url} passHref prefetch={false}>
      <Link className="no-underline" data-testid="orderDetailsItemImageLink">
        {ProductImage}
      </Link>
    </NextLink>
  )
}

const renderProductTitleLink = ({
  url,
  name,
  isPromo,
  family
}: {
  url?: string
  name: string
  isPromo?: boolean
  family?: string
}) => {
  if (!url || (isPromo && family === 'not_for_sale')) return name

  return (
    <NextLink href={url} passHref prefetch={false}>
      <Link className="no-underline" data-testid="orderDetailsItemNameLink">
        {name}
      </Link>
    </NextLink>
  )
}
