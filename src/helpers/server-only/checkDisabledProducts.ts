import { removeFromBasket } from '~domains/basket/services/remove-from-basket'
import { BasketWithProducts } from '~domains/basket/types'
import { fetchBasket } from '~domains/basket/services/fetch-basket'

export const checkDisabledProducts = async (
  basket: BasketWithProducts,
  locale: string | string[],
  anonymousCustomerUniqueId: string,
  token: string
): Promise<BasketWithProducts> => {
  const disabledItem = basket.items?.find(item => !item.product?.enabled)
  if (disabledItem) {
    await removeFromBasket(
      locale.toString(),
      { ...disabledItem, basketId: basket.id as string },
      {
        anonymousCustomerUniqueId,
        token
      }
    )
    basket = await fetchBasket(locale.toString(), {
      anonymousCustomerUniqueId,
      token
    })
    return checkDisabledProducts(
      basket,
      locale,
      anonymousCustomerUniqueId,
      token
    )
  }

  return basket
}
