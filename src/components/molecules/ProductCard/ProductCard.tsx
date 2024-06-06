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
import { useDispatch, useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import { Product, useFormatAmount } from '~domains/product'
import { Link } from '~components/atoms/Link'
import { Price } from '~components/atoms/Price'
import {
  handleProductQuantityAction,
  selectItemIsLoading,
  selectItems,
  selectQuantityError
} from '~domains/basket'
import { triggerReportProductClicked } from '~domains/analytics'
import { RootState } from '~domains/redux'
import { Availability } from '~components/atoms/Availability'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useRouter } from 'next/router'
import { updateUrlOnProductClick } from '~helpers/updateUrlOnProductClick'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import { Image } from '~components/atoms/Image'
import { ProductLabelsPlaceholder, ProductLabelsProps } from '../ProductLabels'
import {
  FavouriteButtonPlaceholder,
  FavouriteButtonProps
} from '~components/molecules/FavouriteButton'
import { ReviewsPlaceholder, ReviewsProps } from '~components/atoms/Reviews'
import {
  AddToBasketButtonProps,
  AddToBasketPlaceholder
} from './AddToBasketButton'
import classNames from 'classnames'

const AddToBasketButton = dynamic<AddToBasketButtonProps>(
  () => import('./AddToBasketButton').then(c => c.AddToBasketButton),
  {
    loading: () => <AddToBasketPlaceholder />
  }
)

const Reviews = dynamic<ReviewsProps>(
  () => import('~components/atoms/Reviews').then(c => c.Reviews),
  {
    loading: () => <ReviewsPlaceholder />
  }
)

const FavouriteButton = dynamic<FavouriteButtonProps>(
  () =>
    import('~components/molecules/FavouriteButton').then(
      c => c.FavouriteButton
    ),
  {
    loading: () => <FavouriteButtonPlaceholder />
  }
)

const ProductLabels = dynamic<ProductLabelsProps>(
  () => import('../ProductLabels').then(c => c.ProductLabels),
  {
    loading: () => <ProductLabelsPlaceholder />
  }
)

export type ProductCardProps = Product & {
  idx: number
  addToBasket?: (product: Product) => void
  removeFromBasket?: (product: Product) => void
  openBasketModal?: (product: Product) => void
  addToFavourites?: (sku: string) => void
  removeFromFavourites?: (sku: string) => void
  addedFrom?: string
  isModalOpen?: boolean
  isCompact?: boolean
  listId?: string
  productPage?: number
  restorationRef?: RefObject<HTMLDivElement> | null
  imageLoading?: 'eager' | 'lazy'
  isFavouritesPage?: boolean
  isLcp?: boolean
  recommendationId?: string
}

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

export const ProductCard: FunctionComponent<
  ComponentPropsWithoutRef<'article'> & ProductCardProps
