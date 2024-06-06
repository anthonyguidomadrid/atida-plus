import {
  BaseSyntheticEvent,
  ChangeEvent,
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode,
  MouseEvent
} from 'react'
import { Trans, useTranslation } from 'react-i18next'
import classNames from 'classnames'
import NextLink from 'next/link'
import { Button } from '~components/atoms/Button'
import { Availability } from '~components/atoms/Availability'
import { ProductLabels } from '~components/molecules/ProductLabels'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { ReactComponent as FavouritesIcon } from '~assets/svg/navigation-24px/Favourite.svg'
import { ReactComponent as FavouritesIconFilled } from '~assets/svg/navigation-24px/FavouriteFilled.svg'
import { Product, useFormatAmount, useFormatPrice } from '~domains/product'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import { useDispatch } from 'react-redux'
import { triggerReportProductClicked } from '~domains/analytics'
import { QuantitySelector } from '~components/molecules/QuantitySelector'
import { validateMaxQuantity } from '~helpers/validateMaxQuantity'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  FavouriteButtonPlaceholder,
  FavouriteButtonProps
} from '../FavouriteButton/FavouriteButton'
import dynamic from 'next/dynamic'
import { DeliveryDays } from '~domains/basket/types'

const FavouriteButton = dynamic<FavouriteButtonProps>(
  () =>
    import('~components/molecules/FavouriteButton').then(
      c => c.FavouriteButton
    ),
  {
    loading: () => <FavouriteButtonPlaceholder />
  }
)

export type BasketProductTileProps = {
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
  family?: string
  contentSizeFactor?: number
  availability?: string
  quantity: number
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
  availableQty?: number
  labels?: Product['labels']
  inputValue?: string
  doExceeds?: boolean
  isPromo?: boolean
  maxQuantity?: number
  addedFrom?: string
  isOnDemand?: boolean
  basketDeliveryDays?: DeliveryDays
  inputRef?: ((instance: HTMLInputElement) => void) | null | undefined
  handleRemoveItem?: (e: MouseEvent<HTMLElement>) => void
  handleChangeQuantity?: (e: ChangeEvent<HTMLInputElement>) => void
  decreaseQuantity: (e: MouseEvent<HTMLElement>) => void
  increaseQuantity: (e: MouseEvent<HTMLElement>) => void
  addToFavourites?: (sku: string) => void
  removeFromFavourites?: (sku: string) => void
}

// NextLink errors when "href" is undefined, and we don't want "mock" hrefs, so we remove the link when href is not present
const ProductLink: FunctionComponent<{
  href?: string
  handleClick: ({ target }: BaseSyntheticEvent) => void
  children?: ReactNode
}> = ({ href, children, handleClick }) => {
  return href ? (
    <div
      onKeyDown={handleClick}
      tabIndex={0}
      role="button"
      onClick={handleClick}
    >
      <NextLink href={href} passHref prefetch={false}>
        {children}
      </NextLink>
    </div>
  ) : (
    <span data-testid="basketProductImageContainer">{children}</span>
  )
}

export const BasketProductTile: FunctionComponent<
  ComponentPropsWithoutRef<'article'> & BasketProductTileProps
