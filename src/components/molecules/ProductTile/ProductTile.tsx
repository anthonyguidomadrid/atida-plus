import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Product, useFormatAmount } from '~domains/product'
import { Availability } from '~components/atoms/Availability'
import { Link } from '~components/atoms/Link'
import { Price } from '~components/atoms/Price'
import { Button } from '~components/atoms/Button'
import { ReactComponent as Check } from '~assets/svg/navigation-24px/Checkmark.svg'
import { ProductLabels } from '~components/molecules/ProductLabels'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import { triggerReportProductClicked } from '~domains/analytics'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeItemQuantityTrigger,
  handleProductQuantityAction,
  selectItemIsLoading,
  selectItems,
  selectQuantityError
} from '~domains/basket'
import { RootState } from '~domains/redux'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { ReactComponent as FavouritesIcon } from '~assets/svg/navigation-24px/Favourite.svg'
import { ReactComponent as FavouritesIconFilled } from '~assets/svg/navigation-24px/FavouriteFilled.svg'
import { favouritesProductState } from '~domains/favourites/types'
import { selectRemoveFromFavouritesItems } from '~domains/favourites'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useRouter } from 'next/router'
import { updateUrlOnProductClick } from '~helpers/updateUrlOnProductClick'
import { Reviews } from '~components/atoms/Reviews'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { ProductQuantitySelector } from '../QuantitySelector'
import {
  FavouriteButtonPlaceholder,
  FavouriteButtonProps
} from '~components/molecules/FavouriteButton'
import dynamic from 'next/dynamic'
import {
  LIST_VIEW_SM_PRODUCT_IMAGE_WIDTH,
  LIST_VIEW_SM_PRODUCT_IMAGE_HEIGHT,
  LIST_VIEW_PRODUCT_IMAGE_DIMENSIONS,
  LIST_VIEW_XS_PRODUCT_IMAGE_WIDTH
} from '~config/constants/images'
import { Image } from '~components/atoms/Image'

export type ProductTileProps = Product & {
  basketQuantity?: number
  availability?: string
  idx: number
  addToBasket?: (product: Product) => void
  removeFromBasket?: (product: Product) => void
  addToFavourites?: (sku: string) => void
  removeFromFavourites?: (sku: string) => void
  addedFrom?: string
  changeQuantity?: (sku: string, quantity: number, id: string) => void
  openBasketModal?: (product: Product) => void
  isFavouritesPage?: boolean
  isModalOpen?: boolean
  listId?: string
  productPage?: number
  restorationRef?: RefObject<HTMLDivElement> | null
}

const FavouriteButton = dynamic<FavouriteButtonProps>(
  () =>
    import('~components/molecules/FavouriteButton').then(
      c => c.FavouriteButton
    ),
  {
    loading: () => <FavouriteButtonPlaceholder />
  }
)

// NextLink errors when "href" is undefined, and we don't want "mock" hrefs, so we remove the link when href is not present
const ProductLink: FunctionComponent<{
  href?: string
  children?: ReactNode
}> = ({ href, children }) =>
  href ? (
    <NextLink href={href} passHref prefetch={false}>
      {children}
    </NextLink>
  ) : (
    <>{children}</>
  )

export const ProductTile: FunctionComponent<
  ComponentPropsWithoutRef<'article'> & ProductTileProps
