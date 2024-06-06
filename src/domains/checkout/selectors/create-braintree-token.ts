import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectBrainTree = (state: RootState) => state?.client?.checkout?.braintree

export const selectBrainTreeToken = createSelector(
  selectBrainTree,
  data => data?.token?.clientToken
)
