import { FunctionComponent } from 'react'
import { Product, useFormatAmount, useFormatPrice } from '~domains/product'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import { useTranslation } from 'react-i18next'

export type OrderSummaryProductTileProps = {
  product: Partial<Product>
  sku?: string
  idx: number
  name?: string
  url?: string
  pzn?: string
  format?: { code: string; label: string }
  packageSize?: string
  unitVolume?: {
    amount: number
    unit: string
    unitLabel: string
  }
  contentSizeFactor?: number
  availability?: string
  quantity?: number
  rrp: {
    value?: number
    currency?: string
  }
  pricePerUnit?: {
    value: number
    currency: string
    unit: string
  }
  price: {
    value?: number
    currency?: string
  }
  image: {
    url?: string
    description: string
  }
  labels?: Product['labels']
  isPromo?: boolean
  isFullyDiscounted?: boolean
  isSample?: boolean
}

export const OrderSummaryProductTile: FunctionComponent<OrderSummaryProductTileProps> = ({
  name,
  pzn,
  format,
  unitVolume,
  contentSizeFactor,
  quantity,
  image,
  price,
  isPromo,
  isFullyDiscounted,
  isSample
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const formatAmount = useFormatAmount()
  const formattedUnitVolume = unitVolume
    ? formatAmount(unitVolume.amount, unitVolume.unit, unitVolume.unitLabel)
    : null
  const unitVolumeWithContentSizeFactor = formatContentSizeFactor(
    formattedUnitVolume,
    contentSizeFactor
  )
  return (
    <div className="flex items-center	px-2 py-2">
      <span className="text-primary-oxford-blue">{quantity}x</span>
      <div className="h-full w-95px sm:w-95px md:w-95px mx-1 sm:mr-1 md:mr-1">
        <img
          src={image.url}
          alt={image.description}
          className="w-95px sm:w-95px md:w-95px lg:w-95px h-auto"
        />
      </div>
      <div className="flex flex-col w-full pr-4">
        <h3
          data-testid="orderSummaryProductTileName"
          className="text-sm text-primary-oxford-blue font-body font-semibold line-clamp-2"
        >
          {isPromo &&
            isFullyDiscounted &&
            !isSample &&
            `${t('campaign-promo.gift').toUpperCase()} - `}
          {isSample && `${t('campaign-promo.sample').toUpperCase()} - `}

          {name}
        </h3>
        <small className="block text-sm text-ui-grey-dark mb-1">
          {[
            pzn ? t('product.pzn', { pzn }) : null,
            format?.label,
            unitVolumeWithContentSizeFactor
          ]
            .filter(value => !!value)
            .join(' - ')}
        </small>
      </div>
      <span
        data-testid="orderSummaryProductTilePrice"
        className="text-primary-oxford-blue"
      >
        {formatPrice(price.value, price.currency).asOne}
      </span>
    </div>
  )
}
