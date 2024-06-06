import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectContent = (state: RootState) => state?.client?.basket?.content

export const selectIsLoading = createSelector(
  selectContent,
  content => content?.isLoading ?? false
)

export const selectPriceChannel = createSelector(
  selectContent,
  content => content.data?.priceChannel?.channel
)

export const selectBasketModalProduct = createSelector(
  selectContent,
  content => content?.basketModalProduct ?? null
)

export const selectQuantityAction = createSelector(
  selectContent,
  content => content?.quantityAction
)

export const selectWasError = createSelector(
  selectContent,
  content => content?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectContent,
  content => content?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectContent,
  content => content?.error
)

export const selectData = createSelector(
  selectContent,
  content => content?.data
)

export const selectCurrency = createSelector(selectData, data => data?.currency)

export const selectDiscountTotal = createSelector(
  selectData,
  data => data?.discountTotal
)

export const selectId = createSelector(selectData, data => data?.id)

export const selectItems = createSelector(selectData, data => data?.items ?? [])

const selectItemQuantities = createSelector(selectItems, items =>
  items.map(item => item.quantity)
)
export const selectIsProductUnavailable = createSelector(selectItems, items =>
  items.some(({ product }) => product.availability === 'NOT_AVAILABLE')
)

export const selectNumberOfItems = createSelector(
  selectItemQuantities,
  quantities =>
    quantities?.reduce((total = 0, quantity = 0) => total + quantity, 0) ?? 0
)

export const selectIsBasketEmpty = createSelector(
  selectNumberOfItems,
  numberOfItems => numberOfItems === 0
)

export const selectTotals = createSelector(selectData, data => ({
  rrpTotal: data?.rrpTotal ?? 0,
  subTotal: data?.subTotal ?? 0,
  itemTotal: data?.itemTotal ?? 0,
  shippingTotal: data?.shippingTotal,
  grandTotal: data?.grandTotal ?? 0,
  expenses: data?.expenses,
  surchargeTotal: data?.surchargeTotal,
  rrpDiscountTotal: data?.rrpDiscountTotal,
  totalSaving: data?.totalSaving ?? 0,
  rewardTotal: data?.rewardTotal,
  freeShippingThreshold: data?.freeShippingThreshold ?? 0
}))

export const selectGrandTotal = createSelector(
  selectTotals,
  totals => totals.grandTotal
)

export const selectBasketCouponData = createSelector(
  selectContent,
  content => content?.data?.coupons
)

export const selectBasketDiscounts = createSelector(selectContent, content =>
  content?.data?.discounts?.reduce((sum, item) => {
    return sum + item.amount
  }, 0)
)

export const selectCartCouponData = createSelector(
  selectContent,
  content => content?.data?.cartCoupons
)

export const selectQuantityError = createSelector(
  selectContent,
  content => content?.quantityError?.not_available_items?.[0]
)

export const selectHasPromotionalItemOutOfStock = createSelector(
  selectData,
  data => data?.hasPromotionalItemOutOfStock
)

export const selectAnonymousId = createSelector(
  selectData,
  data => data?.anonymousId
)

export const selectDiscountedItems = createSelector(
  selectData,
  data => data?.discountedItems
)

export const selectBasketDiscountsList = createSelector(
  selectData,
  data => data?.discounts
)

export const selectBasketDeliveryDays = createSelector(
  selectData,
  data => data?.deliveryDays
)
