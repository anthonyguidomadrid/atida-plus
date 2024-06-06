import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '~domains/redux'

const selectProduct = (state: RootState) => state.server.product

export const selectProductView = createSelector(
  selectProduct,
  product => product.viewToggle.productView
)
