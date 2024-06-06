import classNames from 'classnames'
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  Dispatch,
  forwardRef,
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'

import { RootState } from '~domains/redux'
import { Product, selectProductData } from '~domains/product'
import { selectItemIsLoading, selectItems } from '~domains/basket'
import { RemoveBasketItem } from '~domains/basket/types'
import {
  breakpoints,
  pixelBreakpoints,
  useBreakpoint
} from '~domains/breakpoints'

import { ReactComponent as AddToBasket } from '~assets/svg/navigation-24px/AddToBasket.svg'
import { Button } from '~components/atoms/Button'
import { Price } from '~components/atoms/Price'
import { ProductSavings } from '~components/atoms/ProductSavings'
import { QuantitySelector } from '~components/molecules/QuantitySelector'
import { Image } from '~components/atoms/Image'
import { DEFAULT_PRODUCT_IMAGE_SIZE } from '~config/constants/images'
import { useInnerWidth } from '~domains/breakpoints/hooks/useInnerWidth'

export type AddToBasketControlsProps = {
  newQuantitySelectorValue: number
  setNewQuantitySelectorValue: Dispatch<React.SetStateAction<number>>
  addToBasket: (
    product: Product,
    added_from: string,
    quantity?: number
  ) => () => void
  removeFromBasket: (
    product?: RemoveBasketItem | undefined,
    removed_from?: string | undefined
  ) => () => void
  productMaxQuantity?: number
  unitVolumeWithContentSizeFactor?: string | null
  isSticky?: boolean
  isVisible?: boolean
}

export const AddToBasketControlsPlaceholder: FunctionComponent<
  ComponentPropsWithoutRef<'button'>
> = () => (
  <button
    className="w-full h-6 bg-ui-grey-lightest rounded cursor-not-allowed button"
    disabled
  />
)

export const AddToBasketControls: FunctionComponent<
  ComponentPropsWithRef<'div'> & AddToBasketControlsProps
