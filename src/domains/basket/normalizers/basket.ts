import { removeUndefinedPropertiesFromObject } from '~helpers'
import { getPriceChannel } from '../helpers'
import {
  SprykerBasket,
  Basket,
  SprykerBasketItem,
  BasketItem,
  BasketExpense,
  PromotionalItem,
  SessionChannelType
} from '../types'

export const normalizeBasket = (
  basket?: Partial<SprykerBasket>,
  useMockedData?: SessionChannelType
): Basket =>
  removeUndefinedPropertiesFromObject({
    id: basket?.data?.id,
    priceChannel: getPriceChannel(basket?.included, useMockedData),
    currency: basket?.data?.attributes?.currency,
    items: basket?.included
      ?.filter(({ type }) => type === 'guest-cart-items' || type === 'items')
      .map(normalizeBasketItem),
    subTotal: basket?.data?.attributes?.totals?.subtotal,
    itemTotal: basket?.data?.attributes?.totals?.itemTotal,
    shippingTotal: normalizeBasketExpenses(
      basket?.data?.attributes?.expenses,
      basket?.data?.attributes?.totals.expenseTotal
    ), // TODO: might need to be more specific like Pure
    grandTotal: basket?.data?.attributes?.totals?.priceToPay,
    taxTotal: basket?.data?.attributes?.totals?.taxTotal,
    surchargeTotal: basket?.data?.attributes?.totals?.surchargeTotal,
    rrpTotal: basket?.data?.attributes?.totals?.subtotal, // TODO: this is probably wrong
    discountTotal: basket?.data?.attributes?.totals?.discountTotal,
    rrpDiscountTotal: basket?.data?.attributes?.totals?.rrpDiscountTotal,
    totalSaving: basket?.data?.attributes?.totals?.totalSaving,
    rewardTotal: basket?.data?.attributes?.totals?.rewardTotal,
    freeShippingThreshold:
      basket?.data?.attributes?.totals?.freeShippingThreshold,
    coupons: basket?.data?.attributes?.productDiscounts?.filter(
      item => item.code !== null
    ),
    discounts: basket?.data?.attributes?.productDiscounts?.filter(
      item => item.code === null
    ),
    cartCoupons: basket?.data?.attributes?.discounts?.filter(
      item => item.code !== null
    ),
    expenses: basket?.data?.attributes?.expenses,
    promotionalItems: basket?.included
      ?.filter(
        ({ type, attributes }) =>
          type === 'promotional-items' &&
          attributes.discountPercentage === 10000
      )
      .map(normalizeBasketPromotionalItem),
    discountedItems: basket?.included
      ?.filter(
        ({ type, attributes }) =>
          type === 'promotional-items' &&
          attributes?.discountPercentage &&
          attributes.discountPercentage < 10000
      )
      .map(normalizeBasketPromotionalItem),
    deliveryDays: basket?.data?.attributes?.deliveryDays
  })

const normalizeBasketItem = (item?: SprykerBasketItem): BasketItem =>
  removeUndefinedPropertiesFromObject({
    id: item?.id,
    sku: item?.attributes?.sku,
    quantity: item?.attributes?.quantity,
    unitPrice: item?.attributes?.calculations?.unitPrice,
    subtotal: item?.attributes?.calculations?.sumPrice,
    tax: item?.attributes?.calculations?.unitTaxAmountFullAggregation,
    discount: item?.attributes?.calculations?.unitDiscountAmountAggregation,
    unitPriceToPayAggregation:
      item?.attributes?.calculations?.unitPriceToPayAggregation,
    isPromo: item?.attributes?.isPromo,
    isFullyDiscounted: item?.attributes?.isFullyDiscounted,
    isPrescription: item?.attributes?.isPrescription,
    tokenCount: item?.attributes?.tokenCount,
    priceChannel: item?.attributes.price_channel
  })

const normalizeBasketExpenses = (
  expenses?: BasketExpense[],
  shippingTotal?: number
): number | undefined => {
  if (!Array.isArray(expenses)) return shippingTotal

  return expenses.reduce(
    (memo, expense) =>
      memo + expense.sumPriceToPayAggregation * expense.quantity,
    0
  )
}

const normalizeBasketPromotionalItem = (
  item?: SprykerBasketItem
): PromotionalItem => {
  return removeUndefinedPropertiesFromObject({
    id_promotional_item: item?.id,
    sku: item?.attributes?.sku.replace(/\D/g, ''),
    quantity: item?.attributes?.quantity ?? 1,
    is_promo: true,
    userDeclined: item?.attributes?.userDeclined,
    isNew: item?.attributes?.isNew,
    discountPercentage: item?.attributes?.discountPercentage
  })
}
