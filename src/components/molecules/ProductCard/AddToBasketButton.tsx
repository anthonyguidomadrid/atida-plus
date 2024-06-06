import { FunctionComponent, useCallback } from 'react'
import { useTranslation } from 'react-i18next/'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { Product } from '~domains/product'
import { ReactComponent as Check } from '~assets/svg/navigation-24px/Checkmark.svg'
import { ReactComponent as AddToBasketIcon } from '~assets/svg/newAddToBasket.svg'
import { Button } from '~components/atoms/Button'
import { ProductQuantitySelector } from '../QuantitySelector'
import { changeItemQuantityTrigger } from '~domains/basket'

export type AddToBasketButtonProps = {
  product: Product
  basketQuantity?: number
  addToBasket: (e: React.MouseEvent<HTMLButtonElement>) => void
  removeFromBasket?: (product: Product) => void
  isLoading: boolean
  isCompact?: boolean
  maxQuantity: number
}

export const AddToBasketButton: FunctionComponent<AddToBasketButtonProps> = props => {
  const {
    product,
    basketQuantity = 0,
    addToBasket,
    isLoading,
    isCompact = false
  } = props
  const { t } = useTranslation()
  const isProductQuantitySelectorEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_QUANTITY_SELECTOR
  )

  if (isProductQuantitySelectorEnabled && !isCompact && basketQuantity > 0)
    return <ProductCardAddToBasketQuantitySelector {...props} />

  return (
    <Button
      variant={
        isCompact
          ? 'primary'
          : basketQuantity && basketQuantity > 0
          ? 'tertiary'
          : 'secondary'
      }
      className={classNames('h-6 text-base', {
        'w-full': !isCompact,
        'w-6': isCompact
      })}
      isLoading={isLoading}
      type="button"
      onClick={addToBasket}
      onKeyDown={e => {
        e.stopPropagation()
      }}
      data-testid="addToBasketButton"
      aria-label={t('product.add-to-basket')}
      disabled={
        product.availability === 'NOT_AVAILABLE' ||
        product.availability === undefined
      }
      icon={
        isCompact ? (
          <AddToBasketIcon className="icon-24 text-primary-white" />
        ) : undefined
      }
      singleIcon={true}
    >
      {isCompact ? null : basketQuantity && basketQuantity > 0 ? (
        <>
          <div className="flex align-center">
            <Check className="icon-24 mr-1" />
            <span className="sr-only">{t('product.in-your-basket')}</span>
            {basketQuantity}
          </div>
        </>
      ) : (
        <span data-testid="screenReaderAddToBasket">
          {t('product.add-to-basket')}
        </span>
      )}
    </Button>
  )
}

export const ProductCardAddToBasketQuantitySelector: FunctionComponent<AddToBasketButtonProps> = ({
  product,
  basketQuantity,
  removeFromBasket,
  isLoading,
  maxQuantity
}) => {
  const dispatch = useDispatch()

  const handleChangeQuantity = useCallback(
    (quantity: number) => {
      dispatch(
        changeItemQuantityTrigger({
          sku: product.sku,
          id: product.sku,
          quantity
        })
      )
    },
    [dispatch, product.sku]
  )

  return (
    <ProductQuantitySelector
      initialQuantity={basketQuantity}
      maxAvailableQuantity={maxQuantity}
      isDisabled={
        product.availability === 'NOT_AVAILABLE' ||
        product.availability === undefined
      }
      onRemove={() => removeFromBasket?.(product)}
      onChange={handleChangeQuantity}
      isLoading={isLoading}
      isFullWidth={true}
    />
  )
}

export const AddToBasketPlaceholder = () => (
  <div className="bg-ui-grey-lightest w-full h-6 rounded opacity-50" />
)