> = forwardRef(
  (
    {
      newQuantitySelectorValue,
      setNewQuantitySelectorValue,
      addToBasket,
      removeFromBasket,
      productMaxQuantity = MAXIMUM_PRODUCT_QUANTITY,
      unitVolumeWithContentSizeFactor,
      isSticky = false,
      isVisible = true
    },
    ref
  ) => {
    const { t } = useTranslation()
    const innerWidth = useInnerWidth()
    const isSmallSize = useBreakpoint(breakpoints.sm)

    const product = useSelector(selectProductData)
    const basketItems = useSelector(selectItems)
    const productInBasket = useMemo(
      () =>
        product &&
        basketItems.find(item => item.sku === product.sku && !item.isPromo),
      [basketItems, product]
    )

    const addToBasketIsLoading = useSelector<
      RootState,
      ReturnType<typeof selectItemIsLoading>
    >(state => selectItemIsLoading(state, { sku: product?.sku }))

    const productIsAvailable = useMemo(
      () => product?.availability === 'AVAILABLE',
      [product]
    )

    const increaseQuantityForNewSelector = useCallback(() => {
      if (newQuantitySelectorValue + 1 <= productMaxQuantity)
        setNewQuantitySelectorValue(v => v + 1)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newQuantitySelectorValue, productMaxQuantity])

    const decreaseQuantityForNewSelector = useCallback(() => {
      if (newQuantitySelectorValue >= 1) setNewQuantitySelectorValue(v => v - 1)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newQuantitySelectorValue])

    const handleNewQuantitySelectorChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value
        if (value >= 1 && value <= productMaxQuantity)
          setNewQuantitySelectorValue(value)
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [productMaxQuantity]
    )

    const [shouldRender, setShouldRender] = useState<boolean>(
      !isSticky || innerWidth < pixelBreakpoints.md
    )

    useEffect(() => {
      if (!shouldRender) {
        const timeout = setTimeout(() => {
          setShouldRender(true)
        }, 2000)
        return () => {
          clearTimeout(timeout)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!product || (!productIsAvailable && isSticky) || !shouldRender)
      return null

    return (
      <section
        className={classNames({
          'transition transform bg-primary-white fixed z-10 bottom-0 left-0 w-full border-t md:border-t-0 md:border-b border-ui-grey-lightest shadow-sm-reverse md:top-7 md:bottom-auto md:shadow-sm':
            productIsAvailable && isSticky,
          'md:translate-y-10': isSticky && isVisible,
          'sm:relative sm:z-auto sm:w-auto sm:p-0 sm:shadow-none': !isSticky
        })}
        data-testid="addToBasketControls"
        id="stickyAddToBasketControls"
        ref={ref}
      >
        <div
          className={classNames('flex flex-col gap-1 justify-between', {
            'w-full p-2 sm:gap-4 sm:flex-row sm:justify-end md:container md:container-fixed md:mx-auto':
              productIsAvailable && isSticky
          })}
        >
          {isSticky && (
            <div className="w-full hidden md:flex">
              <div className="min-w-6.25 w-6.25 h-6.25 mr-1">
                <Image
                  src={product.productDatImage || product.mediumImage || ''}
                  platform="bynder"
                  alt={product.name}
                  className="w-full h-full"
                  data-testid="MinifiedProductTileImage"
                  loading="lazy"
                  width={DEFAULT_PRODUCT_IMAGE_SIZE}
                  height={DEFAULT_PRODUCT_IMAGE_SIZE}
                  useAlternativeFormats={!!product.productDatImage}
                  fallbackImageElement={
                    <img
                      src={product.mediumImage}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      data-testid="MinifiedProductTileImage"
                    />
                  }
                />
              </div>
              <div>
                <p className="pb-0.5 text-sm font-semibold line-clamp-1">
                  {product.name}
                </p>
                <small className="text-sm text-ui-grey">
                  {[product.format?.label, unitVolumeWithContentSizeFactor]
                    .filter(value => !!value)
                    .reduce<ReactNode[]>(
                      (prev, curr) => [
                        prev,
                        !!prev.length ? ' - ' : null,
                        curr
                      ],
                      []
                    )}
                </small>
              </div>
            </div>
          )}
          {product?.price && productIsAvailable && isSticky && (
            <div
              className={classNames(
                'flex items-start w-full sm:w-max sm:flex-col sm:justify-center sm:items-end',
                {
                  'justify-between': productIsAvailable,
                  'justify-start': !productIsAvailable
                }
              )}
            >
              <ProductSavings
                rrp={product.rrp}
                price={product.price}
                className="text-sm sm:w-max"
              />
              {isSticky && isVisible && isSmallSize && (
                <Price
                  price={product.price}
                  pricePerUnit={product?.pricePerUnit}
                  rrp={product?.rrp}
                  size="small"
                  data-testid="productPrice"
                  showRRP={!!product.rrp || (isSticky && isVisible)}
                  rrpColor="secondary"
                  className={classNames({
                    'gap-1': isSticky && isVisible && isSmallSize
                  })}
                />
              )}
            </div>
          )}
          <div
            className={classNames(
              'w-full flex justify-between items-center gap-1',
              {
                'sm:w-max sm:justify-en': isSticky
              }
            )}
          >
            {productIsAvailable && (
              <QuantitySelector
                isPdp={true}
                quantity={newQuantitySelectorValue}
                showRemoveButton={false}
                disableDecreaseButton={newQuantitySelectorValue == 1}
                disableIncreaseButton={
                  newQuantitySelectorValue == productMaxQuantity
                }
                onQuantityChange={handleNewQuantitySelectorChange}
                removeFromBasket={removeFromBasket(
                  productInBasket,
                  PATH_DESCRIPTION.PDP
                )}
                inputValue={newQuantitySelectorValue.toString()}
                increaseQuantity={increaseQuantityForNewSelector}
                decreaseQuantity={decreaseQuantityForNewSelector}
                className="grow col-span-5 md:col-span-4 lg:col-span-3 max-w-18"
                innerBorder={false}
              />
            )}
            <Button
              disabled={
                !product.enabled ||
                product.availability === 'NOT_AVAILABLE' ||
                product.availability === undefined
              }
              type="button"
              variant="secondary"
              data-testid="addToBasketButton"
              aria-label={t('product.add-to-basket')}
              icon={<AddToBasket className="icon-24" />}
              className={classNames('h-6 sm:h-6 grow border-none', {
                'sm:w-22.5': isSticky
              })}
              onClick={addToBasket(
                product,
                PATH_DESCRIPTION.PDP,
                newQuantitySelectorValue
              )}
              isLoading={addToBasketIsLoading}
              singleIcon={true}
            >
              {t('product.add-to-basket')}
            </Button>
          </div>
        </div>
      </section>
    )
  }
)
