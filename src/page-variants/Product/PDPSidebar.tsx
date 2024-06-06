import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { RECOMMENDATIONS_TYPES } from '~config/constants/recommendations'
import { FeatureFlag } from '~config/constants/feature-flags'
import { selectPDPSidebarData } from '~domains/product'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { RootState } from '~domains/redux'
import { selectItemError } from '~domains/basket'
import { selectData as selectPromotionData } from '~domains/promotion'
import { parseHtml } from '~helpers'
import { validateMaxQuantity } from '~helpers/validateMaxQuantity'
import { useIsBrowser } from '~helpers/useIsBrowser'
import { UseBasketDataForPDP } from '~helpers/useBasketDataForPDP'
import { useAddToBasketControls } from '~helpers/useAddToBasketControls'
import { useUnitVolumeWithContentSizeFactor } from '~helpers/useUnitVolumeWithContentSizeFactor'

import { DeliveryTimes } from '~components/atoms/DeliveryTimes'
import { Price } from '~components/atoms/Price'
import { ProductSavings } from '~components/atoms/ProductSavings'
import { PromoInformationBox } from '~components/atoms/PromoInformationBox'
import { RewardInfo } from '~components/atoms/Reward'
import { ProductUSP } from '~components/atoms/USP'
import { BackInStockSubscription } from '~components/molecules/BackInStockSubscription'
import {
  AddToBasketControls,
  AddToBasketControlsPlaceholder
} from '~components/organisms/AddToBasketControls'
import { ExponeaRecommendationBlock } from '~components/organisms/ExponeaRecommendationBlock'
import { ProductAvailability } from './ProductAvailability'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { PDPFrequentlyBoughtTogether } from './PDPFrequentlyBoughtTogether'

