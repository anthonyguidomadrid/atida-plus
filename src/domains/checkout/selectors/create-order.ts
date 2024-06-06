import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectCreateOrder = (state: RootState) =>
  state?.client?.checkout?.createOrder

export const selectCreateOrderWasError = createSelector(
  selectCreateOrder,
  data => data.wasError
)
export const selectCreateOrderIsLoading = createSelector(
  selectCreateOrder,
  data => data?.isLoading
)

export const selectCreateOrderWasSuccess = createSelector(
  selectCreateOrder,
  data => data.wasSuccess
)

export const selectOrderId = createSelector(
  selectCreateOrder,
  data => data?.details?.orderId
)

export const selectOrderItems = createSelector(
  selectCreateOrder,
  data => data?.details?.items
)

export const selectOrderExpenses = createSelector(
  selectCreateOrder,
  data => data?.details?.expenses
)

export const selectTotalAmount = createSelector(selectCreateOrder, data =>
  data?.details?.payments?.find(
    payment => payment.paymentMethod === 'atidaPaymentInternal'
  )
)

export const selectOrderPaymentsData = createSelector(
  selectCreateOrder,
  data => data?.details?.payments
)

export const selectOrderInternalPaymentReference = createSelector(
  selectCreateOrder,
  data => data?.details?.internalPaymentReference
)

export const selectOrderLoyaltyPaymentReference = createSelector(
  selectCreateOrder,
  data => data?.details?.loyaltyPaymentReference
)

export const selectOrderTemporaryBasket = createSelector(
  selectCreateOrder,
  data => data?.details?.temporaryBasket
)

export const selectOrderTemporaryBasketItems = createSelector(
  selectCreateOrder,
  data => data?.details?.temporaryBasket?.items
)

export const selectOrderError = createSelector(
  selectCreateOrder,
  data => data.error
)

export const selectOrderErrorDetails = createSelector(
  selectCreateOrder,
  data => data.errorInfo?.details
)

export const selectOrder = createSelector(
  selectCreateOrder,
  data => data?.details
)
