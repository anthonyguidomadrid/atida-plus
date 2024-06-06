import React, {
  FunctionComponent,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react'
import {
  BasketPromotionalItem,
  Product,
  useFormatAmount,
  useFormatPrice
} from '~domains/product'
import { Trans, useTranslation } from 'react-i18next'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import { QuantitySelector } from '~components/molecules/QuantitySelector'
import classNames from 'classnames'
import { selectItemIsLoading } from '~domains/basket'
import { useSelector } from 'react-redux'
import { ReactComponent as NavBasket } from '~assets/svg/navigation-24px/NavBasket.svg'
import { Button } from '~components/atoms/Button'
import { RootState } from '~domains/redux'
import { Availability } from '~components/atoms/Availability'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type BasketProductModalProps = {
  product: Product | null
  productSku: string | undefined
  productQuantity: number
  inputValue?: string
  inputRef?: ((instance: HTMLInputElement) => void) | null | undefined
  addToBasket?: (product: Product) => void
  removeFromBasket?: () => void
  changeQuantity?: (e: ChangeEvent<HTMLInputElement>) => void
  increaseQuantity?: (e: React.MouseEvent<HTMLElement>) => void
  decreaseQuantity?: (e: React.MouseEvent<HTMLElement>) => void
  openBasketModal?: (product: Product) => void
  availability?: string
  availableQty?: number
  doExceeds?: boolean
  maxQuantity?: number
  setPromotionalItem?: Dispatch<
    SetStateAction<{
      handleQuantityChange: boolean
      handleRemoval: boolean
      parentSku: string
    }>
  >
  promotionalItem: BasketPromotionalItem
}

export const BasketProductModal: FunctionComponent<BasketProductModalProps> = ({
  product,
  productQuantity,
  addToBasket,
  removeFromBasket,
  changeQuantity,
  increaseQuantity,
  decreaseQuantity,
  inputRef,
  inputValue,
  availability,
  maxQuantity,
  availableQty,
  doExceeds,
  setPromotionalItem,
  promotionalItem
}) => {
  const formatPrice = useFormatPrice()
  const formatAmount = useFormatAmount()
  const salePrice = product?.price.value
  const unitVolume = product?.unitVolume
    ? formatAmount(
        product.unitVolume.amount,
        product.unitVolume.unit,
        product.unitVolume.unitLabel
      )
    : null
  const unitVolumeWithContentSizeFactor = formatContentSizeFactor(
    unitVolume,
    product?.contentSizeFactor
  )
  const addToBasketIsLoading = useSelector<
    RootState,
    ReturnType<typeof selectItemIsLoading>
  >(state => selectItemIsLoading(state, { sku: product?.sku })) // TODO: https://olp.atlassian.net/browse/PLUS-2979
  const { t } = useTranslation()

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
    <>
      {product && (
        <div data-testid="basketProductModal" className="flex mt-3">
          <div className="flex w-full pr-3">
            <div className="flex justify-center items-center basis-16 w-16 h-20 pl-1 pr-1 pb-2">
              {isAlternativeImageFormatsEnabled && product.productDatImage ? (
                <picture>
                  <source
                    srcSet={`${product.productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:96,height:96, ${product.productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:144,height:144 1.5x`}
                    type="image/avif"
                  />
                  <source
                    srcSet={`${product.productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:96,height:96, ${product.productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:144,height:144 1.5x`}
                    type="image/webp"
                  />
                  <img
                    data-testid="basketProductModalImage"
                    className="object-contain"
                    srcSet={`${product.productDatImage}?format=png&io=transform:extend,width:96,height:96, ${product.productDatImage}?format=png&io=transform:extend,width:144,height:144 1.5x`}
                    src={`${product.productDatImage}?format=png&io=transform:extend,width:96,height:96`}
                    alt={product.name}
                  />
                </picture>
              ) : (
                <img
                  data-testid="basketProductModalImage"
                  className="object-contain"
                  src={product.thumbnailImage}
                  alt={product.name}
                />
              )}
            </div>
            <div className="ml-2 flex flex-col flex-1 pr-1">
              <h3
                data-testid="basketProductModalName"
                className="text-base font-body font-semibold line-clamp-3"
              >
                {product.name}
              </h3>
              <div className="mt-auto mb-2">
                <small
                  data-testid="basketProductModalUnitVolume"
                  className="block text-sm text-ui-grey-dark mb-2"
                >
                  {[product.format?.label, unitVolumeWithContentSizeFactor]
                    .filter(value => !!value)
                    .join(' - ')}
                </small>
                <Button
                  type="button"
                  variant="secondary"
                  icon={<NavBasket className="icon-24" />}
                  className={classNames(
                    'px-1.5 text-xs xs:text-sm xs:px-3 min-w-28.5 h-5 sm:h-6 md:w-26',
                    {
                      hidden: productQuantity
                    }
                  )}
                  onClick={() => addToBasket?.(product)}
                  disabled={
                    product.availability === 'NOT_AVAILABLE' ||
                    product.availability === undefined
                  }
                  data-testid="addToBasketButton"
                  aria-label={t('product.add-to-basket')}
                  isLoading={addToBasketIsLoading}
                  singleIcon={true}
                >
                  {t('product.add-to-basket')}
                </Button>
                {productQuantity ? (
                  <Availability
                    availability={availability}
                    qty={availableQty === 0 ? undefined : availableQty}
                  />
                ) : null}
                <QuantitySelector
                  quantity={productQuantity ?? 0}
                  showRemoveButton={productQuantity === 1}
                  onQuantityChange={e => changeQuantity?.(e)}
                  disableIncreaseButton={
                    (maxQuantity && productQuantity >= maxQuantity) ||
                    (availableQty ? productQuantity >= availableQty : false)
                  }
                  removeFromBasket={() => removeFromBasket?.()}
                  inputRef={inputRef}
                  inputValue={inputValue}
                  increaseQuantity={e => increaseQuantity?.(e)}
                  decreaseQuantity={e => decreaseQuantity?.(e)}
                  className={classNames(
                    'grow col-span-5 md:col-span-4 lg:col-span-3 max-w-30',
                    {
                      hidden: !productQuantity
                    }
                  )}
                  setPromotionalItem={setPromotionalItem}
                  promotionalItem={promotionalItem}
                />
              </div>
              {doExceeds && (
                <div
                  role="alert"
                  data-testid="alert"
                  className="text-feedback-error text-sm lg:max-w-66"
                >
                  {t('maximum-product-quantity', {
                    quantity: maxQuantity
                  })}
                </div>
              )}
            </div>
            <div
              data-testid="basketProductModalPrice"
              className="flex flex-col text-right"
            >
              {product.rrp &&
                product.price?.value &&
                product.price?.value < product.rrp?.value && (
                  <span
                    data-testid="basketProductModalRRP"
                    className="block text-sm"
                  >
                    <Trans
                      i18nKey="product.rrp"
                      values={{
                        price: formatPrice(
                          product.rrp.value,
                          product.rrp.currency
                        ).asOne
                      }}
                    >
                      <span className="line-through" />
                    </Trans>
                  </span>
                )}
              <span
                data-testid="basketProductModalSalePrice"
                className="block text-sm font-semibold"
              >
                {formatPrice(salePrice, product?.rrp?.currency).asOne}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
