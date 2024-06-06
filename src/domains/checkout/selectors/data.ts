import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectData = (state: RootState) => state?.client?.checkout?.data

export const selectWasLoading = createSelector(
  selectData,
  data => data?.isLoading
)

export const selectWasSuccess = createSelector(
  selectData,
  data => data?.wasSuccess ?? false
)

export const selectWasError = createSelector(
  selectData,
  data => data?.wasError ?? false
)

export const selectError = createSelector(
  selectData,
  data => data?.error ?? false
)

export const selectDeliveryMethod = createSelector(
  selectData,
  data => data?.details?.deliveryMethod
)

export const selectDeliveryAddress = createSelector(
  selectData,
  data => data?.details?.deliveryAddress
)

export const selectBillingAddress = createSelector(
  selectData,
  data => data?.details?.billingAddress
)

export const selectShipmentMethods = createSelector(
  selectData,
  data => data?.details?.shipmentMethods
)

export const selectIsBillingSameAsShipping = createSelector(
  selectData,
  data => data?.details?.isBillingSameAsShipping ?? true
)

export const selectCartId = createSelector(
  selectData,
  data => data?.details?.cartId
)

export const selectZipBillingAddress = createSelector(
  selectData,
  data => data?.details?.billingAddress?.zipCode
)

export const selectZipDeliveryAddress = createSelector(
  selectData,
  data => data?.details?.deliveryAddress?.zipCode
)

export const selectTaxReference = createSelector(
  selectData,
  data => data?.details?.taxReference
)

export const selectDeliveryDays = createSelector(selectData, data => ({
  minDeliveryDays: data?.details?.minDeliveryDays,
  maxDeliveryDays: data?.details?.maxDeliveryDays
}))

export const selectIsTaxExempt = createSelector(
  selectData,
  data => data?.details?.isTaxExempt
)

export const selectLastUsedPaymentMethod = createSelector(
  selectData,
  data => data?.details?.lastUsedPaymentCode
)

export const selectPaymentMethods = createSelector(
  selectData,
  data => data?.details?.paymentMethods
)

export const selectAtidaCashAmount = createSelector(
  selectData,
  data =>
    data?.details?.paymentMethods?.find(
      paymentMethod => paymentMethod.attributes.availableAmount !== null
    )?.attributes.availableAmount
)

export const selectAtidaCashUsed = createSelector(
  selectData,
  data => data?.details?.atidaCashUsed
)
