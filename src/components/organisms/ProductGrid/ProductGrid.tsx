import {
  ComponentPropsWithoutRef,
  Fragment,
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Product } from '~domains/product'
import { ProductCard } from '~components/molecules/ProductCard'
import classNames from 'classnames'
import { ProductsAndContentBlocksListItem } from '~domains/product/types'
import {
  determineIfIsContentBlock,
  determineIfIsProduct
} from '~components/templates/ProductSearchLayout/productsAndContentBlocks'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import dynamic from 'next/dynamic'
import { ContentBlocksLayoutProps } from '~components/templates/ContentBlocksLayout'

const ContentBlocksLayout = dynamic<ContentBlocksLayoutProps>(() =>
  import('~components/templates/ContentBlocksLayout').then(
    c => c.ContentBlocksLayout
  )
)

export type ProductGridItem = ProductsAndContentBlocksListItem

export type ProductGridProps = ComponentPropsWithoutRef<'ul'> & {
  productCardList: ProductGridItem[]
  isHome?: boolean
  isPop?: boolean
  isPdp?: boolean
  addedFrom?: string
  addToBasket?: (product: Product) => void
  removeFromBasket?: (product: Product) => void
  openBasketModal?: (product: Product) => void
  addToFavourites?: (sku: string) => void
  removeFromFavourites?: (sku: string) => void
  testId: string
  listId?: string
  isModalOpen?: boolean
  isFavouritesPage?: boolean
  isLcp?: boolean
  recommendationId?: string
}

