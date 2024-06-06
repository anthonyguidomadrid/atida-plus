import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash/debounce'
import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { QuantitySelector } from './QuantitySelector'
import { Button } from '~components/atoms/Button'
import classNames from 'classnames'

type ProductQuantitySelectorProps = {
  initialQuantity?: number
  maxAvailableQuantity?: number
  isDisabled: boolean
  isLoading: boolean
  onRemove: (e: React.MouseEvent<HTMLElement>) => void
  onChange: (quantity: number) => void
  isFullWidth?: boolean
}

const DEBOUNCE_MS = 750

export const ProductQuantitySelector: FunctionComponent<ProductQuantitySelectorProps> = ({
  initialQuantity,
  maxAvailableQuantity,
  isDisabled,
  isLoading: loading,
  onRemove,
  onChange,
  isFullWidth = false
}) => {
  const { t } = useTranslation()
  const [quantity, setQuantity] = useState(initialQuantity ?? 0)

  const maxQuantity = useMemo(
    () => maxAvailableQuantity ?? MAXIMUM_PRODUCT_QUANTITY,
    [maxAvailableQuantity]
  )

  const disabled = useMemo(() => quantity === maxQuantity || isDisabled, [
    quantity,
    maxQuantity,
    isDisabled
  ])

  const isLoading = useMemo(() => quantity === 0 || loading, [
    quantity,
    loading
  ])
  const canRemove = useMemo(() => quantity === 1, [quantity])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce(
      (quantity: number) => {
        onChange(quantity)
      },
      DEBOUNCE_MS,
      {
        leading: false,
        trailing: true
      }
    ),
    [onChange]
  )

  const handleQuantityChanged = useCallback(
    (value: number) => {
      const quantity =
        value > maxQuantity ? maxQuantity : value === 0 ? 1 : value
      setQuantity(quantity)
      debouncedOnChange(quantity)
    },
    [debouncedOnChange, maxQuantity]
  )

  useEffect(() => {
    setQuantity(initialQuantity ?? 0)
  }, [initialQuantity])

  useEffect(() => {
    if (maxQuantity < quantity) {
      setQuantity(maxQuantity)
    }
  }, [maxQuantity, quantity])

  return (
    <div className="relative h-6">
      {quantity === maxQuantity && (
        <div
          role="alert"
          data-testid="alert"
          className="text-feedback-warning text-sm text-left font-semibold absolute -top-2.25 left-0 right-0"
        >
          {t('maximum-product-quantity', {
            quantity: maxQuantity
          })}
        </div>
      )}
      {isLoading ? (
        <Button
          variant={'tertiary'}
          className={classNames('h-6 border-primary-oxford-blue', {
            'w-full p-0': isFullWidth,
            'w-21 sm:w-19': !isFullWidth
          })}
          isLoading={true}
        />
      ) : (
        <QuantitySelector
          quantity={quantity}
          showRemoveButton={canRemove}
          disableIncreaseButton={disabled}
          removeFromBasket={e => onRemove(e)}
          increaseQuantity={() => handleQuantityChanged(quantity + 1)}
          decreaseQuantity={() => handleQuantityChanged(quantity - 1)}
          onQuantityChange={e => handleQuantityChanged(+e.target.value)}
          inputValue={quantity.toString()}
          isFullWidth={isFullWidth}
        />
      )}
    </div>
  )
}