> = ({
  className,
  product,
  sku,
  idx,
  name,
  url,
  pzn,
  format,
  packageSize,
  unitVolume,
  family,
  contentSizeFactor,
  availability,
  quantity,
  image,
  pricePerUnit,
  rrp,
  price,
  labels = [],
  doExceeds,
  handleRemoveItem,
  handleChangeQuantity,
  availableQty,
  inputRef,
  inputValue,
  isPromo,
  increaseQuantity,
  decreaseQuantity,
  maxQuantity,
  addToFavourites,
  removeFromFavourites,
  addedFrom,
  isOnDemand,
  basketDeliveryDays,
  ...props
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const formatAmount = useFormatAmount()
  const mainPrice = formatPrice(price.value, price.currency)

  const formattedUnitVolume = unitVolume
    ? formatAmount(unitVolume.amount, unitVolume.unit, unitVolume.unitLabel)
    : null

  const unitVolumeWithContentSizeFactor = formatContentSizeFactor(
    formattedUnitVolume,
    contentSizeFactor
  )
  const dispatch = useDispatch()

  const handleReportProductClicked = ({ target }: BaseSyntheticEvent) => {
    if (target.nodeName === 'IMG' || target.nodeName === 'A') {
      dispatch(
        triggerReportProductClicked({
          //@ts-ignore
          product: { ...product, sku: sku, price: price },
          positionInTheList: idx + 1,
          basketQuantity: quantity
        })
      )
    }
  }

  const isAlternativeImageFormatsEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_ALLOW_ALTERNATIVE_FORMATS
  )
  const AVIFCompressionRate = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_AVIF_COMPRESSION
  ) as number
  const WEBPCompressionRate = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_WEBP_COMPRESSION
  ) as number

  return (
    <article
      data-testid="basketProductTile"
      className={classNames('flex relative', 'min-h-30 sm:min-h-24', className)}
      {...props}
    >
      <ProductLink
        href={family === 'common' ? url : ''}
        handleClick={handleReportProductClicked}
      >
        <a className="flex items-center h-full mr-2 sm:mr-3 md:mr-4 px-1 sm:px-4 md:px-2 lg:px-8 shrink-0 grow-0">
          {isAlternativeImageFormatsEnabled && product.productDatImage ? (
            <picture>
              <source
                srcSet={`${product.productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:88,height:88, ${product.productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:132,height:132 1.5x`}
                type="image/avif"
              />
              <source
                srcSet={`${product.productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:88,height:88, ${product.productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:132,height:132 1.5x`}
                type="image/webp"
              />
              <img
                srcSet={`${product.productDatImage}?format=png&io=transform:extend,width:88,height:88, ${product.productDatImage}?format=png&io=transform:extend,width:132,height:132 1.5x`}
                src={`${product.productDatImage}?format=png&io=transform:extend,width:88,height:88`}
                alt={image.description}
                className="w-88px sm:w-96px md:w-88px lg:w-96px h-auto"
              />
            </picture>
          ) : (
            <img
              src={image.url}
              alt={image.description}
              className="w-88px sm:w-96px md:w-88px lg:w-96px h-auto"
            />
          )}
        </a>
      </ProductLink>
      <div className="flex w-3/5 h-full flex-col grow">
        <h2
          className="text-base mb-1 font-body font-semibold pr-4"
          data-testid="basketProductTitleUrl"
        >
          {family === 'common' ? (
            <ProductLink href={url} handleClick={handleReportProductClicked}>
              <a className="no-underline">{name}</a>
            </ProductLink>
          ) : (
            name
          )}
        </h2>

        <ProductLabels
          labels={labels}
          className="absolute top-1 left-0 "
          listItemClassName="w-fit max-w-full mb-1"
        />

        <Button
          data-testid="basketProductTileRemoveButton"
          icon={<Cross className="icon-24" />}
          aria-label={t('basket.item-remove', { name })}
          variant="tertiary"
          className="border-none absolute -right-1 -top-1"
          onClick={handleRemoveItem}
        />

        <small className="block text-sm text-ui-grey-dark mb-1">
          {[
            pzn ? t('product.pzn', { pzn }) : null,
            format?.label,
            unitVolumeWithContentSizeFactor
          ]
            .filter(value => !!value)
            .join(' - ')}
        </small>

        <Availability
          data-testid="basketProductTileAvailability"
          availability={availability}
          qty={availableQty}
          className="py-1"
        />

        <div className="mb-2 flex w-full max-w-24">
          {isPromo ? (
            <span
              className="flex items-center justify-center font-normal h-5 sm:h-5 w-full border"
              data-testid="basketProductTileQuantityText"
            >
              {quantity}
            </span>
          ) : (
            <div className="flex flex-row items-center">
              <QuantitySelector
                quantity={quantity}
                showRemoveButton={quantity === 1}
                disableIncreaseButton={
                  quantity === maxQuantity ||
                  (availableQty ? quantity >= availableQty : false) ||
                  availability === 'NOT_AVAILABLE'
                }
                removeFromBasket={e => handleRemoveItem?.(e)}
                increaseQuantity={e => increaseQuantity?.(e)}
                decreaseQuantity={e => decreaseQuantity?.(e)}
                onQuantityChange={e => handleChangeQuantity?.(e)}
                inputRef={inputRef}
                inputValue={inputValue}
                className={classNames(
                  'flex-grow col-span-5 md:col-span-4 lg:col-span-3',
                  {
                    hidden: !quantity
                  }
                )}
                availability={availability}
              />
              <FavouriteButton
                data-testid="saveToFavouritesButton"
                product={product as Product}
                iconDefault={
                  <FavouritesIcon className="icon-24 text-primary-oxford-blue" />
                }
                iconActive={
                  <FavouritesIconFilled className="icon-24 text-primary-oxford-blue" />
                }
                addToFavourites={() => {
                  sku && addToFavourites && addToFavourites(sku)
                }}
                addedFrom={addedFrom}
                removeFromFavourites={() =>
                  sku && removeFromFavourites && removeFromFavourites(sku)
                }
                className="ml-1.5"
              />
            </div>
          )}
        </div>
        {isOnDemand && (
          <span className="block text-xs mt-auto sm:mt-0 mb-1 text-feedback-success">
            {t('basket.on-demand-product.delivery-days', {
              minDeliveryDays: basketDeliveryDays?.minDeliveryDays ?? 5,
              maxDeliveryDays: basketDeliveryDays?.maxDeliveryDays ?? 7
            })}
          </span>
        )}
        {validateMaxQuantity(quantity, maxQuantity) && (
          <div
            role="alert"
            data-testid="alert"
            className="text-feedback-error text-sm	lg:max-w-66"
          >
            {t('maximum-product-quantity', {
              quantity: maxQuantity
            })}
          </div>
        )}
        <div className="flex">
          {pricePerUnit && (
            <span
              data-testid="basketProductTilePricePerUnit"
              className="block text-sm text-ui-grey-dark"
            >
              {formatPrice(pricePerUnit.value, pricePerUnit.currency).asOne} /{' '}
              {pricePerUnit.unit}
            </span>
          )}
          <div className="text-right ml-auto sm:relative sm:-top-1">
            {quantity &&
              !!rrp?.value &&
              (price?.value || isPromo) &&
              (price?.value ?? 0) < rrp?.value * quantity && (
                <span
                  data-testid="basketProductTileRRP"
                  className={classNames('block text-sm', {
                    'text-ui-grey-light': availability === 'NOT_AVAILABLE'
                  })}
                >
                  <Trans
                    i18nKey="product.rrp"
                    values={{
                      price: formatPrice(rrp?.value * quantity, rrp?.currency)
                        .asOne
                    }}
                  >
                    <span
                      className={classNames('line-through', {
                        'text-ui-grey-light': availability === 'NOT_AVAILABLE'
                      })}
                    />
                  </Trans>
                </span>
              )}

            <span
              data-testid="basketProductTilePrice"
              className={classNames(
                'block font-semibold text-xl sm:mt-0.5 sm:text-base',
                {
                  'text-ui-grey-light': availability === 'NOT_AVAILABLE'
                }
              )}
            >
              <span className="sm:text-7xl">{mainPrice.integerAndDecimal}</span>
              <span className="sm:align-top">{mainPrice.fraction}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
