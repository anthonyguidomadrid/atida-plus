import React, { FunctionComponent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { Product } from '~domains/product/types'
import { useFormatAmount, useFormatPrice } from '~domains/product'
import { Button } from '~components/atoms/Button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~domains/redux'
import {
  addToBasketFulfill,
  addToBasketTrigger,
  selectItemIsLoading
} from '~domains/basket'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { FreeShippingNotification } from '~components/atoms/FreeShippingNotification'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { DiscountedItem } from '~domains/basket/types'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { ReactComponent as AddToBasketIcon } from '~assets/svg/newAddToBasketInverted.svg'

export type BasketAddOnProps = {
  product: Partial<Product>
  isProductLoading: boolean
  discountPercentage?: number
  idPromotionalItem?: string
  isDiscountedItem?: boolean
  setDiscountedProduct?: (discountedProduct: DiscountedItem | undefined) => void
}

export const BasketAddOn: FunctionComponent<BasketAddOnProps> = ({
  product,
  isProductLoading,
  discountPercentage = 0,
  idPromotionalItem,
  isDiscountedItem,
  setDiscountedProduct
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const formatAmount = useFormatAmount()
  const dispatch = useDispatch()
  const {
    unitVolume,
    thumbnailImage,
    productDatImage,
    name,
    price,
    sku,
    rrp
  } = product
  const discountedPrice =
    discountPercentage &&
    price &&
    price?.value * (1 - discountPercentage / 10000)

  const formattedUnitVolume = unitVolume
    ? formatAmount(unitVolume.amount, unitVolume.unit, unitVolume.unitLabel)
    : null
  const addToBasketIsLoading = useSelector<
    RootState,
    ReturnType<typeof selectItemIsLoading>
  >(state => selectItemIsLoading(state, { sku }))

  const isLargeScreen = useBreakpoint(breakpoints.md)

  const addToBasket = useCallback(
    async (sku: string | undefined) => {
      if (sku) {
        dispatch(
          addToBasketTrigger(
            removeUndefinedPropertiesFromObject({
              sku,
              quantity: 1,
              id_promotional_item: idPromotionalItem,
              added_from: PATH_DESCRIPTION.BASKET,
              ...(isDiscountedItem && { is_promo: true })
            })
          )
        )
        if (isDiscountedItem) {
          await dispatch({
            type: 'checkout',
            [WAIT_FOR_ACTION]: addToBasketFulfill(
              removeUndefinedPropertiesFromObject({
                sku,
                quantity: 1,
                id_promotional_item: idPromotionalItem,
                added_from: PATH_DESCRIPTION.BASKET
              })
            ).type
          })
          setDiscountedProduct?.(undefined)
        }
      }
    },
    [dispatch, idPromotionalItem, setDiscountedProduct, isDiscountedItem]
  )

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
    <div
      className="bg-ui-carribean-green-lightest md:bg-transparent mb-2 px-2 pb-2 md:pb-2 md:px-0 md:border-b md:border-ui-grey-light"
      data-testid="basketAddOn"
    >
      <FreeShippingNotification
        hasReachedFreeShipping={false}
        isDiscountedItem={isDiscountedItem}
        {...(!isDiscountedItem && {
          icon: (
            <Delivery className="h-3 shrink-0 text-labels-campaign-green mr-2" />
          )
        })}
      />

      <div
        className="bg-primary-white flex sm:flex-row flex-col item-center w-full "
        data-testid="basketAddOnProductInfo"
      >
        <div className="flex flex-row p-2 md:pr-2 md:py-2 md:pl-0 w-full">
          {isAlternativeImageFormatsEnabled && productDatImage ? (
            <picture className="shrink-0">
              <source
                srcSet={`${productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:64,height:64, ${productDatImage}?format=avif&quality=${AVIFCompressionRate}&io=transform:extend,width:96,height:96 1.5x`}
                type="image/avif"
              />
              <source
                srcSet={`${productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:64,height:64, ${productDatImage}?format=webp&quality=${WEBPCompressionRate}&io=transform:extend,width:96,height:96 1.5x`}
                type="image/webp"
              />
              <img
                srcSet={`${productDatImage}?format=png&io=transform:extend,width:64,height:64, ${productDatImage}?format=png&io=transform:extend,width:96,height:96 1.5x`}
                src={`${productDatImage}?format=png&io=transform:extend,width:64,height:64`}
                alt={name}
                className="h-8 sm:h-6 md:h-8 sm:w-6 w-8 md:w-8 shrink-0"
                data-testid="basketAddOnProductImage"
              />
            </picture>
          ) : (
            <img
              src={thumbnailImage}
              alt={name}
              className="h-8 sm:h-6 md:h-8 sm:w-6 w-8 md:w-8 shrink-0"
              data-testid="basketAddOnProductImage"
            />
          )}
          <div className="mx-1">
            <p
              className="text-sm text-primary-oxford-blue font-semibold line-clamp-2"
              data-testid="basketAddOnProductName"
            >
              {name}
            </p>
            <p
              className="text-sm text-ui-grey-dark mt-1"
              data-testid="basketAddOnProductUnit"
            >
              {formattedUnitVolume}
            </p>
          </div>
          <div className="ml-auto justify-self-end">
            {rrp && price && rrp?.value > price?.value && (
              <p
                className="text-sm text-right line-through text-ui-grey"
                data-testid="basketAddOnProductRrp"
              >
                {formatPrice(rrp?.value, rrp?.currency).asOne}
              </p>
            )}
            <p
              className="text-primary-oxford-blue font-semibold"
              data-testid="basketAddOnProductPrice"
            >
              {
                formatPrice(
                  isDiscountedItem ? discountedPrice : price?.value,
                  price?.currency
                ).asOne
              }
            </p>
          </div>
        </div>
        {!isLargeScreen && (
          <div className="flex sm:border-l xs:border-b border-ui-grey-light" />
        )}
        {!isLargeScreen && (
          <div className="p-2">
            <Button
              type="button"
              variant="tertiary"
              disabled={isProductLoading}
              data-testid="basketAddOnAddToBasketButton"
              aria-label={t('product.add-to-basket')}
              icon={
                <AddToBasketIcon className="icon-18-22 text-primary-oxford-blue" />
              }
              className={
                'h-6 grow w-full sm:max-w-28 sm:w-25 sm:mt-0 md:mt-2 md:w-full sm:px-0 md:px-4'
              }
              onClick={() => addToBasket(sku)}
              isLoading={addToBasketIsLoading}
            >
              {t('product.add-to-basket')}
            </Button>
          </div>
        )}
      </div>
      {isLargeScreen && (
        <div className="text-right">
          <Button
            type="button"
            variant="tertiary"
            disabled={isProductLoading}
            data-testid="basketAddOnAddToBasketButton"
            aria-label={t('product.add-to-basket')}
            icon={
              <AddToBasketIcon className="icon-18-22 text-primary-oxford-blue" />
            }
            className={'h-6 grow w-full sm:w-25 md:w-full sm:px-0 md:px-4'}
            onClick={() => addToBasket(sku)}
            isLoading={addToBasketIsLoading}
          >
            {t('product.add-to-basket')}
          </Button>
        </div>
      )}
    </div>
  )
}
