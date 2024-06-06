import { createSelector } from '@reduxjs/toolkit'
import { ORDER_FAILED_STATUSES } from '~config/constants/order-status'
import { RootState } from '~domains/redux'

const selectOrderHistory = (state: RootState) =>
  state?.client?.account?.['order-history']

export const selectIsLoading = createSelector(
  selectOrderHistory,
  orderHistory => orderHistory?.isLoading ?? false
)

export const selectWasSuccess = createSelector(
  selectOrderHistory,
  orderHistory => orderHistory?.wasSuccess ?? false
)

export const selectAllOrdersFromHistory = createSelector(
  selectOrderHistory,
  orderHistory => orderHistory?.orderHistory
)

export const selectAllNotCancelledOrdersFromHistory = createSelector(
  selectOrderHistory,
  orderHistory =>
    orderHistory?.orderHistory
      ?.map(orderHistoryByDate => {
        const badge = orderHistoryByDate.orderHistory.filter(
          order =>
            !ORDER_FAILED_STATUSES.includes(order.attributes.status[0].name)
        )
        if (badge.length > 0)
          return {
            date: orderHistoryByDate.date,
            unFormattedDate: orderHistoryByDate.unFormattedDate,
            orderHistory: badge
          }
      })
      .filter(orderHistoryByDate => orderHistoryByDate)
)

export const selectOrderHistoryTotalPages = createSelector(
  selectOrderHistory,
  orderHistory => orderHistory?.totalPages
)

export const selectNumberOfOrdersFromHistory = createSelector(
  selectOrderHistory,
  orderHistory =>
    Array.isArray(orderHistory?.orderHistory?.[0]?.orderHistory)
      ? orderHistory.orderHistory?.reduce((accumulator, { orderHistory }) => {
          return accumulator + (orderHistory?.length ?? 0)
        }, 0)
      : 0
)