> = ({
  idx,
  className,
  name,
  brand,
  categories,
  sku,
  productPage,
  gtin,
  pzn,
  format,
  availability,
  url,
  productDatImage,
  thumbnailImage,
  mediumImage,
  largeImage,
  productTileImage,
  productTileRetinaImage,
  unitVolume,
  price,
  pricePerUnit,
  contentSizeFactor,
  basketQuantity = 0,
  rrp,
  labels = [],
  maxQuantity,
  addToBasket,
  removeFromBasket,
  addToFavourites,
  removeFromFavourites,
  addedFrom = '',
  changeQuantity,
  openBasketModal,
  isFavouritesPage = false,
  listId,
  restorationRef,
  rating,
  isModalOpen,
  ...props
}) => {
  const { t } = useTranslation()
  const formatAmount = useFormatAmount()
  const [isDeleted, setIsDeleted] = useState(false)
  const removeFromFavouritesIsLoading = useSelector(
    selectRemoveFromFavouritesItems
  )

  const product = useMemo(
    () => ({
      brand,
      categories,
      format,
      name,
      pricePerUnit,
      rrp,
      thumbnailImage,
      mediumImage,
      largeImage,
      productDatImage,
      productTileImage,
      productTileRetinaImage,
      unitVolume,
      contentSizeFactor,
      price,
      sku,
      productPage,
      labels,
      basketQuantity,
      availability,
      url,
      maxQuantity,
      gtin,
      rating,
      isModalOpen
    }),
    [
      availability,
      basketQuantity,
      brand,
      categories,
      contentSizeFactor,
      format,
      labels,
      largeImage,
      maxQuantity,
      mediumImage,
      name,
      price,
      pricePerUnit,
      productDatImage,
      productTileImage,
      productTileRetinaImage,
      rrp,
      sku,
      productPage,
      thumbnailImage,
      unitVolume,
      url,
      gtin,
      rating,
      isModalOpen
    ]
  )

  const formattedUnitVolume = useMemo(
    () =>
      unitVolume
        ? formatAmount(unitVolume.amount, unitVolume.unit, unitVolume.unitLabel)
        : null,
    [formatAmount, unitVolume]
  )

  const unitVolumeWithContentSizeFactor = formatContentSizeFactor(
    formattedUnitVolume,
    product?.contentSizeFactor
  )

  const isSmScreen = useBreakpoint(breakpoints.sm)

  const basketItems = useSelector(selectItems)
  const basketModalBasketItem = useMemo(
    () => basketItems.find(item => item.sku === sku),
    [basketItems, sku]
  )
  const basketQuantityError = useSelector(selectQuantityError)
  const showRRP = rrp && price?.value < rrp?.value

  const dispatch = useDispatch()
  const router = useRouter()

  const isAddFilterAndSortingParametersToUrlFeatureEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_ADD_FILTER_AND_SORTING_PARAMETER_TO_URL
  )

  const isBrandPageCategoryFilterEnabled = useFeatureFlag(
    FeatureFlag.BRAND_PAGE_CATEGORY_FILTERS
  )

  const isProductQuantitySelectorEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_QUANTITY_SELECTOR
  )
  const isProductImageAllowAlternativeFormatsForPopListViewEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_ALLOW_ALTERNATIVE_FORMATS_FOR_POP_LIST_VIEW_AND_AUTOCOMPLETE
  )

  const isFixOverlappingLabelsOnFavouritesPageEnabled = useFeatureFlag(
    FeatureFlag.FIX_OVERLAPPING_LABELS_ON_FAVOURITES_PAGE
  )

  //TODO: Remove once proven to all environments
  const isFixProductTileImageWidthEnabled = useFeatureFlag(
    FeatureFlag.FIX_PRODUCT_TILE_IMAGE_WIDTH
  )

  const [productMaxQuantity, setProductMaxQuantity] = useState(
    basketModalBasketItem?.product.maxQuantity ?? maxQuantity
  )

  const handleReportProductClicked = useCallback(() => {
    dispatch(
      triggerReportProductClicked({
        product,
        list_id: listId,
        positionInTheList: idx + 1
      })
    )
  }, [dispatch, idx, listId, product])

  const handleChangeQuantity = useCallback(
    (quantity: number) => {
      dispatch(
        changeItemQuantityTrigger({
          sku,
          id: sku,
          quantity
        })
      )
    },
    [dispatch, sku]
  )

  useEffect(() => {
    // restorationRef is only provided to the ProductTile that needs to be scrolled to
    if (!restorationRef) {
      return
    }

    restorationRef.current &&
      restorationRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest'
      })
  }, [restorationRef])

  const favouritesIsLoading = useMemo(
    () =>
      removeFromFavouritesIsLoading?.find(item => item.sku === product.sku)
        ?.isLoading,
    [product.sku, removeFromFavouritesIsLoading]
  )

  useEffect(() => {
    favouritesIsLoading &&
      !removeFromFavouritesIsLoading?.some(
        (item: favouritesProductState) =>
          item.sku === product.sku && item.isLoading
      ) &&
      isFavouritesPage &&
      setIsDeleted(true)
  }, [
    favouritesIsLoading,
    removeFromFavouritesIsLoading,
    isFavouritesPage,
    product.sku
  ])

  useEffect(() => {
    if (basketQuantityError && sku && +basketQuantityError?.sku === +sku) {
      setProductMaxQuantity(basketQuantityError.available_qty)
    }
  }, [basketQuantityError, sku])

  const addToBasketIsLoading = useSelector<
    RootState,
    ReturnType<typeof selectItemIsLoading>
  >(state => selectItemIsLoading(state, { sku: product?.sku }))

  const imageWidth = useMemo(
    () =>
      isSmScreen
        ? LIST_VIEW_PRODUCT_IMAGE_DIMENSIONS
        : isFixProductTileImageWidthEnabled
        ? LIST_VIEW_XS_PRODUCT_IMAGE_WIDTH
        : LIST_VIEW_SM_PRODUCT_IMAGE_WIDTH,
    [isFixProductTileImageWidthEnabled, isSmScreen]
  )
  const imageHeight = useMemo(
    () =>
      isSmScreen
        ? LIST_VIEW_PRODUCT_IMAGE_DIMENSIONS
        : LIST_VIEW_SM_PRODUCT_IMAGE_HEIGHT,
    [isSmScreen]
  )

  if (isDeleted) return null
  return (
    <article data-testid="productCard" {...props} className="relative">
      <div
        ref={restorationRef}
        className={classNames(
          'relative flex h-37.5 p-2 justify-between items-center no-underline hover:text-primary-oxford-blue gap-2',
          'border-t border-b border-ui-grey-light -mt-fixed-1px',
          'default-image hover:zoomed-image',
          'sm:h-27 sm:py-3',
          {
            'sm:px-4 md:pl-2 lg:pl-4': isFavouritesPage
          },
          className
        )}
        onKeyDown={() => {
          productPage &&
            updateUrlOnProductClick(
              router,
              sku,
              productPage,
              isAddFilterAndSortingParametersToUrlFeatureEnabled,
              Boolean(isBrandPageCategoryFilterEnabled)
            )
          handleReportProductClicked()
        }}
        tabIndex={0}
        role="button"
        onClick={() => {
          productPage &&
            updateUrlOnProductClick(
              router,
              sku,
              productPage,
              isAddFilterAndSortingParametersToUrlFeatureEnabled,
              Boolean(isBrandPageCategoryFilterEnabled)
            )
          handleReportProductClicked()
        }}
      >
        <ProductLink href={url}>
          <Link
            data-testid="productTileLink"
            className={classNames(
              'w-2/6 h-21 min-w-14 flex no-underline hover:text-primary-oxford-blue items-center justify-center shrink-0 grow-0'
            )}
          >
            <Image
              className="w-full h-full object-contain"
              pictureClassName="w-18 h-18 sm:w-21 sm:h-21"
              src={productDatImage}
              platform="bynder"
              alt={name}
              loading={idx <= 6 ? 'eager' : 'lazy'}
              preload={idx === 0}
              width={{ xs: imageWidth }}
              height={{ xs: imageHeight }}
              useAlternativeFormats={
                !!(
                  isProductImageAllowAlternativeFormatsForPopListViewEnabled &&
                  productDatImage
                )
              }
              fallbackImageElement={
                <img
                  srcSet={
                    isSmScreen
                      ? `${mediumImage}, ${mediumImage} 1.5x`
                      : `${productTileImage}, ${productTileImage} 1.5x`
                  }
                  src={isSmScreen ? mediumImage : productTileImage}
                  alt={name}
                  className="w-18 sm:w-21 h-auto"
                  loading={idx <= 6 ? 'eager' : 'lazy'}
                  width={imageWidth}
                  height={imageHeight}
                />
              }
            />
          </Link>
        </ProductLink>
        <div
          className={classNames(
            'flex h-full flex-col w-4/6 sm:flex-row sm:gap-3',
            {
              'sm:mr-3 md:mr-2 lg:mr-5': isFavouritesPage
            }
          )}
        >
          <ProductLink href={url}>
            <Link
              data-testid="productTileLink"
              className={classNames(
                'flex flex-col items-start justify-start no-underline hover:text-primary-oxford-blue',
                {
                  'w-full sm:w-1/2 lg:max-w-52': !isFavouritesPage,
                  'flex-auto pr-3 md:pr-4 lg:max-w-none lg:w-full': isFavouritesPage
                }
              )}
            >
              <h3
                data-testid="productTitle"
                className={classNames(
                  'text-base mb-1 font-body font-semibold line-clamp-3',
                  {
                    'md:pr-4': !isFavouritesPage,
                    'text-ui-grey-dark':
                      isFavouritesPage &&
                      (product.availability === 'NOT_AVAILABLE' ||
                        product.availability === undefined)
                  }
                )}
              >
                {name}
              </h3>
              <small className="block text-sm text-ui-grey mb-1">
                {[
                  pzn ? t('product.pzn', { pzn }) : null,
                  format?.label,
                  unitVolumeWithContentSizeFactor
                ]
                  .filter(value => !!value)
                  .join(' - ')}
              </small>
              <Reviews
                numberOfReviews={rating?.numberOfReviews}
                rating={rating?.averageRating}
              />
            </Link>
          </ProductLink>
          <div
            className={classNames('shrink-0', {
              'sm:w-1/2 md:w-3/7': !isFavouritesPage,
              'sm:w-23': isFavouritesPage
            })}
          >
            <ProductLabels
              data-testid="productTileLabels"
              labels={labels}
              className={classNames(
                'xs-only:max-w-fit',
                'absolute sm:relative sm:flex sm:mb-1 top-2 left-2 w-2/6 sm:w-fit truncate',
                {
                  'sm:top-fixed-1px sm:left-0': !isFavouritesPage,
                  'sm:top-0 sm:left-0':
                    isFavouritesPage &&
                    isFixOverlappingLabelsOnFavouritesPageEnabled
                }
              )}
              listItemClassName="w-fit max-w-full mb-1 sm:mb-0 sm:mr-1 truncate"
            />
            <ProductLink href={url}>
              <Link
                data-testid="productTileLink"
                className="block no-underline hover:text-primary-oxford-blue mt-1"
              >
                <Availability
                  data-testid="productTileAvailability"
                  availability={availability}
                />
                <Price
                  price={price}
                  rrp={rrp}
                  showRRP={showRRP}
                  size={'medium'}
                  superscriptDecimals
                  isPricePerUnitBelowRRP
                  data-testid="productTilePrice"
                  className="mb-2"
                />
              </Link>
            </ProductLink>

            {/* Add to basket controls  */}
            <div
              className={classNames({
                'w-full flex justify-start': !isFavouritesPage
              })}
              data-testid="addToBasketControls"
            >
              {!isProductQuantitySelectorEnabled && (
                <Button
                  variant={
                    basketQuantity && basketQuantity > 0
                      ? 'tertiary'
                      : 'secondary'
                  }
                  type="button"
                  className={classNames(
                    'px-1.5 text-base xs:px-3 h-6 w-21 sm:w-19'
                  )}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    openBasketModal?.(product)
                    product && sku && basketQuantity === 0
                      ? addToBasket?.(product)
                      : null
                    dispatch(handleProductQuantityAction(false))
                  }}
                  onKeyDown={e => {
                    e.stopPropagation()
                  }}
                  data-testid="addToBasketButton"
                  aria-label={t('product.add-to-basket')}
                  disabled={
                    product.availability === 'NOT_AVAILABLE' ||
                    product.availability === undefined
                  }
                  isLoading={addToBasketIsLoading}
                  singleIcon={true}
                >
                  {basketQuantity && basketQuantity > 0 ? (
                    <>
                      <div className="flex align-center">
                        <Check className="icon-24 mr-1" />
                        <span className="sr-only">
                          {t('product.in-your-basket')}
                        </span>
                        {basketQuantity}
                      </div>
                    </>
                  ) : (
                    <span data-testid="screenReaderAddToBasket">
                      {t('product.add-to-basket')}
                    </span>
                  )}
                </Button>
              )}
              {isProductQuantitySelectorEnabled &&
                (basketQuantity === 0 ? (
                  <Button
                    variant="secondary"
                    className={classNames(
                      'button button--secondary px-1.5 text-base xs:px-3 h-6',
                      {
                        'w-full': isFavouritesPage,
                        'w-21 sm:w-19': !isFavouritesPage
                      }
                    )}
                    isLoading={addToBasketIsLoading}
                    type="button"
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      sku && basketQuantity === 0
                        ? addToBasket?.(product)
                        : null
                      openBasketModal?.(product)
                      dispatch(handleProductQuantityAction(false))
                    }}
                    onKeyDown={e => {
                      e.stopPropagation()
                    }}
                    data-testid="addToBasketButton"
                    aria-label={t('product.add-to-basket')}
                    disabled={
                      product.availability === 'NOT_AVAILABLE' ||
                      product.availability === undefined
                    }
                    singleIcon={true}
                  >
                    <span data-testid="screenReaderAddToBasket">
                      {t('product.add-to-basket')}
                    </span>
                  </Button>
                ) : (
                  <ProductQuantitySelector
                    isFullWidth={isFavouritesPage}
                    initialQuantity={basketQuantity}
                    maxAvailableQuantity={productMaxQuantity}
                    isDisabled={
                      product.availability === 'NOT_AVAILABLE' ||
                      product.availability === undefined
                    }
                    onRemove={() => removeFromBasket?.(product)}
                    onChange={handleChangeQuantity}
                    isLoading={addToBasketIsLoading}
                  />
                ))}

              {!isFavouritesPage && (
                <FavouriteButton
                  data-testid="saveToFavouritesButton"
                  product={product}
                  iconDefault={
                    <FavouritesIcon className="icon-24 text-primary-oxford-blue" />
                  }
                  iconActive={
                    <FavouritesIconFilled className="icon-24 text-primary-oxford-blue" />
                  }
                  addedFrom={addedFrom}
                  addToFavourites={addToFavourites}
                  removeFromFavourites={removeFromFavourites}
                  className="ml-1.5 mt-0.5"
                />
              )}
            </div>
          </div>
        </div>
        {isFavouritesPage && (
          <FavouriteButton
            className="top-1 right-0.5 sm:top-2 sm:right-2 absolute right-0"
            data-testid="removeFromFavouritesButton"
            product={product}
            iconDefault={<Cross className="icon-24 text-primary-oxford-blue" />}
            iconActive={<Cross className="icon-24 text-primary-oxford-blue" />}
            isFavouritesPage
            addedFrom={addedFrom}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
          />
        )}
      </div>
    </article>
  )
}
