import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectSIBSMultibancoPayment = (state: RootState) =>
  state?.client?.checkout?.sibsMultibanco

export const selectSIBSMultibancoPaymentInternalRef = createSelector(
  selectSIBSMultibancoPayment,
  data => data?.details?.internal_ref
)

export const selectSIBSMultibancoPaymentAmount = createSelector(
  selectSIBSMultibancoPayment,
  data => data?.details?.amount
)

export const selectSIBSMultibancoPaymentEntity = createSelector(
  selectSIBSMultibancoPayment,
  data => data?.details?.payment_entity
)
export const selectSIBSMultibancoPaymentRef = createSelector(
  selectSIBSMultibancoPayment,
  data => data?.details?.payment_reference
)

export const selectSIBSMultibancoExpirationDate = createSelector(
  selectSIBSMultibancoPayment,
  data => data?.details?.expire_at
)
