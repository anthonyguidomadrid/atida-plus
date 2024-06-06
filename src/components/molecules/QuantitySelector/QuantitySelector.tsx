import React, {
  FunctionComponent,
  ComponentPropsWithoutRef,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react'
import classNames from 'classnames'
import { Button } from '~components/atoms/Button'
import { ReactComponent as PlusLarge } from '~assets/svg/navigation-24px/PlusLarge.svg'
import { ReactComponent as MinusLarge } from '~assets/svg/navigation-24px/MinusLarge.svg'
import { ReactComponent as NavDelete } from '~assets/svg/navigation-24px/NavDelete.svg'
import { useTranslation } from 'react-i18next'
import { BasketPromotionalItem } from '~domains/product'

export type QuantitySelectorProps = {
  quantity: number
  showRemoveButton: boolean
  disableIncreaseButton: boolean
  disableDecreaseButton?: boolean
  isPdp?: boolean
  isFullWidth?: boolean
  innerBorder?: boolean
  inputValue?: string
  inputRef?: ((instance: HTMLInputElement) => void) | null | undefined
  onQuantityChange?: (e: ChangeEvent<HTMLInputElement>) => void
  removeFromBasket: (e: React.MouseEvent<HTMLElement>) => void
  decreaseQuantity: (e: React.MouseEvent<HTMLElement>) => void
  increaseQuantity: (e: React.MouseEvent<HTMLElement>) => void
  setFullWidth?: (isFullWidth: boolean) => void
  setPromotionalItem?: Dispatch<
    SetStateAction<{
      handleQuantityChange: boolean
      handleRemoval: boolean
      parentSku: string
    }>
  >
  promotionalItem?: BasketPromotionalItem
  availability?: string
}

export const QuantitySelector: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & QuantitySelectorProps
> = ({
  quantity,
  isFullWidth = false,
  showRemoveButton = true,
  innerBorder = true,
  disableDecreaseButton,
  disableIncreaseButton,
  removeFromBasket,
  decreaseQuantity,
  increaseQuantity,
  onQuantityChange,
  inputRef,
  inputValue,
  className,
  setPromotionalItem,
  promotionalItem,
  availability
}) => {
  const { t } = useTranslation()
  const restrictedSymbols = ['e', 'E', '+', '-', '.']

  const handleQuantityChange = (e: React.MouseEvent<HTMLElement>) => {
    promotionalItem &&
      setPromotionalItem &&
      setPromotionalItem({
        ...promotionalItem,
        handleQuantityChange: false
      })
    increaseQuantity(e)
  }

  return (
    <div
      data-testid="quantitySelector"
      className={classNames(
        'flex h-6 box-content',
        {
          'w-full': isFullWidth,
          'w-21 sm:w-19': !isFullWidth,
          'border border-ui-grey-light rounded': !innerBorder
        },
        className
      )}
    >
      <Button
        variant="tertiary"
        icon={
          <NavDelete
            className={classNames('icon-24', {
              'text-ui-grey-light': availability === 'NOT_AVAILABLE'
            })}
          />
        }
        className={classNames(
          'w-6 rounded-r-none h-6 hover:bg-ui-black-5 focus:outline-none active:bg-ui-black-10',
          {
            'border-ui-grey-light': availability === 'NOT_AVAILABLE',
            hidden: !showRemoveButton
          }
        )}
        onClick={removeFromBasket}
        data-testid="removeProductButton"
        aria-label={t('basket.item-remove', {})}
        singleIcon={true}
      />
      <Button
        variant={'tertiary'}
        icon={
          <MinusLarge
            className={classNames('icon-24', {
              'text-ui-grey-light': availability === 'NOT_AVAILABLE'
            })}
          />
        }
        className={classNames('w-6 rounded-r-none h-6', {
          'border-ui-grey-light': availability === 'NOT_AVAILABLE',
          'hover:bg-ui-black-5 focus:outline-none active:bg-ui-black-10': !disableDecreaseButton,
          hidden: showRemoveButton,
          'border-none': !innerBorder
        })}
        onClick={decreaseQuantity}
        data-testid="decreaseQuantityButton"
        aria-label={t('basket.decrease-quantity.label')}
        disabled={
          typeof disableDecreaseButton === 'undefined'
            ? quantity === 0 || !quantity
            : disableDecreaseButton
        }
        singleIcon={true}
      />
      <div
        className={classNames(
          'flex flex-col grow justify-center w-4 xs:w-7 sm:w-8 items-center',
          {
            'border-t border-b': innerBorder,
            'border-ui-grey-light': availability === 'NOT_AVAILABLE'
          }
        )}
      >
        <input
          className={classNames(
            'w-full text-center  focus:placeholder-primary-white quantity-input h-6',
            {
              'text-ui-grey-light placeholder-ui-grey-light bg-transparent':
                availability === 'NOT_AVAILABLE',
              'placeholder-primary-oxford-blue':
                availability !== 'NOT_AVAILABLE'
            }
          )}
          type="number"
          onChange={e => onQuantityChange?.(e)}
          placeholder={quantity.toString()}
          value={inputValue}
          ref={inputRef}
          disabled={availability === 'NOT_AVAILABLE'}
          data-testid="quantityInput"
          step={1}
          min={1}
          onKeyDown={e =>
            restrictedSymbols.includes(e.key) && e.preventDefault()
          }
        />
      </div>
      <Button
        variant={'tertiary'}
        icon={
          <PlusLarge
            className={classNames('icon-24', {
              'text-ui-grey-light': availability === 'NOT_AVAILABLE'
            })}
          />
        }
        onClick={handleQuantityChange}
        className={classNames('w-6 rounded-l-none h-6', {
          'border-ui-grey-light': availability === 'NOT_AVAILABLE',
          'hover:bg-ui-black-5 focus:outline-none active:bg-ui-black-10': !disableIncreaseButton,
          'border-none': !innerBorder
        })}
        disabled={disableIncreaseButton}
        data-testid="increaseQuantityButton"
        aria-label={t('basket.increase-quantity.label')}
        singleIcon={true}
      />
    </div>
  )
}
