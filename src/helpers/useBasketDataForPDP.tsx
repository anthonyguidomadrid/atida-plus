import { useMemo, useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'

import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import {
  selectItems,
  addToBasketFulfill,
  addToBasketTrigger,
  handleProductQuantityAction,
  removeFromBasketFulfill,
  removeFromBasketTrigger,
  triggerBasketModal
} from '~domains/basket'
import { BasketItem, RemoveBasketItem } from '~domains/basket/types'
import { Product, selectProductData } from '~domains/product'

export type UseBasketDataForPDP = {
  itemInBasket: (BasketItem & {
    product: Omit<Partial<Product>, 'sku' | 'price'>
  })[]
  itemNoPromoInBasket?: BasketItem & {
    product: Omit<Partial<Product>, 'sku' | 'price'>
  }
  currentQuantityValue: number
  productMaxQuantity: number
  addToBasket?: (
    product: Product,
    added_from: string,
    quantity?: number
  ) => () => void
  removeFromBasket?: (
    product?: RemoveBasketItem,
    removed_from?: string
  ) => () => void
}

export const useBasketDataForPDP = (
  basketNotificationData?: UseBasketNotification
): UseBasketDataForPDP => {
  const dispatch = useDispatch()
  const product = useSelector(selectProductData)
  const basketItems = useSelector(selectItems)
  const itemInBasket = useMemo(
    () => basketItems.filter(item => product?.sku === item.sku),
    [basketItems, product?.sku]
  )
  const itemNoPromoInBasket = useMemo(
    () =>
      product &&
      basketItems.find(item => item.sku === product.sku && !item.isPromo),
    [basketItems, product]
  )

  const [currentQuantityValue, setCurrentQuantityValue] = useState(0)
  const productMaxQuantity = product?.maxQuantity ?? MAXIMUM_PRODUCT_QUANTITY

  const addToBasket = useCallback(
    (product: Product, added_from: string, quantity = 1) => () => {
      setCurrentQuantityValue(0)
      if (product) {
        if (product.basketQuantity && product.basketQuantity > 0)
          setCurrentQuantityValue(product.basketQuantity ?? 0)
        setCurrentQuantityValue(1)
        dispatch(
          addToBasketTrigger({
            sku: product?.sku,
            quantity,
            added_from
          })
        )
        dispatch(triggerBasketModal(product))
        dispatch(handleProductQuantityAction(false))
        dispatch({
          type: 'basket',
          [WAIT_FOR_ACTION]: addToBasketFulfill({
            sku: product?.sku,
            quantity: 1,
            added_from
          }).type
        })
        if (!basketNotificationData?.isNotificationOpen)
          basketNotificationData?.setIsNotificationOpen(value => !value)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, basketNotificationData?.isNotificationOpen]
  )

  const removeFromBasket = useCallback(
    (product?: RemoveBasketItem, removed_from?: string) => () => {
      dispatch(
        removeFromBasketTrigger({
          sku: product?.sku,
          id: product?.id,
          removed_from
        })
      )

      dispatch(handleProductQuantityAction(true))
      setCurrentQuantityValue(0)
      dispatch({
        type: 'basket',
        [WAIT_FOR_ACTION]: removeFromBasketFulfill({
          sku: product?.sku,
          id: product?.id,
          removed_from
        }).type
      })
      if (!basketNotificationData?.isNotificationOpen)
        basketNotificationData?.setIsNotificationOpen(value => !value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, basketNotificationData?.isNotificationOpen]
  )

  return {
    itemInBasket,
    itemNoPromoInBasket,
    currentQuantityValue,
    productMaxQuantity,
    addToBasket: basketNotificationData ? addToBasket : undefined,
    removeFromBasket: basketNotificationData ? removeFromBasket : undefined
  }
}

export type UseBasketNotification = {
  isNotificationOpen: boolean
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>
  basketNotificationRef: React.RefObject<HTMLDivElement>
}

export const useBasketNotification = (): UseBasketNotification => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const basketNotificationRef = useRef<HTMLDivElement>(null)

  return {
    isNotificationOpen,
    setIsNotificationOpen,
    basketNotificationRef
  }
}
