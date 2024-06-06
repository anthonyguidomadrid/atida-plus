import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import classNames from 'classnames'
import useInView from 'react-cool-inview'
import { useTranslation } from 'react-i18next'

import { selectStaticRecommendationProducts } from '~domains/static-recommendation/selectors'
import {
  addToBasketTrigger,
  changeItemQuantityTrigger,
  handleProductQuantityAction,
  removeFromBasketTrigger,
  selectBasketModalProduct,
  selectItems,
  selectItemWasError,
  selectItemWasSuccess,
  selectNumberOfItems,
  selectQuantityAction,
  selectQuantityError,
  triggerBasketModal
} from '~domains/basket'
import { ProductSlider } from '../ProductSlider'
import { ProductGrid } from '../ProductGrid'
import { BasketNotification } from '../BasketNotification'
import { Product } from '~domains/product'
import { RootState } from '~domains/redux'
import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { selectContent, selectPageSlug } from '~domains/page'
import { timeout } from '~helpers/timeout'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { RemoveBasketItem } from '~domains/basket/types'
import { triggerReportProductListViewed } from '~domains/analytics'
import { useHandleRemoveFromFavourites } from '~helpers/useHandleRemoveFromFavourites'
import { useHandleAddToFavourites } from '~helpers/useHandleAddToFavourites'
import { Countdown } from '~components/atoms/Countdown'
import { getFormattedFinishingDate, TimeLeft } from '~helpers'

export type StaticRecommendationBlockProps = {
  id: string
  title?: string
  shouldDisplayTitle?: boolean
  viewType?: 'Slider' | 'Grid'
  shouldDisplayCountdown?: boolean
  countdownExpiration?: string
  className?: string
}

/**
 * Renders a Static Recommendation Block component, for showing a recommendation with manually picked products
 * @param id This indicates the ID of the Static Recommendation Block. This prop is mandatory
 * @param title [Optional] This sets recommendation block title (if 'shouldDisplayTitle' is true this title will be rendered in the Frontend)
 * @param shouldDisplayTitle [Optional] This indicates if the title should be rendered or not. True is set by default
 * @param viewType [Optional] This indicates how the component will be rendered. The allowed values are 'Slider' or 'Grid'. 'Slider' is set by default
 * @param shouldDisplayCountdown [Optional] This indicates if the countdown (if it's the case) should be rendered or not. True is set by default. Note: if a 'countdownExpiration' prop is not passed, there won't be any countdown rendered
 * @param countdownExpiration [Optional] This sets the expiration the countdown. If nothing is passed, there won't be any countdown rendered
 * @param className [Optional] This sets additional class names to the recommendation block
 */