> = ({
  idx,
  name,
  brand,
  categories,
  sku,
  productPage,
  gtin,
  format,
  url,
  productDatImage,
  productTileRetinaImage,
  thumbnailImage,
  mediumImage,
  productTileImage,
  largeImage,
  unitVolume,
  price,
  pricePerUnit,
  rrp,
  labels = [],
  availability,
  maxQuantity,
  addToBasket,
  removeFromBasket,
  addToFavourites,
  removeFromFavourites,
  addedFrom = '',
  basketQuantity,
  openBasketModal,
  listId,
  restorationRef,
  contentSizeFactor,
  pzn,
  rating,
  imageLoading = 'lazy',
  isModalOpen,
  isCompact = false,
  isFavouritesPage = false,
  isLcp = false,
  className,
  recommendationId
}) => {
  const { t } = useTranslation()
  const formatAmount = useFormatAmount()
  const dispatch = useDispatch()
  const router = useRouter()

  const addToBasketIsLoading = useSelector<
    RootState,
    ReturnType<typeof selectItemIsLoading>
  >(state => selectItemIsLoading(state, { sku: sku }))

  const product = useMemo(
    () => ({
      brand,
      categories,
      format,
      name,
      pricePerUnit,
      rrp,
      productDatImage,
      thumbnailImage,
      mediumImage,
      largeImage,
      productTileImage,
      productTileRetinaImage,
      unitVolume,
      price,
      sku,
      productPage,
      labels,
      basketQuantity,
      availability,
      url,
      maxQuantity,
      gtin,
      contentSizeFactor,
      pzn,
      rating,
      isModalOpen
    }),
    [
      availability,
      basketQuantity,
      brand,
      categories,
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
      contentSizeFactor,
      pzn,
      rating,
      isModalOpen
    ]
  )

  const basketItems = useSelector(selectItems)
  const basketModalBasketItem = basketItems.find(item => item.sku === sku)

  const basketQuantityError = useSelector(selectQuantityError)
  const showRRP = rrp && price?.value < rrp?.value

  const formattedUnitVolume = useMemo(
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
    () => formatContentSizeFactor(formattedUnitVolume, contentSizeFactor),
    [contentSizeFactor, formattedUnitVolume]
  )

  const isAddFilterAndSortingParametersToUrlFeatureEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_ADD_FILTER_AND_SORTING_PARAMETER_TO_URL
  )

  const isBrandPageCategoryFilterEnabled = useFeatureFlag(
    FeatureFlag.BRAND_PAGE_CATEGORY_FILTERS
  )

  const [productMaxQuantity, setProductMaxQuantity] = useState(
    basketModalBasketItem?.product.maxQuantity ?? maxQuantity
  )

  const handleReportProductClicked = useCallback(() => {
    dispatch(
      triggerReportProductClicked({
        product,
        list_id: listId,
        recommendation_id: recommendationId,
        positionInTheList: idx + 1
      })
    )
  }, [dispatch, idx, listId, product, recommendationId])

  const handleUpdateUrlOnProductClick = useCallback(() => {
    productPage &&
      updateUrlOnProductClick(
        router,
        sku,
        productPage,
        isAddFilterAndSortingParametersToUrlFeatureEnabled,
        Boolean(isBrandPageCategoryFilterEnabled)
      )
    handleReportProductClicked()
  }, [
    productPage,
    router,
    sku,
    isAddFilterAndSortingParametersToUrlFeatureEnabled,
    isBrandPageCategoryFilterEnabled,
    handleReportProductClicked
  ])

  const handleAddToBasket = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      sku && (isCompact || (!isCompact && basketQuantity === 0))
        ? addToBasket?.(product)
        : null
      openBasketModal?.(product)
      dispatch(handleProductQuantityAction(false))
    },
    [
      addToBasket,
      basketQuantity,
      dispatch,
      isCompact,
      openBasketModal,
      product,
      sku
    ]
  )

  useEffect(() => {
    // restorationRef is only provided to the ProductCard that needs to be scrolled to
    if (!restorationRef) {
      return
    }

    restorationRef.current &&
      restorationRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest'
      })
  }, [restorationRef])

  useEffect(() => {
    if (basketQuantityError && sku && +basketQuantityError?.sku === +sku) {
      setProductMaxQuantity(basketQuantityError.available_qty)
    }
  }, [basketQuantityError, sku])

  return (
    <>
      <div
        data-id={sku}
        data-testid="productCard"
        ref={restorationRef}
        className={classNames('product-card h-full', className)}
        onKeyDown={handleUpdateUrlOnProductClick}
        tabIndex={0}
        role="button"
        onClick={handleUpdateUrlOnProductClick}
      >
        <ProductLink href={url}>
          <Link
            data-testid="productCardLink"
            className={classNames(
              'w-full flex items-start flex-col no-underline ',
              {
                'pb-2': !isCompact,
                'p-2': isCompact
              }
            )}
          >
            <ProductLabels
              labels={labels}
              className="absolute flex flex-col max-w-4/5 items-start z-9"
              listItemClassName="w-fit max-w-full mb-1"
            />
            <div className="product-card__image-container">
              <Image
                src={productDatImage}
                platform="bynder"
                alt={name}
                loading={imageLoading}
                preload={isLcp}
                width={{ xs: 140 }}
                height={{ xs: 140 }}
                useAlternativeFormats={!!productDatImage}
                fallbackImageElement={
                  <img
                    srcSet={`${mediumImage}, ${largeImage} 1.5x`}
                    src={mediumImage}
                    alt={name}
                    loading={imageLoading}
                    width="140"
                    height="140"
                  />
                }
              />
            </div>
          </Link>
        </ProductLink>
        {!isCompact && !isFavouritesPage && (
          <FavouriteButton
            className="absolute right-0"
            data-testid="saveToFavouritesButton"
            product={product}
            addToFavourites={addToFavourites}
            addedFrom={addedFrom}
            removeFromFavourites={removeFromFavourites}
          />
        )}
        {isFavouritesPage && (
          <FavouriteButton
            className="xs:h-3 xs:w-3 absolute right-0"
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
        <ProductLink href={url}>
          <Link
            data-testid="productCardLink"
            className={classNames('product-card__link', {
              'px-2': isCompact
            })}
          >
            <div
              className={classNames(
                'flex flex-col items-start justify-start pb-0.25',
                {
                  'h-12.75': !isCompact,
                  'h-6': isCompact
                }
              )}
            >
              <span
                data-testid="productTitle"
                className={classNames('text-base font-body font-normal', {
                  'mb-1 line-clamp-3': !isCompact,
                  'line-clamp-2': isCompact
                })}
              >
                {name}
              </span>
              {!isCompact && (
                <small className="block text-sm text-ui-grey">
                  {[
                    pzn ? t('product.pzn', { pzn }) : null,
                    format?.label,
                    unitVolumeWithContentSizeFactor
                  ]
                    .filter(value => !!value)
                    .join(' - ')}
                </small>
              )}
            </div>
            <Reviews
              numberOfReviews={rating?.numberOfReviews}
              rating={rating?.averageRating}
            />
            {!isCompact && (
              <Availability
                data-testid="productCardAvailability"
                availability={availability}
                className="pt-1"
              />
            )}
          </Link>
        </ProductLink>

        {/* Add to basket controls  */}
        <div
          className={classNames('w-full', {
            'h-full flex justify-between items-center pr-2': isCompact
          })}
          data-testid="addToBasketControls"
        >
          <ProductLink href={url}>
            <Link
              data-testid="productCardLink"
              className={classNames(
                'block no-underline hover:text-primary-oxford-blue',
                {
                  'p-2 flex-1': isCompact
                }
              )}
            >
              {price && (
                <Price
                  price={price}
                  rrp={rrp}
                  showRRP={showRRP}
                  size="medium"
                  rrpSize="base"
                  isCompact={isCompact}
                  superscriptDecimals={!isCompact}
                  isPricePerUnitBelowRRP
                  rrpColor="secondary"
                  className={isCompact ? 'h-6 justify-start' : 'mb-2'}
                  data-testid="productCardPrice"
                />
              )}
            </Link>
          </ProductLink>
          <AddToBasketButton
            product={product}
            basketQuantity={basketQuantity}
            isLoading={addToBasketIsLoading}
            maxQuantity={productMaxQuantity}
            addToBasket={handleAddToBasket}
            removeFromBasket={() => removeFromBasket?.(product)}
            isCompact={isCompact}
          />
        </div>
      </div>
    </>
  )
}