export const PDPSidebar = ({
  basketDataForPDP
}: {
  basketDataForPDP: UseBasketDataForPDP
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const sidebarData = useSelector(selectPDPSidebarData)

  const isGermany = useMemo(() => locale === 'de-de', [locale])
  const showRRP = useMemo(
    () =>
      sidebarData &&
      sidebarData.rrp &&
      sidebarData.price &&
      sidebarData.price.value < sidebarData.rrp.value,
    [sidebarData]
  )
  const unitVolumeWithContentSizeFactor = useUnitVolumeWithContentSizeFactor(
    sidebarData?.unitVolume,
    sidebarData?.contentSizeFactor
  )

  const promotion = useSelector(selectPromotionData)
  // TODO: Change this variable to actually check for whether the product has a gift.
  // We can probably do something similar as for the promotion: check if the gift label is present.
  const hasGift = false
  const hasPromotionInfo = useMemo(() => !!promotion?.[0]?.promoInformation, [
    promotion
  ])

  const error = useSelector<RootState, ReturnType<typeof selectItemError>>(
    state => selectItemError(state, { sku: sidebarData?.sku })
  )

  const isBrowser = useIsBrowser()
  const isSmallSize = useBreakpoint(breakpoints.sm)
  const isMediumSize = useBreakpoint(breakpoints.md)

  const {
    itemNoPromoInBasket,
    currentQuantityValue,
    productMaxQuantity,
    addToBasket,
    removeFromBasket
  } = basketDataForPDP

  const {
    addToBasketControlsRef,
    areAddToBasketControlsInView,
    newQuantitySelectorValue,
    setNewQuantitySelectorValue
  } = useAddToBasketControls()

  const [
    isPDPPromoInformationBoxFeatureEnabled,
    isFrequentlyBoughtTogetherFeatureEnabled,
    isSimilarProductsEnabled,
    backInStockEnabled,
    isTooltipEnabled,
    isShowRecommendationsBeforeFBTEnabled,
    isDeliveryTimesInfoEnabled
  ] = useFeatureFlags([
    FeatureFlag.PRODUCT_PDP_PROMO_INFORMATION_BOX,
    FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER,
    FeatureFlag.PDP_SIMILAR_PRODUCTS,
    FeatureFlag.PRODUCT_BACK_IN_STOCK_ENABLED,
    FeatureFlag.PDP_TOOLTIP_PROMOTION_INFO,
    FeatureFlag.SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT,
    FeatureFlag.PRODUCT_ON_DEMAND_INFO
  ])

  if (!sidebarData) return null
  return (
    <>
      <aside
        className={classNames(
          'col-span-12 mb-5',
          'sm:col-span-6',
          'lg:col-span-5 lg:pl-7'
        )}
        aria-live="assertive"
        data-testid="pdpSidebar"
      >
        {sidebarData.price && (
          <div className="my-1 sm:mt-0">
            <Price
              showRRP={showRRP}
              price={sidebarData.price}
              pricePerUnit={sidebarData.pricePerUnit}
              rrp={sidebarData.rrp}
              rrpSize="base"
              rrpColor={isGermany ? 'secondary-dark' : 'tertiary'}
              priceType={isGermany ? 'AVP' : undefined} // TODO Retrieve from ELS
              isPricePerUnitOnTheLeft
              data-testid="productPrice"
            />
            {isGermany && (
              <Trans
                i18nKey={t('pdp.price.including-vat-note')}
                components={{
                  p: <p className="text-xs text-ui-grey" />,
                  u: <u></u>,
                  b: <b></b>
                }}
              />
            )}
          </div>
        )}
        <div className="mb-2 flex justify-between items-center">
          <ProductSavings rrp={sidebarData.rrp} price={sidebarData.price} />
          <div
            className={classNames('flex flex-col', {
              'items-end': sidebarData.rrp?.value !== sidebarData.price?.value,
              'items-start': sidebarData.rrp?.value === sidebarData.price?.value
            })}
          >
            <ProductAvailability
              quantityLeft={sidebarData.quantityLeft}
              availability={sidebarData.availability}
              availabilitySize="base"
            />
          </div>
        </div>
        {/* Sticky add to basket controls */}
        {isBrowser && addToBasket && removeFromBasket && (
          <AddToBasketControls
            newQuantitySelectorValue={newQuantitySelectorValue}
            setNewQuantitySelectorValue={setNewQuantitySelectorValue}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            productMaxQuantity={productMaxQuantity}
            unitVolumeWithContentSizeFactor={unitVolumeWithContentSizeFactor}
            isSticky
            isVisible={
              !isMediumSize || (isMediumSize && !areAddToBasketControlsInView)
            }
          />
        )}
        <div className="space-y-1.75 flex flex-col justify-start">
          {/* Add to basket controls */}
          {isBrowser && addToBasket && removeFromBasket ? (
            <AddToBasketControls
              newQuantitySelectorValue={newQuantitySelectorValue}
              setNewQuantitySelectorValue={setNewQuantitySelectorValue}
              addToBasket={addToBasket}
              removeFromBasket={removeFromBasket}
              productMaxQuantity={productMaxQuantity}
              ref={addToBasketControlsRef}
            />
          ) : (
            <AddToBasketControlsPlaceholder />
          )}
          {sidebarData.availability === 'AVAILABLE' &&
            isDeliveryTimesInfoEnabled && (
              <DeliveryTimes onDemand={sidebarData.isOnDemand} />
            )}
          {sidebarData.availability === 'AVAILABLE' && (
            <RewardInfo
              product={{
                brand: sidebarData.brand,
                categories: sidebarData.categories,
                sku: sidebarData.sku,
                price: sidebarData.price
              }}
            />
          )}

          {validateMaxQuantity(
            currentQuantityValue,
            sidebarData.maxQuantity
          ) && (
            <div
              role="alert"
              data-testid="alert"
              className="text-feedback-error mt-2 text-sm"
            >
              {t('maximum-product-quantity', {
                quantity: productMaxQuantity
              })}
            </div>
          )}
          {backInStockEnabled &&
            sidebarData.availability === 'NOT_AVAILABLE' && (
              <BackInStockSubscription />
            )}

          {error && itemNoPromoInBasket?.quantity === 0 && (
            <div role="alert" className="text-error mt-1">
              {t(error)}
            </div>
          )}
          {isSimilarProductsEnabled &&
            sidebarData.availability === 'NOT_AVAILABLE' && (
              <ExponeaRecommendationBlock
                recommendationType={RECOMMENDATIONS_TYPES.SIMILAR_PRODUCTS}
                productId={sidebarData.sku}
                loading="eager"
                className="pt-5 pb-4"
              />
            )}
          {/* Promo information */}
          {!isTooltipEnabled &&
            isPDPPromoInformationBoxFeatureEnabled &&
            hasPromotionInfo && (
              <PromoInformationBox
                promoInformation={parseHtml(promotion?.[0]?.promoInformation)}
                hasGift={hasGift}
              />
            )}
          <ProductUSP />
        </div>
      </aside>

      {/* On Mobile show Our Recommendations under the USPs block if FF SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT is enabled else show FBT */}
      {isShowRecommendationsBeforeFBTEnabled && !isSmallSize ? (
        <ExponeaRecommendationBlock
          recommendationType={RECOMMENDATIONS_TYPES.PDP1}
          loading="lazy"
          productId={sidebarData.sku}
          className="col-span-12 mb-8"
        />
      ) : (
        isFrequentlyBoughtTogetherFeatureEnabled && (
          <PDPFrequentlyBoughtTogether />
        )
      )}
    </>
  )
}
