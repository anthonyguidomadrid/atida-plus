import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'

export const validateMaxQuantity = (
  itemQuantity: number,
  maxAvailableQuantity?: number
): boolean => {
  if (maxAvailableQuantity && maxAvailableQuantity < MAXIMUM_PRODUCT_QUANTITY)
    return itemQuantity >= maxAvailableQuantity
  return itemQuantity >= MAXIMUM_PRODUCT_QUANTITY
}
