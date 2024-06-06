import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectBizumPayment = (state: RootState) => state?.client?.checkout?.bizum

export const selectBizumInternalRef = createSelector(
  selectBizumPayment,
  data => data?.details?.internal_ref
)

export const selectBizumFormUrl = createSelector(
  selectBizumPayment,
  data => data?.details?.form_url
)

export const selectBizumSignatureVersion = createSelector(
  selectBizumPayment,
  data => data?.details?.signature_version
)

export const selectBizumMerchantParameters = createSelector(
  selectBizumPayment,
  data => data?.details?.merchant_params
)

export const selectBizumSignature = createSelector(
  selectBizumPayment,
  data => data?.details?.signature
)
