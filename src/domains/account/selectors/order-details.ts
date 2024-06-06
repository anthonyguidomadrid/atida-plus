import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectorOrderDetails = (state: RootState) =>
  state?.client?.account?.['order-details']

export const selectOrderDetailsIsLoading = createSelector(
  selectorOrderDetails,
  orderHistory => orderHistory?.isLoading ?? false
)

export const selectOrderDetails = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.orderDetails
)

export const selectOrderDetailsWasSuccess = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.wasSuccess
)

export const selectOrderDetailsWasError = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.wasError
)

export const selectOrderDetailsItems = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.orderDetails?.attributes?.items
)

export const selectOrderDetailsCurrency = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.orderDetails?.attributes?.currencyIsoCode
)

export const selectOrderDetailsDiscountTotal = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.orderDetails?.attributes?.productDiscounts
)

export const selectOrderDiscounts = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.orderDetails?.attributes?.calculatedDiscounts
)

export const selectOrderDetailsTotals = createSelector(
  selectOrderDetails,
  data => ({
    subTotal: data?.attributes?.totals?.subtotal ?? 0,
    shippingTotal: data?.attributes?.totals?.shippingTotal ?? 0,
    grandTotal: data?.attributes?.totals?.grandTotal ?? 0,
    surchargeTotal: data?.attributes?.totals?.surchargeTotal ?? 0,
    rrpDiscountTotal: data?.attributes?.totals?.rrpDiscountTotal ?? 0,
    rewardTotal: data?.attributes?.totals?.rewardTotal ?? 0,
    loyaltySpent: data?.attributes?.totals?.loyaltySpent ?? 0,
    amountPaidByRealPayment:
      data?.attributes?.totals?.amountPaidByRealPayment ?? 0,
    itemTotal: data?.attributes?.totals?.itemTotal ?? 0
  })
)

const selectOrderDetailsItemQuantities = createSelector(
  selectOrderDetailsItems,
  items => items?.map(item => item.quantity)
)

export const selectOrderDetailsNumberOfItems = createSelector(
  selectOrderDetailsItemQuantities,
  quantities =>
    quantities?.reduce((total = 0, quantity = 0) => total + quantity, 0) ?? 0
)

export const selectOrderDetailsCoupons = createSelector(
  selectorOrderDetails,
  orderDetails => orderDetails?.orderDetails?.attributes?.productDiscounts
)

export const selectOrderDetailsIsTaxExempt = createSelector(
  selectorOrderDetails,
  orderDetails =>
    orderDetails?.orderDetails?.attributes?.shippingAddress?.isTaxExempt
)

export const selectOrderDetailsFirstName = createSelector(
  selectorOrderDetails,
  orderDetails =>
    orderDetails?.orderDetails?.attributes?.shippingAddress?.firstName
)

export const selectOrderDetailsShippingTotal = createSelector(
  selectorOrderDetails,
  orderDetails =>
    orderDetails?.orderDetails?.attributes?.expenses[0]
      ?.sumPriceToPayAggregation
)

export const selectDeliveryDays = createSelector(
  selectorOrderDetails,
  orderDetails => ({
    minDeliveryDays:
      orderDetails?.orderDetails?.attributes?.shipments[0]?.minDeliveryDays,
    maxDeliveryDays:
      orderDetails?.orderDetails?.attributes?.shipments[0]?.maxDeliveryDays
  })
)

export const selectErpShipping = createSelector(
  selectorOrderDetails,
  orderDetails => ({
    erpShipmentStatus:
      orderDetails?.orderDetails?.attributes?.shipments[0].erpShipmentStatus,
    erpTrackingUrl:
      orderDetails?.orderDetails?.attributes?.shipments[0]?.erpTrackingUrl,
    erpTrackingReference:
      orderDetails?.orderDetails?.attributes?.shipments[0]?.erpTrackingReference
  })
)