const ProductGridComponent: FunctionComponent<ProductGridProps> = ({
  productCardList,
  isHome = false,
  isPop = false,
  isPdp = false,
  addedFrom = '',
  addToBasket,
  addToFavourites,
  removeFromFavourites,
  openBasketModal,
  testId,
  listId,
  removeFromBasket,
  isFavouritesPage = false,
  isLcp = false,
  isModalOpen,
  recommendationId
}) => {
  let isAfterPromo = 0
  /*
    This method handles the borders of product cards.
    The borders are controlled by the index of each product
    and when a promotion block is included the indexes are inverted.
  */
  const handleIsAfterPromo = () => {
    isAfterPromo += 1
  }

  const isUpdatePageNumberInUrlOnProductClickEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_UPDATE_PAGE_NUMBER_IN_URL_ON_PRODUCT_CLICK
  )
  const isRecommendationsBlockUnderReviews = useFeatureFlag(
    FeatureFlag.PDP_RECOMMENDATIONS_BLOCK_IS_UNDER_REVIEWS
  )

  const [productMarkerId, setProductMarkerId] = useState<string | null>(null)

  const storage = globalThis?.sessionStorage

  const persistedId =
    storage && storage.getItem('scroll-position-product-id-marker')

  useEffect(() => {
    if (!isFavouritesPage) {
      setProductMarkerId(persistedId)
    }
  }, [isFavouritesPage, persistedId])

  const restorationRef = useRef<HTMLDivElement>(null)

  const getImageLoadingStrategy = useCallback(
    (idx: number) => {
      if (isLcp && idx === 0) return 'eager'
      if (isPop && idx < 8) return 'eager'
      return 'lazy'
    },
    [isLcp, isPop]
  )

  return (
    <section
      data-testid={testId}
      className={classNames(
        'border-ui-grey-light col-span-12 col-end-13',
        ' md:col-start-4 lg:col-start-3',
        {
          'sm:px-0 md:row-start-3 md:row-end-5': isHome
        }
      )}
    >
      <ul
        data-testid={isHome ? 'productGrid' : 'oneRowProductGrid'}
        className={classNames('grid grid-cols-2 sm:grid-cols-3 gap-0', {
          'md:grid-cols-2': isPdp && !isRecommendationsBlockUnderReviews,
          'md:grid-cols-3 lg:grid-cols-4': isPop,
          'md:grid-cols-4':
            isHome ||
            (isPdp && isRecommendationsBlockUnderReviews) ||
            isFavouritesPage,
          'lg:grid-cols-5': isFavouritesPage,
          'border-t border-ui-grey-light': !isFavouritesPage
        })}
      >
        {productCardList !== undefined &&
          productCardList.map((productCardItem, idx) => {
            productCardItem &&
              determineIfIsContentBlock(productCardItem) &&
              !isHome &&
              handleIsAfterPromo()

            return (
              <Fragment key={idx}>
                {productCardItem && determineIfIsProduct(productCardItem) && (
                  <li
                    className={classNames(
                      'p-2 border-b border-ui-grey-light col-span-1',
                      {
                        'xs-only:border-l pl-1.9':
                          ((idx - isAfterPromo) % 2 !== 0 &&
                            (isPdp || isPop)) ||
                          (idx % 2 !== 0 && (isHome || isFavouritesPage)),
                        'sm:border-l md:border-l-0':
                          ((idx - isAfterPromo) % 3 !== 0 && isPdp) ||
                          (idx % 3 !== 0 && (isHome || isFavouritesPage)),
                        'sm:border-l lg:border-l-0':
                          ((idx - isAfterPromo) % 3 !== 0 && isPop) ||
                          (idx % 3 !== 0 && isFavouritesPage),
                        'md:border-l':
                          ((idx - isAfterPromo) % 2 !== 0 &&
                            isPdp &&
                            !isRecommendationsBlockUnderReviews) ||
                          (idx % 4 !== 0 &&
                            (isHome ||
                              (isPdp && isRecommendationsBlockUnderReviews) ||
                              isFavouritesPage)),
                        'lg:border-l':
                          ((idx - isAfterPromo) % 4 !== 0 && isPop) ||
                          (idx % 5 !== 0 && isFavouritesPage),
                        'border-t': idx < 2 && isFavouritesPage,
                        'sm:border-t': idx < 3 && isFavouritesPage,
                        'md:border-t': idx < 4 && isFavouritesPage,
                        'lg:border-t': idx < 5 && isFavouritesPage
                      }
                    )}
                  >
                    <ProductCard
                      isFavouritesPage={isFavouritesPage}
                      addedFrom={addedFrom}
                      restorationRef={
                        isUpdatePageNumberInUrlOnProductClickEnabled &&
                        productMarkerId === productCardItem.sku
                          ? restorationRef
                          : null
                      }
                      isModalOpen={isModalOpen}
                      listId={listId}
                      basketQuantity={productCardItem?.basketQuantity}
                      idx={idx}
                      productPage={productCardItem.productPage}
                      categories={productCardItem.categories}
                      availability={productCardItem.availability}
                      brand={productCardItem.brand}
                      labels={productCardItem.labels}
                      description={productCardItem.description}
                      productDatImage={productCardItem.productDatImage}
                      thumbnailImage={productCardItem.thumbnailImage}
                      largeImage={productCardItem.largeImage}
                      mediumImage={productCardItem.mediumImage}
                      productTileRetinaImage={
                        productCardItem.productTileRetinaImage
                      }
                      productTileImage={productCardItem.productTileImage}
                      sku={productCardItem.sku}
                      gtin={productCardItem.gtin}
                      rrp={productCardItem.rrp}
                      price={productCardItem.price}
                      pricePerUnit={productCardItem.pricePerUnit}
                      format={productCardItem.format}
                      name={productCardItem.name}
                      url={productCardItem.url}
                      openBasketModal={recommendedItem =>
                        openBasketModal?.(recommendedItem)
                      }
                      addToBasket={product => {
                        addToBasket?.(product)
                      }}
                      removeFromBasket={product => removeFromBasket?.(product)}
                      addToFavourites={sku => addToFavourites?.(sku)}
                      removeFromFavourites={sku => removeFromFavourites?.(sku)}
                      key={`${productCardItem?.name}-${productCardItem?.sku}-${idx}`}
                      maxQuantity={productCardItem.maxQuantity}
                      unitVolume={productCardItem.unitVolume}
                      rating={productCardItem.rating}
                      isLcp={isLcp && idx === 0}
                      imageLoading={getImageLoadingStrategy(idx)}
                      recommendationId={recommendationId}
                    />
                  </li>
                )}
                {productCardItem &&
                  determineIfIsContentBlock(productCardItem) &&
                  !isHome && (
                    <li
                      className={classNames(
                        'p-2 border-b border-ui-grey-light col-span-full sm:px-0 sm:py-3 lg:py-4'
                      )}
                    >
                      <ContentBlocksLayout
                        contentBlocks={Array.of(productCardItem)}
                        key={`${productCardItem?.title}-${idx}`}
                        isContainer={false}
                      />
                    </li>
                  )}
              </Fragment>
            )
          })}
      </ul>
    </section>
  )
}

export const ProductGrid = memo(ProductGridComponent)