export const StaticRecommendationBlock = ({
  id,
  title,
  shouldDisplayTitle = true,
  viewType = 'Slider',
  shouldDisplayCountdown = true,
  countdownExpiration,
  className
}: StaticRecommendationBlockProps) => {
  const isBasketNotificationEnabled = useFeatureFlag(
    FeatureFlag.BASKET_NOTIFICATION
  )

  const router = useRouter()
  const dispatch = useDispatch()
  const content = useSelector(selectContent)
  const basketNotificationRef = useRef<HTMLDivElement>(null)
  const basketItemsCount = useSelector(selectNumberOfItems)
  const pageSlug = useSelector(selectPageSlug)
  const basketItems = useSelector(selectItems)
  const { t } = useTranslation()

  const formattedCountdownExpiration = useMemo(
    () =>
      countdownExpiration
        ? getFormattedFinishingDate(countdownExpiration)
        : undefined,
    [countdownExpiration]
  )
  const countdownIsExpired = useMemo(
    () =>
      formattedCountdownExpiration
        ? Object.keys(formattedCountdownExpiration).some(
            key => formattedCountdownExpiration[key as keyof TimeLeft] < 0
          )
        : true,
    [formattedCountdownExpiration]
  )

  const fadeOut = async () => {
    await timeout(200)
    setIsNotificationOpen(false)
  }
  const { observe } = useInView({
    threshold: 1,
    onEnter: ({ unobserve }) => {
      unobserve()
      products &&
        products.length > 1 &&
        dispatch(
          triggerReportProductListViewed({
            products,
            type: content?.type,
            list_id: 'static_recommendation_list',
            recommendation_id: id
          })
        )
    }
  })

  const productSelector =
    (useSelector<
      RootState,
      ReturnType<typeof selectStaticRecommendationProducts>
    >(state =>
      selectStaticRecommendationProducts(state, { id: id })
    ) as Partial<Product>[]) ?? []

  const products = useMemo(
    () =>
      productSelector.map(product => {
        const productInBasket = basketItems.filter(
          item => product.sku === item.sku && !item.isPromo
        )
        return {
          ...product,
          basketQuantity:
            productInBasket.length > 0 ? productInBasket[0]?.quantity : 0
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [basketItems]
  )

  const basketModalProduct = useSelector(selectBasketModalProduct)
  const basketModalBasketItem = useMemo(
    () => basketItems.find(item => item.sku === basketModalProduct?.sku),
    [basketItems, basketModalProduct?.sku]
  )

  const productInBasket: Product | null = useMemo(
    () =>
      ({
        ...basketModalProduct,
        basketQuantity: basketModalBasketItem?.quantity ?? 0
      } as Product),
    [basketModalBasketItem?.quantity, basketModalProduct]
  )

  const [currentQuantityValue, setCurrentQuantityValue] = useState(
    productInBasket.basketQuantity ?? 0
  )
  const inputRef = useRef<Record<string, HTMLInputElement>>({})
  const [isTriggered, setIsTriggered] = useState(false)
  const isRemoved = useSelector(selectQuantityAction)
  const wasItemError = useSelector<
    RootState,
    ReturnType<typeof selectItemWasError>
  >(state =>
    selectItemWasError(state, { sku: basketModalProduct?.sku ?? undefined })
  )
  const basketQuantityError = useSelector(selectQuantityError)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const quantityChangedFrom = PATH_DESCRIPTION.STATIC_RECOMMENDATION

  const wasItemSuccess = useSelector<
    RootState,
    ReturnType<typeof selectItemWasSuccess>
  >(state =>
    selectItemWasSuccess(state, { sku: productInBasket.sku ?? undefined })
  )

  useEffect(() => {
    if (!currentQuantityValue && !isRemoved) {
      setCurrentQuantityValue(productInBasket?.basketQuantity ?? 0)
    }
  }, [currentQuantityValue, productInBasket?.basketQuantity, isRemoved])

  const handleAddToFavourites = useHandleAddToFavourites(router)
  const handleRemoveFromFavourites = useHandleRemoveFromFavourites(router)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeItemQuantityRequest = useCallback(
    debounce(
      (value: number, productSku, productId, changed_from: string) => {
        dispatch(
          changeItemQuantityTrigger({
            id: productId,
            sku: productSku,
            quantity: +value ?? 0,
            changed_from
          })
        )
      },
      300,
      { leading: false, trailing: true }
    ),
    []
  )

  useEffect(() => {
    const isProductInBasket = basketItems.some(
      product => productInBasket?.sku === product.sku
    )
    if (
      productInBasket?.sku &&
      isProductInBasket &&
      currentQuantityValue &&
      isTriggered
    ) {
      setIsTriggered(false)
      const productInBasket = basketItems.find(
        item => item.sku === basketModalProduct?.sku && !item.isPromo
      )

      const maxProductQuantity =
        productInBasket?.product?.maxQuantity &&
        productInBasket?.product?.maxQuantity < MAXIMUM_PRODUCT_QUANTITY
          ? productInBasket?.product.maxQuantity
          : MAXIMUM_PRODUCT_QUANTITY
      changeItemQuantityRequest(
        currentQuantityValue > maxProductQuantity
          ? maxProductQuantity
          : currentQuantityValue,
        basketModalProduct?.sku ? basketModalProduct.sku : productInBasket?.sku,
        productInBasket?.id,
        quantityChangedFrom
      )
      if (
        inputRef?.current &&
        basketModalProduct &&
        inputRef.current[basketModalProduct?.sku] &&
        inputRef.current[basketModalProduct?.sku].value
      ) {
        inputRef.current[basketModalProduct?.sku].value =
          currentQuantityValue > maxProductQuantity
            ? maxProductQuantity.toString()
            : currentQuantityValue?.toString() ?? ''
      }
    }
  }, [
    currentQuantityValue,
    productInBasket?.sku,
    changeItemQuantityRequest,
    basketItems,
    isTriggered,
    basketModalProduct?.sku,
    basketModalProduct?.basketQuantity,
    productInBasket.basketQuantity,
    basketModalProduct,
    quantityChangedFrom
  ])

  useEffect(() => {
    if (
      basketQuantityError &&
      basketModalProduct &&
      basketModalProduct?.sku &&
      +basketQuantityError?.sku === +basketModalProduct?.sku
    ) {
      setCurrentQuantityValue(basketQuantityError.available_qty)
      setIsTriggered(true)
    }
  }, [basketQuantityError, basketModalProduct?.sku, basketModalProduct])

  const addToBasket = useCallback(
    async (product: Product, added_from: string) => {
      setCurrentQuantityValue(0)
      if (product) {
        dispatch(
          addToBasketTrigger({
            sku: product?.sku,
            quantity: 1,
            added_from
          })
        )
        dispatch(triggerBasketModal(product))
        dispatch(handleProductQuantityAction(false))
        if (!isNotificationOpen) setIsNotificationOpen(value => !value)
      }
    },
    [dispatch, isNotificationOpen]
  )

  const removeFromBasket = useCallback(
    (product?: RemoveBasketItem, removed_from?: string) => {
      const productInBasket = basketItems.find(
        item => item.sku === product?.sku
      )
      dispatch(
        removeFromBasketTrigger({
          sku: productInBasket?.sku,
          id: productInBasket?.id,
          removed_from
        })
      )
      dispatch(handleProductQuantityAction(true))
      setCurrentQuantityValue(0)
      if (!isNotificationOpen) setIsNotificationOpen(value => !value)
    },
    [dispatch, basketItems, isNotificationOpen, setIsNotificationOpen]
  )

  const staticRecommendedProducts = useMemo(() => {
    return viewType === 'Slider' ? (
      <ProductSlider
        addedFrom={PATH_DESCRIPTION.STATIC_RECOMMENDATION}
        listId={pageSlug === '/' ? 'home' : `landing/${pageSlug}`}
        productCardList={products}
        addToBasket={product =>
          addToBasket(product, PATH_DESCRIPTION.STATIC_RECOMMENDATION)
        }
        addToFavourites={sku => handleAddToFavourites(sku)}
        removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
        testId="staticRecommendationProductsSlider"
      />
    ) : (
      <ProductGrid
        addedFrom={PATH_DESCRIPTION.STATIC_RECOMMENDATION}
        listId={pageSlug === '/' ? 'home' : `landing/${pageSlug}`}
        isHome={true}
        productCardList={products}
        removeFromBasket={product => removeFromBasket(product)}
        addToBasket={product =>
          addToBasket(product, PATH_DESCRIPTION.STATIC_RECOMMENDATION)
        }
        addToFavourites={sku => handleAddToFavourites(sku)}
        removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
        testId="staticRecommendationProductsGrid"
      />
    )
  }, [
    addToBasket,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    pageSlug,
    products,
    removeFromBasket,
    viewType
  ])

  const shouldRenderTitle = useMemo(
    () => shouldDisplayTitle && products && products.length >= 1,
    [products, shouldDisplayTitle]
  )

  if (!products || products.length === 0) return null
  return (
    <section
      ref={observe}
      className={classNames(className, 'w-full')}
      data-testid="staticRecommendationBlock"
    >
      {(shouldRenderTitle ||
        (shouldDisplayCountdown &&
          countdownExpiration &&
          !countdownIsExpired)) && (
        <div
          className={classNames('flex items-top mb-3 space-x-3', {
            'justify-between': shouldRenderTitle,
            'justify-end': !shouldRenderTitle
          })}
        >
          {shouldRenderTitle && (
            <span
              data-testid="staticRecommendationTitle"
              className="font-semibold text-lg lg:text-2xl"
            >
              {title}
            </span>
          )}
          {shouldDisplayCountdown &&
            countdownExpiration &&
            !countdownIsExpired && (
              <div className={classNames('h-min flex items-center')}>
                <p className="pr-2 hidden sm:block">
                  {t(
                    'static-recommendation-block.countdown.exclusive-deals-end-soon'
                  )}
                </p>
                <div className="w-17">
                  <Countdown
                    finishingDate={countdownExpiration}
                    isMinified
                    showDaysWhenZero={false}
                  />
                </div>
              </div>
            )}
        </div>
      )}

      {products && products.length >= 1 && staticRecommendedProducts}

      {isBasketNotificationEnabled &&
        isNotificationOpen &&
        (wasItemError || wasItemSuccess) && (
          <BasketNotification
            product={basketModalProduct ?? productInBasket}
            isRemoved={isRemoved}
            wasItemError={wasItemError}
            wasItemSuccess={wasItemSuccess}
            isModalOpen={isNotificationOpen}
            onTransitionEnd={() => {
              basketNotificationRef?.current?.classList.remove(
                'basketNotificationFadeIn'
              )
              basketNotificationRef?.current?.classList.add(
                'basketNotificationFadeOut'
              )
              fadeOut()
            }}
            basketNotificationRef={basketNotificationRef}
            basketItems={basketItemsCount}
            hasPromotionalItem={basketModalBasketItem?.hasPromotionalItem}
            isPromotionalItemOutOfStock={
              basketModalBasketItem?.hasPromotionalItemOutofStock
            }
          />
        )}
    </section>
  )
}
