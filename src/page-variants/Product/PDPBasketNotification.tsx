import { useSelector } from 'react-redux'
import {
  selectBasketModalProduct,
  selectItemWasError,
  selectItemWasSuccess,
  selectNumberOfItems,
  selectQuantityAction
} from '~domains/basket'
import { RootState } from '~domains/redux'
import { selectProductData } from '~domains/product'
import { BasketNotification } from '~components/organisms/BasketNotification'
import {
  UseBasketDataForPDP,
  UseBasketNotification
} from '~helpers/useBasketDataForPDP'
import { timeout } from '~helpers/timeout'

export const PDPBasketNotification = ({
  basketDataForPDP,
  basketNotificationData
}: {
  basketDataForPDP: UseBasketDataForPDP
  basketNotificationData: UseBasketNotification
}) => {
  const product = useSelector(selectProductData)
  const basketModalProduct = useSelector(selectBasketModalProduct)
  const basketItemsCount = useSelector(selectNumberOfItems)
  const isRemoved = useSelector(selectQuantityAction)

  const wasItemError = useSelector<
    RootState,
    ReturnType<typeof selectItemWasError>
  >(state => selectItemWasError(state, { sku: product?.sku ?? undefined }))

  const wasItemSuccess = useSelector<
    RootState,
    ReturnType<typeof selectItemWasSuccess>
  >(state => selectItemWasSuccess(state, { sku: product?.sku ?? undefined }))

  const fadeOut = async () => {
    await timeout(200)
    basketNotificationData.setIsNotificationOpen(false)
  }

  // TODO Move to NewPDP.tsx ???
  if (
    !(
      basketNotificationData.isNotificationOpen &&
      (wasItemError || wasItemSuccess)
    )
  )
    return null

  return (
    <BasketNotification
      product={basketModalProduct ?? product}
      isRemoved={isRemoved}
      wasItemError={wasItemError}
      wasItemSuccess={wasItemSuccess}
      isModalOpen={basketNotificationData.isNotificationOpen}
      onTransitionEnd={() => {
        basketNotificationData.basketNotificationRef?.current?.classList.remove(
          'basketNotificationFadeIn'
        )
        basketNotificationData.basketNotificationRef?.current?.classList.add(
          'basketNotificationFadeOut'
        )
        fadeOut()
      }}
      basketNotificationRef={basketNotificationData.basketNotificationRef}
      basketItems={basketItemsCount}
      hasPromotionalItem={basketDataForPDP.itemInBasket[0]?.hasPromotionalItem}
      isPromotionalItemOutOfStock={
        basketDataForPDP.itemInBasket[0]?.hasPromotionalItemOutofStock
      }
    />
  )
}
