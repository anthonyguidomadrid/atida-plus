import {
  BaseSyntheticEvent,
  ChangeEvent,
  FunctionComponent,
  RefObject,
  useEffect,
  useState
} from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { Notification } from '~components/atoms/Notification'
import { BasketProductModal } from '~components/molecules/BasketProductModal/BasketProductModal'
import { Product } from '~domains/product'
import { Button } from '~components/atoms/Button'
import { AvailabilityWarningBlock } from '~components/atoms/AvailabilityWarningBlock'

export type BasketModalProps = {
  product: Product | null
  productSku: string
  productQuantity: number
  isBasketModalOpen: boolean
  isRemoved?: boolean
  wasItemError?: boolean
  modalRef?: RefObject<HTMLDivElement>
  inputValue?: string
  maxQuantity?: number
  inputRef?: ((instance: HTMLInputElement) => void) | null | undefined
  removeFromBasket?: () => void
  changeQuantity?: (e: ChangeEvent<HTMLInputElement>) => void
  addToBasket?: (product: Product) => void
  increaseQuantity?: (
    e: React.MouseEvent<HTMLElement>,
    product?: Product
  ) => void
  decreaseQuantity?: (
    e: React.MouseEvent<HTMLElement>,
    product?: Product
  ) => void
  basketModalClose?: () => void
  availability?: string
  availableQty?: number
  doExceeds?: boolean
  hasPromotionalItem?: boolean
  isPromotionalItemOutofStock?: boolean
}

export const BasketModal: FunctionComponent<BasketModalProps> = ({
  product,
  productSku,
  productQuantity,
  isRemoved,
  wasItemError,
  modalRef,
  basketModalClose,
  removeFromBasket,
  changeQuantity,
  increaseQuantity,
  decreaseQuantity,
  isBasketModalOpen,
  addToBasket,
  availability,
  inputRef,
  inputValue,
  availableQty,
  maxQuantity,
  doExceeds,
  hasPromotionalItem,
  isPromotionalItemOutofStock
}) => {
  const { t } = useTranslation()
  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [promotionalItem, setPromotionalItem] = useState({
    handleQuantityChange: false,
    handleRemoval: false,
    parentSku: ''
  })

  const viewBasketTrigger = (event: BaseSyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true)
    push('/basket')
  }

  useEffect(() => {
    if (promotionalItem.parentSku && promotionalItem.parentSku !== productSku) {
      setPromotionalItem({
        handleQuantityChange: false,
        handleRemoval: false,
        parentSku: ''
      })
    }

    hasPromotionalItem &&
      setPromotionalItem({
        handleQuantityChange: true,
        handleRemoval: true,
        parentSku: productSku
      })
  }, [hasPromotionalItem, productSku, promotionalItem.parentSku])

  return (
    <div data-testid="basketModal">
      {isBasketModalOpen && (
        /* Basket Layout */
        <div
          data-testid="basketModalLayout"
          className="fixed top-0 right-0 w-full h-full z-50 "
        >
          <div
            style={
              isBasketModalOpen
                ? { backgroundColor: 'rgba(26, 29, 50, 0.2)' }
                : {}
            }
            className="flex h-full relative "
          >
            <div
              ref={modalRef}
              className={classNames(
                'w-full sm:h-full max-w-74 top-0 right-0 absolute sm:bottom-0 bg-primary-white',
                'transition-all duration-500 ease-in-out',
                {
                  'right-0': isBasketModalOpen,
                  '-right-full': !isBasketModalOpen
                }
              )}
            >
              <>
                {!wasItemError ? (
                  <Notification
                    data-testid="basketModalNotification"
                    handleClose={basketModalClose}
                    closeIcon={true}
                    type={isRemoved ? 'warning' : 'success'}
                    title={
                      isRemoved
                        ? promotionalItem.handleRemoval
                          ? t('basket.modal-product-gift-removed')
                          : t('basket.modal-product-removed')
                        : promotionalItem.handleQuantityChange
                        ? t('basket.modal-product-gift-added')
                        : t('basket.modal-product-added')
                    }
                  />
                ) : (
                  <Notification
                    handleClose={basketModalClose}
                    closeIcon={true}
                    type={'error'}
                    title={
                      isRemoved
                        ? t('basket.modal-product-unsuccessfully-removed')
                        : t('basket.modal-product-unsuccessfully-added')
                    }
                  />
                )}
                {isPromotionalItemOutofStock && (
                  <AvailabilityWarningBlock isPromotionalItem={true} />
                )}
                <BasketProductModal
                  productSku={productSku}
                  productQuantity={productQuantity}
                  product={product}
                  increaseQuantity={e => increaseQuantity?.(e)}
                  decreaseQuantity={e => decreaseQuantity?.(e)}
                  addToBasket={product => addToBasket?.(product)}
                  removeFromBasket={removeFromBasket}
                  inputRef={inputRef}
                  changeQuantity={e => changeQuantity?.(e)}
                  inputValue={inputValue}
                  availability={availability}
                  availableQty={availableQty}
                  doExceeds={doExceeds}
                  setPromotionalItem={setPromotionalItem}
                  promotionalItem={promotionalItem}
                  maxQuantity={maxQuantity}
                />
                <hr className="text-ui-grey-lightest " />
                {/* <BasketModalActions*/}
                <div
                  data-testid="basketProductModalActions"
                  className="sm:flex justify-between w-full p-2 "
                >
                  <Button
                    data-testid="basketModalViewBasket"
                    className="w-full h-6 no-underline sm:max-w-27"
                    onClick={viewBasketTrigger}
                    isLoading={isLoading}
                    variant="secondary"
                  >
                    {t('basket.modal-view-basket')}
                  </Button>
                  <Button
                    className="w-full h-6 sm:max-w-27 sm:mt-0 mt-2"
                    data-testid="basketModalContinueShopping"
                    onClick={basketModalClose}
                    variant="tertiary"
                  >
                    {t('basket.modal-continue-shopping')}
                  </Button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
