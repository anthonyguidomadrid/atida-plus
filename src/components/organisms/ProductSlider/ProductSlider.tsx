import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useMemo,
  useRef,
  useState
} from 'react'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { Product } from '~domains/product'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { determineIfIsProduct } from '~components/templates/ProductSearchLayout/productsAndContentBlocks'
import { Slider } from '~components/molecules/Slider'
import { ProductCard } from '~components/molecules/ProductCard'
import { ProductGridItem } from '../ProductGrid'
import { useIsBrowser } from '~helpers/useIsBrowser'

export type ProductSliderProps = ComponentPropsWithoutRef<'div'> & {
  productCardList: ProductGridItem[]
  addToBasket?: (product: Product) => void
  removeFromBasket?: (product: Product) => void
  openBasketModal?: (product: Product) => void
  addToFavourites?: (sku: string) => void
  removeFromFavourites?: (sku: string) => void
  addedFrom?: string
  isPdp?: boolean
  testId?: string
  listId?: string
  isModalOpen?: boolean
  autoplay?: boolean
  recommendationId?: string
}

export const ProductSlider: FunctionComponent<ProductSliderProps> = ({
  productCardList,
  addToBasket,
  removeFromBasket,
  addToFavourites,
  removeFromFavourites,
  addedFrom = '',
  openBasketModal,
  isPdp = false,
  autoplay = false,
  testId,
  listId,
  isModalOpen,
  recommendationId
}) => {
  const isBrowser = useIsBrowser()
  const isSmallFormat = useBreakpoint(breakpoints.sm)
  const isLargeFormat = useBreakpoint(breakpoints.lg)

  const isUpdatePageNumberInUrlOnProductClickEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_UPDATE_PAGE_NUMBER_IN_URL_ON_PRODUCT_CLICK
  )

  const isRecommendationsBlockUnderReviews = useFeatureFlag(
    FeatureFlag.PDP_RECOMMENDATIONS_BLOCK_IS_UNDER_REVIEWS
  )

  const slidesPerViewForFullWidth = useMemo(
    () => (isLargeFormat ? 5 : isSmallFormat ? 4 : 'auto'),
    [isLargeFormat, isSmallFormat]
  )
  const slidesPerView = useMemo(
    () =>
      isBrowser
        ? isPdp && !isRecommendationsBlockUnderReviews
          ? 3
          : slidesPerViewForFullWidth
        : 2,
    [
      isBrowser,
      isPdp,
      isRecommendationsBlockUnderReviews,
      slidesPerViewForFullWidth
    ]
  )

  const [productMarkerId] = useState(() => {
    const storage = globalThis?.sessionStorage
    if (!storage) return

    const persistedId = storage.getItem('scroll-position-product-id-marker')

    return persistedId ? persistedId : null
  })

  const restorationRef = useRef<HTMLDivElement>(null)

  if (!productCardList || !productCardList.length) return null
  return (
    <Slider
      slidesPerView={slidesPerView}
      slideWidth={165}
      showSlidesIndicators={false}
      testId={testId}
      autoplay={autoplay}
      swiperClassName="sm:w-product-slider-container-sm md:w-product-slider-container-md"
      className="xs-only:container"
    >
      {productCardList?.map(
        (productCardItem, idx) =>
          productCardItem &&
          determineIfIsProduct(productCardItem) && (
            <ProductCard
              isCompact
              addedFrom={addedFrom}
              {...productCardItem}
              restorationRef={
                isUpdatePageNumberInUrlOnProductClickEnabled &&
                productMarkerId === productCardItem.sku
                  ? restorationRef
                  : null
              }
              listId={listId}
              isModalOpen={isModalOpen}
              idx={idx}
              openBasketModal={recommendedItem =>
                openBasketModal?.(recommendedItem)
              }
              addToBasket={product => {
                addToBasket?.(product)
              }}
              removeFromBasket={product => removeFromBasket?.(product)}
              addToFavourites={sku => addToFavourites?.(sku)}
              removeFromFavourites={sku => removeFromFavourites?.(sku)}
              key={`${productCardItem.name}-${productCardItem.sku}-${idx}`}
              recommendationId={recommendationId}
              className="mr-1 sm:mr-2 md:mr-3 border border-ui-grey-lightest rounded-md"
            />
          )
      )}
    </Slider>
  )
}
