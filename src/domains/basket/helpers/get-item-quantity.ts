import { BasketItem } from '~domains/basket/types'

export const getItemQuantity = (
  currentItems: BasketItem[],
  sku: string | undefined
): number | undefined => {
  return currentItems.find(item => item.sku === sku)?.quantity
}
