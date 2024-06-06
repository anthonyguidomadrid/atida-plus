import NextLink from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import useInView from 'react-cool-inview'
import debounce from 'lodash/debounce'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'

import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinksInPdp } from '~domains/translated-routes'

import { Button } from '~components/atoms/Button'
import { ProductLabels } from '~components/molecules/ProductLabels'
import { RootState } from '~domains/redux'
import {
  addToBasketTrigger,
  changeItemQuantityTrigger,
  handleProductQuantityAction,
  removeFromBasketTrigger,
  selectBasketModalProduct,
  selectItemError,
  selectItems,
  selectItemWasError,
  addToBasketFulfill,
  removeFromBasketFulfill,
  selectItemWasSuccess,
  selectNumberOfItems,
  selectQuantityAction,
  selectQuantityError,
  triggerBasketModal
} from '~domains/basket'
import {
  selectProductData,
  selectShowLabels,
  useFormatAmount
} from '~domains/product'
import { selectData as selectBrands } from '~domains/brand'
import {
  triggerReportPageViewed,
  triggerReportProductViewed
} from '~domains/analytics'
import { triggerRefreshYotpoWidgets } from '~domains/yotpo'
import { Price } from '~components/atoms/Price'
import { ReactComponent as Like } from '~assets/svg/navigation-24px/Like.svg'
import { ReactComponent as LikeFilled } from '~assets/svg/navigation-24px/LikeFilled.svg'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { ReactComponent as Information } from '~assets/svg/navigation-24px/InformationSimple.svg'
import { parseHtml, useDetectOutsideClick } from '~helpers'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import {
  FavouriteButtonPlaceholder,
  FavouriteButtonProps
} from '~components/molecules/FavouriteButton'
import { Product as ProductType } from '~domains/product/types'
import { BasketModal } from '~components/organisms/BasketModal'

import { Gallery } from '~components/organisms/Gallery'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  useFeatureFlag,
  useFeatureFlags
} from '~components/helpers/FeatureFlags'
import { getPromotionTrigger, selectData } from '~domains/promotion'
import { PromoInformationBox } from '~components/atoms/PromoInformationBox'
import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { ProductSEO } from './ProductSEO'
import { RemoveBasketItem } from '~domains/basket/types'
import { validateMaxQuantity } from '~helpers/validateMaxQuantity'
import { Link } from '~components/atoms/Link'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { ProductDetails } from './ProductDetails'
import { Reviews } from '~components/atoms/Reviews'
import { ExponeaRecommendationBlock } from '~components/organisms/ExponeaRecommendationBlock'
import { BasketNotification } from '~components/organisms/BasketNotification'
import { timeout } from '~helpers/timeout'
import { ProductReviews } from './ProductReviews'
import { RECOMMENDATIONS_TYPES } from '~config/constants/recommendations'
import { BackInStockSubscription } from '~components/molecules/BackInStockSubscription'
import { ProductSavings } from '~components/atoms/ProductSavings'
import { Fonts } from '~components/meta/MetaData/PreloadFonts'
import {
  AddToBasketControls,
  AddToBasketControlsPlaceholder
} from '~components/organisms/AddToBasketControls'
import { Tooltip } from '~components/atoms/Tooltip/Tooltip'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useIsBrowser } from '~helpers/useIsBrowser'
import { ProductAvailability } from './ProductAvailability'
import { ProductUSP } from '~components/atoms/USP/ProductUSP'
import { useHandleAddToFavourites } from '~helpers/useHandleAddToFavourites'
import { useHandleRemoveFromFavourites } from '~helpers/useHandleRemoveFromFavourites'
import { RewardInfo } from '~components/atoms/Reward/RewardInfo'
import { ExpertSignature } from '~components/molecules/ExpertSignature'
import { DeliveryTimes } from '~components/atoms/DeliveryTimes'
import { NewPDP } from './NewPDP'
import { getUserToken } from '~helpers/getUserToken'

