import {
  Fragment,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Product } from '~domains/product/types'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  addSeveralToBasketTrigger,
  selectItemsAnyLoading
} from '~domains/basket'

import { MinifiedProductTile } from '~components/molecules/MinifiedProductTile'
import { Button } from '~components/atoms/Button'
import { ReactComponent as Add } from '~assets/svg/navigation-16px/NavAdd.svg'
import { ReactComponent as AddToBasket } from '~assets/svg/navigation-24px/AddToBasket.svg'
import { Price } from '~components/atoms/Price'
import { BasketNotification } from '../BasketNotification'
import { timeout } from '~helpers/timeout'

export type FreqBoughtTogetherProps = {
  mainProduct?: Product
  recommendedProducts?: Partial<Product>[]
  recommendationId?: string
}

const isProductAvailable = (p: Partial<Product>) =>
  p && p.availability === 'AVAILABLE'

export const FreqBoughtTogether: FunctionComponent<FreqBoughtTogetherProps> = ({
  mainProduct,
  recommendedProducts,
  recommendationId
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const anySkuIsLoading = useSelector(selectItemsAnyLoading)
  const allProducts = useMemo(
    () => [
      ...(mainProduct ? [mainProduct] : []),
      ...(recommendedProducts
        ? recommendedProducts.filter(isProductAvailable)
        : [])
    ],
    [mainProduct, recommendedProducts]
  )
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false)
  const basketNotificationRef = useRef<HTMLDivElement>(null)
  const fadeOut = async () => {
    await timeout(200)
    setIsNotificationOpen(false)
  }

  const [order, setOrder] = useState<Partial<Product>[]>([])
  const [selectedProductSkus, setSelectedProductSkus] = useState<string[]>(
    mainProduct && isProductAvailable(mainProduct) ? [mainProduct?.sku] : []
  )
  const selectedProducts: Partial<Product>[] = useMemo(
    () => allProducts.filter(p => selectedProductSkus.includes(p.sku || '')),
    [allProducts, selectedProductSkus]
  )
  const totalPrice = useMemo(
    () =>
      selectedProducts.reduce(
        (prev: number, curr: Partial<Product>) =>
          prev + (curr.price ? curr.price.value : 0),
        0
      ),
    [selectedProducts]
  )
  const totalRrp = useMemo(
    () =>
      selectedProducts.reduce(
        (prev: number, curr: Partial<Product>) =>
          prev + (curr.rrp ? curr.rrp.value : 0),
        0
      ),
    [selectedProducts]
  )

  const canAddToBasket = useMemo(() => selectedProductSkus.length > 0, [
    selectedProductSkus
  ])

  const buttonLabel = useMemo(() => {
    if (!canAddToBasket) return t('freq-bought-together.no-products-selected')
    return selectedProducts.length === 1
      ? t('product.add-quantity-to-basket')
      : t('product.add-quantity-to-basket_plural', {
          count: selectedProducts.length
        })
  }, [canAddToBasket, selectedProducts.length, t])

  const onSelect = useCallback(
    (sku: string, value: boolean) => {
      if (value && !selectedProductSkus.includes(sku)) {
        setSelectedProductSkus([...selectedProductSkus, sku])
      } else if (!value && selectedProductSkus.includes(sku)) {
        setSelectedProductSkus(
          selectedProductSkus.filter(productSku => productSku !== sku)
        )
      }
    },
    [selectedProductSkus]
  )

  const handleAddSeveralToBasket = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (!selectedProductSkus.length) return
      setOrder(selectedProducts)
      dispatch(
        addSeveralToBasketTrigger(
          removeUndefinedPropertiesFromObject({
            skus: selectedProductSkus,
            quantity: 1,
            added_from:
              PATH_DESCRIPTION.RECOMMENDATIONS_WIDGET_FREQUENTLY_BOUGHT_TOGETHER
          })
        )
      )
      if (!isNotificationOpen) setIsNotificationOpen(value => !value)
    },
    [dispatch, isNotificationOpen, selectedProductSkus, selectedProducts]
  )

  useEffect(() => {
    setSelectedProductSkus(
      mainProduct && isProductAvailable(mainProduct) ? [mainProduct?.sku] : []
    )
  }, [mainProduct])

  if (!mainProduct || allProducts.length < 2) return null

  return (
    <>
      <div
        className={classNames('flex flex-col items-center', {
          'pointer-events-none opacity-50': isNotificationOpen
        })}
        data-testid="freq-bought-together"
      >
        {allProducts.map((product, idx) => (
          <Fragment key={product.sku}>
            <MinifiedProductTile
              onSelect={onSelect}
              product={product}
              isSelected={selectedProductSkus.includes(product.sku || '')}
              isMainProduct={mainProduct.sku === product.sku && idx === 0}
              showCheckbox={true}
              recommendationId={recommendationId}
            />
            {idx < allProducts.length - 1 && (
              <Add
                className="icon-16 button__icon--before my-1"
                data-testid="freq-bought-together-plus-icon"
              />
            )}
          </Fragment>
        ))}
        <div className="flex justify-between sm:justify-end md:justify-between w-full py-2 sm:space-x-4 md:space-x-0">
          <p className="text-base">
            {t('freq-bought-together.total-for-all-selected-products')}
          </p>
          <Price
            rrpColor="secondary"
            data-testid="freq-bought-together-total-price"
            price={{
              value: totalPrice,
              currency: mainProduct.price.currency
            }}
            rrp={{
              value: totalRrp,
              currency: mainProduct.price.currency
            }}
            showRRP={canAddToBasket}
            size="small"
            className="text-xl justify-between gap-1"
          />
        </div>
        <Button
          disabled={!canAddToBasket}
          variant="primary"
          className="w-full sm:w-auto sm:px-3 md:w-full md:px-0 sm:self-end"
          icon={
            canAddToBasket ? (
              <AddToBasket className="w-2.75 h-2.75" />
            ) : undefined
          }
          onClick={handleAddSeveralToBasket}
          onKeyDown={handleAddSeveralToBasket}
          isLoading={anySkuIsLoading}
        >
          {buttonLabel}
        </Button>
      </div>
      {isNotificationOpen && (
        <BasketNotification
          products={order}
          wasItemSuccess={true}
          isModalOpen={isNotificationOpen}
          basketNotificationRef={basketNotificationRef}
          onTransitionEnd={() => {
            basketNotificationRef?.current?.classList.remove(
              'basketNotificationFadeIn'
            )
            basketNotificationRef?.current?.classList.add(
              'basketNotificationFadeOut'
            )
            fadeOut()
          }}
        />
      )}
    </>
  )
}