const YotpoRatings = dynamic(async () => {
  const component = await require('~components/meta/MetaData/YotpoRatings')
  return component.YotpoRatings
})

const FavouriteButtonComponent = dynamic<FavouriteButtonProps>(
  () =>
    import('~components/molecules/FavouriteButton').then(
      c => c.FavouriteButton
    ),
  {
    loading: () => <FavouriteButtonPlaceholder />
  }
)

const PDP = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { locale, back } = router
  const formatAmount = useFormatAmount()
  const dispatch = useDispatch()
  const basketItems = useSelector(selectItems)
  const product = useSelector(selectProductData)

  const productSku = product?.sku
  const productData =
    product &&
    basketItems.find(item => item.sku === product.sku && !item.isPromo)
  const promotion = useSelector(selectData)
  const error = useSelector<RootState, ReturnType<typeof selectItemError>>(
    state => selectItemError(state, { sku: product?.sku })
  )
  const isRemoved = useSelector(selectQuantityAction)
  const wasItemError = useSelector<
    RootState,
    ReturnType<typeof selectItemWasError>
  >(state => selectItemWasError(state, { sku: productSku ?? undefined }))

  const wasItemSuccess = useSelector<
    RootState,
    ReturnType<typeof selectItemWasSuccess>
  >(state => selectItemWasSuccess(state, { sku: productSku ?? undefined }))

  const itemInBasket = basketItems.filter(item => product?.sku === item.sku)
  const positionInBasket =
    basketItems.findIndex(item => product?.sku === item.sku) + 1
  const basketQuantity =
    itemInBasket.length > 0 ? itemInBasket[0]?.quantity ?? 0 : 0

  const doShowLabels = useSelector(selectShowLabels)

  const showRRP = useMemo(
    () => product && product.rrp && product.price?.value < product.rrp?.value,
    [product]
  )

  const isBrowser = useIsBrowser()
  const isSmallSize = useBreakpoint(breakpoints.sm)
  const isMediumSize = useBreakpoint(breakpoints.md)

  const [
    isPDPGalleryFeatureEnabled,
    isPDPPromoInformationBoxFeatureEnabled,
    isFrequentlyBoughtTogetherFeatureEnabled,
    isSimilarProductsEnabled,
    backInStockEnabled,
    isBasketNotificationEnabled,
    isNewQuantitySelector,
    isStickyAddToBasketControls,
    isTooltipEnabled,
    isFetchSingleBrandEnabled,
    isHotjarEventTriggersEnabled,
    isEnabledExpertSignature,
    isShowRecommendationsBeforeFBTEnabled,
    isDeliveryTimesInfoEnabled,
    //TODO: Remove once proven to all environments
    isSEOAddNoindexToOnDemandProductsEnabled,
    isReviewPolicyOnPDPsReviewsSection
  ] = useFeatureFlags([
    FeatureFlag.PRODUCT_PDP_PRODUCT_MEDIA_GALLERY,
    FeatureFlag.PRODUCT_PDP_PROMO_INFORMATION_BOX,
    FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER,
    FeatureFlag.PDP_SIMILAR_PRODUCTS,
    FeatureFlag.PRODUCT_BACK_IN_STOCK_ENABLED,
    FeatureFlag.BASKET_NOTIFICATION,
    FeatureFlag.PRODUCT_PDP_ADD_TO_BASKET_CONTROLS_NEW_QUANTITY_SELECTOR,
    FeatureFlag.PRODUCT_PDP_STICKY_ADD_TO_BASKET_CONTROLS,
    FeatureFlag.PDP_TOOLTIP_PROMOTION_INFO,
    FeatureFlag.PRODUCT_PDP_FETCH_SINGLE_BRAND,
    FeatureFlag.PDP_ENABLE_HOTJAR_EVENT_TRIGGERS,
    FeatureFlag.PDP_ENABLE_EXPERT_SIGNATURE,
    FeatureFlag.SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT,
    FeatureFlag.PRODUCT_ON_DEMAND_INFO,
    FeatureFlag.SEO_ADD_NOINDEX_TO_ON_DEMAND_PRODUCTS,
    FeatureFlag.PDP_REVIEW_POLICY
  ])

  const brands = useSelector(selectBrands)
  const brandUrl = useMemo(() => {
    if (isFetchSingleBrandEnabled) return product?.brandUrl
    return (
      brands?.find(
        brand => brand.id === product?.brand?.code && brand.url !== ''
      )?.url ?? ''
    )
  }, [
    brands,
    isFetchSingleBrandEnabled,
    product?.brand?.code,
    product?.brandUrl
  ])

  const modalRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useDetectOutsideClick(modalRef, false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const inputRef = useRef<Record<string, HTMLInputElement>>({})
  const [currentQuantityValue, setCurrentQuantityValue] = useState(0)
  const [currentItemSku, setCurrentItemSku] = useState('')
  const [isTriggered, setIsTriggered] = useState(false)
  const basketModalProduct = useSelector(selectBasketModalProduct)
  const basketQuantityError = useSelector(selectQuantityError)
  const [availableQuantity, setAvailableQuantity] = useState('')
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const productMaxQuantity = product?.maxQuantity ?? MAXIMUM_PRODUCT_QUANTITY
  const [quantityChangedFrom, setQuantityChangedFrom] = useState('')
  const [isAddToBasketTriggered, setIsAddToBasketTriggered] = useState(false)
  const basketNotificationRef = useRef<HTMLDivElement>(null)
  const basketItemsCount = useSelector(selectNumberOfItems)

  const userToken = getUserToken()

  const rtbHouseScript = useMemo(
    () =>
      `(rtbhEvents = window.rtbhEvents || []).push({ eventType: 'offer',offerId: '${
        product?.sku
      }'},{eventType: 'uid',id: '${userToken ?? 'unknown'}'});`,
    [product?.sku, userToken]
  )

  const fadeOut = async () => {
    await timeout(200)
    setIsNotificationOpen(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeItemQuantityRequest = useCallback(
    debounce(
      (value: number, productSku, productId, changed_from: string) => {
        dispatch(
          changeItemQuantityTrigger({
            id: productId,
            sku: productSku,
            quantity: +value,
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
    const script = document.createElement('script')
    script.innerText = rtbHouseScript

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [rtbHouseScript])

  useEffect(() => {
    setIsModalOpen(false)
  }, [setIsModalOpen])

  useEffect(() => {
    if (
      currentItemSku !== productData?.sku &&
      productData?.quantity &&
      productData?.sku &&
      !isModalOpen
    ) {
      forceUpdate()
      setCurrentQuantityValue(productData?.quantity)
      if (inputRef.current[productData.sku]) {
        inputRef.current[
          productData.sku
        ].value = productData.quantity.toString()
      }
    }
  }, [
    basketModalProduct?.sku,
    currentItemSku,
    isModalOpen,
    productData?.quantity,
    productData?.sku
  ])

  useEffect(() => {
    if (!currentQuantityValue && !isRemoved) {
      const product = basketItems.find(item => item.sku === currentItemSku)
      setCurrentQuantityValue(product?.quantity ?? 0)
    }
  }, [currentQuantityValue, isRemoved, basketItems, currentItemSku])

  useEffect(() => {
    const isProductInBasket = basketItems.some(
      product => currentItemSku === product.sku
    )
    if (
      currentItemSku &&
      isProductInBasket &&
      currentQuantityValue &&
      isTriggered
    ) {
      setIsTriggered(false)
      const productInBasket = basketItems.find(
        item => item.sku === currentItemSku && !item.isPromo
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
        currentItemSku,
        productInBasket?.id,
        quantityChangedFrom
      )
      if (
        inputRef?.current &&
        inputRef.current[currentItemSku] &&
        inputRef.current[currentItemSku].value
      ) {
        inputRef.current[currentItemSku].value =
          currentQuantityValue > maxProductQuantity
            ? maxProductQuantity.toString()
            : currentQuantityValue?.toString() ?? ''
      }
    }
  }, [
    currentQuantityValue,
    productSku,
    changeItemQuantityRequest,
    basketItems,
    isTriggered,
    quantityChangedFrom,
    basketModalProduct?.sku,
    currentItemSku,
    basketModalProduct?.basketQuantity
  ])

  useEffect(() => {
    if (
      basketQuantityError &&
      basketModalProduct &&
      +basketQuantityError?.sku === +basketModalProduct?.sku
    ) {
      setAvailableQuantity(basketQuantityError.available_qty.toString())
      setCurrentQuantityValue(basketQuantityError.available_qty)
      setIsTriggered(true)
    }
  }, [basketQuantityError, basketModalProduct?.sku, basketModalProduct])

  useEffect(() => {
    setNewQuantitySelectorValue(1)
  }, [product])

  const [isPageLoaded, setIsPageLoaded] = useState(false)
  useEffect(() => setIsPageLoaded(true), [])

  const handleAddToFavourites = useHandleAddToFavourites(router)
  const handleRemoveFromFavourites = useHandleRemoveFromFavourites(router)

  const favouriteButton = product && (
    <FavouriteButtonComponent
      data-testid="saveToFavouritesButton"
      product={product}
      iconDefault={<Like className={classNames('icon-24')} />}
      iconActive={<LikeFilled className={classNames('icon-24')} />}
      className="w-6 h-6 border-none absolute right-0"
      addedFrom={PATH_DESCRIPTION.PDP}
      addToFavourites={handleAddToFavourites}
      removeFromFavourites={handleRemoveFromFavourites}
    />
  )

  useEffect(() => {
    product &&
      dispatch(
        triggerReportPageViewed({
          page: 'Product Detail',
          pageType: 'pdp',
          productId: product?.id || product?.sku
        })
      )
  }, [dispatch, product])

  useEffect(() => {
    product &&
      !isAddToBasketTriggered &&
      dispatch(
        triggerReportProductViewed({
          product,
          basketQuantity,
          positionInBasket
        })
      )
  }, [
    dispatch,
    product,
    basketQuantity,
    positionInBasket,
    isAddToBasketTriggered
  ])

  useEffect(() => {
    dispatch(triggerRefreshYotpoWidgets())
  }, [dispatch, product?.sku])

  const addToBasket = useCallback(
    (product: ProductType, added_from: string, quantity = 1) => () => {
      setCurrentQuantityValue(0)
      if (product) {
        setCurrentItemSku(product.sku)
        setIsAddToBasketTriggered(true)
        if (product.basketQuantity && product.basketQuantity > 0)
          setCurrentQuantityValue(product.basketQuantity ?? 0)
        setCurrentQuantityValue(1)
        dispatch(
          addToBasketTrigger({
            sku: product?.sku,
            quantity,
            added_from
          })
        )
        dispatch(triggerBasketModal(product))
        dispatch(handleProductQuantityAction(false))
        dispatch({
          type: 'basket',
          [WAIT_FOR_ACTION]: addToBasketFulfill({
            sku: product?.sku,
            quantity: 1,
            added_from
          }).type
        })
        if (!isModalOpen) setIsModalOpen(value => !value)
        if (!isNotificationOpen) setIsNotificationOpen(value => !value)
      }
    },
    [dispatch, isModalOpen, isNotificationOpen, setIsModalOpen]
  )

  const removeFromBasket = useCallback(
    (product?: RemoveBasketItem, removed_from?: string) => () => {
      dispatch(
        removeFromBasketTrigger({
          sku: product?.sku,
          id: product?.id,
          removed_from
        })
      )

      dispatch(handleProductQuantityAction(true))
      setCurrentQuantityValue(0)
      dispatch({
        type: 'basket',
        [WAIT_FOR_ACTION]: removeFromBasketFulfill({
          sku: product?.sku,
          id: product?.id,
          removed_from
        }).type
      })
      if (!isNotificationOpen) setIsNotificationOpen(value => !value)
    },
    [dispatch, isNotificationOpen]
  )

  const increaseModalQuantity = useCallback(
    (product: ProductType) => () => {
      setIsTriggered(true)
      setCurrentItemSku(product.sku)
      setCurrentQuantityValue(v => v + 1)
      dispatch(handleProductQuantityAction(false))
      setQuantityChangedFrom(PATH_DESCRIPTION.CART_MODAL)
    },
    [dispatch]
  )

  const decreaseModalQuantity = useCallback(
    (product: ProductType) => () => {
      const maxProductQuantity =
        product?.maxQuantity && product?.maxQuantity < MAXIMUM_PRODUCT_QUANTITY
          ? product.maxQuantity
          : MAXIMUM_PRODUCT_QUANTITY
      if (currentQuantityValue > maxProductQuantity)
        setCurrentQuantityValue(maxProductQuantity)

      setCurrentItemSku(product.sku)
      setIsTriggered(true)
      setCurrentQuantityValue(v => v - 1)
      setQuantityChangedFrom(PATH_DESCRIPTION.CART_MODAL)
    },
    [currentQuantityValue]
  )

  const promoId = useMemo(() => {
    return product?.labels?.reduce(
      (found, current) =>
        current.type === 'promotion' ? current.label : found,
      ''
    )
  }, [product?.labels])

  useEffect(() => {
    if (promoId) {
      dispatch(getPromotionTrigger({ id: promoId }))
    }
  }, [dispatch, promoId])

  // TODO: Change this variable to actually check for whether the product has a gift.
  // We can probably do something similar as for the promotion: check if the gift label is present.
  const hasGift = false
  const hasPromotionInfo = useMemo(() => !!promotion?.[0]?.promoInformation, [
    promotion
  ])

  const unitVolume = useMemo(
    () =>
      product?.unitVolume
        ? formatAmount(
            product.unitVolume.amount,
            product.unitVolume.unit,
            product.unitVolume?.unitLabel
          )
        : null,
    [formatAmount, product]
  )
  const unitVolumeWithContentSizeFactor = useMemo(
    () => formatContentSizeFactor(unitVolume, product?.contentSizeFactor),
    [product?.contentSizeFactor, unitVolume]
  )

  const [yotpoShouldRender, setYotpoShouldRender] = useState<boolean>(false)
  const { observe: reviewsRef } = useInView({
    threshold: 1,
    onEnter: ({ unobserve }) => {
      unobserve()
      !yotpoShouldRender && setYotpoShouldRender(true)
    }
  })

  const {
    observe: addToBasketControlsRef,
    inView: areAddToBasketControlsInView
  } = useInView()

  const [
    newQuantitySelectorValue,
    setNewQuantitySelectorValue
  ] = useState<number>(1)

  const { observe: productDetailsRef } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve()
      if (isHotjarEventTriggersEnabled) {
        // @ts-ignore missing hotjar types
        // eslint-disable-next-line prettier/prettier, prefer-rest-params
        const hj = window.hj || function() { ;(hj.q = hj.q || []).push(arguments) }
        hj('event', 'product_description_pdp')
      }
    }
  })

  if (!product) return null
  return (
    <>
      {yotpoShouldRender && <YotpoRatings />}
      <MetaData
        title={product.metaTitle}
        description={product.metaDescription}
        keywords={product.metaKeywords}
        image={product.largeImage}
        preloadFonts={[Fonts.bodyBold]}
        noIndex={
          isSEOAddNoindexToOnDemandProductsEnabled ? product.isOnDemand : null
        }
      />
      <ProductSEO />
      <AlternateLinks
        links={getAlternateLinksInPdp(locale, product?.alternativeUrls)}
      />
      <div>
        <div
          className={classNames(
            'w-full container-fixed mx-auto mt-2 mb-1 sm:mt-3 sm:mb-2 px-2',
            'sm:px-5',
            'md:px-8'
          )}
        >
          <Button
            variant="back"
            icon={<ChevronLeft role="presentation" className="icon-16" />}
            onClick={back}
            data-testid="popBackButton"
          >
            {t('shared.back')}
          </Button>
        </div>
      </div>
      <main
        className={classNames(
          'w-full container-fixed mx-auto grid grid-cols-12 px-2 sm:px-5 md:px-8 sm:gap-x-4 pb-5'
        )}
        data-testid="pdpLayout"
      >
        {/* Header */}
        <header className="col-span-12">
          <h1 className="text-xl mb-1.5 sm:text-3xl lg:text-5xl lg:mb-1">
            {product.name}
          </h1>
          <small className="block text-sm text-ui-grey h-2.5">
            {[
              brandUrl ? (
                <NextLink href={brandUrl} passHref key={brandUrl}>
                  <Link className="text-ui-grey">{product?.brand?.label}</Link>
                </NextLink>
              ) : (
                <p className="inline-flex">{product?.brand?.label}</p>
              ),
              product.pzn ? t('product.pzn', { pzn: product.pzn }) : null,
              product.format?.label,
              unitVolumeWithContentSizeFactor
            ]
              .filter(value => !!value)
              .reduce<ReactNode[]>(
                (prev, curr) => [prev, !!prev.length ? ' - ' : null, curr],
                []
              )}
          </small>
          <a href="#reviews" className="no-underline h-2 mt-1.5 w-full">
            <Reviews
              numberOfReviews={product.rating?.numberOfReviews}
              rating={product.rating?.averageRating}
              showTranslation
            />
          </a>
        </header>
        {/* Image */}
        <div
          className={classNames(
            'relative flex justify-center col-span-12 mb-3',
            'sm:col-span-6',
            'lg:col-span-7 lg:mb-6',
            {
              'h-w-screen sm:h-42 md:h-42 lg:h-42': !isPDPGalleryFeatureEnabled
            }
          )}
        >
          {isPDPGalleryFeatureEnabled && (
            <Gallery
              isLoading={!isPageLoaded}
              isLcp={true}
              images={product.images}
              videos={product.videos}
              productName={product.name}
              className="w-full h-full overflow-hidden"
            />
          )}
          {!isPDPGalleryFeatureEnabled && (
            <img
              src={product.largeImage}
              alt={product.name}
              className="w-auto h-full"
            />
          )}
          {/* Tooltip + Labels */}
          {doShowLabels && (
            <ProductLabels
              data-testid="productLabels"
              labels={product.labels ?? []}
              className="absolute top-2 left-0 z-9 max-w-4/5"
              listItemClassName="w-fit max-w-full mb-1"
              tooltip={
                hasPromotionInfo ? (
                  <Tooltip
                    content={parseHtml(promotion?.[0]?.promoInformation)}
                    delay={200}
                  >
                    <Information className="icon-16 text-ui-grey" />
                  </Tooltip>
                ) : undefined
              }
            />
          )}
          <div className="absolute top-0 right-0 z-10">{favouriteButton}</div>
        </div>
        {/* Price + USP */}
        <aside
          className={classNames(
            'col-span-12 mb-5',
            'sm:col-span-6',
            'lg:col-span-5 lg:pl-7'
          )}
          aria-live="assertive"
        >
          {product.price && (
            <div className="my-1 sm:mt-0">
              <Price
                showRRP={showRRP}
                price={product.price}
                pricePerUnit={product?.pricePerUnit}
                rrp={product?.rrp}
                rrpColor="tertiary"
                isPricePerUnitOnTheLeft
                data-testid="productPrice"
              />
            </div>
          )}
          <div className="mb-2 flex justify-between">
            <ProductSavings rrp={product.rrp} price={product.price} />
            <div
              className={classNames(
                'flex flex-col',
                {
                  'items-end': product.rrp?.value !== product.price?.value
                },
                { 'items-start': product.rrp?.value === product.price?.value }
              )}
            >
              <ProductAvailability
                quantityLeft={product.quantityLeft}
                availability={product.availability}
              />
            </div>
          </div>
          {/* Sticky add to basket
          {/* Sticky add to basket controls */}
          {(!isSmallSize || (isStickyAddToBasketControls && isSmallSize)) &&
            isBrowser && (
              <AddToBasketControls
                newQuantitySelectorValue={newQuantitySelectorValue}
                setNewQuantitySelectorValue={setNewQuantitySelectorValue}
                addToBasket={addToBasket}
                removeFromBasket={removeFromBasket}
                productMaxQuantity={productMaxQuantity}
                unitVolumeWithContentSizeFactor={
                  unitVolumeWithContentSizeFactor
                }
                isSticky
                isVisible={
                  !isMediumSize ||
                  (isMediumSize && !areAddToBasketControlsInView)
                }
              />
            )}
          <div className="space-y-1.75 flex flex-col justify-start">
            {/* Add to basket controls */}
            {isBrowser ? (
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
            {product.availability === 'AVAILABLE' &&
              isDeliveryTimesInfoEnabled && (
                <DeliveryTimes onDemand={product?.isOnDemand} />
              )}
            {product.availability === 'AVAILABLE' && (
              <RewardInfo product={product} />
            )}

            {validateMaxQuantity(currentQuantityValue, product.maxQuantity) && (
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
            {backInStockEnabled && product.availability === 'NOT_AVAILABLE' && (
              <BackInStockSubscription />
            )}

            {error && productData?.quantity === 0 && (
              <div role="alert" className="text-error mt-1">
                {t(error)}
              </div>
            )}
            {isSimilarProductsEnabled &&
              product.availability === 'NOT_AVAILABLE' && (
                <ExponeaRecommendationBlock
                  recommendationType={RECOMMENDATIONS_TYPES.SIMILAR_PRODUCTS}
                  productId={product.sku}
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
            productId={product.sku}
            className="col-span-12 mb-8"
          />
        ) : (
          isFrequentlyBoughtTogetherFeatureEnabled && (
            <div className="col-span-12 py-4 sm:py-0 mb-7 border-ui-grey-lightest md:col-start-7 md:col-end-13 lg:col-start-8 lg:pl-7">
              <ExponeaRecommendationBlock
                recommendationType={
                  RECOMMENDATIONS_TYPES.FREQUENTLY_BOUGHT_TOGETHER
                }
                loading="lazy"
                productId={product.sku}
              />
            </div>
          )
        )}

        {/* Product details */}
        <div
          className={classNames(
            'col-span-12 mb-5 md:col-start-1 md:col-end-7 lg:col-end-8 md:row-start-3',
            {
              'sm:mt-2 md:mt-0': product.images && product.images?.length > 1
            }
          )}
          ref={isHotjarEventTriggersEnabled ? productDetailsRef : undefined}
        >
          <span className="font-body font-semibold font-medium flex text-lg lg:text-2xl mb-3">
            {t('product.product-details-title')}
          </span>
          <ProductDetails
            product={product}
            brandDetailsPageUrl={brandUrl ?? ''}
          />

          {isEnabledExpertSignature && <ExpertSignature />}

          <div
            key={product.id}
            ref={reviewsRef}
            className="pt-4 flex flex-col"
            id="reviews"
          >
            <div className="flex justify-between mb-4">
              <span className="font-body font-semibold text-lg">
                {t('reviews.title')}
              </span>
              {isReviewPolicyOnPDPsReviewsSection && (
                <span>
                  <NextLink href={t('our-review-policy-page-url')} passHref>
                    <a className="text-sm text-ui-grey">
                      {t('our-review-policy')}
                    </a>
                  </NextLink>
                </span>
              )}
            </div>
            <ProductReviews key={product.id} product={product} />
          </div>
        </div>

        {/* On Mobile show FBT under the reviews if FF SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT is enabled else show Our Recommendations */}
        {isShowRecommendationsBeforeFBTEnabled && !isSmallSize ? (
          isFrequentlyBoughtTogetherFeatureEnabled && (
            <div className="col-span-12 py-4 sm:py-0 mb-7 border-ui-grey-lightest md:col-start-7 md:col-end-13 lg:col-start-8 lg:pl-7">
              <ExponeaRecommendationBlock
                recommendationType={
                  RECOMMENDATIONS_TYPES.FREQUENTLY_BOUGHT_TOGETHER
                }
                loading="lazy"
                productId={product.sku}
              />
            </div>
          )
        ) : (
          <ExponeaRecommendationBlock
            recommendationType={RECOMMENDATIONS_TYPES.PDP1}
            loading="lazy"
            productId={product.sku}
            className="mb-8 col-span-12"
          />
        )}

        {/* Last viewed products */}
        <aside className="col-span-12">
          <ExponeaRecommendationBlock
            recommendationType={RECOMMENDATIONS_TYPES.PDP2}
            loading="lazy"
            productId={product.sku}
            className="mb-8"
          />
        </aside>
      </main>

      {isBasketNotificationEnabled &&
        isNotificationOpen &&
        (wasItemError || wasItemSuccess) && (
          <BasketNotification
            product={basketModalProduct ?? product}
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
            hasPromotionalItem={itemInBasket[0]?.hasPromotionalItem}
            isPromotionalItemOutOfStock={
              itemInBasket[0]?.hasPromotionalItemOutofStock
            }
          />
        )}
      {!isBasketNotificationEnabled && basketModalProduct && (
        <BasketModal
          product={basketModalProduct}
          productQuantity={currentQuantityValue}
          productSku={basketModalProduct?.sku}
          isBasketModalOpen={isModalOpen}
          modalRef={modalRef}
          basketModalClose={() => setIsModalOpen(false)}
          increaseQuantity={increaseModalQuantity(basketModalProduct)}
          decreaseQuantity={decreaseModalQuantity(basketModalProduct)}
          removeFromBasket={removeFromBasket(
            basketModalProduct &&
              basketItems.find(item => item.sku === basketModalProduct.sku),
            PATH_DESCRIPTION.CART_MODAL
          )}
          addToBasket={addToBasket(
            basketModalProduct,
            PATH_DESCRIPTION.CART_MODAL
          )}
          wasItemError={wasItemError}
          isRemoved={isRemoved}
          inputRef={(input: HTMLInputElement) => {
            if (basketModalProduct.sku)
              inputRef.current[basketModalProduct.sku] = input
          }}
          changeQuantity={e => {
            setCurrentItemSku(basketModalProduct.sku)
            setCurrentQuantityValue(basketModalProduct.basketQuantity ?? 0)
            const value = isNewQuantitySelector
              ? newQuantitySelectorValue
              : +e.target.value
            setIsTriggered(true)
            setCurrentQuantityValue(value)
            setQuantityChangedFrom(PATH_DESCRIPTION.CART_MODAL)
          }}
          inputValue={inputRef.current[basketModalProduct.sku]?.value}
          availability={basketModalProduct.availability}
          availableQty={+availableQuantity}
          doExceeds={validateMaxQuantity(
            currentQuantityValue,
            basketModalProduct.maxQuantity
          )}
          hasPromotionalItem={itemInBasket[0]?.hasPromotionalItem}
          isPromotionalItemOutofStock={
            itemInBasket[0]?.hasPromotionalItemOutofStock
          }
          maxQuantity={
            basketModalProduct.maxQuantity ?? MAXIMUM_PRODUCT_QUANTITY
          }
        />
      )}
    </>
  )
}

/*
 * PLUS-8040: https://olp.atlassian.net/browse/PLUS-8040
 * This decides if we should render the current PDP or the new PDP. This last one (<NewPDP />)
 * will be a refactorized version and will integrate the new components for the German shop
 */
export const Product = () => {
  const isNewPDP = useFeatureFlag(FeatureFlag.PDP_ALL_NEW_PDP)
  return isNewPDP ? <NewPDP /> : <PDP />
}
